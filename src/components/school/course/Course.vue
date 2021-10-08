<template>
  <b-card no-body tag="section" class='border-0 m-0 mt-3'>
      <div class="row">
      <div class="col-8 ">
        <span class="h5" v-if="!editCoursePressed">{{course.name}}</span>
        <CourseEdit v-if="editCoursePressed" :course='course' :departmentId="departmentId"/>
      </div>
      <div class="col-4 text-right align-items-center">
        <b-button-group>
          <b-button v-show="!editCoursePressed" size="sm" class="text-left" v-on:click="toggle()">
            <font-awesome-icon icon="edit"/> bearbeiten
          </b-button>
        <CourseDelete :course='course' :departmentId="departmentId"/>
        </b-button-group>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
       <Locations :courseLocations='course.locations' :locations='locations'
       :departmentId='departmentId' :courseId='course.id'/>
      </div>
    </div> 
    </b-card>
</template>

<script>
import Locations from 'components/school/location/Locations.vue';
import CourseDelete from './CourseDelete.vue';
import CourseEdit from './CourseEdit.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Bereich',
  props: {
    course: Object,
    departmentId: Number,
    locations: Array
  },
  data() {
    return {
      editCoursePressed:false
    };
  },
  components: {
    Locations,
    CourseEdit,
    CourseDelete
  },
  methods: {
    toggle() {
      this.editCoursePressed = !this.editCoursePressed;
    }
  },
  mounted() {
    eventBus.on("editCourseSubmitted", (id) => {
      if(this.course.id == id) { this.editCoursePressed = !this.editCoursePressed; }
    });
  },
  beforeDestroy() {
    eventBus.remove("editCourseSubmitted");
  }
}
</script>