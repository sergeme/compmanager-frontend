<template>
  <b-button size="sm" class="text-left" v-on:click="deleteLocation()">
    <font-awesome-icon icon="trash-alt"/>  entfernen
  </b-button>
</template>

<script>
import { Location } from 'models/location';
export default {
  data() {
    return {
      message: '',
      editLocation: new Location(this.location.id, this.location.name),
    };
  },
  mounted() {

  },
  props: {
    location: Object,
    courseId: Number,
    departmentId: Number
  },
  components: {
  },
  methods: {
    deleteLocation() {
      this.$store.dispatch('school/deleteCourseLocation', {
        locationId: this.location.id,
        departmentId: this.departmentId,
        courseId: this.courseId
        }).then(
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