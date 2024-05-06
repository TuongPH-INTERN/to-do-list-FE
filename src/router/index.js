import Vue from 'vue'
import Router from 'vue-router'
import Todos from '@/components/Todos'
import Login from '@/components/Login'
import EditTask from '@/components/EditTask'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/todo',
      name: 'Todos',
      component: Todos
    },
    {
      path: '/todo/:id/edit',
      name: 'editTask',
      component: EditTask
    }
  ]
})
