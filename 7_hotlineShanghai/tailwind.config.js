/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Phase 0 / 修 3: 同步调色板 v2(v1 hex 全部更新,匹配 core/constants.ts v2)
        // 来源: D1 决策锁定(80% HM + 20% 上海),2026-08-08
        shanghai: {
          ink: '#0a0910',      // 弄堂深处墨色
          plaster: '#2a2638',  // 灰泥墙
          rust: '#7a2a1c',     // 木门铁锈
          teal: '#1a5a5a',     // 苏州河水
          lantern: '#e54a1a',  // 红灯笼(灯笼橙红)
          neon: '#ff2a44',      // 老式霓虹(招牌红)
          neonCyan: '#2a9aff', // 霓虹青变体
          paper: '#e8dca0',    // 黄包车票/纸
          ivory: '#f5e6b8',    // 米色旗袍
          jade: '#2a9a6a',     // 翡翠配饰
          steel: '#4a4a52',    // 步枪/铁器
          muzzle: '#ffaa3a',   // 枪火高亮
          blood: '#d8201a',    // 血(亮红)
          flash: '#fff2cc',    // 高光
          // HM-借鉴色:条带地板
          stripePurple: '#6a3a8a',
          stripeTeal: '#2a8a7a',
          stripePink: '#c84a7a',
          // 砖块墙
          wallRedBrick: '#8a3a2a',
          wallBlueBlock: '#3a5a8a',
          wallPlasterW: '#c8b896',
          // 地板 / 户外
          floorPlaster: '#5a5048',
          floorWood: '#6a4a2a',
          exteriorGray: '#4a4a5a',
        },
      },
      fontFamily: {
        // Phase 0 / 修 7: 去掉 VT323(外部 Google Fonts),改用系统 monospace
        pixel: ['"Consolas"', '"Menlo"', '"Monaco"', '"Courier New"', 'monospace'],
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.6' },
          '94%': { opacity: '1' },
          '97%': { opacity: '0.85' },
          '98%': { opacity: '1' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        flicker: 'flicker 4s infinite',
        blink: 'blink 1.1s steps(1) infinite',
      },
    },
  },
  plugins: [],
};
