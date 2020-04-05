import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Article from '../components/Article'
import PostList from '../components/PostList'

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      components: {
        main: PostList
      }
    },
    {
      name: 'post_content',
      path: '/topic/:id',
      components: {
        main: Article
      }
    },
    {
      name: 'user_info',
      path: '/userinfo/:name'
    }
  ]
})
