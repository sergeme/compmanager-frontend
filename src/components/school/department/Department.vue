<template>
  <b-card no-body tag="section" class='bg-secondary mb-4 px-1 py-1'>
    <div class="row">
      <div class="col-8">
        <span class="h5 font-weight-bold text-light pl-1" v-if="!editDepartmentPressed">{{department.name}}</span>
        <DepartmentEdit v-if="editDepartmentPressed" :department='department'/>
      </div>
      <div class="col-4 text-right align-items-center">
        <b-button-group>
          <b-button v-show="!editDepartmentPressed" size="sm" class="text-left btn-light" v-on:click="toggle()">
            <font-awesome-icon icon="edit"/> bearbeiten
          </b-button>
          <DepartmentDelete :department='department'/>
        </b-button-group>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
       <Courses :courses='department.courses' :departmentId='department.id' :locations='locations'/>
      </div>
    </div> 
    </b-card>
</template>

<script>
import DepartmentEdit from './DepartmentEdit.vue';
import DepartmentDelete from './DepartmentDelete.vue';
import Courses from '../course/Courses.vue';
import eventBus from 'helpers/eventbus';

export default {
  name: 'Bereich',
  props: {
    department: Object,
    locations: Array
  },
  data() {
    return {
      deleteDepartmentPressed:false,
      editDepartmentPressed:false
    };
  },
  components: {
    Courses,
    DepartmentEdit,
    DepartmentDelete
  },
  methods: {
    toggle() {
      this.editDepartmentPressed = !this.editDepartmentPressed;
    },
  },
  mounted() {
    eventBus.on("editDepartmentSubmitted", (id) => {
      if(this.department.id == id) { this.editDepartmentPressed = !this.editDepartmentPressed; }
    });
  },
  beforeDestroy() {
    eventBus.remove("editDepartmentSubmitted");
  }
}
</script>