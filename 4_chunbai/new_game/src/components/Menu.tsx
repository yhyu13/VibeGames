import React from 'react';
import { useGameStore } from '../store';

const PhixcatLogo: React.FC<{ size?: number; opacity?: number }> = ({ size = 80, opacity = 0.5 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ opacity }}>
    <polygon points="50,15 90,80 10,80" fill="none" stroke="#FFEE00" strokeWidth="3" />
    <line x1="22" y1="60" x2="78" y2="60" stroke="#FFEE00" strokeWidth="2" />
  </svg>
);

const Menu: React.FC = () => {
  const setGame = useGameStore(s => s.setGame);

  return (
    <div className="cp-bg w-full h-full relative overflow-hidden flex items-center justify-center">
      <div className="cp-watermark" />

      {/* 居中大型 PHIXCAT 三角标 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PhixcatLogo size={520} opacity={0.08} />
      </div>

      <div className="relative z-10 mx-auto w-[520px] max-w-[92vw] cp-frame px-6 py-6">
        <span className="cp-corner-bl" />
        <span className="cp-corner-br" />
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="cp-label text-[12px] tracking-[0.4em] mb-1">
              <span style={{ color: '#ff3030' }}>下</span>
              <span> 一 </span>
              <span style={{ color: '#ff3030' }}>战</span>
              <span> 高 达</span>
            </div>
            <h1 className="cp-title leading-none" style={{ fontSize: '46px' }}>
              纯白枪骑兵
            </h1>
            <div className="mt-1 cp-label text-[11px] tracking-[0.3em]" style={{ color: '#FFEE00' }}>
              SILVER LANCER
            </div>
          </div>
          <div className="mt-1">
            <PhixcatLogo size={56} opacity={0.85} />
          </div>
        </div>

        <div className="mt-6 border-t border-[#FFEE00]/40 pt-4 space-y-2">
          <button
            onClick={() => setGame({ screen: 'pve', gameMode: 'pve' })}
            className="cp-btn w-full py-2 text-base"
          >
            开始游戏
          </button>
          <button className="cp-btn w-full py-2 text-base opacity-60 cursor-default" disabled>
            操作指南
          </button>
          <button className="cp-btn w-full py-2 text-base opacity-60 cursor-default" disabled>
            游戏设置
          </button>
          <button className="cp-btn w-full py-2 text-base opacity-60 cursor-default" disabled>
            游戏信息
          </button>
        </div>

        <div className="mt-5 flex items-end justify-center">
          <div className="text-center">
            <PhixcatLogo size={42} opacity={0.95} />
            <div className="cp-label text-[11px] tracking-[0.25em] mt-1">PHIXCAT</div>
            <div className="cp-num text-[8px] tracking-wider mt-1" style={{ color: CP_FAINT }}>
              FLASH 3D GAME ENGINE TEST BUILD · Silver Lancer V 0.79
            </div>
            <div className="cp-num text-[8px] tracking-wider" style={{ color: CP_FAINT }}>
              Copyrights 2007—2008 phixcat All rights reserved
            </div>
          </div>
        </div>
      </div>

      {/* 右侧白色机体剪影 */}
      <div className="hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none">
        <svg viewBox="0 0 200 280" width="280" height="380" fill="#ffffff">
          <polygon points="80,30 120,30 130,55 70,55" />
          <rect x="70" y="55" width="60" height="25" />
          <polygon points="30,75 70,80 70,130 25,130" />
          <polygon points="130,80 170,75 175,130 130,130" />
          <rect x="55" y="80" width="90" height="90" />
          <polygon points="80,90 120,90 100,140" fill="#000" />
          <rect x="20" y="130" width="40" height="80" />
          <rect x="140" y="130" width="40" height="80" />
          <polygon points="60,170 140,170 150,210 50,210" />
          <polygon points="55,210 95,210 90,275 60,275" />
          <polygon points="105,210 145,210 140,275 110,275" />
        </svg>
      </div>
    </div>
  );
};

const CP_FAINT = 'rgba(255, 238, 0, 0.30)';

export default Menu;