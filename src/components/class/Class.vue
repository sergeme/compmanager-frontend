<template>
  <div class="row">
    <div class="col-4">
      <span class="h6 ml-2 align-bottom">{{schoolClass.name}}</span>
    </div>
    <div class="col-8 text-right">
      <div class="row mt-0">
        <div class="col-12 text-right">
          <b-button-group class="pr-1 pb-1">
            <b-button size="sm" v-on:click="toggle('addStudent')" class="btn">
              <font-awesome-icon icon="user-plus"/> Student hinzufügen
            </b-button>
            <StudentRemoveDropdown :classObj="classObj"/>
            </b-button-group>
          <b-button-group class="pr-1 pb-1">
            <b-button size="sm" v-on:click="toggle('editClass')" class="btn">
              <font-awesome-icon icon="edit"/> Klasse bearbeiten
            </b-button>
            <ClassDelete :classObj="classObj"/>
          </b-button-group> 
        </div>
      </div>
      <div class="row mt-0">
        <div class="col-12 text-right">
          <StudentAddForm :classObj="classObj" v-if="addStudentspressed"/>
          <ClassEdit :classObj="classObj" v-if="editClassPressed"/> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudentRemoveDropdown from './StudentRemoveDropdown.vue';
import StudentAddForm from './StudentAddForm.vue';
import ClassEdit from './ClassEdit.vue';
import ClassDelete from './ClassDelete.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Klasse',
  data() {
    return {
      addStudentspressed: false,
      changeStudentpressed: false,
      editClassPressed: false,
      classObj: this.schoolClass
    }
  },
  props: {
    locationId: Number,
    courseId: Number,
    schoolClass: Object
  },
  components: {
    StudentRemoveDropdown,
    StudentAddForm,
    ClassEdit,
    ClassDelete
  },
  methods: {
    toggle(value) {
      if(value=="addStudent")
        this.addStudentspressed = !this.addStudentspressed
      if(value=="changeStudent")
        this.changeStudentpressed = !this.changeStudentpressed
      if(value=="editClass")
        this.editClassPressed = !this.editClassPressed
    }
  },
  mounted() {
    eventBus.on("studentAdded", obj => {
      if(obj.id == this.classObj.id) {
        this.addStudentspressed = !this.addStudentspressed
        this.classObj = obj
      }
    })
    eventBus.on("studentRemoved", obj => {
      if(obj.id == this.classObj.id) {
        this.classObj = obj
      }
    })
    eventBus.on("classUpdated", id => {
      if(id == this.classObj.id) {
        this.editClassPressed  = !this.editClassPressed
      }
    })
  },
  beforeDestroy() {
    eventBus.remove("studentAdded");
    eventBus.remove("studentRemoved");
    eventBus.remove("classUpdated");
  }
}
</script>