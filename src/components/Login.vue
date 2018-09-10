<template>
  <form id="login" v-on:submit.prevent="login">
    <label>ID:
      <input type="text" v-model="id" required placeholder="[A-Za-z0-9_]{1,36}"/>
    </label>
    <button type="submit">Login to Play</button>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { play, Event } from "@leancloud/play";
import { listen } from "../utils";

@Component
export default class Login extends Vue {
  id = Date.now().toString();

  login() {
    play.userId = this.id;
    play.connect();
  }
}
</script>

<style>
</style>
