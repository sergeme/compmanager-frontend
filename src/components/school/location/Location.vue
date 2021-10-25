<template>
  <b-card no-body tag="section" class='border-0 p-1 mt-1'>
      <div class="row">
        <div class="col-8">
          <span class="h6 ml-1 mb-0 align-middle" v-if="!editLocationPressed">{{location.name}}</span>
          <LocationEdit v-if="editLocationPressed" 
          :departmentId='departmentId' 
          :courseId='courseId' :location='location'/>
        </div>
      <div class="col-4 text-right">
        <b-button-group>
          <b-button v-show="!editLocationPressed" size="sm" class="text-left " v-on:click="toggle()">
            <font-awesome-icon icon="edit"/> bearbeiten
          </b-button>
          <LocationRemove :departmentId='departmentId' :courseId='courseId' :location='location'/>
        </b-button-group>
      </div>
    </div>
    </b-card>
</template>

<script>
import LocationRemove from './LocationRemove.vue';
import LocationEdit from './LocationEdit.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Bereich',
  props: {
    location: Object,
    courseId: Number,
    departmentId: Number
  },
  data() {
    return {
      deleteLocationPressed:false,
      editLocationPressed:false
    };
  },
  components: {
    LocationEdit,
    LocationRemove
  },
  methods: {
    toggle() {
      this.editLocationPressed = !this.editLocationPressed;
    }
  },
  mounted() {
    eventBus.on("editLocationSubmitted", (id) => {
      if(this.location.id == id.locationId && this.courseId == id.courseId) { this.editLocationPressed = !this.editLocationPressed; }
    });
  },
  beforeDestroy() {
    eventBus.remove("editLocationSubmitted");
  }
}
</script>