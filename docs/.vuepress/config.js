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
          { text: 'Git', link: '/pages/deploy/git.md' },
        ]
      },
      {
        text: '常见面试题',
        children: [
          {
            text: '前端', children: [
              { text: 'HTML', link: '/pages/interview-question/html.md' },
              { text: 'CSS', link: '/pages/interview-question/css.md' },
              { text: 'JavaScript', link: '/pages/interview-question/javascript.md' },
              { text: 'Vue2', link: '/pages/interview-question/vue2.md' },
              { text: 'Vue3', link: '/pages/interview-question/vue3.md' },
              { text: 'TypeScript', link: '/pages/interview-question/typescript.md' },
              { text: 'Pinia', link: '/pages/interview-question/pinia.md' },
            ]
          },
          {
            text: '移动端', children: [
              { text: 'Android', link: '/pages/interview-question/android.md' },
              { text: 'Dart', link: '/pages/interview-question/dart.md' },
              { text: 'Flutter', link: '/pages/interview-question/flutter.md' },
              { text: '小程序', link: '/pages/interview-question/mp.md' },
            ]
          },
          {
            text: 'Java', children: [
              { text: 'JavaSE', link: '/pages/interview-question/javase.md' },
              { text: 'MySQL', link: '/pages/interview-question/mysql.md' },
              { text: 'SSM', link: '/pages/interview-question/ssm.md' },
              { text: 'Redis', link: '/pages/interview-question/redis.md' },
              { text: 'RabbitMQ', link: '/pages/interview-question/rabbitmq.md' },
              { text: 'ElasticSearch', link: '/pages/interview-question/elasticsearch.md' },
              { text: 'SpringBoot', link: '/pages/interview-question/springboot.md' },
              { text: 'SpringCloud', link: '/pages/interview-question/springcloud.md' },
            ]
          },
          { text: '网络安全', link: '/pages/interview-question/networksecurity.md' },
          {
            text: '工具集', children: [
              { text: 'Git', link: '/pages/interview-question/git.md' },
              { text: 'Docker', link: '/pages/interview-question/docker.md' },
              { text: 'Linux', link: '/pages/interview-question/linux.md' },
              { text: 'Maven', link: '/pages/interview-question/maven.md' },
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