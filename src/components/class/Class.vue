<template>
  <div class="row pt-1">
    <div class="col-3">
      <span class="h6 ml-2 align-middle">{{schoolClass.name}}</span>
    </div>
    <div class="col-9 text-right">
      <div class="row">
        <div class="col-12 text-right">
          <b-button-group class="pr-1">
            <b-button size="sm" v-on:click="toggle()" class="btn">
              <font-awesome-icon icon="user-plus"/> Student hinzufügen
            </b-button>
            <StudentRemoveDropdown :classObj="schoolClass"/>
            </b-button-group>
          <b-button-group>
            <b-button size="sm" v-on:click="toggle()" class="btn">
              <font-awesome-icon icon="edit"/> Klasse bearbeiten
            </b-button>
            <b-button size="sm" v-on:click="toggle()" class="btn">
              <font-awesome-icon icon="trash-alt"/> ...löschen
            </b-button>
          </b-button-group> 
        </div>
      </div>
      <StudentAddForm :classObj="classObj" v-if="addStudentspressed"/>
    </div>
  </div>
</template>

<script>
import StudentRemoveDropdown from './StudentRemoveDropdown.vue';
import StudentAddForm from './StudentAddForm.vue';

export default {
  name: 'Klasse',
  data() {
    return {
      addStudentspressed: false
    }
  },
  props: {
    locationId: Number,
    courseId: Number,
    schoolClass: Object
  },
  components: {
    StudentRemoveDropdown,
    StudentAddForm
  },
  methods: {
    toggle() {
      this.addStudentspressed = !this.addStudentspressed;
    }
  },
  mounted() {

  }
}
</script>