<template>
  <div>
    <div v-show="!edit"
         @click="edit = true; focusOnArea()">
      <p>
        {{ displayDate }}
      </p>
    </div>
    <div class="date-picker-area">
      <el-date-picker ref="datePicker"
                      v-show="edit"
                      v-model="dateField"
                      type="datetime"
                      :picker-options="pickerOptions"
                      format="dd.MM.yyyy HH:mm"
                      placeholder="Pick a date"
                      :clearable="false"
                      @change="edit = false"
                      @blur="onBlur">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import dateUtil from '../../server/util/date-util.js';

export default {
  data() {
    return {
      dateField: this.date,
      previousDate: this.date,
      edit: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < dateUtil.fromToday();
        }
      },
    }
  },
  props: {
    date: Date
  },
  methods: {
    focusOnArea() {
      this.$nextTick(() => {
        this.$refs.datePicker.focus();
      });
    },
    onBlur() {
      if (this.dateField) {
        this.edit = false;
        this.previousDate = this.dateField;
        this.$emit('edit-date', this.dateField);
        return;
      }
      alert("Date cannot be empty!");
      this.edit = false;
      this.dateField = this.previousDate;
    }
  },
  computed: {
    displayDate() {
      return dateUtil.formatDate(this.dateField);
    }
  },
}
</script>
