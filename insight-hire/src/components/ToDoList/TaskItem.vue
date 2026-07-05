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
  if (props.taskItem.priority === 'Low') {
    return 'low-priority'
  }

  if (props.taskItem.priority === 'High') {
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
  <div
      class="task-item"
      :class="priorityClasses"
  >
      <span class="priority-indicator" aria-hidden="true"></span>

      <p class="task-text mb-0">
          {{ taskItem.text }}
      </p>

      <span class="priority-label">
          {{ taskItem.priority || 'Normal' }}
      </span>

      <div class="task-actions">
          <div class="dropdown">
              <button
                  class="btn task-action-btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
              >
                  Change priority
              </button>

              <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <button type="button" class="dropdown-item" @click="updatePriority('High')">
                      Mark as High Priority
                    </button>
                  </li>
                  <li>
                      <button type="button" class="dropdown-item" @click="updatePriority('Low')">
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

          <button
              type="button"
              class="btn delete-btn"
              @click="deleteTask"
          >
              Delete
          </button>
      </div>
  </div>
</template>

<style scoped lang="scss" src="./TaskItem.scss">
</style>