<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div class="row">
        <div class="form-group col-md-12">
          <h5 class="text-sm-center">Login</h5>
        </div>
      </div>
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">E-Mail</label>
          <div
            v-if="submitted && errors.has('E-Mail')"
            class="alert alert-danger"
          >
            {{ errors.first("E-Mail") }}
          </div>
          <input
            v-model="user.email"
            v-validate="'required|email|domain|max:50'"
            type="text"
            class="form-control"
            name="E-Mail"
          />
        </div>
        <div class="form-group">
          <label for="password">Passwort</label>
          <div
            v-if="submitted && errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >
            Password is required!
          </div>
          <input
            v-model="user.password"
            v-validate="'required|min:6'"
            type="password"
            class="form-control"
            name="password"
          />
        </div>
        <div class="form-group mt-3">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Anmelden</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
      <div class="row">
        <div class="col-md-12 text-sm-center">
          <b-link to="/forgot-password" class="text-dark small">
            Passwort vergessen
          </b-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { User } from "models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      submitted: false,
      loading: false,
      message: "",
      errors: this.$validator.errors,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.submitted = true;
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.user.email && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/profile");
            },
            error => {
              this.loading = false;
              this.message = error.response.data.message;
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
