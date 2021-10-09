<template>
  <div id="app" class="h-100 d-flex flex-column">
    <nav class="navbar navbar-expand navbar-dark bg-dark container static-top">
      <router-link to="/" class="navbar-brand mx-3" >Kompetenz-Manager</router-link>
      <div v-if="currentUser" class="navbar-nav justify-content-left w-100">
        <b-nav-item-dropdown v-if="showTeacherPages || showStudentPages" :toggle-class="{active: activateMenuItem('/competences')}">
          <template #button-content>
            <font-awesome-icon icon="clipboard" />
                Kompetenzen
          </template>
          <b-dropdown-group v-if="showStudentPages" id="dropdown-group-student">
            <b-dropdown-item :to="'/competences'" exact-active-class="active">&nbsp;Kompetenzen auflisten</b-dropdown-item>
            <b-dropdown-item :to="'/competences/profile'" exact-active-class="active">&nbsp;Kompetenzprofil erstellen</b-dropdown-item>
            <b-dropdown-item :to="'/competences/export'" exact-active-class="active">&nbsp;Kompetenzdaten exportieren</b-dropdown-item>
          </b-dropdown-group>
          <b-dropdown-group v-if="showTeacherPages" id="dropdown-group-teacher">
            <b-dropdown-item :to="'/competences/shared'" exact-active-class="active">&nbsp;Freigegebene Kompetenzen auflisten</b-dropdown-item>
          </b-dropdown-group>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown v-if="showAdminPages" :toggle-class="{active: activateMenuItem('/data')}">
          <template #button-content>
            <font-awesome-icon icon="file-alt" />
                Anwendungsdaten
          </template>
          <b-dropdown-group id="dropdown-group-3" header="Klassen">
            <b-dropdown-item :to="'/data/classes/new'" exact-active-class="active">&nbsp;Klassen erstellen</b-dropdown-item>
            <b-dropdown-item :to="'/data/classes'" exact-active-class="active">&nbsp;Klassen auflisten</b-dropdown-item>
          </b-dropdown-group>
          <b-dropdown-group id="dropdown-group-1" header="Lehrpläne">
            <b-dropdown-item :to="'/data/curriculum'" exact-active-class="active">&nbsp;Lehrplan erstellen</b-dropdown-item>
            <b-dropdown-item :to="'/data/curricula'" exact-active-class="active">&nbsp;Lehrpläne auflisten</b-dropdown-item>
          </b-dropdown-group>
          <b-dropdown-group id="dropdown-group-2" header="Schuldaten">
            <b-dropdown-item :to="'/data/school'" exact-active-class="active">&nbsp;Schuldaten anzeigen</b-dropdown-item>
          </b-dropdown-group>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown v-if="showAdminPages" :toggle-class="{active: activateMenuItem('/users')}">
          <template #button-content>
            <font-awesome-icon icon="users" />
                Benutzer
          </template>
          <b-dropdown-item :to="'/users'" exact-active-class="active">&nbsp;Benutzer auflisten</b-dropdown-item>
        </b-nav-item-dropdown>
      </div>

      <div class="navbar-nav justify-content-end w-100">
        <b-nav-item v-if="!currentUser" to="/register" exact-active-class="active">
            <font-awesome-icon icon="user-plus" />&nbsp;Registrieren
        </b-nav-item>
        <b-nav-item v-if="!currentUser" to="/login" exact-active-class="active">
            <font-awesome-icon icon="sign-in-alt" />&nbsp;Login
        </b-nav-item>
        <b-nav-item-dropdown v-if="currentUser" :class="{active: activateMenuItem('/profile')}">
          <template #button-content>
            <font-awesome-icon icon="user" />
                {{ currentUser.firstName }} {{ currentUser.lastName }}
          </template>
          <b-dropdown-item :to="'/profile'" exact-active-class="active"><font-awesome-icon icon="id-badge" />&nbsp;Mein Profil</b-dropdown-item>
          <b-dropdown-item href="#" @click.prevent="logOut"><font-awesome-icon icon="sign-out-alt" />&nbsp;LogOut</b-dropdown-item>
        </b-nav-item-dropdown>
      </div>
    </nav>
    <div class="flex-grow-1 h-100">
      <div class="d-flex flex-column h-100">
        <div class="flex-grow-1 overflow-auto container bg-light" style="height: 100px;"> 
          <router-view />{{test}}
        </div>
      </div>
    </div>
    <footer class="card-footer mt-auto bg-dark text-white text-center py-5 container">
    </footer>
  </div>
</template>

<script>
import { roles } from 'models/roles'
import eventBus from "helpers/eventbus";

export default {
  data() {
    return {
      
    };
  },
  computed: {
    test() {
      return this.$store.state.departments;
    },
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
    },
    activateMenuItem(path) {
      return this.$route.path.toString().startsWith(path);
    },
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
<style lang="scss">
@import 'styles/_custom.scss';
</style>