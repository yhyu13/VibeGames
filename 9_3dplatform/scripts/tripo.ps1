<#
  tripo.ps1 — Tripo v3 text-to-model CLI (P series, low-poly PBR GLB output)

  API   : https://openapi.tripo3d.com/v3   Docs: https://developers.tripo3d.com/zh/docs
  Key   : $env:TRIPOD_API_KEY, or the repo-root tripo.md (gitignored — NEVER commit keys)
  Notes : P series (P1-20260311) = clean topology, 50-20,000 faces, PBR maps.
          Generation is async: create task -> poll -> download. Costs credits (see balance).

  Usage:
    powershell -File scripts\tripo.ps1 -Prompt "a chunky lantern keeper spirit..." -Name keeper -FaceLimit 3000
    powershell -File scripts\tripo.ps1 -Prompt "a stone bridge platform..." -Name bridge -NoPbr -FaceLimit 800
    powershell -File scripts\tripo.ps1 -Prompt "..." -ModelSeed 42 -TextureSeed 7 -TextureQuality detailed
    powershell -File scripts\tripo.ps1 -ShowBalance
#>
param(
  [string]$Prompt = "",
  [string]$Name = "model",
  [string]$Model = "P1-20260311",
  [int]$FaceLimit = 3000,
  [string]$TextureQuality = "standard",   # standard | detailed | extreme
  [int]$ModelSeed = 0,                    # 0 = random; same seed + same input = identical mesh
  [int]$TextureSeed = 0,                  # 0 = random
  [switch]$NoPbr,
  [string]$OutDir = "tripo-output",
  [int]$PollSeconds = 5,
  [int]$TimeoutSec = 600,
  [switch]$ShowBalance
)

$ErrorActionPreference = "Stop"
$Base = "https://openapi.tripo3d.com/v3"

function Get-TripoKey {
  if ($env:TRIPOD_API_KEY) { return $env:TRIPOD_API_KEY.Trim() }
  $repoRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
  $f = Join-Path $repoRoot "tripo.md"
  if (Test-Path -LiteralPath $f) { return (Get-Content -LiteralPath $f -Raw).Trim() }
  throw "No API key found: set TRIPOD_API_KEY or place the key in <repo-root>/tripo.md"
}

function Invoke-TripoApi {
  param([string]$Method, [string]$Path, [string]$Body = "")
  $headers = @{ Authorization = "Bearer $(Get-TripoKey)" }
  try {
    if ($Body -ne "") {
      return Invoke-RestMethod -Uri "$Base$Path" -Method $Method -Headers $headers -ContentType "application/json" -Body $Body -TimeoutSec 60
    }
    return Invoke-RestMethod -Uri "$Base$Path" -Method $Method -Headers $headers -TimeoutSec 60
  } catch {
    $code = "?"
    $text = "no response body"
    if ($_.Exception.Response) {
      $code = [int]$_.Exception.Response.StatusCode
      $sr = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
      $text = $sr.ReadToEnd()
    }
    throw "Tripo API $Method $Path -> HTTP $code : $text"
  }
}

if ($ShowBalance) {
  $bal = Invoke-TripoApi -Method Get -Path "/account/balance"
  Write-Output ("balance: {0} / frozen: {1}" -f $bal.data.balance, $bal.data.frozen)
  if ($Prompt -eq "") { exit 0 }
}

if ($Prompt -eq "") {
  throw "No prompt given: pass -Prompt '...' or use -ShowBalance"
}

$body = [ordered]@{
  prompt     = $Prompt
  model      = $Model
  face_limit = $FaceLimit
  pbr        = (-not $NoPbr)
}
if ($NoPbr) { $body.texture = $false }   # pbr=true forces texture=true; pbr=false defaults texture on
if ($ModelSeed -ne 0) { $body.model_seed = $ModelSeed }
if ($TextureSeed -ne 0) { $body.texture_seed = $TextureSeed }
if ($TextureQuality -ne "standard") { $body.texture_quality = $TextureQuality }
$json = $body | ConvertTo-Json -Compress

$create = Invoke-TripoApi -Method Post -Path "/generation/text-to-model" -Body $json
if ($create.code -ne 0) {
  throw "task creation failed: code $($create.code) - $($create.message) $($create.suggestion)"
}
$taskId = $create.data.task_id
Write-Output "task created: $taskId"

$deadline = (Get-Date).AddSeconds($TimeoutSec)
while ((Get-Date) -lt $deadline) {
  Start-Sleep -Seconds $PollSeconds
  $t = Invoke-TripoApi -Method Get -Path "/tasks/$taskId"
  $st = $t.data.status
  $prog = $t.data.progress
  Write-Output "  $st ($prog%)"
  if ($st -eq "success") {
    New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
    Invoke-WebRequest -Uri $t.data.output.model_url -OutFile (Join-Path $OutDir "$Name.glb") -TimeoutSec 180
    $gb = Get-Item (Join-Path $OutDir "$Name.glb")
    if ($t.data.output.rendered_image_url) {
      Invoke-WebRequest -Uri $t.data.output.rendered_image_url -OutFile (Join-Path $OutDir "$Name-preview.webp") -TimeoutSec 60
    }
    Write-Output ("saved: {0} ({1} KB) / credits_consumed: {2}" -f $gb.FullName, [math]::Round($gb.Length / 1KB, 1), $t.data.credits_consumed)
    $bal = Invoke-TripoApi -Method Get -Path "/account/balance"
    Write-Output ("balance remaining: {0}" -f $bal.data.balance)
    exit 0
  }
  if ($st -eq "failed" -or $st -eq "cancelled") {
    throw ("task $st : " + ($t | ConvertTo-Json -Depth 6))
  }
}
throw "timed out after ${TimeoutSec}s polling task $taskId"
