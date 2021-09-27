<template>
  <div class="col-md-12">
    <div class="card card-container">
     
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">E-Mail</label>
          <div
                v-if="submitted && errors.has('E-Mail')"
                class="alert alert-danger"
              >{{errors.first('E-Mail')}}</div>
        </div>
          <input
            v-model="user.email"
            v-validate="'required|email|domain|max:50'"
            type="text"
            class="form-control"
            name="E-Mail"
          />
          
        <div class="form-group">
         
          <label for="password">Passwort</label>
           <div
            v-if="submitted && errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Password is required!</div>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          
        </div>
        <div class="form-group my-3">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Anmelden</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from '../../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      submitted: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.submitted = true;
      this.$validator.validateAll().then(isValid => {
        if (isValid && this.user.email && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
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
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
