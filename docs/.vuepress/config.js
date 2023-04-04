import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'

export default {
  title: 'ilovesshan',

  description: 'Keep track of my study notes',

  markdown: {
    lineNumbers: true,
  },

  plugins: [
    searchPlugin({
      // 配置项
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
    }),
  ],

  head: [
    ["link", { rel: "icon", href: "/hero.png" }]
  ],

  theme: defaultTheme({
    // 默认主题配置
    logo: "/hero.png",
    navbar: [
      { text: '首页', link: '/' },
      {
        text: '前端',
        children: [
          { text: 'vue3', link: '/pages/frontend/vue3.md' }
        ]
      },
      {
        text: '移动端',
        children: [
          { text: 'android', link: '/pages/mobile/android.md' },
          { text: 'flutter', link: '/pages/mobile/flutter.md' },
        ]
      },
      {
        text: '后端',
        children: [
          { text: 'javaSE', link: '/pages/backend/javaSE.md' },
          { text: 'JDK新特性', link: '/pages/backend/jdkNewFeature.md' },
          { text: 'javaWEB', link: '/pages/backend/javaWEB.md' },
          { text: 'myBatis', link: '/pages/backend/myBatis.md' },
          { text: 'spring', link: '/pages/backend/spring.md' },
          { text: 'springMVC', link: '/pages/backend/springMVC.md' },
          { text: 'ssm整合', link: '/pages/backend/ssmIntegration.md' },
          { text: 'springBoot', link: '/pages/backend/springBoot.md' },
        ]
      },
      {
        text: '数据库',
        children: [
          { text: 'mysql', link: '/pages/database/mysql.md' },
        ]
      },
      {
        text: '部署工具',
        children: [
          { text: 'linux', link: '/pages/deploy/linux.md' },
          { text: 'nginx', link: '/pages/deploy/nginx.md' },
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