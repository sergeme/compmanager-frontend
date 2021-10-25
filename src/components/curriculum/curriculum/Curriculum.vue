<template>
  <b-card no-body tag="section" class='bg-secondary mb-4 px-1 py-1'>
    <div class="row">
      <div class="col-8">
        <span class="h5 font-weight-bold text-light pl-1 align-middle" v-if="!editCurriculumPressed">{{curriculum.name}}</span>
        <CurriculumEdit v-if="editCurriculumPressed" :curriculum='curriculum'/>
      </div>
      <div class="col-4 text-right align-items-center">
        <b-button-group>
          <b-button v-show="!editCurriculumPressed" size="sm" class="text-left btn-light" v-on:click="toggle()">
            <font-awesome-icon icon="edit"/> bearbeiten
          </b-button>
          <CurriculumDelete :curriculum='curriculum'/>
        </b-button-group>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
       <ProcessTypes :processTypes='processTypes' :curriculum='curriculum' :processes='processes'/>
      </div>
    </div> 
    </b-card>
</template>

<script>
import CurriculumEdit from './CurriculumEdit.vue';
import CurriculumDelete from './CurriculumDelete.vue';
import ProcessTypes from '../processType/ProcessTypes.vue';
import eventBus from 'helpers/eventbus';

export default {
  name: 'Lehrplan',
  props: {
    curriculum: Object,
    processes: Array,
    processTypes: Array
  },
  data() {
    return {
      deleteCurriculumPressed:false,
      editCurriculumPressed:false
    };
  },
  components: {
    ProcessTypes,
    CurriculumEdit,
    CurriculumDelete
  },
  methods: {
    toggle() {
      this.editCurriculumPressed = !this.editCurriculumPressed;
    },
  },
  mounted() {
    eventBus.on("editCurriculumSubmitted", (id) => {
      if(this.curriculum.id == id) { this.editCurriculumPressed = !this.editCurriculumPressed; }
    });
  },
  beforeDestroy() {
    eventBus.remove("editCurriculumSubmitted");
  }
}
</script>