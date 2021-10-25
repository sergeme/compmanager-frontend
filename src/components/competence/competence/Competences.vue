<template>
  <b-card no-body tag="section" class="border-0 mt-1 p-2">
    <div class="row">
      <div v-if="competences.length < 1" class="col-9">
        <span class="h5 align-middle">Keine Kompetenzen vorhanden</span>
      </div>
      <div v-if="competences.length > 0" class="col-9">
        <span class="h5 align-middle">Kompetenzen</span>
      </div>
      <div class="col-3 text-right pr-3 pb-1">
        <b-button v-show="!newProcessPressed" size="sm" v-on:click="toggle()">
          <font-awesome-icon icon="plus-circle"/> Kompetenz erstellen
        </b-button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <b-form-tags v-model="values" no-outer-focus class="mb-1">
          <template v-slot="{ tags, inputAttrs, inputHandlers }">
            <div class="d-inline-block py-2">
              <b-form-tag
                v-for="tag in tags"
                pill
                :key="tag"
                @remove="removeTag(tag)"
                size="sm"
                :title="tag"
                variant="primary"
                class="mr-1"
              >{{ tag }}</b-form-tag>
            </div>
            <b-input-group class="m-0">
              <b-form-input
                v-bind="inputAttrs"
                v-on="inputHandlers"
                list="input-list-filter"
                ref="tagfilter"
                placeholder="Nach Tags filtern"
                class="form-control"
              ></b-form-input>
              <datalist id="input-list-filter">
                <option v-for="(availableTag, index) in availableTags" :key="index">
                  {{availableTag.vocable.name}}
                </option>
              </datalist>
            </b-input-group>
          </template>
        </b-form-tags>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <CompetenceNew v-if="newProcessPressed" :orderedProcesses='orderedProcesses'
         :processes='processes'/>
      </div>
    </div>
    <div class="row">
      <div class="col-12 pr-3">
        <Competence v-for="competence in filteredCompetences" :key='competence.id' 
        :competence='competence' 
        :orderedProcesses='orderedProcesses'
        :processes='processes'
        :tags='tags'/>
      </div>
    </div>
  </b-card>
</template>

<script>
import eventBus from "helpers/eventbus";
import Competence from 'components/competence/competence/Competence.vue';
import CompetenceNew from 'components/competence/competence/CompetenceNew.vue';

export default {
  name: 'Kompetenzen',
  props: {
    competences: Array,
    orderedProcesses: Array,
    tags: Array,
    processes: Array
  },
  watch: {
    values() {
      if(this.values.length > 0) {
        this.filterCompetences();
      }
      else {
        this.filteredCompetences = []
        this.filteredCompetences = [...this.competences]
      }
    },
    competences() {
      this.filteredCompetences = []
      this.filteredCompetences = [...this.competences]
      if(this.values.length > 0) {
        this.filterCompetences();
      }
    }
  },
  data() {
    return {
      filteredCompetences: [],
      values: [],
      availableTags: [],
      newProcessPressed:false,
    };
  },
  components: {
    Competence,
    CompetenceNew
  },
  methods: {
    toggle() {
      this.newProcessPressed = !this.newProcessPressed;
    },
    removeTag(tag){
      this.values.splice(
      this.values.findIndex(v => v == tag), 1)
    },
    filterCompetences() {
      var competences = this.competences;
      var values = this.values;
      var newlyFilteredCompetences = [];
      var filteredCompetences = this.filteredCompetences;

      //get competences which have one of the tags to filter by
      competences.forEach(function (competence) {
        competence.tags.forEach(function(tag) {
          if(values.includes(tag.vocable.name)) {
            newlyFilteredCompetences.push(competence);
          }
        })
      })
      
      var uniqueCompetences = [];
      //remove duplicates
      newlyFilteredCompetences.filter(function(item){
        var i = uniqueCompetences.findIndex(x => (x.id == item.id));
        if(i <= -1){
              uniqueCompetences.push(item);
        }
        return null;
      });

      //replace currently displayed competences
      filteredCompetences.splice(0, filteredCompetences.length);
      newlyFilteredCompetences.forEach(function (competence) {
        filteredCompetences.push(competence);
      })
    }
  },
  mounted() {
    eventBus.on("newCompetenceSubmitted", () => {
      this.toggle();
    });
    eventBus.on("newCompetenceCancelled", () => {
      this.toggle();
    });
    this.availableTags = this.tags;
    this.filteredCompetences = [...this.competences];
  
  },
  beforeDestroy() {
    eventBus.remove("newCompetenceSubmitted");
    eventBus.remove("newCompetenceCancelled");
  }
}
</script>

<style scoped>

</style>

