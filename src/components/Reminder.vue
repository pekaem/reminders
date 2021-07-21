<template>
  <div class="list-element">
    <div class="date-column" align="left">
      {{ displayDate }}
    </div>
    <div class="description-column" align="left">
       {{ description }}
    </div>
    <div class="buttons-column" align="right">
      <b-button v-if="!snoozed && !done" @click="snoozeReminder" variant="dark">Snooze</b-button>
      <b-button v-if="!done && snoozed" @click="inboxReminder" variant="primary" >Inbox</b-button>
      <b-button v-if="!done" @click="doneReminder" variant="success">Done</b-button>
      <b-button variant="danger" @click="deleteReminder">Remove</b-button>
    </div>
  </div>
</template>

<script>
import reminderService from '../services/reminder-service';
import dateUtil from '../../server/util/date-util';

export default {
  data() {
    return {
      reminderData: {
        id: this.id,
        date: this.date,
        description: this.description,
        owner: this.owner,
        done: this.done,
        snoozed: this.snoozed
      },
      isEditing: false,
      newReminderDescription: ""
    };
  },
  computed: {
    displayDate() {
      return dateUtil.formatDate(this.reminderData.date);
    }
  },
  props: {
    id: Number,
    date: String,
    description: String,
    owner: String,
    done: Boolean,
    snoozed: Boolean
  },
  methods: {
    deleteReminder() {
      reminderService.delete(this.id)
        .then(response => {
          this.refreshList();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateReminder() {
      reminderService.update(this.id, this.reminderData)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    snoozeReminder() {
      this.reminderData.snoozed = true;
      this.reminderData.done = false;
      this.updateReminder();
    },
    doneReminder() {
      this.reminderData.snoozed = false;
      this.reminderData.done = true;
      this.updateReminder();
    },
    inboxReminder() {
      this.reminderData.snoozed = false;
      this.reminderData.done = false;
      this.updateReminder();
    },
    refreshList() {
      this.$emit('refresh-list');
    }
  }
};
</script>

<style>
  .list-element {
    display: flex;
    margin: auto;
  }
  .date-column {
    width: 8%;
    border-right: 1px solid black;
  }
  .description-column {
    width: 69%;
    margin-left: 6px;
    border-right: 1px solid black;
    word-wrap: break-word;
  }
  .buttons-column {
    width: 22%;
    margin: auto;
  }
</style>
