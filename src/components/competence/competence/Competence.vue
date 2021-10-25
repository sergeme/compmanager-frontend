<template>
  <div>
    <b-card v-if="!editCompetencePressed" no-body tag="section" class='border-1 p-1 mt-0'>
      <div class="row">
        <div class="col-12">
          <Tags :competence='competence' :key="competence.tags.length" :studentTags='tags'/>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <span class="h6 ml-1 mb-0 align-middle font-weight-bold">{{competence.process.name}}</span>
        </div>
        <div class="col-4 text-right">
          <b-button-group>
            <b-button v-show="!editCompetencePressed" size="sm" class="text-left" v-on:click="toggle()">
              <font-awesome-icon icon="edit"/> bearbeiten
            </b-button>
            <CompetenceDelete :competence='competence'/>
          </b-button-group>
        </div>
      </div>
      <div class="row py-2">
        <div class="col-2">
          <div class="mx-1">
          <span style="white-space: pre-line;"><strong>Kontext: </strong></span>
          </div>
        </div>
        <div class="col-10">
          <div class="mx-1">
          <span style="white-space: pre-line;" v-html='competence.context'/>
          </div>
        </div>
      </div>
      <div class="row pb-2">
        <div class="col-2">
          <div class="mx-1">
          <span style="white-space: pre-line;"><strong>Handlung: </strong></span>
          </div>
        </div>
        <div class="col-10">
          <div class="mx-1">
          <span style="white-space: pre-line;" v-html='competence.action'/>
          </div>
        </div>
      </div>
    </b-card>
    <CompetenceEdit v-if="editCompetencePressed" 
    :orderedProcesses='orderedProcesses'
    :competence='competence'
    :processes='processes'/>
  </div>
</template>

<script>
import CompetenceDelete from './CompetenceDelete.vue';
import CompetenceEdit from './CompetenceEdit.vue';
import Tags from 'components/competence/tag/Tags.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Prozess',
  props: {
    competence: Object,
    orderedProcesses: Array,
    processes: Array,
    tags: Array
  },
  data() {
    return {
      deleteCompetencePressed:false,
      editCompetencePressed:false
    };
  },
  components: {
    CompetenceEdit,
    CompetenceDelete,
    Tags
  },
  methods: {
    toggle() {
      this.editCompetencePressed = !this.editCompetencePressed;
    }
  },
  mounted() {
    eventBus.on("editCompetenceSubmitted", (id) => {
      if(this.competence.id == id) {
        this.editCompetencePressed = !this.editCompetencePressed; 
      }
    });
    eventBus.on("editCompetenceCancelled", (id) => {
      if(this.competence.id == id) {
        this.editCompetencePressed = !this.editCompetencePressed; 
      }
    });
  },
  beforeDestroy() {
    eventBus.remove("editCompetenceSubmitted");
    eventBus.remove("editCompetenceCancelled");
  }
}
</script>