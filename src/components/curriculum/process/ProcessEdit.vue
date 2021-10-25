<template>
  <b-card no-body tag="main" class='border-0 p-1 mt-1 ml-0'>
    <div class="row">
      <div class="col-8">
        <b-input size="sm" v-model="editedProcess.name" class></b-input>
      </div>
      <div class="col-4 text-right pb-1">
        <b-button-group>
          <b-button size="sm" class="text-left " v-on:click="save()">
            <font-awesome-icon icon="save"/> speichern
          </b-button>
          <ProcessDelete :processTypeId='processTypeId' :curriculumId='curriculumId' :process='process'/>
        </b-button-group>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <b-form-textarea
        id="textarea"
        class="p-1 m-0"
        v-model="editedProcess.content"
        placeholder="Prozessbeschreibung eingeben"
        rows="3"
        v-validate="'required'"
        type="text"
        name="Klassennamen"
        ref="classnames"
        max-rows="6"></b-form-textarea>
      </div>
    </div>
  </b-card>
</template>
<script>
import ProcessDelete from './ProcessDelete.vue';
import {Process} from 'models/process';
import eventBus from "helpers/eventbus";

export default {
  name: 'Bereich',
  props: {
    process: Object,
    curriculumId: Number,
    processTypeId: Number
  },
  data() {
    return {
      deleteProcessPressed:false,
      editedProcess: new Process(this.process.id, this.process.name, this.process.content)
    };
  },
  components: {
    ProcessDelete
  },
  methods: {
    save() {
      this.$store.dispatch('process/updateProcess', this.editedProcess).then(
        () => {
          eventBus.dispatch("editProcessSubmitted", 
          {processTypeId: this.processTypeId, curriculumId: this.curriculumId, processId: this.process.id}); 
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
  }
}
</script>