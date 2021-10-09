<template>
  <b-card v-if="!isFetchingData" no-body tag="main" class="mt-3 p-2">
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
        id="example-datepicker" 
        v-model="startDate" 
        locale="de">
        </b-form-datepicker>
      </div>
      <div class="form-group col-md-4">
        <label for="label">Enddatum</label>
        <b-form-datepicker 
        value-as-date 
        id="example-datepicker" 
        v-model="endDate" 
        locale="de">
        </b-form-datepicker>
      </div>
      <div class="form-group col-md-4">
        <label for="Lehrplan">Lehrplan</label>
        <select v-model="curriculum" class="form-control" name="Lehrplan">
          <option>asd</option>
        </select>
      </div>
    </div>
    <div class="row px-2" v-if="locationSelected">
      <div class="form-group col-md-8">
        <label for="label">Namen</label>
        <b-form-textarea
        id="textarea"
        v-model="classes"
        placeholder="Klassenbezeichnung mit Semikolon getrennt eingeben, bspw. O-TIN-18-S-a; O-TIN-18-T-a"
        rows="3"
        max-rows="6"></b-form-textarea>
      </div>
      <div class="form-group col-md-4">
        <label for="label">&nbsp;</label>
       <button class="btn btn-primary ">Abschicken</button>
      </div>
    </div>
  </b-card>
</template>

<script>
import SelectBox from 'components/registration/SelectBox.vue';
import eventBus from 'helpers/eventbus';

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
      newClassesAmount: null,
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
    }
  }
};
</script>


<style scoped>
label {
  display: block;
  margin-top: 10px;
}
</style>
