import { BossDef, BossPhase } from '../types';

function phase(hp: number, speed: number, attacks: string[], minion: boolean, pattern: string): BossPhase {
  return { hpPercent: hp, speed, attacks, minionSpawn: minion, attackPattern: pattern };
}

export const BOSSES: BossDef[] = [
  {
    id: 1, name: '巨型运输舰', score: 500, color: '#ff4444', size: 4,
    phases: [
      phase(1.0, 5, ['弹幕散布'], true, 'spread'),
      phase(0.6, 7, ['弹幕散布', '召唤小兵'], true, 'spawn'),
      phase(0.3, 9, ['弹幕散布', '召唤小兵', '轨道炮'], false, 'laser'),
    ]
  },
  {
    id: 2, name: '实验体-α', score: 1000, color: '#ff00ff', size: 3,
    phases: [
      phase(1.0, 12, ['高速突进'], false, 'rush'),
      phase(0.6, 15, ['高速突进', '分身攻击'], true, 'clone'),
      phase(0.3, 18, ['高速突进', '分身攻击', '全屏激光'], false, 'fullLaser'),
    ]
  },
  {
    id: 3, name: '最终兵器', score: 2000, color: '#ffaa00', size: 5,
    phases: [
      phase(1.0, 4, ['多重导弹'], false, 'missile'),
      phase(0.75, 6, ['多重导弹', '力场护盾'], false, 'shield'),
      phase(0.5, 8, ['多重导弹', '力场护盾', '激光网'], true, 'laserNet'),
      phase(0.25, 10, ['多重导弹', '力场护盾', '激光网', '终极光束'], false, 'finalBeam'),
    ]
  }
];

export function getBoss(id: number): BossDef {
  return BOSSES.find(b => b.id === id) || BOSSES[0];
}
