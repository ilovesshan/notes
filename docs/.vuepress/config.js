import { defaultTheme } from '@vuepress/theme-default'
// import { mixTheme } from 'vuepress-theme-mix'

export default {
  title: 'ilovesshan',
  description: 'Keep track of my study notes',
  markdown: {
    lineNumbers: true,
  },
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      { text: '首页', link: '/' },
      {
        text: '前端',
        children: [
          { text: 'vue3', link: '/pages/vue3.md' }
        ]
      },
      {
        text: '移动端',
        children: [
          { text: 'flutter', link: '/pages/flutter.md' },
          { text: 'android', link: '/pages/android.md' }
        ]
      },
      {
        text: '后端',
        children: [
          { text: 'spring', link: '/pages/spring.md' },
          { text: 'springMvc', link: '/pages/springMvc.md' },
          { text: 'myBatis', link: '/pages/myBatis.md' },
        ]
      },
      {
        text: '数据库',
        children: [
          { text: 'mysql', link: '/pages/mysql.md' },
        ]
      },
      {
        text: '部署工具',
        children: [
          { text: 'linux', link: '/pages/linux.md' },
          { text: 'nginx', link: '/pages/nginx.md' },
        ]
      },
      {
        text: '项目集合',
        children: [
          { text: '网捷回收', link: 'https://ilovesshan.github.io/wjhs-doc/', activeMatch: "/" }
        ]
      }
    ],
  })
}