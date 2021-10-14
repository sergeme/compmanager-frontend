<template>
  <b-dropdown :disabled="availableProcessTypes.length < 1" size="sm" variant="secondary" class="btn-light rounded-right">
    <template #button-content>
      <font-awesome-icon icon="file-alt" />
      hinzufügen
    </template>
    <b-dropdown-item v-for="(item) in availableProcessTypes" :key='item.id' class='small' @click='addProcessType(item)'>{{item.name}}</b-dropdown-item>
  </b-dropdown>
</template>

<script>
import eventBus from "helpers/eventbus";
import {ChangeCurriculumProcessType} from 'models/curriculum';
export default {
  data() {
    return {
      message: '',
      processTypeToAdd: new ChangeCurriculumProcessType(this.curriculum.id,''),
      availableProcessTypes: new Array(),
      fetchingData: true
    };
  },
  props: {
    curriculum: Object,
    processTypes: Array,
  },
  components: {
  },
  methods: {
    addProcessType(item) {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.processTypeToAdd.processTypeId = item.id
          this.$store.dispatch('curriculum/addProcessType', this.processTypeToAdd)
          .then(
            () => {
              this.refreshAvailableProcessTypes()
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
    refreshAvailableProcessTypes() {
      this.fetchingData = true;
      var curriculumProcessTypes = this.curriculum.processTypes;
      var processTypes = this.processTypes;
      this.availableProcessTypes = processTypes.filter(function(obj) {
        return !curriculumProcessTypes.some(function(obj2) {
          return obj.id == obj2.id;
        })
      })
      this.fetchingData = false;
    }
  },
  mounted() {
    this.$nextTick(() => {
    this.refreshAvailableProcessTypes()
    })
    eventBus.on("processTypeRemoved", (obj) => {
      if(this.curriculum.id == obj.curriculumId) { 
        this.refreshAvailableProcessTypes();
       }
    });
    eventBus.on("processTypeDeleted", () => {
      this.refreshAvailableProcessTypes();
    });
  },
  beforeDestroy() {
    eventBus.remove("processTypeRemoved");
    eventBus.remove("processTypeDeleted");
  }
}
</script>