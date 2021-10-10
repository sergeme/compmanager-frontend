<template>
  <b-card no-body tag="section" class='border-0 m-0 mt-3'>
      <div class="row">
      <div class="col-12">
        <span class="h5" v-if="!editCoursePressed">{{course.name}}</span>
      </div>

    </div>
    <div class="row">
      <div class="col-12">
       <Locations :courseLocations='course.locations' :locations='locations'
       :departmentId='departmentId' :courseId='course.id' :classes="classes"/>
      </div>
    </div> 
    </b-card>
</template>

<script>
import Locations from './Locations.vue';

export default {
  name: 'Bereich',
  props: {
    course: Object,
    departmentId: Number,
    locations: Array,
    classes: Array
  },
  data() {
    return {
      editCoursePressed:false
    };
  },
  components: {
    Locations
  }
}
</script>