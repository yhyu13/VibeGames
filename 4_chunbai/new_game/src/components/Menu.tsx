import React from 'react';
import { useGameStore } from '../store';

// PHIXCAT 三角标 — 原版菜单水印
const PhixcatLogo: React.FC<{ size?: number; opacity?: number }> = ({ size = 80, opacity = 0.5 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ opacity }}>
    <polygon points="50,15 90,80 10,80" fill="none" stroke="#ffffff" strokeWidth="3" />
    <line x1="22" y1="60" x2="78" y2="60" stroke="#ffffff" strokeWidth="2" />
  </svg>
);

const Menu: React.FC = () => {
  const setGame = useGameStore(s => s.setGame);

  return (
    <div className="lancer-bg w-full h-full relative overflow-hidden flex items-center justify-center">
      {/* PHIXCAT 三角形水印 — 居中淡蓝 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PhixcatLogo size={520} opacity={0.07} />
      </div>

      {/* 重复小 PHIXCAT 水印（呼应原版背景纹理） */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><polygon points=\'50,15 90,80 10,80\' fill=\'none\' stroke=\'%236a7fff\' stroke-width=\'2\'/><line x1=\'22\' y1=\'60\' x2=\'78\' y2=\'60\' stroke=\'%236a7fff\' stroke-width=\'1.5\'/></svg>")',
          backgroundSize: '180px 180px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* 左侧主面板 */}
      <div className="relative z-10 mx-auto w-[480px] max-w-[92vw] lancer-frame px-6 py-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="text-[12px] tracking-[0.4em] mb-1" style={{ color: '#ffffff' }}>
              <span style={{ color: '#ff3030' }}>下</span>
              <span style={{ color: '#ffffff' }}> 一 </span>
              <span style={{ color: '#ff3030' }}>战</span>
              <span style={{ color: '#ffffff' }}> 高 达</span>
            </div>
            <h1 className="font-pixel-title leading-none"
              style={{
                color: '#6a7fff',
                fontSize: '44px',
                textShadow: '2px 2px 0 #ffffff, -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff',
                letterSpacing: '0.04em',
              }}>
              纯白枪骑兵
            </h1>
            <div className="mt-1 text-[11px] tracking-[0.3em]" style={{ color: '#8fa4ff' }}>
              SILVER LANCER
            </div>
          </div>
          <div className="mt-1">
            <PhixcatLogo size={56} opacity={0.7} />
          </div>
        </div>

        <div className="mt-6 border-t border-lancer-blue/40 pt-4 space-y-2">
          <button
            onClick={() => setGame({ screen: 'pve', gameMode: 'pve' })}
            className="lancer-btn w-full py-2 text-base tracking-[0.2em]"
          >
            开始游戏
          </button>
          <button
            className="lancer-btn w-full py-2 text-base tracking-[0.2em] opacity-80 cursor-default"
            disabled
            style={{ borderColor: 'rgba(106,127,255,0.4)' }}
          >
            操作指南
          </button>
          <button
            className="lancer-btn w-full py-2 text-base tracking-[0.2em] opacity-80 cursor-default"
            disabled
            style={{ borderColor: 'rgba(106,127,255,0.4)' }}
          >
            游戏设置
          </button>
          <button
            className="lancer-btn w-full py-2 text-base tracking-[0.2em] opacity-80 cursor-default"
            disabled
            style={{ borderColor: 'rgba(106,127,255,0.4)' }}
          >
            游戏信息
          </button>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div className="text-center flex-1">
            <PhixcatLogo size={42} opacity={0.85} />
            <div className="text-[11px] tracking-[0.25em] mt-1" style={{ color: '#ffffff' }}>
              PHIXCAT
            </div>
            <div className="text-[8px] tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              FLASH 3D ENGINE TEST BUILD · Silver Lancer V 0.79
            </div>
            <div className="text-[8px] tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Copyrights 2007—2008 phixcat All rights reserved
            </div>
          </div>
        </div>
      </div>

      {/* 右侧白色机体剪影占位（呼应原版右侧大块 Gundam 剪影） */}
      <div className="hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none">
        <svg viewBox="0 0 200 280" width="280" height="380" fill="#ffffff">
          {/* 头 */}
          <polygon points="80,30 120,30 130,55 70,55" />
          <rect x="70" y="55" width="60" height="25" />
          {/* 肩甲 */}
          <polygon points="30,75 70,80 70,130 25,130" />
          <polygon points="130,80 170,75 175,130 130,130" />
          {/* 身体 */}
          <rect x="55" y="80" width="90" height="90" />
          {/* 胸甲 V */}
          <polygon points="80,90 120,90 100,140" fill="#000" />
          {/* 手臂 */}
          <rect x="20" y="130" width="40" height="80" />
          <rect x="140" y="130" width="40" height="80" />
          {/* 腰部装甲 */}
          <polygon points="60,170 140,170 150,210 50,210" />
          {/* 腿 */}
          <polygon points="55,210 95,210 90,275 60,275" />
          <polygon points="105,210 145,210 140,275 110,275" />
        </svg>
      </div>
    </div>
  );
};

export default Menu;
