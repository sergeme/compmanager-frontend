<template>
  <span>{{schoolClass.name}} [hinzufügen] [entfernen]  <br></span>
</template>

<script>
export default {
  name: 'Klasse',
  props: {
    locationId: Number,
    courseId: Number,
    schoolClass: Object
  },
  mounted() {

  }
}
</script>