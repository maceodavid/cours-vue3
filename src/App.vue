<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
console.log(route.path);

function logout() {
  localStorage.removeItem("user");
  router.push("/register");
}

const showNavbar = computed(() => !["/login", "/register"].includes(route.path));
</script>

<template>
  <header v-if="showNavbar" class="navbar">
    <button @click="logout">Se déconnecter</button>
  </header>
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.navbar {
  padding: 1rem;
}
</style>
