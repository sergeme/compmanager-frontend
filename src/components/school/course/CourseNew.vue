<template>
  <div class="row">
    <div class="col-6">
      <b-input-group size="sm" prepend="Bezeichnung" class="">
        <b-form-input size="sm" 
        name="name" 
        ref="name" 
        v-model="newCourse.name" 
        v-validate="'required'"
        v-on:keyup.enter="addCourse">
        </b-form-input>
        <b-input-group-append>
          <b-button size="sm" @click="addCourse">Erstellen</b-button>
        </b-input-group-append>
      </b-input-group>
      <div v-if="errors.has('name')" class="alert-danger px-1 py-0" role="alert">
        Bitte Bezeichnung eingeben
      </div>
    </div>
  </div>
</template>

<script>
import { NewCourse } from 'models/course';
import eventBus from "helpers/eventbus";
export default {
  data() {
    return {
      message: '',
      newCourse: new NewCourse(this.id,''),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.name.focus();
    })
  },
  props: {
    id: Number
  },
  components: {
  },
  methods: {
    addCourse() {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('school/addCourse', this.newCourse).then(
            () => {
              eventBus.dispatch("newCourseSubmitted", this.id);  
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