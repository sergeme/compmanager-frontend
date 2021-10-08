<template>
  <div class="col-md-12">
    <div class="card col-md-6">
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
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
            <button class="btn btn-primary ">Registrieren</button>
          </div>
          </div>
        </div>
      </form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Passwort zurücksetzen',
  data() {
    return {
      newPassword: new {password: '', passwordConfirmation: ''},
      submitted: false,
      successful: false,
      message: '',
      errors: this.$validator.errors,
      token: ''
    };
  },
  computed: {

  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
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
