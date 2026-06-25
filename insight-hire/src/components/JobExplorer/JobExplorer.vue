<script setup>
import JobList from './JobList.vue'
</script>

<template>
    <section id="job-explorer">
        <div class="container">
            <div class="row">
                <div class="job-list col-4">
                    <JobList />
                </div>
                <div class="job-details col-8">
                    <router-view />
                </div>
            </div>
        </div>
    </section>
</template>