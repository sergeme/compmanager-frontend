<template>
  <b-dropdown :disabled="fetchingData || availableLocations.length < 1" right size="sm" variant="light" class="btn-light rounded-right">
    <template #button-content>
      <font-awesome-icon icon="map-marker-alt" />
      hinzufügen
    </template>
    <b-dropdown-item @click="addLocation(item.id)" v-for="(item, index) in availableLocations" :key='index' class='small'>{{item.name}}</b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { NewLocation } from 'models/location';
import eventBus from "helpers/eventbus";
export default {
  data() {
    return {
      message: '',
      fetchingData: true,
      newLocation: new NewLocation(this.courseId, ''),
      availableLocations: new Array() 
    };
  },
  props: {
    courseId: Number,
    departmentId: Number,
    locations: Array,
    courseLocations: Array
  },
  watch: {
    courseLocations() {
      this.refreshAvailableLocations();
    },
    locations() {
      this.refreshAvailableLocations();
    }
  },
  components: {
  },
  methods: {
    addLocation(locationId) {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('school/addCourseLocation', 
          {departmentId: this.departmentId, 
          courseId:this.courseId,
          location: { 
            courseId: this.courseId,
            locationId: locationId}})
          .then(
            () => {
              this.refreshAvailableLocations()
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    },
    refreshAvailableLocations() {
      this.fetchingData = true;
      var courseLocations = this.courseLocations;
      this.availableLocations = this.locations.filter(function(obj) {
        return !courseLocations.some(function(obj2) {
          return obj.id == obj2.id;
        })
      })
      this.fetchingData = false;
    }
  },
  mounted() {
    this.$nextTick(() => {
    this.refreshAvailableLocations()
    })
    eventBus.on("newLocationSubmitted", () => {
      this.refreshAvailableLocations()
    })
    eventBus.on("locationRemoved", obj => {
      console.log(obj)
      this.refreshAvailableLocations()
    })
  },
  beforeDestroy() {
    eventBus.remove("newLocationSubmitted");
  },
}
</script>