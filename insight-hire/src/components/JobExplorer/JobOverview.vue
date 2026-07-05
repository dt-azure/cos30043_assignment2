<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router';

const props = defineProps({
    jobId: {
        type: String,
        required: true
    },
    jobList: {
        type: Array,
        default: () => []
    }
})

const selectedJob = computed(() =>
    props.jobList.find(job => job.job_id === props.jobId)
)
</script>

<template>
    <article v-if="selectedJob" class="job-overview d-flex flex-column justify-content-between p-3">
        <div class="details">
            <p class="section-label mb-2">
                {{ selectedJob.category }}
            </p>

            <h2>{{ selectedJob.job_title }}</h2>

            <p class="text-secondary mb-5">
                {{ selectedJob.company }}
            </p>

            <p class="job-desc">{{ selectedJob.job_description }}</p>
        </div>

        <div class="job-overview-footer mt-auto pt-4">
            <RouterLink
                :to="{
                    name: 'job-details',
                    params: { jobId: selectedJob.job_id }
                }"
                class="job-details-link"
            >
                <span>View Job Details</span>
                <i class="fa-solid fa-arrow-right"></i>
            </RouterLink>
        </div>
    </article>
    <div v-else class="job-not-found">
        <div class="not-found-icon">
            <i class="fa-solid fa-briefcase"></i>
        </div>

        <h2>Job not found</h2>

        <p>
            The selected position could not be found.
        </p>
    </div>
</template>

<style scoped lang="scss" src="./JobOverview.scss">
</style>