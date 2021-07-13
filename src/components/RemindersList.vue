<template>
  <div>
    <ul id="reminders-list">
      <li v-for="reminder in remindersList" :key="reminder.id">
        {{ reminder.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import reminderService from '../services/reminder-service';

export default {
  name: 'reminders-list',
  props: {
    done: Boolean,
    snoozed: Boolean
  },
  data() {
    return {
      remindersList: [],
    }
  },
  methods: {
    retrieveReminders() {
      if(this.done){
        reminderService.getDoneReminders()
        .then(response => {
          this.remindersList = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        return;
      }
      if(this.snoozed){
        reminderService.getSnoozedReminders()
        .then(response => {
          this.remindersList = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        return;
      }
        reminderService.getInboxReminders()
        .then(response => {
          this.remindersList = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveReminders();
  }
}
</script>
