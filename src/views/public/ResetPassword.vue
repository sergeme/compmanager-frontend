<template>
  <div class="col-md-12">
    <div class="card col-md-6">
      <div class="row">
        <div class="form-group col-md-12">
          <h5 class="text-sm-center">Passwort zurücksetzen</h5>
        </div>
      </div>
      <div v-if="!successful">
        <form name="form" @submit.prevent="handleReset">
          <div class="row">
            <div class="form-group col-md-6">
              <label for="Passwort">Passwort</label>
              <input v-model="newPassword.password" v-validate="'required|min:6|max:40'" 
              type="password" class="form-control" name="Passwort" ref="Passwort"/>
              <div v-if="submitted && errors.has('Passwort')" 
              class="alert-danger">{{errors.first('Passwort')}}</div>
            </div>
            <div class="form-group col-md-6">
              <label for="Passwortconfirmation">Passwort wiederholen</label>
              <input
                v-model="newPassword.passwordConfirmation" v-validate="'required|min:6|max:40|confirmed:Passwort'" 
                data-vv-as="Passwort" type="password" 
                class="form-control" name="Passwortconfirmation"/>
              <div
                v-if="submitted && errors.has('Passwortconfirmation')" class="alert-danger">
                {{errors.first('Passwortconfirmation')}}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6 mb-3">
              <button class="btn btn-primary ">Abschicken</button>
            </div>
          </div>
        </form>
      </div>
      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
import { ResetPassword } from 'models/user';

export default {
  name: 'PasswortZuruecksetzen',
  data() {
    return {
      submitted: false,
      successful: false,
      message: '',
      errors: this.$validator.errors,
      newPassword: new ResetPassword(this.$route.params.token, '', ''),

    };
  },
  computed: {
  },
  methods: {
    handleReset() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/resetPassword', this.newPassword).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message = error.response.data.message
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: auto;
  margin-top: 50px;

}

</style>
