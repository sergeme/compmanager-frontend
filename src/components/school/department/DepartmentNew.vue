<template>
  <div class="row py-1">
    <div class="col-6">
      <b-input-group size="sm" prepend="Bezeichnung">
        <b-form-input size="sm" 
        name="name" 
        ref="name" 
        v-model="newDepartment.name" 
        v-validate="'required'"
        v-on:keyup.enter="addDepartment">
        </b-form-input>
        <b-input-group-append>
          <b-button size="sm" @click="addDepartment">Erstellen</b-button>
        </b-input-group-append>
      </b-input-group>
      <div v-if="errors.has('name')" class="alert-danger px-1 py-0" role="alert">
        Bitte Bezeichnung eingeben
      </div>
    </div>
  </div>
</template>

<script>
import { NewDepartment } from 'models/department';
import eventBus from 'helpers/eventbus';
export default {
  data() {
    return {
      message: '',
      newDepartment: new NewDepartment(''),
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
    addDepartment() {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('school/addDepartment', this.newDepartment).then(
            () => {
              eventBus.dispatch("newDepartmentSubmitted");  
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