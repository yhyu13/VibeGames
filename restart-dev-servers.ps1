# Restart dev servers. Usage:
#   .\restart-dev-servers.ps1            # restart all active projects
#   .\restart-dev-servers.ps1 7          # restart only 7_hotlineShanghai
param([int]$Number = 0)

$projects = @(
  @{ Number = 4;  Name = '4_chunbai';         Dir = 'F:\XD\git-repo\VibeGames\4_chunbai\new_game'; Port = 3000 },
  @{ Number = 5;  Name = '5_gamejam_1';       Dir = 'F:\XD\git-repo\VibeGames\5_gamejam_1';       Port = 5173 },
  @{ Number = 6;  Name = '6_patapon3D';       Dir = 'F:\XD\git-repo\VibeGames\6_patapon3D';       Port = 5183 },
  @{ Number = 7;  Name = '7_hotlineShanghai'; Dir = 'F:\XD\git-repo\VibeGames\7_hotlineShanghai'; Port = 5184 },
  @{ Number = 8;  Name = '8_lifegame';        Dir = 'F:\XD\git-repo\VibeGames\8_lifegame';        Port = 5185 },
  @{ Number = 10; Name = '10_phasewalk';      Dir = 'F:\XD\git-repo\VibeGames\10_phasewalk';      Port = 5187 },
  @{ Number = 11; Name = '11_blackhole';      Dir = 'F:\XD\git-repo\VibeGames\11_blackhole';      Port = 5188 }
)

if ($Number -ne 0) {
  $target = $projects | Where-Object { $_.Number -eq $Number }
  if (-not $target) { Write-Host "No project numbered $Number. Available: $((($projects | ForEach-Object { $_.Number }) -join ', '))"; exit 1 }
  $projects = @($target)
}

foreach ($p in $projects) {
  $listeners = Get-NetTCPConnection -LocalPort $p.Port -State Listen -ErrorAction SilentlyContinue
  $killed = $false
  foreach ($c in $listeners) {
    $proc = Get-Process -Id $c.OwningProcess -ErrorAction SilentlyContinue
    if ($proc) {
      Stop-Process -Id $proc.Id -Force
      Write-Host "[$($p.Name)] killed $($proc.ProcessName) (PID $($proc.Id)) on port $($p.Port)"
      $killed = $true
    }
  }
  if (-not $killed) { Write-Host "[$($p.Name)] no listener on port $($p.Port)" }
  Start-Sleep -Milliseconds 300
  Start-Process -FilePath 'npm.cmd' -ArgumentList 'run dev' -WorkingDirectory $p.Dir
  Write-Host "[$($p.Name)] started npm run dev in $($p.Dir)"
}

Write-Host 'Done.'
