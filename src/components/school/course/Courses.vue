<template>
  <b-card no-body tag="section" class="border-0 mt-1 px-1 py-1">
    <div class="row mb-1pb-0">
      <div class="col-9">
        <span class="h6 font-weight-bold text-dark ml-2 mb-0">Lehrgänge</span>
      </div>
      <div class="col-3 text-right">
        <b-button v-show="!newCoursePressed" size="sm" v-on:click="toggle()">
          <font-awesome-icon icon="plus-circle"/> Lehrgang erstellen
        </b-button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 pl-4">
        <CourseNew v-if="newCoursePressed" :id='departmentId'/>
      </div>
    </div>
    <div class="row pb-0">
      <div class="col-12 pl-4">
        <Course v-for="(course, index) in courses" :key='index' :course='course'
        :departmentId='departmentId' :locations='locations'/>
      </div>
    </div>
  </b-card>
</template>

<script>
import Course from './Course.vue'
import CourseNew from './CourseNew.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Lehrgänge',
  props: {
    courses: Array,
    departmentId: Number,
    locations: Array
  },
  data() {
    return {
      newCoursePressed:false,
    };
  },
  components: {
    Course,
    CourseNew
  },
  methods: {
    toggle() {
      this.newCoursePressed = !this.newCoursePressed;
    }
  },
  mounted() {
    eventBus.on("newCourseSubmitted", (id) => {
      if(this.departmentId == id) { this.newCoursePressed = !this.newCoursePressed;}
    });
  },
  beforeDestroy() {
    eventBus.remove("newCourseSubmitted");
  }
}

</script>

<style scoped>

</style>

