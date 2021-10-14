<template>
  <b-card no-body tag="section" class='border-0 m-0 mt-3'>
      <div class="row">
      <div class="col-8 ">
        <span class="h5" v-if="!editProcessTypePressed">{{processType.name}}</span>
        <ProcessTypeEdit v-if="editProcessTypePressed" :processType='processType' :curriculumId="curriculumId"/>
      </div>
      <div class="col-4 text-right align-items-center">
        <b-button-group>
          <b-button v-show="!editProcessTypePressed" size="sm" class="text-left" v-on:click="toggle()">
            <font-awesome-icon icon="edit"/> bearbeiten
          </b-button>
        <ProcessTypeRemove :processTypeId='processType.id' :curriculumId="curriculumId"/>
        </b-button-group>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
       <Processes :processes='processes' :curriculumId='curriculumId' :processTypeId='processType.id'/>
      </div>
    </div> 
    </b-card>
</template>

<script>
import Processes from 'components/curriculum/process/Processes.vue';
import ProcessTypeRemove from './ProcessTypeRemove.vue';
import ProcessTypeEdit from './ProcessTypeEdit.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Bereich',
  props: {
    processType: Object,
    curriculumId: Number,
    processes: Array
  },
  data() {
    return {
      editProcessTypePressed:false
    };
  },
  components: {
    Processes,
    ProcessTypeEdit,
    ProcessTypeRemove
  },
  methods: {
    toggle() {
      this.editProcessTypePressed = !this.editProcessTypePressed;
    }
  },
  mounted() {
    eventBus.on("editProcessTypeSubmitted", (id) => {
      if(this.processType.id == id) { this.editProcessTypePressed = !this.editProcessTypePressed; }
    });
  },
  beforeDestroy() {
    eventBus.remove("editProcessTypeSubmitted");
  }
}
</script>