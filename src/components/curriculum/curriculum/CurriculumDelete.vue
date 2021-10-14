<template>
  <b-button size="sm" class="text-left btn-light" v-on:click="deleteCurriculum()">
    <font-awesome-icon icon="trash-alt"/>  löschen
  </b-button>
</template>

<script>
import { Curriculum } from 'models/curriculum';
export default {
  data() {
    return {
      message: '',
      editCurriculum: new Curriculum(this.curriculum.id, this.curriculum.name),
    };
  },
  props: {
    curriculum: Object
  },
  components: {
  },
  methods: {
    deleteCurriculum() {
      this.$store.dispatch('curriculum/deleteCurriculum', this.curriculum.id).then(
        () => { },
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