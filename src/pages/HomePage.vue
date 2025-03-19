<script setup>
import { ref, computed } from "vue";
import PostCard from "@/components/PostCard.vue";

const text = ref("");
const trimmedText = computed(() => text.value.trim());

const posts = ref([]);
const sortedPosts = computed(() =>
  posts.value.toSorted((post1, post2) => post2.createdAt - post1.createdAt),
);

function addPost() {
  /*
  const newPost = {
    id: Math.random().toString(36).substring(2),
    content: trimmedText.value,
    createdAt: new Date(),
    author: {
      username: "Clem",
      avatarUrl: "https://media1.tenor.com/m/a5RGfluwSOgAAAAd/sylvian-delhoumi.gif",
    },
    liked: false,
  };
  posts.value.push(newPost);
  text.value = "";
  */

  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData.token;

  fetch("https://posts-crud-api.vercel.app/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content: trimmedText.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      apiPosts.value.unshift({
        id: data.id,
        content: data.content,
        createdAt: data.createdAt,
        author: {
          id: userData.user.id,
          username: userData.user.username,
          avatarUrl: userData.user.avatarUrl,
        },
      });
      text.value = "";
    });
}

function deletePost(id) {
  posts.value = posts.value.filter((post) => post.id !== id);
}

function likePost(id) {
  const post = posts.value.find((post) => post.id === id);
  post.liked = !post.liked;
}

const apiPosts = ref([]);
const loading = ref(false);

function fetchPosts() {
  loading.value = true;
  const result = fetch("https://posts-crud-api.vercel.app/posts");
  result
    .then((response) => response.json())
    .then((data) => {
      apiPosts.value = data;
      loading.value = false;
    });
}

fetchPosts();
</script>

<template>
  <form class="card" @submit.prevent="addPost">
    <textarea name="post" id="post" placeholder="Quoi de neuf ?" v-model="text"></textarea>
    <button type="submit" :disabled="!trimmedText">Publier</button>
  </form>

  <h2 v-if="loading">Chargement...</h2>
  <h2 v-else-if="!apiPosts.length">Aucun post pour le moment.</h2>

  <PostCard
    v-for="(post, index) in apiPosts"
    :key="index"
    :post="post"
    @delete="deletePost"
    @like="likePost"
  />
</template>
