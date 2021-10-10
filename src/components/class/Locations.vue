<template>
  <b-card no-body tag="section" class="bg-secondary border-0 mt-1 px-1 py-1">
    <div class="row pb-0">
      <div class="col-12">
       <span class="h6 text-light font-weight-bold ml-2 mb-0 align-middle">Standorte</span>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <Location v-for="(location, index) in courseLocations" 
        :key='index' :departmentId='departmentId'
        :courseId='courseId' :location='location' 
        :classes="classes"/>
      </div>
    </div>
  </b-card>
</template>

<script>
import Location from './Location.vue';

export default {
  name: 'Standorte',
  props: {
    courseId: Number,
    departmentId: Number,
    courseLocations: Array,
    locations: Array,
    classes: Array
  },
  components: {
    Location
  }
}

</script>

<style scoped>

</style>

