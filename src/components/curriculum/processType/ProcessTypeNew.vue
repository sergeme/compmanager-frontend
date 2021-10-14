<template>
  <div>
    <div class="col-6 form-group">
  <b-card no-body tag="section" class="p-1 bg-light">
    <div class="row">
      <div class="col-12 form-group">
        <b-input-group size="sm" prepend="Bezeichnung" class="">
          <b-form-input size="sm" 
          name="name" 
          ref="name" 
          v-model="newProcessType.name" 
          v-validate="'required'"
          v-on:keyup.enter="addLocation">
          </b-form-input>
        </b-input-group>
        <div v-if="errors.has('name')" class="alert-danger px-1 py-0" role="alert">
          Bitte Bezeichnung eingeben
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 form-group">
        <b-input-group size="sm" prepend="Lehrgang" class="">
          
        <b-select size="sm"/>
        </b-input-group>
        
        <div class="px-1 py-0 small" role="alert">
          Auswählen falls Prozesstyp Lehrgangsspezifisch ist, gilt ansonsten für alle
          dem Lehrplan zugewiesenen Klassen.
        </div>
        </div>
    </div>
    <div class="row">
      <div class="col-12">
        <b-button size="sm" @click="createProcessType">Erstellen</b-button>
      </div>
    </div>
  </b-card>
  </div>
  </div>
</template>

<script>
import { NewProcessType } from 'models/processType';
import eventBus from "helpers/eventbus";
export default {
  data() {
    return {
      message: '',
      newProcessType: new NewProcessType(this.curriculumId, ''),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.name.focus();
    })
  },
  props: {
    curriculumId: Number
  },
  components: {
  },
  methods: {
    createProcessType() {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('curriculum/createProcessType', this.newProcessType)
          .then(
            () => {
              eventBus.dispatch("newLocationSubmitted", this.courseId);  
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
      });
    }
  }
}
</script>