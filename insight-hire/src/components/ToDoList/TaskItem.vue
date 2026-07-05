<script setup>
import { computed } from 'vue'

const props = defineProps({
  taskItem: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-priority', 'delete-task'])

const priorityClasses = computed(() => {
  if (props.taskItem.priority === 'low') {
    return 'low-priority'
  }

  if (props.taskItem.priority === 'high') {
    return 'high-priority'
  }

  return 'no-priority'
})

function updatePriority(priority) {
  emit('update-priority', props.taskItem.id, priority)
}

function deleteTask() {
  emit('delete-task', props.taskItem.id)
}
</script>

<template>
    <div class="task-item d-flex align-items-center mb-3 rounded-pill" :class="priorityClasses">
      <span class="priority-indicator" aria-hidden="true"></span>

      <p class="task-text mb-0">
          {{ taskItem.text }}
      </p>

      <span class="priority-label">
          {{ taskItem.priority || 'Normal' }}
      </span>

      <div class="task-actions d-flex align-items-stretch">
        <div class="dropdown">
          <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown button
          </button>
          <ul class="dropdown-menu">
            <li>
              <button type="button" class="dropdown-item" @click="updatePriority('high')">
                Mark as High Priority
              </button>
            </li>
            <li>
                <button type="button" class="dropdown-item" @click="updatePriority('low')">
                  Mark as Low Priority
                </button>
            </li>
            <li>
                <button type="button" class="dropdown-item" @click="updatePriority('')">
                  Remove Priority
                </button>
            </li>
          </ul>
        </div>
        <button type="button" class="btn delete-btn" @click="deleteTask">
          Delete
        </button>
      </div>
  </div>
</template>

<style scoped lang="scss" src="./TaskItem.scss">
</style>