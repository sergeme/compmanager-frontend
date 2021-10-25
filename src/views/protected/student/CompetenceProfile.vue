<template>
  <b-card v-if="!isFetchingData && auth.hasRole(roles.student)" no-body tag="main" class="my-3 p-2">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-0 pl-2">Kompetenzprofil erstellen</h3>
      </div>
    </div>
    <Competences :competences='competences' 
    :processes="processes" :tags='tags'/>
    <div class="row">
      <div class="col-12 justify-content-center text-center pt-3">
        <span class="d-block my-2">Wähle aus deinen Kompetenzen aus und klicke auf den Button, um daraus ein Kompetenzprofil zu erstellen</span>
        <b-button type="button" v-on:click="saveFile()">Datei herunterladen</b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
import Competences from 'components/competence/competenceProfile/Competences.vue';
import CompetenceService from 'services/competence.service';
import {CompetenceProfileRequest} from 'models/competence';
import eventBus from "helpers/eventbus";
export default {
  name: 'Kompetenzprofil',
  components: {
    Competences
  },
  data() {
    return {
      competences: [],
      selectedCompetences: [],
      processes: [],
      isFetchingData: true,
      fileArr: new Uint8Array()
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

    eventBus.on("competenceSelected", (obj) => {
      obj.selected==true ? this.selectedCompetences.push(obj.id) : 
      this.selectedCompetences.splice(this.selectedCompetences.findIndex(sc => sc == obj.id),1);
    });
    
  },
  beforeDestroy() {
    eventBus.remove("competenceSelected");
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch('competences/getCompetences').then(
        () => {
          this.competences = this.$store.state.competences;
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )
      await this.$store.dispatch('process/getProcesses').then(
        () => {
          this.processes = this.$store.state.process.processes;
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )
      await this.$store.dispatch('tags/getTags').then(
        tags => {
          this.tags = tags;
          this.isFetchingData = false;
        },
        error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    base64ToArrayBuffer(base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
          var ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }
        return bytes;
    },
    async saveFile() {
      const competenceProfileRequest = new CompetenceProfileRequest(this.selectedCompetences);
      await CompetenceService.getCompetenceProfile(competenceProfileRequest).then(
        response => {
          this.fileArr = this.base64ToArrayBuffer(response);
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )

      const blob = new Blob([this.fileArr], {type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"});
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
      a.download = "Kompetenzprofil.docx";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', a.download, a.href].join(':');
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
