<template>
  <div>
    <h2 align="center">Done</h2>
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
