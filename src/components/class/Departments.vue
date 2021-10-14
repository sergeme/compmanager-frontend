<template>
  <b-card no-body tag="section" class="border-0 mt-1 p-2">
    <div class="row">
      <div class="col-12 pr-3">
        <Department v-for="(department, index) in departments" :key='index' 
        :department='department' :locations='locations' :classes="classes"/>
      </div>
    </div>
  </b-card>
</template>

<script>
import Department from './Department.vue'

export default {
  name: 'BereicheKlassen',
  props: {
    departments: Array,
    locations: Array,
    classes: Array,
  },
  components: {
    Department
  },
  mounted() {
  }
}

</script>
