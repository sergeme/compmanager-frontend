<template>
  <div>
    <b-form-tags v-model="values" no-outer-focus class="mb-1" :list='"input-list"+competence.id'>
      <template v-slot="{ tags }">
        <div class="d-inline-block py-2">
          <b-form-tag
            v-for="tag in tags"
            pill
            @remove="removeTag(tag)"
            no-remove
            :key="tag"
            size="sm"
            :title="tag"
            variant="primary"
            class="mr-1"
          >{{ tag }}</b-form-tag>
        </div>
        <div>
        </div>      
      </template>
    </b-form-tags>
  </div>
</template>

<script>
import {NewTag, RemoveTag} from 'models/tag';
export default {
  data() {
    return {
      newTag: '',
      availableTags: [],
      values: [],
    }
  },
  props: {
    competence: Object,
    studentTags: Array
  },
  methods: {
    fetchTags() {
      var tags = this.values;
      this.competence.tags.forEach(function (tag) {
        tags.push(tag.vocable.name);
      })
      tags = tags.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      this.availableTags = this.studentTags.filter(function(obj) {
        return !tags.some(function(obj2) {
          return obj.vocable.name == obj2;
        })
      })
      this.availableTags = this.availableTags.sort(function (a, b) {
        return a.vocable.name.toLowerCase().localeCompare(b.vocable.name.toLowerCase());
      });
      
    },
    addTag(tag) {
      var newTag = new NewTag(
        this.$store.state.auth.user.id, this.competence.id, tag);
      this.$store.dispatch('competences/addTag', newTag).then(
            () => {
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
      this.fetchTags();
    },
    removeTag(tag) {
      var tagId = this.competence.tags.find(t => t.vocable.name == tag).id;
      var removeTag = new RemoveTag(
        this.$store.state.auth.user.id, this.competence.id, tagId
        );
      this.$store.dispatch('competences/removeTag', removeTag).then(
            () => { },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
      this.fetchTags();
    }
  },
  mounted() {
    this.fetchTags();
  }
}
</script>