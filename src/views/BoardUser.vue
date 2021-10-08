<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}} s</h3>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import eventBus from "../helpers/eventbus";

export default {
  name: 'User',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      () => {
        this.content = this.$store.state.auth.user;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        if (error.response && error.response.status === 403) {
          eventBus.dispatch("logout");
        }
      }
    );
  }
};
</script>