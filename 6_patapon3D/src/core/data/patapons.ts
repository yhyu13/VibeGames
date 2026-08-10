/**
 * core/data/patapons.ts — v2.0 角色模板(军队 3 人 + boss Moloch)
 *
 * 配色冻结,见 02-art-direction §4/§6:
 * 军队 emerald #3affc8 / lime #9aff3a / teal #3ac8ff;羽毛 紫/青/黄;
 * Moloch 身体 #ff3a3a、眼 #fff3a0、角 #ffd83a。
 */

export interface PataCharacter {
  id: string;
  bodyColor: string;
  eyeColor: string;
  /** 3 根羽毛(紫/青/黄) */
  featherColors: readonly [string, string, string];
  /** boss 双角(军队无) */
  hornColor?: string;
}

const FEATHERS = ['#c83aff', '#3affc8', '#ffd83a'] as const;

export const PATA_CHARACTERS: readonly PataCharacter[] = [
  { id: 'pata-emerald', bodyColor: '#3affc8', eyeColor: '#ffffff', featherColors: FEATHERS },
  { id: 'pata-lime', bodyColor: '#9aff3a', eyeColor: '#ffffff', featherColors: FEATHERS },
  { id: 'pata-teal', bodyColor: '#3ac8ff', eyeColor: '#ffffff', featherColors: FEATHERS },
  {
    id: 'boss-moloch',
    bodyColor: '#ff3a3a',
    eyeColor: '#fff3a0',
    featherColors: FEATHERS,
    hornColor: '#ffd83a',
  },
] as const;

/** 按 id 查模板(渲染器用;找不到 = 数据错误,直接抛) */
export function getCharacterById(id: string): PataCharacter {
  const found = PATA_CHARACTERS.find((c) => c.id === id);
  if (!found) {
    throw new Error(`No PataCharacter for id=${id}`);
  }
  return found;
}
