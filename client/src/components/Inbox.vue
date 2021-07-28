<template>
  <div>
    <add-new-reminder @refresh-list="refreshList"></add-new-reminder>
    <reminders-list  ref="remindersList" :done="false" :snoozed="false"></reminders-list>
  </div>
</template>

<script>
import RemindersList from './RemindersList.vue';
import AddNewReminder from './AddNewReminder.vue';

export default {
  components: {
    RemindersList,
    AddNewReminder
  },
  data() {
    return {
      
    } 
  },
  methods: {
    refreshList() {
      this.$refs.remindersList.retrieveReminders(); // Note for myself: Vuex is always useful
    }
  }
}
</script>
