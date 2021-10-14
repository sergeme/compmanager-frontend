<template>
  <b-button size="sm" class="text-left" v-on:click="removeProcessType()">
    <font-awesome-icon icon="trash-alt"/> entfernen
  </b-button>
</template>

<script>
import eventBus from "helpers/eventbus";
import {ChangeCurriculumProcessType} from 'models/curriculum';
export default {
  data() {
    return {
      message: '',
      processTypeToRemove: new ChangeCurriculumProcessType(this.curriculumId, this.processTypeId),
    };
  },
  mounted() {

  },
  props: {
    processTypeId: Number,
    curriculumId: Number
  },
  components: {
  },
  methods: {
    removeProcessType() {
      this.$store.dispatch('curriculum/removeProcessType', this.processTypeToRemove).then(
        () => {
          eventBus.dispatch("processTypeRemoved", 
          {processTypeId: this.processTypeId, curriculumId: this.curriculumId}); 
        },
        error => {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
  }
}
</script>