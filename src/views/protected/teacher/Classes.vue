<template>
  <b-card v-if="!isFetchingData && (auth.hasRole(roles.admin) || auth.hasRole(roles.teacher))" no-body tag="main" class="my-3 p-2">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-0 pl-2">Klassenliste</h3>
      </div>
    </div>
    <Departments :departments="departments" :locations="locations" :classes="classes"/>
  </b-card>
</template>

<script>
import Departments from 'components/class/Departments.vue';
export default {
  name: 'Klassen',
  components: {
    Departments
  },
  data() {
    return {
      departments: [],
      locations: [],
      classes: [],
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
  mounted() {
    if(this.loggedIn) {
      this.fetchData();

    }
  },
  beforeDestroy() {
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
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )
      this.$store.dispatch('schoolClass/getClasses', this.payload).then(
        () => {
          this.classes = this.$store.state.schoolClass.classes;
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
label {
  display: block;
  margin-top: 10px;
}


.card {
  background-color: #f7f7f7;
}
</style>
