<template>
  <b-card no-body tag="main" class='border-0 p-1 mt-1'>
    <div class="row">
      <div class="col-8">
        <b-input size="sm" v-model="newProcess.name" class></b-input> 
      </div>
      <div class="col-4 text-right pb-1">
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
    <div class="row">
      <div class="col-12">
        <b-form-textarea
        id="textarea"
        class="p-1 m-0"
        v-model="newProcess.content"
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
import {NewProcess} from 'models/process';
import eventBus from "helpers/eventbus";

export default {
  name: 'NeuerProzess',
  props: {
    curriculumId: Number,
    processTypeId: Number,
  },
  data() {
    return {
      deleteProcessPressed:false,
      editProcessPressed:false,
      newProcess: new NewProcess(this.curriculumId, this.processTypeId, '', '')
    };
  },
  components: {
  },
  methods: {
    save() {
      this.$store.dispatch('process/addProcess', this.newProcess).then(
        () => {
          eventBus.dispatch("newProcessSubmitted", 
          {processTypeId: this.processTypeId, curriculumId: this.curriculumId}); 
        },
        error => {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    clear() {
      eventBus.dispatch("newProcessSubmitted", 
      {processTypeId: this.processTypeId, curriculumId: this.curriculumId}); 
    }
  }
}
</script>