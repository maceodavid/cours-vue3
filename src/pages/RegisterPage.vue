<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const trimmedUsername = computed(() => username.value.trim());

const email = ref("");
const trimmedEmail = computed(() => email.value.trim());

const password = ref("");
const trimmedPassword = computed(() => password.value.trim());

const redirecting = ref(false);
const submitButtonEnabled = computed(
  () => trimmedUsername.value && trimmedEmail.value && trimmedPassword.value && !redirecting.value,
);

function createAccount() {
  redirecting.value = true;

  /*
  console.log({
    username: trimmedUsername.value,
    email: trimmedEmail.value,
    password: trimmedPassword.value,
  });

  setTimeout(() => {
    router.push({ name: "home" });
  }, 1000);
  */

  fetch("https://posts-crud-api.vercel.app/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: trimmedUsername.value,
      email: trimmedEmail.value,
      password: trimmedPassword.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      redirecting.value = false;

      console.log(data);

      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
    });
}
</script>

<template>
  <form class="card" @submit.prevent="createAccount">
    <h1 style="margin-bottom: 1rem">Créer un compte</h1>
    <input
      type="text"
      name="username"
      id="username"
      placeholder="Nom d'utilisateur"
      autocomplete="on"
      required
      v-model="username"
    />
    <input
      type="email"
      name="email"
      id="email"
      placeholder="Adresse email"
      autocomplete="email"
      required
      v-model="email"
    />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="Mot de passe"
      autocomplete="new-password"
      required
      v-model="password"
    />
    <button type="submit" :disabled="!submitButtonEnabled" :class="{ loading: redirecting }">
      Submit
    </button>
  </form>
</template>

<style scoped>
input {
  background: var(--color-bg-tertiary);
  border: none;
  border-radius: 10px;
  color: var(--color-text-primary);
  outline: none;
  padding: 1rem;
  margin-bottom: 1rem;
}
button {
  width: 100%;
}
</style>
