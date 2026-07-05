<script setup>
import JobList from './JobList.vue'
import { ref, onMounted } from 'vue'

const jobList = ref([])
const loading = ref(false)
const loadError = ref('')


async function loadData() {
    loading.value = true
    loadError.value = ''

    try {
        const response = await fetch('/data/jobs.txt')

        if (!response.ok) {
            throw new Error(
                `Failed to load job data: ${response.status} ${response.statusText}`
            )
        }

        const text = await response.text()
        const data = JSON.parse(text)

        if (!Array.isArray(data)) {
            throw new Error('The job data must contain an array.')
        }

        jobList.value = data
    } catch (error) {
        console.error('Unable to load job data:', error)
        loadError.value = error.message
        jobList.value = []
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadData()
})
</script>

<template>
    <section id="job-explorer">
        <div class="container py-5">
            <div class="job-explorer-heading mb-4">
                <p class="section-label mb-2">
                    Career opportunities
                </p>

                <h1 class="section-header mb-2">
                    Job Explorer
                </h1>

                <p class="section-description mb-0">
                    Browse available positions and select a job to view its details.
                </p>
            </div>

            <div class="row g-4 align-items-stretch job-explorer-row">
                <aside class="col-12 col-lg-4">
                    <div class="job-list-panel">
                        <JobList :job-list="jobList" />
                    </div>
                </aside>

                <main class="col-12 col-lg-8">
                    <div class="job-details-panel">
                        <RouterView v-slot="{ Component }">
                            <component
                                :is="Component"
                                :job-list="jobList"
                                class="job-route-content"
                            />
                        </RouterView>
                    </div>
                </main>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss" src="./JobExplorer.scss">
</style>