<script setup>
import { useRoute } from 'vue-router'

defineProps({
    jobList: {
        type: Array,
        required: true
    }
})

const route = useRoute()

function isSelectedJob(job) {
    return route.params.jobId === job.job_id
}
</script>

<template>
    <nav class="job-navigation" aria-label="Available jobs">
        <RouterLink
            v-for="job in jobList"
            :key="job.job_id"
            :to="{
                name: 'job-overview',
                params: { jobId: job.job_id }
            }"
            class="job-nav-item"
            :class="{ selected: isSelectedJob(job) }"
        >
            <span class="job-icon" aria-hidden="true">
                <i class="fa-solid fa-briefcase"></i>
            </span>

            <span class="job-nav-content">
                <span class="job-title">
                    {{ job.job_title }}
                </span>

                <span class="job-company">
                    {{ job.company }}
                </span>

                <span class="job-meta">
                    <span>
                        <i class="fa-solid fa-location-dot"></i>
                        {{ job.location }}
                    </span>

                    <span>
                        {{ job.employment_type }}
                    </span>
                </span>
            </span>

            <i
                class="fa-solid fa-chevron-right job-arrow"
                aria-hidden="true"
            ></i>
        </RouterLink>
    </nav>
</template>

<style scoped lang="scss" src="./JobList.scss">
</style>