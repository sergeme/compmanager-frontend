<template>
  <b-card no-body tag="section" class="border-1 border-secondary mt-1 pt-1">
    <div class="row">
      <div class="col-2 pb-1">
       <span class="h6 ml-2 align-bottom">Klassen:</span>
      </div>
      <div v-if="classes.length>0" class="col-10">
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
  }
}

</script>

<style scoped>

</style>

