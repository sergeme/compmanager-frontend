<template>
  <div v-if="!isFetchingData" class="col-md-12">
    <div class="card col-md-6">
      <div class="row">
        <div class="form-group col-md-12">
          <h5 class="text-sm-center">Registrieren</h5>
        </div>
      </div>
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="row">
            <SelectBox :col='6' :values="departments" :label="'Bereich'" :submitted="submitted" />
            <SelectBox :col='6' :values="courses" :label="'Lehrgang'" :submitted="submitted" v-if="departmentSelected"/>
          </div>
          <div class="row" v-if="courseSelected">
            <SelectBox :col='6' :values="locations" :label="'Standort'" :submitted="submitted" v-if="courseSelected"/>
            <SelectBox :col='6' :values="classes" :label="'Klasse'" :submitted="submitted" v-if="locationSelected"/>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label for="Vorname">Vorname</label>
              <input
                v-model="user.firstName"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="Vorname"
              />
              <div v-if="submitted && errors.has('Vorname')" class="alert-danger">
                {{ errors.first('Vorname') }}
              </div>
            </div>
            <div class="col-md-6">
              <label for="Nachname">Nachname</label>
              <input
                v-model="user.lastName"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="Nachname"
              />
              <div v-if="submitted && errors.has('Nachname')" class="alert-danger">
                {{ errors.first('Nachname') }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <label for="E-Mail">E-Mail</label>
              <input
                v-model="user.email"
                v-validate="'required|email|domain|max:50'"
                type="email"
                class="form-control"
                name="E-Mail"
              />
              <div v-if="submitted && errors.has('E-Mail')" class="alert-danger">
                {{ errors.first('E-Mail') }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label for="Passwort">Passwort</label>
              <input
                v-model="user.password"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="Passwort"
                ref="Passwort"
              />
              <div v-if="submitted && errors.has('Passwort')" class="alert-danger">
                {{ errors.first('Passwort') }}
              </div>
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
              <div v-if="submitted && errors.has('Passwortconfirmation')" class="alert-danger">
                {{ errors.first('Passwortconfirmation') }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6 mb-3">
              <button class="btn btn-primary" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Registrieren</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { User } from 'models/user';
import eventBus from 'helpers/eventbus';
import SelectBox from 'components/shared/SelectBox.vue';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', '', '', true, this.classId),
      loading: false,
      isFetchingData: true,
      classId: 0,
      submitted: false,
      successful: false,
      departmentSelected: false,
      courseSelected: false,
      locationSelected: false,
      classSelected: false,
      departments: [],
      courses: [],
      locations: [],
      classes: [],
      message: ''
    };
  },
  components: {
    SelectBox,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    } else {
      this.fetchData();
      eventBus.on('valueSelected', (object) => {
        if (object.value == 'Bereich') {
          this.courses = this.departments[object.index].courses;
          this.departmentSelected = true;
        }
        if (object.value == 'Lehrgang') {
          this.locations = this.courses[object.index].locations;
          this.courseSelected = true;
        }
        if (object.value == 'Standort') {
          this.classes = this.locations[object.index].classes;
          this.locationSelected = true;
        }
        if (object.value == 'Klasse') {
          this.user.classId = this.classes[object.index].id;

        }
      });
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.loading = true;
      this.$validator.validate().then((isValid) => {
        if (!isValid) {
          this.loading = false;
        }
        else {
          this.$store.dispatch('auth/register', this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response && error.response.data) || error.message || error.toString();
                this.successful = false;
                this.loading = false;
            }
          );
        }
      });
    },
    fetchData() {
      this.$store.dispatch('school/getDepartments').then(
        () => {
          this.departments = this.$store.state.school.departments;
          //begin rendering only if all data has been received
          this.isFetchingData = false;
        },
        (error) => {
          this.message =
            (error.response && error.response.data) || error.message || error.toString();
        }
      );
    },
  },
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
