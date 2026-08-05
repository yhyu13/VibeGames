/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 原版菜单标题使用粗描边的中文艺术字（"纯白枪骑兵"）。
        // 这里仍保留 monospace + pixel-style 字体用于其它 UI。
        'pixel-title': ['"ZCOOL KuaiLe"', '"Press Start 2P"', 'sans-serif'],
        'pixel': ['VT323', '"ZCOOL KuaiLe"', 'monospace'],
      },
      // 纯白枪骑兵原版画风：黑底深空 + 蓝色标题 + 黄色文本 + 绿色瞄准框 + 红色血条 + 白色机体。
      // 去除了"霓虹 / 像素赛博朋克"的青/粉色调。
      colors: {
        'void': '#000000',
        'void-deep': '#05080f',
        'lancer-blue': '#6a7fff',     // 标题深蓝（"纯白枪骑兵"）
        'lancer-blue-light': '#8fa4ff',
        'lancer-yellow': '#ffdd44',   // 菜单 / PHIXCAT / 速度数字
        'lancer-green': '#33ff66',    // 锁定框 / 能量条
        'lancer-red': '#ff3030',      // 血条 / 危险
        'lancer-white': '#ffffff',    // 机体剪影
        'dark-bg': '#0a0f1f',
        'dark-card': '#10162a',
      },
      boxShadow: {
        'lancer': '0 0 0 1px rgba(106,127,255,0.6)',
      },
    },
  },
  plugins: [],
}
