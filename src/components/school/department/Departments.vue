<template>
  <b-card no-body tag="section" class="border-0 mt-1 p-2">
    <div class="row">
      <div class="col-9">
        <h5>Bereiche</h5>
      </div>
      <div class="col-3 text-right pr-3 pb-1">
        <b-button v-show="!newDepartmentPressed" size="sm" v-on:click="toggle()">
          <font-awesome-icon icon="plus-circle"/> Bereich erstellen
        </b-button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <DepartmentNew v-if="newDepartmentPressed"/>
      </div>
    </div>
    <div class="row">
      <div class="col-12 pr-3">
        <Department v-for="(department, index) in departments" :key='index' 
        :department='department' :locations='locations'/>
      </div>
    </div>
  </b-card>
</template>

<script>
import Department from './Department.vue'
import DepartmentNew from './DepartmentNew.vue';
import eventBus from "helpers/eventbus";

export default {
  name: 'Bereiche',
  props: {
    departments: Array,
    locations: Array
  },
  data() {
    return {
      newDepartmentPressed:false,
    };
  },
  components: {
    Department,
    DepartmentNew
  },
  methods: {
    toggle() {
      this.newDepartmentPressed = !this.newDepartmentPressed;
    }
  },
  mounted() {
    eventBus.on("newDepartmentSubmitted", () => {
      this.newDepartmentPressed = !this.newDepartmentPressed;
    });
  },
  beforeDestroy() {
    eventBus.remove("newDepartmentSubmitted");
  }
}

</script>

<style scoped>

</style>

