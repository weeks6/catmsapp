import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Page from '../components/Page'

Vue.use(VueRouter)

const pageProps = (route) => {
  if (route.name != 'Edit') {
    return {
      pageNumber: (route.params.page-1) * 10,
      prevRange: (route.params.page)*10,
      editable: false
    }
  } else {
    return {
      pageNumber: (route.params.page-1) * 10,
      prevRange: (route.params.page)*10,
      editable: true
    }
  }
  
}

const routes = [
  {
    path: '/',
    redirect: '/home/',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/edit',
    name: "Edit",
    component: () => import('../views/Edit.vue')
  },
  {
    path: '/home/:page',
    component: Page,
    props: pageProps
  },
  {
    path: '/edit/:page',
    component: Page,
    name: 'Edit',
    props: pageProps
  }
]

const router = new VueRouter({
  routes
})

export default router
