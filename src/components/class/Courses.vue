<template>
  <b-card no-body tag="section" class="border-0 mt-1 px-1 py-1">
    <div class="row mb-1pb-0">
      <div class="col-12">
        <span class="h6 font-weight-bold text-dark ml-2 mb-0">Lehrgänge</span>
      </div>
    </div>
    <div class="row pb-0">
      <div class="col-12 pl-4">
        <Course v-for="(course, index) in courses" :key='index' :course='course'
        :departmentId='departmentId' :locations='locations' :classes="classes"/>
      </div>
    </div>
  </b-card>
</template>

<script>
import Course from './Course.vue'

export default {
  name: 'Lehrgänge',
  props: {
    courses: Array,
    departmentId: Number,
    locations: Array,
    classes: Array
  },
  data() {
    return {
      newCoursePressed:false,
    };
  },
  components: {
    Course,
  }
}

</script>
