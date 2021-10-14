<template>
  <div v-if="!fetchData" class="row pb-1 px-1 ml-3">
    <div class="col-8 text-right pl-3 pr-0">
      <b-form-input v-model="value" list="input-list" size="sm"></b-form-input>
      <datalist id="input-list">
        <option v-for="(student, index) in availableStudents" :key="index">
          {{ student.firstName }} {{student.lastName}}, {{student.email}}
        </option>
      </datalist>
    </div>
    <div class="col-4 text-left align-middle pl-1">
      <b-button size="sm" v-on:click="setStudentToAdd()" class="btn btn-block">
        Student hinzufügen
      </b-button>
    </div>
  </div>
</template>

<script>
import { ChangeClassStudent } from 'models/class';
import eventBus from "helpers/eventbus";
export default {
  name: 'StudentAddForm',
  data() {
    return {
      value: '',
      message: '',
      fetchData: true,
      availableStudents: new Array(),
      students: new Array(),
      newClass: this.classObj,
      studentToAdd: new ChangeClassStudent()
    };
  },
  props: {
    classObj: Object,
  },
  components: {
  },
  watch: {
    classObj() {
      this.refreshAvailableStudents();
    }
  },
  methods: {
    setStudentToAdd() {
      var index = this.value.indexOf(',');
      var eMail = this.value.substring(index+1).trim();
      var student = this.students.map(s => s.email).indexOf(eMail)
      this.studentToAdd.id=this.classObj.id;
      this.studentToAdd.studentId=this.students[student].id;
      this.addStudent();
    },
    addStudent() {
      this.$store.dispatch('schoolClass/addClassStudent', {
        id: this.studentToAdd.id,
        studentId: this.studentToAdd.studentId
      })
      .then(
        response => {
          this.newClass = response;
          eventBus.dispatch("studentAdded", this.newClass)
          this.refreshAvailableStudents();
          this.value = '';
        },
        error => {
          console.log(error)
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    refreshAvailableStudents() {
      var classStudents = this.newClass.students;
      this.availableStudents = this.students.filter(function(obj) {
        return !classStudents.some(function(obj2) {
          return obj.id == obj2.id;
        })
      })
    }
    
  },
  mounted() {
    this.$store.dispatch('user/getStudents')
      .then(
        response => {
          this.students = response;
          this.fetchData = false;
          this.refreshAvailableStudents()
        },
        error => {
          console.log(error)
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    eventBus.on("studentRemoved", obj => {

      if(obj.id == this.newClass.id) {
        this.newClass = obj
        this.refreshAvailableStudents()
      }
    })
  },
  beforeDestroy() {
    eventBus.remove("studentRemoved");
  }
}
</script>