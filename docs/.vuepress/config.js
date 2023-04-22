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
        text: '常见面试题',
        children: [
          {
            text: '前端', children: [
              { text: 'HTML', link: '/pages/Interview-question/html.md' },
              { text: 'CSS', link: '/pages/Interview-question/css.md' },
              { text: 'JavaScript', link: '/pages/Interview-question/javascript.md' },
              { text: 'Vue2', link: '/pages/Interview-question/vue2.md' },
              { text: 'Vue3', link: '/pages/Interview-question/vue3.md' },
              { text: 'TypeScript', link: '/pages/Interview-question/typescript.md' },
              { text: 'Pinia', link: '/pages/Interview-question/pinia.md' },
            ]
          },
          {
            text: '移动端', children: [
              { text: 'android基础篇', link: '/pages/Interview-question/android-base.md' },
              { text: 'android高级篇', link: '/pages/Interview-question/android-advance.md' },
              { text: 'Dart', link: '/pages/Interview-question/dart.md' },
              { text: 'Flutter基础篇', link: '/pages/Interview-question/flutter-base.md' },
              { text: 'Flutter高级篇', link: '/pages/Interview-question/flutter-advance.md' },
              { text: '小程序', link: '/pages/Interview-question/mp.md' },
            ]
          },
          {
            text: 'Java', children: [
              { text: 'JavaSE', link: '/pages/Interview-question/javase.md' },
              { text: 'MySQL', link: '/pages/Interview-question/mysql.md' },
              { text: 'SSM', link: '/pages/Interview-question/ssm.md' },
              { text: 'RabbitMQ', link: '/pages/Interview-question/rabbitmq.md' },
              { text: 'ElasticSearch', link: '/pages/Interview-question/elasticsearch.md' },
              { text: 'SpringBoot', link: '/pages/Interview-question/springboot.md' },
              { text: 'SpringCloud', link: '/pages/Interview-question/springcloud.md' },
            ]
          },
          {
            text: '工具集', children: [
              { text: 'Git', link: '/pages/Interview-question/git.md' },
              { text: 'Docker', link: '/pages/Interview-question/docker.md' },
              { text: 'Linux', link: '/pages/Interview-question/linux.md' },
              { text: 'Maven', link: '/pages/Interview-question/maven.md' },
            ]
          },
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