<template>
  <b-card v-if="!isFetchingData" no-body tag="main" class="my-3 p-2">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-0 pl-2">Lehrpläne bearbeiten</h3>
      </div>
    </div>
    <Curricula :curricula="curricula" :processes="processes" :processTypes="processTypes"/>
  </b-card>
</template>

<script>
import Curricula from 'components/curriculum/curriculum/Curricula.vue';
export default {
  name: 'LehrplaeneView',
  components: {
    Curricula
  },
  data() {
    return {
      curricula: [],
      processes: [],
      processTypes: [],
      isFetchingData: true
    };
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
  methods: {
    fetchData() {
      this.$store.dispatch('curriculum/getCurricula').then(
        () => {
          this.curricula = this.$store.state.curriculum.curricula;
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )
      this.$store.dispatch('curriculum/getProcessTypes').then(
        () => {
          this.processTypes = this.$store.state.curriculum.processTypes;
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )
      this.$store.dispatch('process/getProcesses').then(
        () => {
          this.processes = this.$store.state.process.processes;
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
