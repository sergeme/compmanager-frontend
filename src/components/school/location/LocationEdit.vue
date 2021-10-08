<template>
    <div class="col-8 pl-0">
      <b-input-group size="sm" class="">
        <b-form-input size="sm" 
        name="name" 
        ref="name" 
        v-validate="'required'"
        v-model="editLocation.name"
        v-on:keyup.enter="submitChanges">
        </b-form-input>
        <b-input-group-append>
          <b-button size="sm" @click="submitChanges">Abschicken</b-button>
        </b-input-group-append>
      </b-input-group>
      <div v-if="errors.has('name')" class="alert-danger px-1 py-0" role="alert">
        Bitte Bezeichnung eingeben
      </div>
    </div>
</template>

<script>
import { Location } from 'models/location';
import eventBus from "helpers/eventbus";
export default {
  data() {
    return {
      message: '',
      editLocation: new Location(this.location.id, this.location.name),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.name.focus();
    })
  },
  props: {
    departmentId: Number,
    courseId: Number,
    location: Object
  },
  components: {
  },
  methods: {
    submitChanges() {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('school/updateLocation', {
            departmentId: this.departmentId, 
            courseId: this.courseId, 
            location: this.editLocation})
            .then(
            () => {
              eventBus.dispatch("editLocationSubmitted", {courseId: this.courseId, locationId: this.location.id})
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
    },
  }
}
</script>