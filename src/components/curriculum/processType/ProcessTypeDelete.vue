<template>
  <b-dropdown :disabled="processTypes.length < 1" size="sm" variant="secondary" class="btn-light rounded-right">
    <b-modal :id='"modaldeleteprocesstype-"+curriculumId' title="Standort entfernen?" @ok='deleteProcessType()'>
      Bist du sicher, dass du den Prozesstyp <strong>{{processTypeToDelete.name}}</strong> entfernen willst? Er wird dann bei allen Lehrplänen gelöscht! 
    </b-modal>
    <template #button-content>
      <font-awesome-icon icon="file-alt" />
      löschen
    </template>
    <b-dropdown-item v-for="(item, index) in processTypes" :key='index' class='small' v-b-modal="'modaldeleteprocesstype-'+curriculumId" @click='setProcessTypeToDelete(item)'>{{item.name}}</b-dropdown-item>
  </b-dropdown>
</template>

<script>
import eventBus from "helpers/eventbus";
import {ChangeCurriculumProcessType} from 'models/curriculum';
export default {
  data() {
    return {
      message: '',
      processTypeToDelete: new ChangeCurriculumProcessType(this.curriculumId, '')
    };
  },
  props: {
    curriculumId: Number,
    processTypes: Array,
  },
  components: {
  },
  methods: {
    setProcessTypeToDelete(item) {
      this.processTypeToDelete.processTypeId=item.id;
    },
    deleteProcessType() {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('curriculum/deleteProcessType', this.processTypeToDelete)
          .then(
            () => {
              eventBus.dispatch("processTypeDeleted");
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
    }
  },
  mounted() {
  },
}
</script>