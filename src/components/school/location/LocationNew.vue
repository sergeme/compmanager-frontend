<template>
  <div class="row">
    <div class="col-6">
      <b-input-group size="sm" prepend="Bezeichnung" class="">
        <b-form-input size="sm" 
        name="name" 
        ref="name" 
        v-model="newLocation.name" 
        v-validate="'required'"
        v-on:keyup.enter="addLocation">
        </b-form-input>
        <b-input-group-append>
          <b-button size="sm" @click="addLocation">Erstellen</b-button>
        </b-input-group-append>
      </b-input-group>
      <div v-if="errors.has('name')" class="alert-danger px-1 py-0" role="alert">
        Bitte Bezeichnung eingeben
      </div>
    </div>
  </div>
</template>

<script>
import { NewLocation } from 'models/location';
import eventBus from "helpers/eventbus";
export default {
  data() {
    return {
      message: '',
      newLocation: new NewLocation(this.courseId, ''),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.name.focus();
    })
  },
  props: {
    courseId: Number,
    departmentId: Number
  },
  components: {
  },
  methods: {
    addLocation() {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('school/addLocation', {
            departmentId: this.departmentId, 
            courseId: this.courseId,
            location: this.newLocation})
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