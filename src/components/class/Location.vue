<template>
  <b-card v-if="!isFetchingData && classes.length>0" no-body tag="section" class='border-0 p-1 mt-1 ml-2'>
    <div class="row">
      <div class="col-12">
        <span class="h6 ml-1 mb-0 align-middle">{{location.name}}</span>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <Classes :classes='classes' :locationId='location.id' :courseId='courseId'/>
      </div>
    </div>
  </b-card>
</template>

<script>
import Classes from './Classes.vue';
import { ClassesByLocationAndCourse } from 'models/class.js';

export default {
  name: 'Standort',
  data() {
    return {
      isFetchingData: true,
      payload: new ClassesByLocationAndCourse(this.location.id, this.courseId),
      classes: []
    }
  },
  props: {
    location: Object,
    courseId: Number,
    departmentId: Number
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  components: {
    Classes
  },
  methods: {
    fetchData() {
      this.$store.dispatch('schoolClass/getClassesByLocationAndCourse', this.payload).then(
        () => {
          this.classes = this.$store.state.schoolClass.courses[this.courseId].locations.find(l => l.id == this.location.id).classes;
          //begin rendering only if all data has been received
          this.isFetchingData = false;
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )
    }
  }
}
</script>