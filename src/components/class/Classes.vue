<template>
  <b-card no-body tag="section" class="border-1 border-dark mt-1 px-1 py-1">
    <div class="row pb-0">
      <div class="col-4">
       <span class="h6 ml-2 align-middle">Klassen:</span>
      </div>
      <div v-if="classes.length>0" class="col-8">
        <Class v-for="(classObj, index) in classes" 
        :key='index' :locationId='locationId' :courseId='courseId' :schoolClass='classObj'/>
      </div>
    </div>
  </b-card>
</template>

<script>
import Class from './Class.vue';

export default {
  name: 'Klassen',
  props: {
    locationId: Number,
    courseId: Number,
    classes: Array
  },
  data() {
    return {
      
    };
  },
  components: {
    Class
  },
  methods: {
    toggle() {
      this.newLocationPressed = !this.newLocationPressed;
    }
  }
}

</script>

<style scoped>

</style>

