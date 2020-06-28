import Vue from 'vue'
import VueRouter from 'vue-router'
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
    redirect: '/home/:page',
  },
  {
    path: '/edit',
    redirect: '/edit/:page'
  },
  {
    path: '/home/:page',
    name: 'Home',
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
