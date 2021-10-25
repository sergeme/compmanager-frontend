<template>
  <b-card v-if="!isFetchingData && auth.hasRole(roles.admin)" no-body tag="main" class="my-3 p-2">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-0 pl-2">Schuldaten bearbeiten</h3>
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
  props: {
    auth: Object,
    currentUser: Object,
    roles: Object
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  async mounted() {
    if(this.loggedIn) {
      await this.fetchData();
    }
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch('school/getDepartments').then(
        () => {
          this.departments = this.$store.state.school.departments;
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )
      await this.$store.dispatch('school/getLocations').then(
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
  }
};
</script>


<style scoped>

.card {
  background-color: #f7f7f7;

}
</style>
