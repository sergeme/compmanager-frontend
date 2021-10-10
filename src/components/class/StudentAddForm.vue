<template>
  <div class="row py-2 ml-3">
    <div class="col-8 text-right pl-3 pr-0">
      <b-form-input v-model="value" list="input-list" size="sm"></b-form-input>
      <datalist id="input-list">
        <option v-for="(student, index) in students" :key="index">
          {{ student.firstName }} {{student.lastName}}, {{student.email}}
        </option>
      </datalist>
    </div>
    <div class="col-4 text-left align-middle pl-1">
      <b-button size="sm" v-on:click="addStudent()" class="btn btn-block">
        {{value}}
          Student hinzufügen
      </b-button>
    </div>
  </div>
</template>

<script>
import { ChangeClassStudent } from 'models/class';
export default {
  name: 'StudentRemoveDropdown',
  data() {
    return {
      value: '',
      message: '',
      availableLocations: new Array(),
      students: new Array(),
      newClass: this.classObj,
      studentToRemove: new ChangeClassStudent()
    };
  },
  props: {
    classObj: Object,
  },
  components: {
  },
  methods: {
    setStudentToRemove(item) {
      this.studentToRemove.id=this.classObj.id;
      this.studentToRemove.studentId=item.id;
      this.studentToRemove.firstName=item.firstName;
      this.studentToRemove.lastName=item.lastName;
    },
    addStudent() {
      this.$store.dispatch('schoolClass/removeClassStudent', {
        id: this.studentToRemove.id,
        studentId: this.studentToRemove.studentId
      })
      .then(
        response => {
          this.newClass = response;
        },
        error => {
          console.log(error)
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  },
  mounted() {
    this.$store.dispatch('user/getStudents')
      .then(
        response => {
          this.students = response;
        },
        error => {
          console.log(error)
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  }
</script>