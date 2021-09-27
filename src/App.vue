<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark container">
      <router-link to="/" class="navbar-brand mx-3" >Kompetenz-Manager</router-link>
      <div v-if="currentUser" class="navbar-nav justify-content-left w-100">
        <b-dropdown variant="dark">
          <template #button-content>
            <font-awesome-icon icon="clipboard" />
                Kompetenzen
          </template>
          <b-dropdown-item :to="'/profile'">&nbsp;Kompetenzen auflisten</b-dropdown-item>
          <b-dropdown-item :to="'/profile'">&nbsp;Kompetenzprofil erstellen</b-dropdown-item>
          <b-dropdown-item :to="'/profile'">&nbsp;Kompetenzdaten exportieren</b-dropdown-item>
          <b-dropdown-item :to="'/profile'">&nbsp;Freigegebene Kompetenzen auflisten</b-dropdown-item>
        </b-dropdown>
        <b-dropdown variant="dark">
          <template #button-content>
            <font-awesome-icon icon="users" />
                Benutzer
          </template>
          <b-dropdown-item :to="'/profile'">&nbsp;Benutzer auflisten</b-dropdown-item>
        </b-dropdown>
                <b-dropdown variant="dark">
          <template #button-content>
            <font-awesome-icon icon="file-alt" />
                Lehrpläne
          </template>
          <b-dropdown-item :to="'/profile'">&nbsp;Lehrplan erstellen</b-dropdown-item>
          <b-dropdown-item :to="'/profile'">&nbsp;Lehrpläne auflisten</b-dropdown-item>
        </b-dropdown>
                <b-dropdown variant="dark">
          <template #button-content>
            <font-awesome-icon icon="user-graduate" />
                Lehrgänge
          </template>
          <b-dropdown-item :to="'/profile'">&nbsp;Lehrgang erstellen</b-dropdown-item>
          <b-dropdown-item :to="'/profile'">&nbsp;Lehrgänge auflisten</b-dropdown-item>
        </b-dropdown>
                <b-dropdown variant="dark">
          <template #button-content>
            <font-awesome-icon icon="chalkboard-teacher" />
                Klassen
          </template>
          <b-dropdown-item :to="'/profile'">&nbsp;Klassen erstellen</b-dropdown-item>
          <b-dropdown-item :to="'/profile'">&nbsp;Klassen auflisten</b-dropdown-item>
        </b-dropdown>
      </div>

      <div v-if="!currentUser" class="navbar-nav justify-content-end w-100">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />&nbsp;Registrieren
          </router-link>
        </li>
        <li class="nav-item ">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />&nbsp;Login
          </router-link>
        </li>
      </div>
      <div v-if="currentUser" class="navbar-nav justify-content-end w-100">
        <b-dropdown variant="dark">
          <template #button-content>
            <font-awesome-icon icon="user" />
                {{ currentUser.firstName }} {{ currentUser.lastName }}
          </template>
          <b-dropdown-item :to="'/profile'"><font-awesome-icon icon="id-badge" />&nbsp;Mein Profil</b-dropdown-item>
          <b-dropdown-item href="#" @click.prevent="logOut"><font-awesome-icon icon="sign-out-alt" />&nbsp;LogOut</b-dropdown-item>
        </b-dropdown>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
