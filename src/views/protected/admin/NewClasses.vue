<template>
  <b-card v-if="!isFetchingData" no-body tag="main" class="my-3 p-2">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-0 pl-2">Neue Klassen erstellen</h3>
      </div>
    </div>
    <div class="row px-2">
      <SelectBox :col='4' :values="departments" :label="'Bereich'" />
      <SelectBox :col='4' :values="courses" :label="'Lehrgang'" v-if="departmentSelected"/>
      <SelectBox :col='4' :values="locations" :label="'Standort'" v-if="courseSelected"/>
    </div>
    <div class="row px-2" v-if="locationSelected">
      <div class="form-group col-md-4">
        <label for="label">Startdatum</label>
        <b-form-datepicker 
        value-as-date 
        id="startdate-datepicker" 
        v-model="startDate"
        v-validate="'required'" 
        locale="de"
        name="Startdatum">
        </b-form-datepicker>
        <div v-if="submitted && errors.has('Startdatum')" class="alert alert-danger">
          {{ errors.first("Startdatum") }}
        </div>
      </div>
      <div class="form-group col-md-4">
        <label for="label">Enddatum</label>
        <b-form-datepicker 
        value-as-date 
        id="enddate-datepicker"
        v-validate="'required'" 
        v-model="endDate" 
        locale="de"
        name="Enddatum">
        </b-form-datepicker>
        <div v-if="submitted && errors.has('Enddatum')" class="alert alert-danger">
          {{ errors.first("Enddatum") }}
        </div>
      </div>
      <div class="form-group col-md-4">
        <label for="Lehrplan">Lehrplan</label>
        <select v-model="curriculum" class="form-control" name="Lehrplan" v-validate="'required'">
          <option value="1">Lehrplan</option>
        </select>
        <div v-if="submitted && errors.has('Lehrplan')" class="alert alert-danger">
          {{ errors.first("Lehrplan") }}
        </div>
      </div>
    </div>
    <div class="row px-2" v-if="locationSelected">
      <div class="form-group col-md-8">
        <label for="label">Klassennamen</label>
        <b-form-textarea
        id="textarea"
        v-model="classes"
        placeholder="Klassenbezeichnung mit Semikolon getrennt eingeben, bspw. O-TIN-18-S-a; O-TIN-18-T-a"
        rows="3"
        v-validate="'required|min:3'"
        type="text"
        name="Klassennamen"
        ref="classnames"
        max-rows="6"></b-form-textarea>
        <div v-if="submitted && errors.has('Klassennamen')" class="alert alert-danger">
          {{ errors.first("Klassennamen") }}
        </div>
      </div>
      <div class="form-group col-md-4">
        <label for="label">&nbsp;</label>
       <b-button class="btn btn-primary" @click="addClasses" :disabled="sendingData">
         <span v-show="sendingData" class="spinner-border spinner-border-sm"></span>
         <span>Abschicken</span>
         </b-button>
      </div>
    </div>
    <div v-if="message" class="row px-2">
      <div class="form-group col-md-12">
          <div class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
          {{message}}
        </div>
      </div>
    </div>


  </b-card>
</template>

<script>
import SelectBox from 'components/registration/SelectBox.vue';
import eventBus from 'helpers/eventbus';
import { NewClass } from 'models/class';

export default {
  name: 'NeueKlassen',
  components: {
    SelectBox
  },
  data() {
    return {
      curriculum: 1,
      startDate: new Date(),
      endDate: new Date(),
      submitted: false,
      sendingData: false,
      successful: false,
      departmentSelected: false,
      courseSelected: false,
      locationSelected: false,
      departmentId: null,
      courseId: null,
      locationId: null,
      departments: [],
      courses: [],
      locations: [],
      classes: "",
      message: '',
      isFetchingData: true
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if(this.loggedIn) {
      var year = this.startDate.getFullYear();
      var month = this.startDate.getMonth();
      var day = this.startDate.getDate();
      this.endDate = new Date(year+2, month, day),
      this.fetchData();
      eventBus.on('valueSelected', (object) => {
        if (object.value == 'Bereich') {
          this.courses = this.departments[object.index].courses;
          this.departmentSelected = true;
          this.departmentId = this.departments[object.index].id;
        }
        if (object.value == 'Lehrgang') {
          this.locations = this.courses[object.index].locations;
          this.courseSelected = true;
          this.courseId = this.courses[object.index].id;
        }
        if (object.value == 'Standort') {
          this.locationSelected = true;
          this.locationId = this.locations[object.index].id;
        }
      });
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch('school/getDepartments').then(
        () => {
          this.departments = this.$store.state.school.departments;
          //begin rendering only if all data has been received
          this.isFetchingData = false;
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )
    },
    addClasses() {
      this.submitted = true;
      var newClasses = [];
      var payload = {
        'courseId': this.courseId,
        'curriculum': this.curriculum,
        'locationId': this.locationId,
        'classes': []
      }
      var params = {
        'startDate': this.startDate, 
        'endDate': this.endDate,
        'courseId': this.courseId,
        'curriculum': this.curriculum,
        'locationId': this.locationId
      }
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          var classArr = this.classes.split(';');
          classArr.forEach(function (classObj) {
            var newClass = new NewClass(
              classObj.trim(), 
              params.startDate.toISOString(), 
              params.endDate.toISOString(),
              params.courseId,
              params.curriculum,
              params.locationId
              )
            newClasses.push(newClass);  
          })

          payload.classes=newClasses;
          this.sendingData = true;
          this.$store.dispatch("schoolClass/addClasses", payload).then(
            () => {
              this.sendingData = false;
              this.classes ="";
              newClasses = null;
              payload = null;
              this.message ="Klassen erfolgreich erstellt."
              this.submitted = false;
              this.successful = true;
            },
            error => {
              this.sendingData = false;
              this.successful = false;
              this.message = error;
            }
          );
        }
      })
    }
  }
};
</script>


<style scoped>
label {
  display: block;
  margin-top: 10px;
}


.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: auto;
  margin-top: 50px;
}
</style>
