<template>
  <div>
    <b-form-textarea ref="textArea"
                     v-model="textField"
                     rows="2"
                     v-show="edit"
                     @blur="onBlur"
                     @keydown.enter.exact.prevent="textField = $event.target.value; edit = false;"
                     @keydown.enter.shift.exact="newline">
    </b-form-textarea>
    <div v-show="!edit"
         @click="edit = true; focusOnArea()">
      <p>
        {{ textField }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textField: this.text,
      previousText: this.text,
      edit: false
    }
  },
  props: {
    text: String
  },
  methods: {
    newline() {
      this.textField = `${this.textField}\n`;
    },
    focusOnArea() {
      this.$nextTick(() => {
        this.$refs.textArea.focus();
      });
    },
    onBlur() {
      this.textField = this.textField.trim();

      if(this.textField) { // Needs a check for whitespaces
        this.edit = false;
        this.previousText = this.textField;
        this.$emit('edit-text', this.textField);
        return;
      }
      alert("Description cannot be empty");
      this.textField = this.previousText;
    }
  }
}
</script>
