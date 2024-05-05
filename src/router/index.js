import Vue from 'vue'
import Router from 'vue-router'
import Todos from '@/components/Todos'
import EditTask from '@/components/EditTask'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todos',
      component: Todos
    },
    {
      path: '/:id/edit',
      name: 'editTask',
      component: EditTask
    }
  ]
})
