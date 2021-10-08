<template>
  <b-button size="sm" class="text-left btn-light" v-on:click="deleteDepartment()">
    <font-awesome-icon icon="trash-alt"/>  löschen
  </b-button>
</template>

<script>
import { Department } from 'models/department';
export default {
  data() {
    return {
      message: '',
      editDepartment: new Department(this.department.id, this.department.name),
    };
  },
  props: {
    department: Object
  },
  components: {
  },
  methods: {
    deleteDepartment() {
      this.$store.dispatch('school/deleteDepartment', this.department.id).then(
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