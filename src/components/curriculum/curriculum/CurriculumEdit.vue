<template>
    <div class="col-8 pl-0">
      <b-input-group size="sm" class="">
        <b-form-input size="sm" 
        name="name" 
        ref="name" 
        v-validate="'required'"
        v-model="editCurriculum.name"
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
import { Curriculum } from 'models/curriculum';
import eventBus from "helpers/eventbus";
export default {
  data() {
    return {
      message: '',
      editCurriculum: new Curriculum(this.curriculum.id, this.curriculum.name),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.name.focus();
    })
  },
  props: {
    curriculum: Object
  },
  components: {
  },
  methods: {
    submitChanges() {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('curriculum/updateCurriculum', this.editCurriculum).then(
            () => {
              eventBus.dispatch("editCurriculumSubmitted", this.curriculum.id)
            },
            error => {
              console.log(error)
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