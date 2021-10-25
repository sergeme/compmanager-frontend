<template>
  <b-button size="sm" class="text-left" v-on:click="deleteCompetence()">
    <font-awesome-icon icon="trash-alt"/>  löschen
  </b-button>
</template>

<script>
import {RemoveCompetence} from 'models/competence';
export default {
  data() {
    return {
      message: '',
      removeCompetence: new RemoveCompetence(0,0)
    };
  },
  props: {
    competence: Object
  },
  components: {
  },
  methods: {
    deleteCompetence() {
      this.$store.dispatch('competences/deleteCompetence', this.removeCompetence).then(
        () => { },
        error => {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
  mounted() {
    this.removeCompetence.accountId = this.$store.state.auth.user.id;
    this.removeCompetence.competenceId = this.competence.id;
  }
}
</script>