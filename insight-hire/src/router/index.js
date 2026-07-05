import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import JobExplorer from '../components/JobExplorer/JobExplorer.vue'
import JobDetails from '../components/JobExplorer/JobDetails.vue'
import JobPlaceholder from '../components/JobExplorer/JobPlaceholder.vue'
import JobOverview from '../components/JobExplorer/JobOverview.vue'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '',
                name: 'home',
                component: JobPlaceholder
            },
            {
                path: 'jobs/:jobId',
                name: 'job-overview',
                component: JobOverview,
                props: true
            },
            {
                path: 'jobs/:jobId/details',
                name: 'job-details',
                component: JobDetails,
                props: true
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router