<template>
  <b-card no-body tag="section" class='bg-secondary mb-4 px-1 py-1'>
    <div class="row">
      <div class="col-12">
        <span class="h5 font-weight-bold text-light pl-1">{{department.name}}</span>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
       <Courses :courses='department.courses' 
       :departmentId='department.id' 
       :locations='locations' 
       :classes="classes"/>
      </div>
    </div> 
    </b-card>
</template>

<script>
import Courses from './Courses.vue';

export default {
  name: 'Bereich',
  props: {
    department: Object,
    locations: Array,
    classes: Array
  },
  components: {
    Courses,
  }
}
</script>