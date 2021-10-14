<template>
  <div>
    <b-card v-if="!editProcessPressed" no-body tag="section" class='border-0 p-1 mt-1 ml-2'>
      <div class="row">
        <div class="col-8">
          <span class="h6 ml-1 mb-0 align-middle">{{process.name}}</span>
        </div>
        <div class="col-4 text-right">
          <b-button-group>
            <b-button v-show="!editProcessPressed" size="sm" class="text-left" v-on:click="toggle()">
              <font-awesome-icon icon="edit"/> bearbeiten
            </b-button>
            <ProcessDelete :processTypeId='processTypeId' :curriculumId='curriculumId' :process='process'/>
          </b-button-group>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <span style="white-space: pre-line;" v-html='process.content' v-if="!editProcessPressed"/>
        </div>
      </div>
    </b-card>
    <ProcessEdit v-if="editProcessPressed" :processTypeId='processTypeId'
    :curriculumId='curriculumId' :process='process'/>
  </div>
</template>

<script>
import ProcessDelete from './ProcessDelete.vue';
import ProcessEdit from './ProcessEdit.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Prozess',
  props: {
    process: Object,
    curriculumId: Number,
    processTypeId: Number,
  },
  data() {
    return {
      deleteProcessPressed:false,
      editProcessPressed:false
    };
  },
  components: {
    ProcessEdit,
    ProcessDelete
  },
  methods: {
    toggle() {
      this.editProcessPressed = !this.editProcessPressed;
    }
  },
  mounted() {
    eventBus.on("editProcessSubmitted", (obj) => {
      if(this.curriculumId == obj.curriculumId && 
      this.processTypeId == obj.processTypeId && 
      this.process.id == obj.processId) { 
        this.editProcessPressed = !this.editProcessPressed; 
      }
    });
  },
  beforeDestroy() {
    eventBus.remove("editProcessSubmitted");
  }
}
</script>