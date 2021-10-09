<template>
  <div class="">
    <form name="form" @submit.prevent="test">
      <div class="form-group my-3">
        <button class="btn btn-primary btn-block">
          <span v-show="submitted" class="spinner-border spinner-border-sm"></span>
          <span>Anmelden</span>
        </button>
      </div>
    </form>
    <form name="form" @submit.prevent="reauth">
      <div class="form-group my-3">
        <button class="btn btn-primary btn-block">
          <span v-show="submitted" class="spinner-border spinner-border-sm"></span>
          <span>Anmelden</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  data() {
    return {
      submitted: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    test() {
    const API_URL = 'http://localhost:4000/api/v1/accounts/';
    return axios
      .get(API_URL, {headers: {
        'Authorization': this.currentUser.jwtToken
      }})
      .then(response => {
        if (response.data) {
          alert(response.data[0].firstName)
        }

        return response.data;
      });
  },
  reauth() {
    const API_URL = 'http://localhost:4000/accounts/refresh-token';
    return axios
      .post(API_URL,null, {withCredentials:true})
      .then(response => {
        if (response.data) {
          alert(response.data)
        }

        return response.data;
      });
  }
  }
};
</script>
