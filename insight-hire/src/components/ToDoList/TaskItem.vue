<script setup>
import { computed } from 'vue'

const props = defineProps({
  taskItem: {
    type: Object,
    required: true
  },
  taskIndex: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['change-priority', 'delete-task'])

const priorityClasses = computed(() => {
  if (props.taskItem.priority === 'low') {
    return 'low-priority border-dark bg-warning'
  }

  if (props.taskItem.priority === 'high') {
    return 'high-priority border-danger bg-danger'
  }

  return 'no-priority border-black'
})

function changePriority(priority) {
  emit('change-priority', props.taskIndex, priority)
}

function deleteTask() {
  emit('delete-task', props.taskIndex)
}
</script>

<template>
    <div class="task-item rounded-pill border border-dark row bg-warning ps-4 mb-3 mx-0" :class="priorityClasses">
        <p class="col-8 overflow-hidden d-flex align-items-center mb-0">{{ taskItem.text }}</p>
        <div class="task-btn-field col-4 d-flex align-items-center justify-content-end pe-0">
            <div class="dropdown">
                <button class="btn btn-outline-danger dropdown-toggle rounded-0 border-top-0 border-bottom-0 border-end-0 bg-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Change Priority
                </button>
                <ul class="dropdown-menu">
                    <li>
                        <button type="button" class="dropdown-item" @click="changePriority('low')">Mark as Low Priority</button>
                    </li>
                    <li>
                        <button type="button" class="dropdown-item" @click="changePriority('high')">Mark as High Priority</button>
                    </li>
                    <li>
                        <button type="button" class="dropdown-item" @click="changePriority('')">Remove Priority</button>
                    </li>
                </ul>
            </div>
            <button type="button" class="btn btn-outline-danger rounded-end-pill border-top-0 border-bottom-0 border-end-0 bg-light" @click="deleteTask">Delete</button>
        </div>
    </div>
</template>