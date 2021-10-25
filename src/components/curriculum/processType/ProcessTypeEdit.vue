<template>
  <div v-if="!isFetchingData">
    <div class="col-9 form-group">
      <b-card no-body tag="section" class="p-1 bg-light">
        <div class="row">
          <div class="col-12 form-group">
            <b-input-group size="sm" prepend="Bezeichnung" class="">
              <b-form-input size="sm" 
              name="name" 
              ref="name" 
              v-model="editProcessType.name" 
              v-validate="'required'"
              v-on:keyup.enter="createProcessType">
              </b-form-input>
            </b-input-group>
            <div v-if="errors.has('name')" class="alert-danger px-1 py-0" role="alert">
              Bitte Bezeichnung eingeben
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 form-group">
            <b-input-group size="sm" prepend="Lehrgang" class="">
              <b-form-select v-model="selectedCourse" size="sm" @change="courseSelected()">
                <option selected :value="0">Allgemein
                </option>
                <option
                  v-for="course in courses" :key="course.id" :value="course.id">
                  {{course.name}} 
                </option>
              </b-form-select>
            </b-input-group>
            <div class="px-1 py-0 small" role="alert">
              Auswählen falls Prozesstyp Lehrgangsspezifisch ist, gilt ansonsten für alle
              dem Lehrplan zugewiesenen Klassen.
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <b-button size="sm" @click="createProcessType">Speichern</b-button>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import eventBus from "helpers/eventbus";
import { ProcessType } from 'models/processType';
export default {
  data() {
    return {
      message: '',
      selectedCourse:this.processType.courseId,
      editProcessType: new ProcessType(this.processType.id, this.processType.name, this.processType.courseId),
      courses: [],
      isFetchingData: true
    };
  },
  async mounted() {
    await this.fetchData();
    this.$nextTick(() => {
      this.$refs.name.focus();
    })
  },
  props: {
    curriculumId: Number,
    processType: Object
  },
  components: {
  },
  methods: {
    createProcessType() {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('curriculum/updateProcessType', {
            editProcessType: this.editProcessType,
            curriculumId: this.curriculumId})
          .then(
            () => {
              eventBus.dispatch("editProcessTypeSubmitted", {
                processTypeId: this.processType.id,
                curriculumId: this.curriculumId});  
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
    },
    courseSelected() {
      this.editProcessType.courseId = this.selectedCourse;
    },
    async fetchData() {
      await this.$store.dispatch('course/getCourses').then(
        () => {
          this.courses = this.$store.state.course.courses;
          this.isFetchingData = false;
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      )
    }
  }
}
</script>