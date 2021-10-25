<template>
  <b-card v-if="!isFetchingData && auth.hasRole(roles.student)" no-body tag="main" class="my-3 p-2">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-0 pl-2">Kompetenzdaten exportieren</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12 justify-content-center text-center pt-3">
        <span class="d-block my-2">Hier kannst du deine Kompetenzdaten 
          inklusive dazugehörigem Prozess, Tags und Kommentaren im JSON-Format herunterladen</span>
        <b-button type="button" v-on:click="saveFile()">Daten herunterladen</b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'Datenexport',
  components: {

  },
  data() {
    return {
      competences: [],
      processes: [],
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
      await this.$store.dispatch('competences/getCompetences').then(
        () => {
          this.competences = this.$store.state.competences;
          this.isFetchingData = false;
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )
    },
    saveFile() {
      const data = JSON.stringify(this.competences)
      const blob = new Blob([data], {type: 'application/json'})
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
      a.download = "data.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
}
  }
};
</script>


<style scoped>

.card {
  background-color: #f7f7f7;

}
</style>
