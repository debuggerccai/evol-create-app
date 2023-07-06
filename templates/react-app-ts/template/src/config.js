const DEV = process.env.NODE_ENV !== 'production'

module.exports = {
  serverPort: 8001,
  apiDomain: '/api', // 代理请求前缀
  proxyServer: 'http://localhost:3000', // 开发环境
  DEV,
  iconJs: '//at.alicdn.com/t/c/font_3942136_j2nodjd66b.js',
  iconCss: '//at.alicdn.com/t/c/font_3942136_j2nodjd66b.css',
}
