<template>
  <div>
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