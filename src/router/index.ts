import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/login/index.vue';
import ContainerView from '@/components/ContainerView.vue';
import { getCookie } from '@/utils/cookie';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        title: '扫码登录'
      }
    },
    {
      path: '/',
      name: 'Home',
      component: ContainerView,
      meta: {
        title: '首页'
      }
    }
  ]
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  
  // 检查是否需要登录
  const token = getCookie('Authorization');
  
  // 如果访问的不是登录页面且没有token，则跳转到登录页面
  if (to.path !== '/login' && !token) {
    next('/login');
  } else if (to.path === '/login' && token) {
    // 如果已经登录且访问登录页面，则跳转到首页
    next('/');
  } else {
    next();
  }
});

export default router;
