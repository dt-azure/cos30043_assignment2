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
        <div class="container-todo py-5">
            <h4 class="section-header text-center mb-5">To Do List</h4>

            <div class="task-input d-flex mb-5 rounded-pill border border-2 border-primary overflow-hidden">
                <div class="d-flex flex-grow-1">
                    <input
                        type="text"
                        name="taskInput"
                        id="taskInput"
                        class="form-control rounded-0 rounded-start-2"
                        aria-describedby="taskInput"
                        v-model="taskInput"
                        placeholder="Enter a new task"
                    />
                </div>
                <button type="button" class="btn btn-primary rounded-0 rounded-end-2 border border-2 border-primary border-end-0" @click="addTask(taskInput)">Add</button>
            </div>

            <div class="task-list">
                <TaskItem v-for="task in taskList" :key="task.id" :task-item="task" @update-priority="updatePriority" @delete-task="deleteTask"/>
            </div>
        </div>
    </section>
</template>