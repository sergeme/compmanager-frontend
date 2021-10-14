<template>
  <b-card no-body tag="section" class="bg-secondary border-0 mt-1 pr-1 py-0">
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

