import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import DisplayPost from '@/components/DisplayPost.vue'
import PostCreateForm from '@/components/form-components/PostCreateForm.vue'
import ShowPost from '@/components/ShowPost.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: App,
  },
  {
    path: '/displaypost',
    name: 'displaypost',
    component: DisplayPost,
  },
  {
    path: '/createpost',
    name: 'createpost',
    component: PostCreateForm,
  },
  {
    path: '/showpost/:id',
    name: 'showpost',
    component: ShowPost,
    props: true,
  },
]

const router = createRouter({ history: createWebHistory('http:localhost:5173'), routes })
export default router
