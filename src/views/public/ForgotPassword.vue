<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div class="row">
        <div class="form-group col-md-12">
          <h5 class="text-sm-center">Passwort vergessen</h5>
        </div>
      </div>
      <div v-if="!successful">
        <form name="form" @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">E-Mail</label>
            <div v-if="submitted && errors.has('E-Mail')" class="alert alert-danger">{{errors.first('E-Mail')}}</div>
              <input
              v-model="email"
              v-validate="'required|email|domain|max:50'"
              type="text"
              class="form-control"
              name="E-Mail"
              /> 
          </div>
          <div class="form-group my-3">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Abschicken</span>
            </button>
          </div>
          <div class="row">
            <div class="form-group col-md-12 text-sm-center">
              <b-link to="/login" class="text-dark small">Zurück zum Login</b-link>
            </div>
          </div>
        </form>
      </div>
      <div v-if="message" class="row">
        <div class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
          {{message}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PasswortVergessen',
  data() {
    return {
      email: '',
      successful: false,
      submitted: false,
      loading: false,
      message: '',
      errors: this.$validator.errors
    };
  },
  computed: {
  },

  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.submitted=true
      this.loading=true;
      this.$validator.validateAll().then(isValid => {

        if (!isValid) {
          this.loading=false;
          return;
        }
        if (this.email) {
          
          this.$store.dispatch('auth/forgotPassword', this.email).then(
            data => {
              this.successful = true;
              this.loading = false;
              this.message = data.message;
            },
            error => {
              this.loading = false;
              this.message = error.response.data.message
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
