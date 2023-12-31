import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/caseform'
    // children: [
    //   {
    //     path: 'dashboard',
    //     component: () => import('@/views/dashboard/index'),
    //     name: '首頁',
    //     meta: { title: '首頁', icon: 'dashboard', affix: false }
    //   }
    // ]
  },
  {
    path: '/caseform',
    component: Layout,
    redirect: '/caseform/sheetdef',
    name: '病例表單管理',
    meta: { title: '病例表單管理', icon: 'documentation' },
    children: [
      {
        path: 'sheetdef',
        component: () => import('@/views/caseform/sheetdef/index'),
        name: '病例表單管理',
        meta: { title: '病例表單管理', icon: 'documentation', affix: true }
      },
      {
        path: 'order',
        component: () => import('@/views/caseform/order/index'),
        name: '病例表單类别树',
        meta: { title: '病例表單类别树', icon: 'documentation', affix: false }
      }
    ]
  },
  {
    path: '/element',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/element/index'),
        name: '數據元管理',
        meta: { title: '數據元管理', icon: 'education', affix: false }
      }
    ]
  },
  {
    path: '/dictionary',
    component: Layout,
    redirect: '/dictionary/conceptdata',
    name: '字典管理',
    meta: { title: '字典管理', icon: 'excel' },
    children: [
      {
        path: 'conceptdata',
        component: () => import('@/views/dictionary/conceptdata/index'),
        name: '字典管理',
        meta: { title: '字典管理', icon: 'excel', affix: false, noCache: true }
      },
      {
        path: 'concept',
        component: () => import('@/views/dictionary/concept/index'),
        name: '字典类别树',
        meta: { title: '字典类别树', icon: 'excel', affix: false }
      }
    ]
  },
  {
    path: '/picture',
    component: Layout,
    redirect: '/picture/library',
    name: '圖片庫管理',
    meta: { title: '圖片庫管理', icon: 'example' },
    children: [
      {
        path: 'library',
        component: () => import('@/views/picture/library/index'),
        name: '圖片庫管理',
        meta: { title: '圖片庫管理', icon: 'example', affix: false, noCache: true }
      },
      {
        path: 'tree',
        component: () => import('@/views/picture/tree/index'),
        name: '圖片庫类别树',
        meta: { title: '圖片庫类别树', icon: 'example', affix: false }
      }
    ]
  }
  // ,
  // {
  //   path: '/template',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/template/index'),
  //       name: '病例範本維護',
  //       meta: { title: '病例範本維護', icon: 'model', affix: false }
  //     }
  //   ]
  // }
]

export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
