<template>
  <b-card v-if="!isFetchingData && auth.hasRole(roles.student)" no-body tag="main" class="my-3 p-2">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-0 pl-2">Meine Kompetenzen</h3>
      </div>
    </div>
    <Competences :competences='competences' 
    :orderedProcesses='orderedProcesses' :processes="processes" :tags="tags"/>
  </b-card>
</template>

<script>
import {StudentClass, OrderedProcessList, Process} from 'models/competence';
import Competences from 'components/competence/competence/Competences.vue';
export default {
  name: 'KompetenzenView',
  components: {
    Competences
  },
  data() {
    return {
      competences: [],
      tags: [],
      processes: [],
      orderedProcesses: [],
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
      this.orderProcesses();
    }
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
    orderProcesses() {
      var studentClasses = [];
      var classes = this.$store.state.auth.user.classes;
      var processes = this.processes;
      classes.forEach(function (classObj){
        let studentClass = new StudentClass(classObj.name, []);
        classObj.curriculum.processTypes.forEach(function (processType) {
          if(processType.courseId == 0 || processType.courseId == classObj.courseId) {
            let orderedProcessList = new OrderedProcessList(processType.name, [])
            let filteredProcesses = processes.filter(function (process){
              return process.processTypeId == processType.id && process.curriculumId == classObj.curriculum.id;
            })
            filteredProcesses.forEach(function (process) {
              let newProcess = new Process(process.id, process.name, process.content);
              orderedProcessList.processes.push(newProcess);
            })
            studentClass.orderedProcesses.push(orderedProcessList);
          }
        })
        studentClasses.push(studentClass)
      })
      this.orderedProcesses = studentClasses;
    }
  }
};
</script>


<style scoped>

.card {
  background-color: #f7f7f7;

}
</style>
