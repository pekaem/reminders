<template>
  <div>
    <h2 align="center">Snoozed</h2>
    <reminders-list :done="false" :snoozed="true"></reminders-list>
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