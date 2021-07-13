<template>
  <div>
    <reminders-list :done="true" :snoozed="false"></reminders-list>
  </div>
</template>

<script>
import RemindersList from './RemindersList.vue';

export default {
  components: {
    RemindersList
  }
}
</script>
