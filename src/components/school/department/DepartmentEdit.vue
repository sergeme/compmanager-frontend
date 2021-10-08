<template>
    <div class="col-8 pl-0">
      <b-input-group size="sm" class="">
        <b-form-input size="sm" 
        name="name" 
        ref="name" 
        v-validate="'required'"
        v-model="editDepartment.name"
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
import { Department } from 'models/department';
import eventBus from "helpers/eventbus";
export default {
  data() {
    return {
      message: '',
      editDepartment: new Department(this.department.id, this.department.name),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.name.focus();
    })
  },
  props: {
    department: Object
  },
  components: {
  },
  methods: {
    submitChanges() {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('school/updateDepartment', this.editDepartment).then(
            () => {
              eventBus.dispatch("editDepartmentSubmitted", this.department.id)
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