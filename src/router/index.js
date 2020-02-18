import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// 1. Basic part
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'notfound',
        path: '*',
        component: () => import('@/views/NotFound.vue')
    },
    {
        name: 'about',
        path: '/about',
        component: () => import('@/views/About.vue')
    },
    {   name: 'public-apps',
        path: '/public-apps',
        component: () => import( '@/views/publicApp/PublicApps'),
        children: [
            {   
                name: 'todo',
                path: 'todo',
                component: () => import('@/views/publicApp/TodoView.vue')
            },
            {
                name: 'style',
                path: 'style',
                component: () => import('@/views/publicApp/Style.vue')
            },
            {
                name: 'canvas',
                path: 'canvas',
                component: () => import('@/views/publicApp/Canvas.vue')
            },
            
        ]
    },
    {
        name: 'private-apps',
        path: '/private-apps',
        component: () => import('@/views/privateApp/privateApp.vue'),
        children: [
            {
                name: 'blog',
                path: 'blog',
                component: () => import('@/views/privateApp/Blog.vue')
            },
        ]

    },
    {
        name: 'community',
        path: '/community',
        component: () => import('@/views/Community.vue')
    },
    {
        name: 'docs',
        path: '/docs',
        component: () => import('@/views/Docs.vue')
    },
    
    {
        name: 'sign',
        path: '/sign',
        component: () => import('@/views/SignView.vue')
    },
    {
        name: 'signup',
        path: '/signup',
        component: () => import('@/views/SignUp.vue')
    },
    {
        name: 'user',
        path: '/user',
        component: () => import('@/views/User.vue')
    },
    {
        name: 'development',
        path: '/dev',
        component: () => import('@/views/dev/Dev.vue'),
        beforeEnter: (to, from, next) => {
            store 
            to
            from 
            next()
        },
        children: [
            {
                name: 'editor-quill',
                path: 'edit-quill',
                component: () => import('@/views/dev/EditorQuill.vue')
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  

export default router