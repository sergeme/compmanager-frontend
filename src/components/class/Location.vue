<template>
  <b-card no-body tag="section" class='border-0 p-1 mt-1 ml-2'>
    <div class="row">
      <div class="col-12">
        <span class="h6 ml-1 mb-0 align-middle">{{location.name}}</span>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <Classes :classes='locationClasses' :locationId='location.id' :courseId='courseId'/>
      </div>
    </div>
  </b-card>
</template>

<script>
import Classes from './Classes.vue';

export default {
  name: 'Standort',
  data() {
    return {
      locationClasses: []
    }
  },
  props: {
    location: Object,
    courseId: Number,
    departmentId: Number,
    classes: Array
  },
  methods: {
    filterData() {
      var locationId = this.location.id;
      var courseId = this.courseId
      this.locationClasses = this.classes.filter(function(classObj) {
        return classObj.locationId == locationId && classObj.courseId == courseId
      });
    }
  },
  mounted() {
    this.filterData();
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  components: {
    Classes
  }
}
</script>