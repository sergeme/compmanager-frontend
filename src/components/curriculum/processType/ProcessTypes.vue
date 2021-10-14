<template>
  <b-card no-body tag="section" class="border-0 mt-1 px-1 py-1">
    <div class="row mb-1pb-0">
      <div class="col-7">
        <span class="h6 font-weight-bold text-dark ml-2 mb-0">Prozesstypen</span>
      </div>
      <div class="col-5 text-right">

        <b-button-group>
          <b-button size="sm" v-on:click="toggle()">
          <font-awesome-icon icon="plus-circle"/> Prozesstyp erstellen
        </b-button>
          <ProcessTypeAdd :curriculum='curriculum' :processTypes='processTypes'/>
          <ProcessTypeDelete :curriculumId='curriculum.id' :processTypes='processTypes'/>
        </b-button-group>
      </div>
    </div>
    <div class="row">
      <div class="col-12 pl-4">
        <ProcessTypeNew v-if="newProcessTypePressed" :curriculumId='curriculum.id' :courses='courses'/>
      </div>
    </div>
    <div class="row pb-0">
      <div class="col-12 pl-4">
        <ProcessType v-for="(processType) in curriculum.processTypes" :key='processType.id' :processType='processType'
        :curriculumId='curriculum.id' :processes='processes'/>
      </div>
    </div>
  </b-card>
</template>

<script>
import ProcessType from './ProcessType.vue'
import ProcessTypeNew from './ProcessTypeNew.vue';
import ProcessTypeAdd from './ProcessTypeAdd.vue';
import ProcessTypeDelete from './ProcessTypeDelete.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Lehrgänge',
  props: {
    processTypes: Array,
    curriculum: Object,
    processes: Array,
  },
  data() {
    return {
      newProcessTypePressed:false,
      courses: [],
    };
  },
  components: {
    ProcessType,
    ProcessTypeNew,
    ProcessTypeAdd,
    ProcessTypeDelete
  },
  methods: {
    toggle() {
      this.newProcessTypePressed = !this.newProcessTypePressed;
    }
  },
  mounted() {
    eventBus.on("newProcessTypeSubmitted", (id) => {
      if(this.curriculumId == id) { this.newProcessTypePressed = !this.newProcessTypePressed;}
    });
    this.$store.dispatch('course/getCourses').then(
      () => {
        this.courses = this.$store.state.course.courses;
        //begin rendering only if all data has been received
        this.isFetchingData = false;
      },
      error => {
        this.message = (error.response && error.response.data) || error.message || error.toString();
      }
    )
  },
  beforeDestroy() {
    eventBus.remove("newProcessTypeSubmitted");
  }
}

</script>

<style scoped>

</style>

