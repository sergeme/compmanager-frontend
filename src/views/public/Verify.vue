<template>
  <div class="col-md-12">
    <div class="card col-md-6">
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data() {
    return {
      successful: false,
      message: '',
      token: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
    else {
      this.token=this.$route.params.token
      this.message = '';
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/verify', this.token).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message = error.response.data.message
              this.successful = false;
            }
          );
        }
      });
    }
  },
  methods: {
    handleRegister() {
      
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;

}

</style>
