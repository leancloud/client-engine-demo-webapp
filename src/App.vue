<template>
  <div id="app">
    <h2>Client Engine Demo</h2>
    <Login v-if="status == 'LOGIN'" :on-login='onLogin'/>
    <Lobby v-if="status == 'LOBBY'" :client='client' :on-room-joined='onRoomJoined' />
    <Game v-if="status == 'GAME'" :client='client' :on-room-left='onRoomLeft'/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Client, Event } from "@leancloud/play";
import Login from "./components/Login.vue";
import Lobby from "./components/Lobby.vue";
import Game from "./components/Game.vue";
import { errorHandler } from "./utils";

@Component({
  components: {
    Login,
    Lobby,
    Game
  }
})
export default class App extends Vue {
  status = "LOGIN";
  client?: Client;

  private onLogin(client: Client) {
    this.client = client;
    this.status = "LOBBY";
  }
  private onRoomJoined() {
    this.status = "GAME";
  }
  private onRoomLeft() {
    this.status = "LOBBY";
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 32px;
}
button,
input {
  font-size: 32px;
}
details,
details input {
  font-size: 60%;
}
</style>
