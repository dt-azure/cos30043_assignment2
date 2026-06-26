import { createRouter, createWebHistory } from 'vue-router'
import JobList from '../components/JobExplorer/JobList.vue'


const routes = [
    { path: '/', component: JobList },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router