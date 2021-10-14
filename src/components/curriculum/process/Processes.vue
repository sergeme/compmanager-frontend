<template>
  <b-card no-body tag="section" class="bg-secondary border-0 mt-1 px-1 py-1">
    <div class="row pb-0">
      <div class="col-7">
       <span class="h6 text-light font-weight-bold ml-2 mb-0 align-middle">Prozesse</span>
      </div>
      <div class="col-5 text-right">
        <b-button-group>
          <b-button :disabled="newProcessPressed" size="sm" v-on:click="toggle()" class="btn-light">
            <font-awesome-icon icon="plus-circle"/> Prozess anlegen
          </b-button>
        </b-button-group>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ProcessNew v-if="newProcessPressed" :curriculumId='curriculumId' :processTypeId='processTypeId'/>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <Process v-for="(process, index) in processTypeProcesses" 
        :key='index' :process='process' :processTypeId='processTypeId' :curriculumId='curriculumId'/>
      </div>
    </div>
  </b-card>
</template>

<script>
import Process from './Process.vue'
import ProcessNew from './ProcessNew.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Prozesse',
  props: {
    curriculumId: Number,
    processTypeId: Number,
    processes: Array
  },
  data() {
    return {
      newProcessPressed:false,
      processTypeProcesses: new Array()
    };
  },
  components: {
    Process,
    ProcessNew,
  },
  methods: {
    toggle() {
      this.newProcessPressed = !this.newProcessPressed;
    },
    getProcessTypeProcesses(curriculumId, processTypeId) {
      this.processTypeProcesses = this.processes.filter(function (process) {
        return (process.curriculumId == curriculumId  && process.processTypeId == processTypeId)
      })
      this.processTypeProcesses.sort((a, b) => {
        return a.id - b.id
      })
    }
  },
  mounted() {
    eventBus.on("newProcessSubmitted", obj => {
      console.log(this.processTypeId + " " + this.curriculumId)
      console.log(obj.processTypeId + " " + obj.curriculumId)
      if(this.processTypeId == obj.processTypeId && this.curriculumId == obj.curriculumId) {
        this.getProcessTypeProcesses(this.curriculumId, this.processTypeId)
        this.toggle();
      }
    });
    eventBus.on("processDeleted", (obj) => {
      if(this.processTypeId == obj.processTypeId && this.curriculumId == obj.curriculumId) {
        this.getProcessTypeProcesses(this.curriculumId, this.processTypeId)
      }
    })
    eventBus.on("editProcessSubmitted", (obj) => {
      if(this.processTypeId == obj.processTypeId && this.curriculumId == obj.curriculumId) {
        this.getProcessTypeProcesses(this.curriculumId, this.processTypeId)
      }
    })
    this.getProcessTypeProcesses(this.curriculumId, this.processTypeId);
  },
  beforeDestroy() {
    eventBus.remove("newProcessSubmitted");
    eventBus.remove("processDeleted");
    eventBus.remove("editProcessSubmitted");
  }
}

</script>

<style scoped>

</style>

