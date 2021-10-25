<template>
  <div class="row pb-1 px-1 ml-3">
    <div class="col-8 text-right pl-3 pr-0">
      <b-form-input v-model="newClass.name" size="sm"></b-form-input>
    </div>
    <div class="col-4 text-left align-middle pl-1">
      <b-button size="sm" @click="submitChanges()" class="btn btn-block">
        Abschicken
      </b-button>
    </div>
  </div>
</template>

<script>
import { ChangeClassStudent } from 'models/class';
import eventBus from "helpers/eventbus";
export default {
  name: 'ClassEdit',
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
  methods: {
    submitChanges() {
      this.$store.dispatch('schoolClass/updateClass', {
        id: this.classObj.id,
        name: this.classObj.name
      })
      .then(
        () => {
          eventBus.dispatch("classUpdated", this.newClass.id)
        },
        error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }    
  }
}
</script>