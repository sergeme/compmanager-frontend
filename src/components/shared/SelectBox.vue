<template>
  <div :class="'col-md-'+col.toString()">
    <label :for="label">{{ label }}</label>
    <select v-model="selectedItem" @change="valueSelected()" class="form-control" :name='label'>
      <option
        v-for="(item, index) in values" :key="index" :value="index" :selected="index == selectedItem">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script>
import eventBus from "helpers/eventbus";

export default {
  $_veeValidate: {
    value () {
      return this.selectedItem;
    }
  },
  components: {},
  data() {
    return {
      index: null,
      selectedItem: null,
      selectBoxErrors: this.validationErrors
    }
  },
  props: {
    col: Number,
    values: Array,
    label: String,
    submitted: Boolean
  },
  methods: {
    valueSelected() {
      eventBus.dispatch("valueSelected", {
        value: this.label,
        index: this.selectedItem
      });
    }
  }
};
</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
}
</style>