<script setup>
import { computed } from 'vue'

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
    props.jobList.find(job => job.job_id === props.jobId) ?? null
)

function formatDate(dateString) {
    if (!dateString) {
        return 'Not specified'
    }

    const date = new Date(`${dateString}T00:00:00`)

    return new Intl.DateTimeFormat('en-AU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date)
}

function scrollToJobPanel() {
    requestAnimationFrame(() => {document.getElementById('job-details-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })})
}
</script>

<template>
    <article v-if="selectedJob" class="job-details py-3 px-4">
        <section class="job-details-header">
            <div>
                <span class="job-category">
                    {{ selectedJob.category }}
                </span>

                <h1 class="job-title">
                    {{ selectedJob.job_title }}
                </h1>

                <p class="job-company">
                    {{ selectedJob.company }}
                </p>
            </div>

            <span class="job-id">
                {{ selectedJob.job_id }}
            </span>
        </section>

        <section class="job-summary-grid">
            <div class="summary-item">
                <span class="summary-icon">
                    <i class="fa-solid fa-location-dot"></i>
                </span>

                <div>
                    <p class="summary-label">Location</p>
                    <p class="summary-value">
                        {{ selectedJob.location }}
                    </p>
                </div>
            </div>

            <div class="summary-item">
                <span class="summary-icon">
                    <i class="fa-solid fa-briefcase"></i>
                </span>

                <div>
                    <p class="summary-label">Employment Type</p>
                    <p class="summary-value">
                        {{ selectedJob.employment_type }}
                    </p>
                </div>
            </div>

            <div class="summary-item">
                <span class="summary-icon">
                    <i class="fa-solid fa-money-bill-wave"></i>
                </span>

                <div>
                    <p class="summary-label">Salary</p>
                    <p class="summary-value">
                        {{ selectedJob.salary_range }}
                    </p>
                </div>
            </div>

            <div class="summary-item">
                <span class="summary-icon">
                    <i class="fa-solid fa-chart-line"></i>
                </span>

                <div>
                    <p class="summary-label">Job Level</p>
                    <p class="summary-value">
                        {{ selectedJob.job_level }}
                    </p>
                </div>
            </div>
        </section>

        <section class="job-section">
            <h2>About The Role</h2>

            <p class="job-description">
                {{ selectedJob.job_description }}
            </p>
        </section>

        <section class="job-section">
            <h2>Required Skills</h2>

            <div class="tag-list">
                <span v-for="skill in selectedJob.required_skills" :key="skill" class="skill-tag">
                    {{ skill }}
                </span>
            </div>
        </section>

        <section class="job-section">
            <h2>Preferred Qualifications</h2>

            <ul class="qualification-list">
                <li v-for="qualification in selectedJob.preferred_qualifications" :key="qualification">
                    <i class="fa-solid fa-check"></i>
                    <span>{{ qualification }}</span>
                </li>
            </ul>
        </section>

        <section class="job-section">
            <h2>Additional Information</h2>

            <dl class="additional-info">
                <div class="info-row">
                    <dt>Supervisor</dt>
                    <dd>{{ selectedJob.supervisor }}</dd>
                </div>

                <div class="info-row">
                    <dt>Positions Available</dt>
                    <dd>{{ selectedJob.positions_available }}</dd>
                </div>

                <div class="info-row">
                    <dt>Application Deadline</dt>
                    <dd>
                        {{ formatDate(selectedJob.application_deadline) }}
                    </dd>
                </div>

                <div class="info-row">
                    <dt>Posted Date</dt>
                    <dd>
                        {{ formatDate(selectedJob.posted_date) }}
                    </dd>
                </div>

                <div class="info-row">
                    <dt>Start Date</dt>
                    <dd>
                        {{ formatDate(selectedJob.start_date) }}
                    </dd>
                </div>
            </dl>
        </section>

        <section v-if="selectedJob.tags?.length" class="job-section job-tags-section">
            <h2>Job Tags</h2>

            <div class="tag-list">
                <span v-for="tag in selectedJob.tags" :key="tag" class="job-tag">
                    #{{ tag }}
                </span>
            </div>
        </section>

        <section class="job-details-footer">
            <RouterLink
                :to="{
                    name: 'job-overview',
                    params: { jobId: selectedJob.job_id }
                }"
                class="back-link"
                @click="scrollToJobPanel"
            >
                <i class="fa-solid fa-arrow-left"></i>
                Back To Overview
            </RouterLink>

            <a href="#application-form" class="apply-button">
                Apply For This Position
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </section>
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

<style scoped lang="scss" src="./JobDetails.scss">
</style>