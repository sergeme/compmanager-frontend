<template>
  <div id="app" class="h-100 d-flex flex-column">
    <nav class="navbar navbar-expand navbar-dark bg-dark container static-top">
      <router-link to="/" class="navbar-brand mx-3" >Kompetenz-Manager</router-link>
      <div v-if="currentUser" class="navbar-nav justify-content-left w-100">
        <b-dropdown v-if="showTeacherPages || showStudentPages" variant="dark">
          <template #button-content>
            <font-awesome-icon icon="clipboard" />
                Kompetenzen
          </template>
          <b-dropdown-item :to="'/profile'">&nbsp;Kompetenzen auflisten</b-dropdown-item>
          <b-dropdown-item :to="'/profile'">&nbsp;Kompetenzprofil erstellen</b-dropdown-item>
          <b-dropdown-item :to="'/profile'">&nbsp;Kompetenzdaten exportieren</b-dropdown-item>
          <b-dropdown-item :to="'/profile'">&nbsp;Freigegebene Kompetenzen auflisten</b-dropdown-item>
        </b-dropdown>
        <b-dropdown v-if="showAdminPages" variant="dark">
          <template #button-content>
            <font-awesome-icon icon="users" />
                Benutzer
          </template>
          <b-dropdown-item :to="'/profile'">&nbsp;Benutzer auflisten</b-dropdown-item>
        </b-dropdown>
        <b-dropdown v-if="showAdminPages" variant="dark">
          <template #button-content>
            <font-awesome-icon icon="file-alt" />
                Lehrpläne
          </template>
          <b-dropdown-item :to="'/profile'">&nbsp;Lehrplan erstellen</b-dropdown-item>
          <b-dropdown-item :to="'/profile'">&nbsp;Lehrpläne auflisten</b-dropdown-item>
        </b-dropdown>
        <b-dropdown v-if="showAdminPages" variant="dark">
          <template #button-content>
            <font-awesome-icon icon="user-graduate" />
                Lehrgänge
          </template>
          <b-dropdown-item :to="'/profile'">&nbsp;Lehrgang erstellen</b-dropdown-item>
          <b-dropdown-item :to="'/profile'">&nbsp;Lehrgänge auflisten</b-dropdown-item>
        </b-dropdown>
        <b-dropdown v-if="showAdminPages" variant="dark">
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
    <div class="flex-grow-1 h-100">
      <div class="container d-flex flex-column h-100 bg-light">
        <div id="scrollContainer" class="flex-grow-1 overflow-auto" style="height: 100px;"> 
          <router-view />
        </div>
      </div>
    </div>
    <footer class="card-footer mt-auto bg-dark text-white text-center py-5 container">&nbsp;
    </footer>
  </div>
</template>

<script>
import { roles } from './models/roles'

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminPages() {
      if (this.currentUser && this.currentUser.role) {
        return roles.admin & this.currentUser.role;
      }

      return false;
    },
    showTeacherPages() {
      if (this.currentUser && this.currentUser.role) {
        return roles.teacher & this.currentUser.role;
      }

      return false;
    },
    showStudentPages() {
      if (this.currentUser && this.currentUser.role) {
        return roles.student & this.currentUser.role;
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
