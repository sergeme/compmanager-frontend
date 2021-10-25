<template>
  <b-card no-body tag="main" class='border-1 p-1 mt-1'>
    <div class="row ">
      <div class="col-8">
        <b-form-select v-model="selectedProcess" size="sm" 
        @change="processSelected()" name="Prozess"
        v-validate="'required|min_value:1'">
          <option selected :value="0" disabled>Bitte Prozess auswählen</option>
          <template v-for="item in orderedProcesses">
            <option :key="item.id" :value="item.id" disabled>
              {{ item.name }}
            </option>
            <template v-for="type in item.orderedProcesses">
              <option :key="type.name" disabled>
                &nbsp;{{ type.type }}
              </option>
              <template v-for="process in type.processes">
                <option :key="process.id" :value="process.id" :selected="item.id == selectedProcess">
                  &nbsp;&nbsp;{{ process.name }}
                </option>
              </template>
            </template>
          </template>
        </b-form-select>
      </div>
    </div>
    <div v-if="errors.has('Prozess')" class="row">
      <div class="col-8">
        <div class="alert alert-danger mb-0">
          {{ errors.first('Prozess') }}
        </div>
      </div>
    </div>
    <div v-if="description" class="row">
      <div class="col-12">
        <div class="p-2 small bg-light">
          <span class="text-info" style="white-space: pre-line;" v-html='description'/>
        </div>
      </div>
    </div>
    <div class="row pt-1">
      <div class="col-8">
        <b-form-textarea
        id="textarea"
        class="p-1 m-0"
        v-model="editCompetence.context"
        placeholder="Umfeld beschreiben, bspw: Studium HF, Betrieb mit X Mitarbeitenden"
        rows="3"
        v-validate="'required'"
        type="text"
        name="Umfeld"
        max-rows="6"></b-form-textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <div v-if="errors.has('Umfeld')" class="alert alert-danger mb-0">
          {{ errors.first('Umfeld') }}
        </div>
      </div>
    </div>
    <div class="row pt-1">
      <div class="col-8">
        <b-form-textarea
        id="textarea"
        class="p-1 m-0"
        v-model="editCompetence.action"
        placeholder="Handlung beschreiben, bspw: Als Teamleiter von 4 Mitarbeitenden die Jahresziele mit jedem Mitarbeiter aufgrund der Vorgaben des Abteilungsleiters vereinbart."
        rows="3"
        v-validate="'required'"
        type="text"
        name="Handlung"
        max-rows="6"></b-form-textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <div v-if="errors.has('Handlung')" class="alert alert-danger mb-0">
          {{ errors.first('Handlung') }}
        </div>
      </div>
    </div>
    <div class="row pt-1">
      <div class="col-4 text-left">
        <b-button-group>
          <b-button size="sm" class="text-left " v-on:click="save()">
            <font-awesome-icon icon="save"/> speichern
          </b-button>
          <b-button size="sm" class="text-left " v-on:click="clear()">
            <font-awesome-icon icon="save"/> verwerfen
          </b-button>
        </b-button-group>
      </div>
    </div>
  </b-card>
</template>
<script>
import {EditCompetenceLight} from 'models/competence';
import eventBus from "helpers/eventbus";

export default {
  name: 'NeueKompetenz',
  props: {
    orderedProcesses: Array,
    competence: Object,
    processes: Array
  },
  data() {
    return {
      selectedProcess: this.competence.process.id,
      description: null,
      account: null,
      deleteProcessPressed:false,
      editProcessPressed:false,
      editCompetence: new EditCompetenceLight(0,0,0,this.competence.context,this.competence.action)
    };
  },
  components: {
  },
  methods: {
    save() {
      this.editCompetence.id = this.competence.id;
      this.editCompetence.accountId = this.account;
      this.editCompetence.processId = this.selectedProcess;
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('competences/updateCompetence', this.editCompetence).then(
            () => {
              eventBus.dispatch("editCompetenceSubmitted", this.competence.id); 
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      })
    },
    clear() {
      eventBus.dispatch("editCompetenceCancelled", this.competence.id); 
    },
    processSelected() {
      this.editCompetence.processId = this.selectedProcess;
      this.description = this.processes.find(p => p.id == this.selectedProcess).content;
    },
  },
  mounted() {
    this.account = this.$store.state.auth.user.id;
    this.description = this.processes.find(p => p.id == this.selectedProcess).content;
  }
}
</script>