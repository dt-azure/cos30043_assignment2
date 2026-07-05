<script setup>
import { ref } from 'vue'
import TaskItem from './TaskItem.vue';
const taskList = ref([])
const taskInput = ref('')

function addTask() {
    if (taskInput.value === '') {
        return
    }
    taskList.value.push({
        "id": crypto.randomUUID(),
        "text": taskInput.value,
        "priority": ''
    })
    taskInput.value = ''
}

function updatePriority(taskId, priority) {
    const task = taskList.value.find(task => task.id === taskId)
    if (task) {
        task.priority = priority
    }
}

function deleteTask(taskId) {
    taskList.value = taskList.value.filter(task => task.id !== taskId)
}
</script>

<template>
    <section id="to-do-list">
        <div class="container py-5">
            <div class="todo-panel">
                <div class="todolist-heading text-center">
                    <p class="section-label mb-2">
                        Be prepared
                    </p>

                    <h2 class="section-header mb-2">
                        To Do List
                    </h2>

                    <p class="section-description mb-0">
                        Plan your day ahead.
                    </p>
                </div>

                <form class="task-input" @submit.prevent="addTask">
                    <label for="taskInput" class="visually-hidden">
                        New task
                    </label>

                    <input
                        id="taskInput"
                        v-model="taskInput"
                        type="text"
                        name="taskInput"
                        class="form-control"
                        placeholder="Enter a new task"
                        autocomplete="off"
                    >

                    <button type="submit" class="btn add-task-button">
                        <span>Add task</span>
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </form>

                <div v-if="taskList.length" class="task-list">
                    <TaskItem
                        v-for="task in taskList"
                        :key="task.id"
                        :task-item="task"
                        @update-priority="updatePriority"
                        @delete-task="deleteTask"
                    />
                </div>

                <div v-else class="empty-task-list">
                    <span class="empty-task-icon">
                        <i class="fa-regular fa-circle-check"></i>
                    </span>

                    <h3>No tasks yet</h3>

                    <p class="mb-0">
                        Add a task above to start planning your day.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss" src="./ToDoList.scss">
</style>