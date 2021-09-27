<template>
  <div class="col-md-12">
    <div class="card col-md-6">
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="row">
            <div class="form-group col-md-6">
              <label for="Vorname">Vorname</label>
              <input
                v-model="user.firstName"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="Vorname"
              />
              <div
                v-if="submitted && errors.has('Vorname')"
                class="alert-danger"
              >{{errors.first('Vorname')}}</div>
            </div>
            <div class="form-group col-md-6">
              <label for="Nachname">Nachname</label>
              <input
                v-model="user.lastName"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="Nachname"
              />
              <div
                v-if="submitted && errors.has('Nachname')"
                class="alert-danger"
              >{{errors.first('Nachname')}}</div>
            </div>
          </div>
          <div class="form-group">
            <label for="E-Mail">E-Mail</label>
            <input
              v-model="user.email"
              v-validate="'required|email|domain|max:50'"
              type="email"
              class="form-control"
              name="E-Mail"
            />
            <div
              v-if="submitted && errors.has('E-Mail')"
              class="alert-danger"
            >{{errors.first('E-Mail')}}</div>
          </div>
          <div class="row">
          <div class="form-group col-md-6">
            <label for="Passwort">Passwort</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="Passwort"
              ref="Passwort"
            />
            <div
              v-if="submitted && errors.has('Passwort')"
              class="alert-danger"
            >{{errors.first('Passwort')}}</div>
          </div>
          <div class="form-group col-md-6">
            <label for="Passwortconfirmation">Passwort wiederholen</label>
            <input
              v-model="user.confirmPassword"
              v-validate="'required|min:6|max:40|confirmed:Passwort'"
              data-vv-as="Passwort"
              type="password"
              class="form-control"
              name="Passwortconfirmation"
            />
            <div
              v-if="submitted && errors.has('Passwortconfirmation')"
              class="alert-danger"
            >{{errors.first('Passwortconfirmation')}}</div>
          </div>
          </div>
          <div class="row">
          <div class="form-group col-md-6 my-3">
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
import User from '../../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', '', '', true),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
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
