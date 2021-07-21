<template>
  <div class="input-field" align="center">
    <b-form-text id="input-description-help" style="height: 30px">What are you planning to do?</b-form-text>
    <div>
      <b-form-input @keydown.enter.native="newReminder"
                    v-model="description"
                    :state="descriptionState"
                    class="w-50"
                    width="auto"
                    placeholder="Create new reminder"
                    aria-describedby="input-description-help">
      </b-form-input>
      <el-date-picker v-model="date"
                      type="datetime"
                      :picker-options="pickerOptions"
                      format="dd.MM.yyyy HH:mm">
      </el-date-picker>
      <b-form-invalid-feedback v-if="description.length < 1">Cannot be empty</b-form-invalid-feedback>
      <b-form-invalid-feedback v-if="description.length > 255">Cannot be longer than 255 characters</b-form-invalid-feedback>
    </div>
  </div>
</template>

<script>
import reminderService from '../services/reminder-service.js';

export default {
  components: {

  },
  data() {
    return {
      description: "",
      date: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
    } 
  },
  methods: {
    newReminder() {
      var data = {
        description: this.description,
        date: this.date
      };

      reminderService.create(data)
        .then(response => {
          this.refreshList();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.$emit('refresh-list');
    }
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
    width: 170px
  }
</style>
