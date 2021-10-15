<template>
  <b-card v-if="!isFetchingData" no-body tag="main" class="my-3 p-2">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-0 pl-2">Neue Klassen erstellen</h3>
      </div>
    </div>
    <div class="row px-2 mt-3">
      <SelectBox :col='4' :values="departments" :label="'Bereich'" name="Bereich" v-validate="'required'" :submitted="submitted" :validationErrors="errors"/>
      <SelectBox :col='4' :values="courses" :label="'Lehrgang'" v-if="departmentSelected" name="Lehrgang" v-validate="'required'" :submitted="submitted" :validationErrors="errors"/>
      <SelectBox :col='4' :values="locations" :label="'Standort'" v-if="courseSelected" name="Standort" v-validate="'required'" :submitted="submitted" :validationErrors="errors"/>
    </div>
    <div v-if="submitted" class="row px-2">
      <div class="col-md-4">
        <div v-if="errors.has('Bereich')" class="alert alert-danger mb-0">
          {{ errors.first('Bereich') }}
        </div>
      </div>
      <div class="col-md-4">
        <div v-if="errors.has('Lehrgang')" class="alert alert-danger mb-0">
          {{ errors.first('Lehrgang') }}
        </div>
      </div>
       <div class="col-md-4">
        <div v-if="errors.has('Standort')" class="alert alert-danger mb-0">
          {{ errors.first('Standort') }}
        </div>
      </div>
    </div>
    <div class="row px-2 mt-3" v-if="locationSelected">
      <div class="col-md-4">
        <label for="label">Startdatum</label>
        <b-form-datepicker 
        value-as-date 
        id="startdate-datepicker" 
        v-model="startDate"
        v-validate="'required'" 
        locale="de"
        name="Startdatum">
        </b-form-datepicker>
      </div>
      <div class="col-md-4">
        <label for="label">Enddatum</label>
        <b-form-datepicker 
        value-as-date 
        id="enddate-datepicker"
        v-validate="'required'" 
        v-model="endDate" 
        locale="de"
        name="Enddatum">
        </b-form-datepicker>
      </div>
      <SelectBox :col='4' :values="curricula" :label="'Lehrplan'" v-if="locationSelected" name="Lehrplan" v-validate="'required'" :submitted="submitted"/>
    </div>
    <div v-if="submitted" class="row px-2">
      <div class="col-md-4">
        <div v-if="errors.has('Startdatum')" class="alert alert-danger mb-0">
          {{ errors.first('Startdatum') }}
        </div>
      </div>
      <div class="col-md-4">
        <div v-if="errors.has('Enddatum')" class="alert alert-danger mb-0">
          {{ errors.first('Enddatum') }}
        </div>
      </div>
       <div class="col-md-4">
        <div v-if="errors.has('Lehrplan')" class="alert alert-danger mb-0">
          {{ errors.first('Lehrplan') }}
        </div>
      </div>
    </div>
    <div class="row px-2 mt-3" v-if="locationSelected">
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
import SelectBox from 'components/shared/SelectBox.vue';
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
      curricula: [],
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
      curriculumId: null,
      departments: [],
      courses: [],
      locations: [],
      classes: "",
      message: '',
      isFetchingData: true,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  async mounted() {
    if(this.loggedIn) {
      var year = this.startDate.getFullYear();
      var month = this.startDate.getMonth();
      var day = this.startDate.getDate();
      this.endDate = new Date(year+2, month, day),
      await this.fetchData();
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
        if (object.value == 'Lehrplan') {
          this.curriculumId = this.curricula[object.index].id;
        }
      });
    }
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch('curriculum/getCurricula').then(
        () => {
          this.curricula = this.$store.state.curriculum.curricula;

        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
          console.log(JSON.stringify(error))
        }
      )
      await this.$store.dispatch('school/getDepartments').then(
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
        'curriculumId': this.curriculumId,
        'locationId': this.locationId,
        'classes': []
      }
      var params = {
        'startDate': this.startDate, 
        'endDate': this.endDate,
        'courseId': this.courseId,
        'curriculumId': this.curriculumId,
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
              params.curriculumId,
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
