<template>
  <b-dropdown :disabled="locations.length < 1" size="sm" variant="light" class="btn-light rounded-right">
    <b-modal :id='"modal-"+courseId' title="Standort entfernen?" @ok='deleteLocation()'>
      Bist du sicher, dass du den Standort <strong>{{locationToDelete.name}}</strong> entfernen willst? Er wird dann bei allen Lehrgängen gelöscht! 
    </b-modal>
    <template #button-content>
      <font-awesome-icon icon="map-marker-alt" />
      löschen
    </template>
    <b-dropdown-item v-for="(item, index) in locations" :key='index' class='small' v-b-modal="'modal-'+courseId" @click='setLocationToDelete(item)'>{{item.name}}</b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      locationToDelete: {}
    };
  },
  props: {
    courseId: Number,
    departmentId: Number,
    locations: Array,
  },
  components: {
  },
  methods: {
    setLocationToDelete(item) {
      this.locationToDelete=item;
    },
    deleteLocation() {
      this.$validator.validateAll().then(isValid => {
        if(isValid) {
          this.$store.dispatch('school/deleteLocation', 
          {departmentId: this.departmentId, 
          courseId:this.courseId,
          locationId: this.locationToDelete.id})
          .then(
            () => {
              
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