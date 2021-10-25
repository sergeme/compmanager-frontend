<template>
  <b-card no-body tag="section" class="bg-secondary border-0 mt-1 px-1 py-1">
    <div class="row pb-0">
      <div class="col-7">
       <span class="h6 text-light font-weight-bold ml-1 mb-0 align-middle">Standorte</span>
      </div>
      <div class="col-5 text-right">
        <b-button-group>
          <b-button v-show="!newLocationPressed" size="sm" v-on:click="toggle()" class="btn-light">
            <font-awesome-icon icon="plus-circle"/> Standort anlegen
          </b-button>
          <LocationsDropdown :locations="locations" :courseLocations='courseLocations'
          :departmentId='departmentId' :courseId='courseId'/>
          <LocationDeleteDropdown :locations="locations" :departmentId='departmentId' :courseId='courseId'/>
        </b-button-group>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <LocationNew v-if="newLocationPressed" :departmentId='departmentId' :courseId='courseId'/>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <Location v-for="(location, index) in courseLocations" 
        :key='index' :departmentId='departmentId' :courseId='courseId' :location='location'/>
      </div>
    </div>
  </b-card>
</template>

<script>
import Location from './Location.vue'
import LocationNew from './LocationNew.vue';
import LocationsDropdown from './LocationsDropdown.vue';
import LocationDeleteDropdown from './LocationDeleteDropdown.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Bereiche',
  props: {
    courseId: Number,
    departmentId: Number,
    courseLocations: Array,
    locations: Array
  },
  data() {
    return {
      newLocationPressed:false,
    };
  },
  components: {
    Location,
    LocationNew,
    LocationsDropdown,
    LocationDeleteDropdown
  },
  methods: {
    toggle() {
      this.newLocationPressed = !this.newLocationPressed;
    }
  },
  mounted() {
    eventBus.on("newLocationSubmitted", (courseId) => {
      if(this.courseId == courseId) {
        this.toggle();
      }
    });
  },
  beforeDestroy() {
    eventBus.remove("newLocationSubmitted");
  }
}

</script>

<style scoped>

</style>

