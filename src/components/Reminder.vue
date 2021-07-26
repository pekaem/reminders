<template>
  <div class="list-element">
    <div class="date-column" align="left">
      <editable-date :date="reminderData.date" @edit-date="editDate"></editable-date>
    </div>
    <div class="description-column" align="left">
       <editable-text :text="reminderData.description" @edit-text="editDescription"></editable-text>
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
import EditableText from './EditableText.vue';
import EditableDate from './EditableDate.vue';
import dateUtil from '../../server/util/date-util';

export default {
  components: {
    EditableText,
    EditableDate
  },
  data() {
    return {
      reminderData: {
        id: this.id,
        date: new Date(this.date),
        description: this.description,
        owner: this.owner,
        done: this.done,
        snoozed: this.snoozed
      },
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
    updateReminder() { // It could probably be done in a way where we would GET only the updated reminder and not the whole list again
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
    editDescription(text) { // This function could probably be merged with editDate,
      if(text) {            // but I feel it's more tranparent/readable this way
        this.reminderData.description = text;
        this.updateReminder();
        return;
      }
    },
    editDate(date) {
      if(date) {
        this.reminderData.date = date;
        this.updateReminder();
        return;
      }
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
    width: 17%;
    border-right: 1px solid black;
  }
  .description-column {
    width: 60%;
    margin-left: 6px;
    border-right: 1px solid black;
    word-wrap: break-word;
  }
  .buttons-column {
    width: 22%;
    margin: auto;
  }
</style>
