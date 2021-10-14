<template>
  <div class="row py-1">
    <div class="col-6">
      <b-input-group size="sm" prepend="Bezeichnung">
        <b-form-input size="sm" 
        name="name" 
        ref="name" 
        v-model="newCurriculum.name" 
        v-validate="'required'"
        v-on:keyup.enter="addCurriculum">
        </b-form-input>
        <b-input-group-append>
          <b-button size="sm" @click="addCurriculum">Erstellen</b-button>
        </b-input-group-append>
      </b-input-group>
      <div v-if="errors.has('name')" class="alert-danger px-1 py-0" role="alert">
        Bitte Bezeichnung eingeben
      </div>
    </div>
  </div>
</template>

<script>
import { NewCurriculum } from 'models/curriculum';
import eventBus from 'helpers/eventbus';
export default {
  data() {
    return {
      message: '',
      newCurriculum: new NewCurriculum(''),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.name.focus();
    })
  },
  props: {
  },
  components: {
  },
  methods: {
    addCurriculum() {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('curriculum/addCurriculum', this.newCurriculum).then(
            () => {
              eventBus.dispatch("newCurriculumSubmitted");  
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