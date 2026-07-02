<script setup>
import { ref } from 'vue'
import TaskItem from './ToDoList/TaskItem.vue';

const taskList = ref([])
const taskInput = ref('')
const test1 = ref({
    "text": "test",
    "priority": "low"
})
const test2 = ref({
    "text": "test",
    "priority": "high"
})
const test3 = ref({
    "text": "test",
    "priority": ""
})

function addTask() {
    taskList.value.push({
        "text": taskInput.value,
        "priority": ''
    })
}

function updatePriority(index, priority) {
    taskList.value[index].priority = priority
}

function deleteTask(index) {
    taskList.value.splice(index, 1)
}
</script>

<template>
    <section id="to-do-list">
        <div class="container-todo py-5">
            <h4 class="section-header text-center mb-5">To Do List</h4>

            <div class="task-input d-flex mb-5">
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
                <button type="button" class="btn btn-primary rounded-0 rounded-end-2" @click="addTask(taskInput)">Add</button>
            </div>

            <div class="task-list">
                <TaskItem v-for="(task, index) in taskList" :key="index" :task-item="task" :task-index="index" @change-priority="updatePriority" @delete-task="deleteTask"/>
            </div>
        </div>
    </section>
</template>