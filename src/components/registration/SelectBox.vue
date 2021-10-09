<template>
  <div :class="'form-group col-md-'+col.toString()">
    <label :for="label">{{ label }}</label>
    <select v-model="selectedItem" @change="valueSelected()" class="form-control" name="label">
      <option
        v-for="(item, index) in values"
        :key="index"
        :value="index"
        :selected="index == selectedItem"

      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script>
import eventBus from "helpers/eventbus";

export default {
  components: {},
  data() {
    return {
      index: null,
      selectedItem: this.label
    };
  },
  props: {
    col: Number,
    values: Array,
    label: String
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