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
            {
                name: 'chatroom',
                path: 'chatroom',
                component: () => import('@/views/publicApp/RealtimeChatRoom.vue')
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
        name: 'signin',
        path: '/signin',
        component: () => import('@/views/auth/SignIn.vue')
    },
    {
        name: 'signup',
        path: '/signup',
        component: () => import('@/views/auth/SignUp.vue')
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
                name: 'quill',
                path: 'quill',
                component: () => import('@/views/dev/EditorQuill.vue')
            },
            {
                name: 'tiptap',
                path: 'tiptap',
                component: () => import('@/views/dev/EditorTiptap.vue')
            },
            {
                name: 'editorJs',
                path: 'editorJs',
                component: () => import('@/views/dev/EditorJS.vue')
            },
            {
                name: 'testpage',
                path: 'testpage',
                component: () => import('@/views/dev/TestPage.vue')
            },
            {
                name: 'writer',
                path: 'writer',
                component: () => import('@/views/dev/DevWriter.vue')
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