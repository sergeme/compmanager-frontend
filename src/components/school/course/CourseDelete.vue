<template>
  <b-button size="sm" class="text-left" v-on:click="deleteCourse()">
    <font-awesome-icon icon="trash-alt"/>  löschen
  </b-button>
</template>

<script>
export default {
  mounted() { },
  props: {
    departmentId: Number,
    course: Object
  },
  components: {
  },
  methods: {
    deleteCourse() {

      this.$store.dispatch('school/deleteCourse', {courseId: this.course.id, departmentId: this.departmentId}).then(
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