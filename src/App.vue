<template>
  <div v-if="!isFetchingData" id="app" class="h-100 d-flex flex-column">
    <nav class="navbar navbar-expand navbar-dark bg-dark container static-top">
      <router-link to="/" class="navbar-brand mx-3" >Kompetenz-Manager</router-link>
      <div v-if="currentUser" class="navbar-nav justify-content-left w-100">
        <b-nav-item-dropdown v-if="showTeacherPages || showStudentPages" :toggle-class="{active: activateMenuItem('/competences')}">
          <template #button-content>
            <font-awesome-icon icon="clipboard" />
                Kompetenzen
          </template>
          <b-dropdown-group v-if="showStudentPages" id="dropdown-group-student">
            <b-dropdown-item :to="'/competences'" exact-active-class="active">&nbsp;Meine Kompetenzen</b-dropdown-item>
            <b-dropdown-item :to="'/competences/profile'" exact-active-class="active">&nbsp;Kompetenzprofil erstellen</b-dropdown-item>
            <b-dropdown-item :to="'/competences/export'" exact-active-class="active">&nbsp;Kompetenzdaten exportieren</b-dropdown-item>
          </b-dropdown-group>
          <b-dropdown-group v-if="showTeacherPages" id="dropdown-group-teacher">
            <b-dropdown-item :to="'/competences/shared'" exact-active-class="active" disabled>&nbsp;Freigegebene Kompetenzen</b-dropdown-item>
          </b-dropdown-group>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown v-if="showAdminPages || showTeacherPages" :toggle-class="{active: activateMenuItem('/data')}">
          <template #button-content>
            <font-awesome-icon icon="file-alt" />
                Anwendungsdaten
          </template>
          <b-dropdown-group id="dropdown-group-3" header="Klassen">
            <b-dropdown-item v-if="showAdminPages" :to="'/data/classes/new'" exact-active-class="active">&nbsp;Klassen erstellen</b-dropdown-item>
            <b-dropdown-item :to="'/data/classes'" exact-active-class="active">&nbsp;Klassen auflisten</b-dropdown-item>
          </b-dropdown-group>
          <b-dropdown-group id="dropdown-group-1" header="Stammdaten">
            <b-dropdown-item v-if="showAdminPages" :to="'/data/curricula'" exact-active-class="active">&nbsp;Lehrpläne bearbeiten</b-dropdown-item>
            <b-dropdown-item v-if="showAdminPages" :to="'/data/school'" exact-active-class="active">&nbsp;Schuldaten bearbeiten</b-dropdown-item>
          </b-dropdown-group>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown v-if="showAdminPages" :toggle-class="{active: activateMenuItem('/users')}" disabled>
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
          <!--<b-dropdown-item :to="'/profile'" exact-active-class="active"><font-awesome-icon icon="id-badge" />&nbsp;Mein Profil</b-dropdown-item>-->
          <b-dropdown-item href="#" @click.prevent="logOut"><font-awesome-icon icon="sign-out-alt" />&nbsp;LogOut</b-dropdown-item>
        </b-nav-item-dropdown>
      </div>
    </nav>
    <div class="flex-grow-1 h-100">
      <div class="d-flex flex-column h-100">
        <div class="flex-grow-1 overflow-auto container" style="height: 100px;"> 
          <router-view :auth='auth' :currentUser='currentUser' :roles='roles'/>
        </div>
      </div>
    </div>
    <footer class="card-footer mt-auto bg-dark text-white text-center py-5 container">
    </footer>
  </div>
</template>

<script>
import { Authorization } from 'helpers/auth';
import { roles } from 'models/roles';
import eventBus from "helpers/eventbus";

export default {
  data() {
    return {
      auth: new Authorization(),
      isFetchingData: true,
      showAdminPages: false,
      showTeacherPages: false,
      showStudentPages: false,
      roles: null
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    activateMenuItem(path) {
      return this.$route.path.toString().startsWith(path);
    },
    getPermissions() {
      this.showAdminPages = this.auth.hasRole(roles.admin);
      this.showTeacherPages = this.auth.hasRole(roles.teacher);
      this.showStudentPages = this.auth.hasRole(roles.student);
    }
  },
  mounted() {
    this.auth.user = this.$store.state.auth.user;
    this.roles = roles;
    this.getPermissions();
    eventBus.on("logout", () => {
      this.logOut();
    });
    eventBus.on("loggedIn", () => {
      this.auth.user = this.$store.state.auth.user;
      this.getPermissions();

    });

    this.isFetchingData = false;
  },
  beforeDestroy() {
    eventBus.remove("logout");
    eventBus.remove("loggedIn");
  }
};
</script>
<style lang="scss">
@import 'styles/_custom.scss';
</style>