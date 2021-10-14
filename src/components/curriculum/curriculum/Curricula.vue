<template>
  <b-card no-body tag="section" class="border-0 mt-1 p-2">
    <div class="row">
      <div class="col-9">
        <h5>Lehrpläne</h5>
      </div>
      <div class="col-3 text-right pr-3 pb-1">
        <b-button v-show="!newCurriculumPressed" size="sm" v-on:click="toggle()">
          <font-awesome-icon icon="plus-circle"/> Lehrplan erstellen
        </b-button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <CurriculumNew v-if="newCurriculumPressed"/>
      </div>
    </div>
    <div class="row">
      <div class="col-12 pr-3">
        <Curriculum v-for="(curriculum, index) in curricula" :key='index' 
        :curriculum='curriculum' :processes='processes' :processTypes='processTypes'/>
      </div>
    </div>
  </b-card>
</template>

<script>
import Curriculum from './Curriculum.vue'
import CurriculumNew from './CurriculumNew.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Lehrplaene',
  props: {
    curricula: Array,
    processes: Array,
    processTypes: Array
  },
  data() {
    return {
      newCurriculumPressed:false,
    };
  },
  components: {
    Curriculum,
    CurriculumNew
  },
  methods: {
    toggle() {
      this.newCurriculumPressed = !this.newCurriculumPressed;
    }
  },
  mounted() {
    eventBus.on("newCurriculumSubmitted", () => {
      this.newCurriculumPressed = !this.newCurriculumPressed;
    });
  },
  beforeDestroy() {
    eventBus.remove("newCurriculumSubmitted");
  }
}

</script>

<style scoped>

</style>

