<template>
  <b-button size="sm" class="btn" v-b-modal="'modaldelete-'+classToDelete.id">
    <b-modal :id='"modaldelete-"+classToDelete.id' title="Klasse löschen?" @ok='deleteClass()'>
    Bist du sicher, dass du die Klasse <strong>{{classToDelete.name}}</strong> löschen willst? 
    </b-modal>
    <font-awesome-icon icon="trash-alt"/> ...löschen
  </b-button>
</template>

<script>
import eventBus from "helpers/eventbus";
export default {
  name: 'ClassDelete',
  data() {
    return {
      message: '',
      availableLocations: new Array(),
      classToDelete: this.classObj
    };
  },
  props: {
    classObj: Object,
  },
  components: {
  },
  methods: {
    deleteClass() {
      this.$store.dispatch('schoolClass/deleteClass', this.classToDelete.id)
      .then(
        () => {
          eventBus.dispatch("classDeleted", this.newClass)
        },
        error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  }
}
</script>