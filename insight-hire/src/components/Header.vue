<script setup>

</script>

<template>
    <header>
        <div class="container-header py-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="logo">
                    <a href="#">
                        <img src="../assets/company-logo.png" alt="Company Logo">
                    </a>
                </div>

                <nav class="navbar navbar-expand-lg">
                    <div class="container-fluid">
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav gap-5">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#job-explorer">Job Explorer</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#application-form">Job Application</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#to-do-list">To-Do List</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss" src="./Header.scss">
</style>