<template>
  <div align="center">
    <b-alert variant="success" dismissible :show="successCountdown">
      Reminder has been successfully created!
    </b-alert>
    <b-form-text id="input-description-help" style="height: 30px">What are you planning to do?</b-form-text>
    <div>
      <div class="input-area">
        <b-form-input @keydown.enter.native="newReminder"
                      v-model="description"
                      :state="descriptionState"
                      width="auto"
                      placeholder="Create a new reminder"
                      aria-describedby="input-description-help">
        </b-form-input>
        <b-button variant="primary" @click="newReminder">
          Add
        </b-button>
      </div>
      <div class="warning-area">
        <p class="empty-field-alert" v-if="description.length < 1 && !submitted">Cannot be empty</p>
        <p class="empty-field-alert" v-if="description.length > 255">Must be less than 255 characters</p>
      </div>
      <div class="date-picker-area">
        <el-date-picker v-model="date"
                        type="datetime"
                        :picker-options="pickerOptions"
                        format="dd.MM.yyyy HH:mm"
                        placeholder="Pick a date">
        </el-date-picker>
        <p class="empty-field-alert" v-if="!date && !submitted">Cannot be empty</p>
      </div>
    </div>
  </div>
</template>

<script>
import reminderService from '../services/reminder-service.js';
import dateUtil from '../../../util/date-util';

export default {
  data() {
    return {
      description: "",
      date: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < dateUtil.fromToday();
        }
      },
      submitted: true,
      successCountdown: 0 // The sucess alert will be shown for 5 seconds
    } 
  },
  methods: {
    newReminder() {
      var data = {
        description: this.description.trim(),
        date: this.date
      };

      if(this.descriptionState && this.date) {
        reminderService.create(data)
          .then(response => {
            this.refreshList();
            this.setSuccessCountdown(5); // Success alert will be shown for 5 seconds
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        this.submitted = true;
        this.description = "";
        this.date = null;
      } else {
        this.submitted = false;
      }
    },
    setSuccessCountdown(seconds) {
      this.successCountdown = seconds;
    },
    refreshList() {
      this.$emit('refresh-list');
    },
  },
  computed: {
    descriptionState() {
      return this.description.length > 0 && this.description.length < 256;
    }
  }
}
</script>

<style>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 170px;
    margin-top: 4px;
  }
  .empty-field-alert {
    color: #dc3545;
    font-size: 80%;
    margin-top: 0.25rem;
    width: 100%;
  }
  .input-area {
    display: inline-flex;
    width: 80%;
  }
</style>
