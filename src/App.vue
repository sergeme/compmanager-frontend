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
          <b-dropdown-group v-if="showStudentPages" id="dropdown-group-student">
            <b-dropdown-item :to="'/competences'">&nbsp;Kompetenzen auflisten</b-dropdown-item>
            <b-dropdown-item :to="'/competences/profile'">&nbsp;Kompetenzprofil erstellen</b-dropdown-item>
            <b-dropdown-item :to="'/competences/export'">&nbsp;Kompetenzdaten exportieren</b-dropdown-item>
          </b-dropdown-group>
          <b-dropdown-group v-if="showTeacherPages" id="dropdown-group-teacher">
            <b-dropdown-item :to="'/competences/shared'">&nbsp;Freigegebene Kompetenzen auflisten</b-dropdown-item>
          </b-dropdown-group>
        </b-dropdown>
        <b-dropdown v-if="showAdminPages" variant="dark">
          <template #button-content>
            <font-awesome-icon icon="file-alt" />
                Stammdaten
          </template>
          <b-dropdown-group id="dropdown-group-1" header="Lehrpläne">
            <b-dropdown-item :to="'/curriculum'">&nbsp;Lehrplan erstellen</b-dropdown-item>
            <b-dropdown-item :to="'/curricula'">&nbsp;Lehrpläne auflisten</b-dropdown-item>
          </b-dropdown-group>
          <b-dropdown-group id="dropdown-group-2" header="Lehrgänge">
            <b-dropdown-item :to="'/course'">&nbsp;Lehrgang erstellen</b-dropdown-item>
            <b-dropdown-item :to="'/courses'">&nbsp;Lehrgänge auflisten</b-dropdown-item>
          </b-dropdown-group>
          <b-dropdown-group id="dropdown-group-3" header="Klassen">
            <b-dropdown-item :to="'/class'">&nbsp;Klassen erstellen</b-dropdown-item>
            <b-dropdown-item :to="'/classes'">&nbsp;Klassen auflisten</b-dropdown-item>
          </b-dropdown-group>
        </b-dropdown>
        <b-dropdown v-if="showAdminPages" variant="dark">
          <template #button-content>
            <font-awesome-icon icon="users" />
                Benutzer
          </template>
          <b-dropdown-item :to="'/users'">&nbsp;Benutzer auflisten</b-dropdown-item>
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
      <div class="d-flex flex-column h-100">
        <div class="flex-grow-1 overflow-auto container bg-light" style="height: 100px;"> 
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
import eventBus from "./helpers/eventbus";

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
  },
  mounted() {
    eventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeDestroy() {
    eventBus.remove("logout");
  }
};
</script>