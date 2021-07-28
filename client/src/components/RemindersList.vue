<template>
  <div style="margin-top: 30px">
    <div v-if="remindersList.length > 0">
      <b-list-group class="reminders-grid">
        <b-list-group-item class="reminders-item" v-for="reminder in remindersList" :key="reminder.id">
          <reminder :id="reminder.id"
                    :date="reminder.date"
                    :description="reminder.description"
                    :owner="reminder.owner"
                    :done="done"
                    :snoozed="snoozed"
                    @refresh-list="retrieveReminders">
          </reminder>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import Reminder from './Reminder.vue';
import reminderService from '../services/reminder-service.js';

export default {
  components: { Reminder },
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
      reminderService.getAllCategorized(this.done, this.snoozed)
        .then(response => {
          this.remindersList = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveReminders();
  }
}
</script>

<style>
  .title {
    text-align: center;
  }
</style>
