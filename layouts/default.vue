<template>
  <a-layout class="layout" style="min-height: 100vh">
    <a-layout-header>
      <div class="logo" />
      <div style="display: flex; flex-direction: row;">
        <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="/"><NuxtLink to="/">Accueil</NuxtLink></a-menu-item>
        </a-menu>
      <a-menu
          v-if="!isLogged"
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="/login"><NuxtLink to="/login">Se connecter</NuxtLink></a-menu-item>
        <a-menu-item key="/register"><NuxtLink to="/register">Créer un compte</NuxtLink></a-menu-item>
      </a-menu>
      <a-menu
          v-if="isLogged"
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="/products"><NuxtLink to="/products">Produits</NuxtLink></a-menu-item>
        <a-menu-item key="/logout"><NuxtLink @click="logout" >Se déconnecter</NuxtLink></a-menu-item>
      </a-menu>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div class="site-layout-content">
        <slot />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Teddy FRANCFORT ©2023
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue';

const apiFetch = myFetch()

const isLogged = ref(false)

const route = useRoute();

const selectedKeys = ref<string[]>([route.path])

function logout() {
  if (!isLogged) {
    return;
  }

  apiFetch('/sanctum/csrf-cookie')

  apiFetch('/logout', {method: 'POST'})
      .then(function(response){
        window.location.href = '/login'
      })
}

onMounted(() => {
  isLogged.value = true
  apiFetch('/api/is-auth')
      .then(function(response){
        isLogged.value = true
      })
      .catch(function(error) {
        isLogged.value = false
      })
});
</script>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  margin-top: 20px;
  background: #fff;
}
.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>