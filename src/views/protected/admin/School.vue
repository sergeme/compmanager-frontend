<template>
  <b-card v-if="!isFetchingData" no-body tag="main" class="mt-3 p-2">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-0 pl-2">Schuldaten</h3>
      </div>
    </div>
    <Departments :departments="departments" :locations="locations"/>
  </b-card>
</template>

<script>
import Departments from 'components/school/department/Departments.vue';
export default {
  name: 'Schuldaten',
  components: {
    Departments
  },
  data() {
    return {
      departments: [],
      locations: [],
      isFetchingData: true
    };
  },
  methods: {
    fetchData() {
      this.$store.dispatch('school/getDepartments').then(
        () => {
          this.departments = this.$store.state.school.departments;
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )
      this.$store.dispatch('school/getLocations').then(
        () => {
          this.locations = this.$store.state.school.locations;
          //begin rendering only if all data has been received
          this.isFetchingData = false;
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )
    }
  },
  mounted() {
    if(this.$store.state.auth.status.loggedIn) {
      this.fetchData();
    }
   }
};
</script>


<style scoped>

</style>
