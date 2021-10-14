<template>
  <b-button size="sm" class="text-left" v-on:click="deleteProcess()">
    <font-awesome-icon icon="trash-alt"/>  löschen
  </b-button>
</template>

<script>
import eventBus from "helpers/eventbus";
export default {
  data() {
    return {
      message: '',
    };
  },
  props: {
    process: Object,
    processTypeId: Number,
    curriculumId: Number
  },
  components: {
  },
  methods: {
    deleteProcess() {
      this.$store.dispatch('process/deleteProcess', this.process.id).then(
        () => {
          eventBus.dispatch("processDeleted", 
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