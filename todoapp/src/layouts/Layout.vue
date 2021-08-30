<template>
  <q-layout view="hMh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="absolute-center">
          Todo
        </q-toolbar-title>

        <q-btn v-if="!logged_in" to="/auth" flat class="absolute-right" icon-right="account_circle" label="Login" />
        <q-btn v-else @click="logout_user" flat class="absolute-right" icon-right="account_circle" label="Logout" />

      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="link in essentialLinks"
          :key="link.title"
          :label="link.title"
          :icon="link.icon"
          :to="link.link"
          exact />          
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Navigation
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from "vuex"
const linksData = [
  {
    title: 'Todo',
    caption: '',
    icon: 'list',
    link: '/'
  },
  {
    title: 'Settings',
    caption: '',
    icon: 'settings',
    link: '/settings'
  },
];

export default {
  name: 'Layout',
  components: { EssentialLink: require('components/EssentialLink.vue').default },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  computed:{
    ...mapState("auth", ["logged_in"])
  },
  methods: {
    ...mapActions("auth", ["logout_user"])
  }
}
</script>

<style>
  @media screen and (min-width: 768px){
    .q-footer{
      display: none
    }
  }
</style>
