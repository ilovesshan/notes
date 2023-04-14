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
          { text: 'JavaScript', link: '/pages/frontend/javaScript.md' },
          { text: 'vue2', link: '/pages/frontend/vue2.md' },
          { text: 'Pinia', link: '/pages/frontend/pinia.md' },
          { text: 'vue3', link: '/pages/frontend/vue3.md' },
          { text: 'TypeScript', link: '/pages/frontend/typescript.md' },
        ]
      },
      {
        text: '移动端',
        children: [
          { text: 'Android', link: '/pages/mobile/android.md' },
          { text: 'Flutter', link: '/pages/mobile/flutter.md' },
          { text: '小程序', link: '/pages/mobile/mp.md' },
        ]
      },
      {
        text: 'Java后端',
        children: [
          { text: 'JavaSE', link: '/pages/backend/javaSE.md' },
          { text: 'JDK新特性', link: '/pages/backend/jdkNewFeature.md' },
          { text: 'JavaWEB', link: '/pages/backend/javaWEB.md' },
          { text: 'MyBatis', link: '/pages/backend/myBatis.md' },
          { text: 'Spring', link: '/pages/backend/spring.md' },
          { text: 'SpringMVC', link: '/pages/backend/springMVC.md' },
          { text: 'SSM整合', link: '/pages/backend/ssmIntegration.md' },
          { text: 'SpringBoot', link: '/pages/backend/springBoot.md' },
          { text: 'SpringCloud', link: '/pages/backend/springCloud.md' },
        ]
      },
      {
        text: '数据库',
        children: [
          { text: 'MySQL', link: '/pages/database/mysql.md' },
          { text: 'Redis', link: '/pages/database/redis.md' },
        ]
      },
      {
        text: '中间件',
        children: [
          { text: 'RabbitMQ', link: '/pages/middleware/rabbitMQ.md' },
          { text: 'ElasticSearch', link: '/pages/middleware/elasticSearch.md' },
        ]
      },
      {
        text: '部署工具',
        children: [
          { text: 'Linux', link: '/pages/deploy/linux.md' },
          { text: 'Nginx', link: '/pages/deploy/nginx.md' },
          { text: 'Docker', link: '/pages/deploy/docker.md' },
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