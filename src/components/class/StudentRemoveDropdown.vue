<template>
  <b-dropdown :disabled="newClass.students.length<=0" right size="sm" variant="secondary" class="rounded-right">
    <b-modal :id='"modal-"+newClass.id' title="Student entfernen?" @ok='removeStudent()'>
      Bist du sicher, dass du den Studenten <strong>{{studentToRemove.firstName}} {{studentToRemove.lastName}}</strong> aus der Klasse {{newClass.name}} entfernen willst? 
    </b-modal>
    <template #button-content>
      <font-awesome-icon icon="user-minus" />
      ...entfernen
    </template>
    <b-dropdown-item v-for="(item, index) in newClass.students" :key='index' 
    class='small' v-b-modal="'modal-'+newClass.id" 
    @click='setStudentToRemove(item)'>{{item.firstName}} {{item.lastName}}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { ChangeClassStudent } from 'models/class';
import eventBus from "helpers/eventbus";
export default {
  name: 'StudentRemoveDropdown',
  data() {
    return {
      message: '',
      availableLocations: new Array(),
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
    removeStudent() {
      this.$store.dispatch('schoolClass/removeClassStudent', {
        id: this.studentToRemove.id,
        studentId: this.studentToRemove.studentId
      })
      .then(
        response => {
          this.newClass = response;
          eventBus.dispatch("studentRemoved", this.newClass)
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
    eventBus.on("studentAdded", obj => {
      if(obj.id == this.classObj.id) {
        this.newClass = obj
      }
    })
  },
  beforeDestroy() {
    eventBus.remove("studentAdded");
  }
}
</script>