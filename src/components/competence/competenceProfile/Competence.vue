<template>
  <div>
    <b-card no-body tag="section" class='border-1 p-1 mt-0'>
      <div class="row">
        <div class="col-12">
          <Tags :competence='competence' :key="competence.tags.length" :studentTags='tags'/>
        </div>
      </div>
      <div class="row pl-1">
        <div class="col-2">
          <b-form-checkbox v-model="competenceSelected" 
          :value='true' 
          :unchecked-value='false' 
          @change="submitValue()"> Auswählen</b-form-checkbox>
        </div>
        <div class="col-10">
          <span class="h6 mb-0 align-middle font-weight-bold">{{competence.process.name}}</span>
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
  </div>
</template>

<script>
import Tags from 'components/competence/competenceProfile/Tags.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Prozess',
  props: {
    competence: Object,
    processes: Array,
    tags: Array
  },
  data() {
    return {
      competenceSelected: false
    };
  },
  components: {
    Tags
  },
  methods: {
    submitValue() {
      var obj = new Object({
        id: this.competence.id,
        selected: this.competenceSelected
      })
      eventBus.dispatch("competenceSelected", obj);
    }
  },
}
</script>