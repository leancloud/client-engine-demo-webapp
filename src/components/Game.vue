<template>
  <div>
    <div>你：{{userId}} <span v-show="userId === winnerId">🏆</span></div>
    <div v-show="opponent.actorId !== -1">对手：{{opponent.userId}} <span v-show="opponent.userId === winnerId">🏆</span></div>
    <div>当前状态：{{status}}</div>
    <div v-show="status === 'waiting-for-choice'">
      请选择：
      <button v-on:click="choose(i)" v-for="i in [0,1,2]" v-bind:key="i">{{choices[i]}}</button>
    </div>
    <div v-show="status === 'end'"><button v-on:click="leave()">离开房间</button></div>
    <hr>
    <details open>
      <summary>日志</summary>
      <div v-for="log in logs" v-bind:key="log">{{log}}</div>
    </details>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  Client,
  Event,
  Player,
  ReceiverGroup,
  CustomEventData
} from "@leancloud/play";

enum GameEvent {
  Start = 10,
  Play = 11,
  Over = 20
}

@Component
export default class Game extends Vue {
  @Prop() private client!: Client;
  @Prop() private onRoomLeft!: () => any;

  status = "inited";
  logs: string[] = [];
  choices = ["✊", "✌️", "✋"];
  userId = this.client.userId;
  opponent = {
    actorId: -1,
    userId: ""
  };
  winnerId = "";

  mounted() {
    // 加入 Room 并等待玩家加入，等待 masterClient 宣布游戏开始
    this.log("正在等待其他玩家");
    this.client.on(Event.CUSTOM_EVENT, ({ eventId, eventData, senderId }) => {
      // 忽略所有不是 masterClient 发来的消息
      if (senderId !== this.client.room.masterId) return;
      switch (eventId) {
        case GameEvent.Start:
          this.log("游戏开始");
          this.startGame();
          this.status = "waiting-for-choice";
          break;
        case GameEvent.Play:
          this.log(`对手已选择`);
          break;
        case GameEvent.Over: {
          this.endGame(eventData);
          this.log("游戏结束");
          this.status = "end";
        }
      }
    });
    this.client.on(Event.PLAYER_ROOM_JOINED, ({ newPlayer }) => {
      this.log(`${newPlayer.userId} 加入了房间`, "Play");
    });
    this.client.on(Event.PLAYER_ROOM_LEFT, ({ leftPlayer }) => {
      // ignore Master Left event
      if (leftPlayer.isMaster) {
        return;
      }
      this.log(`${leftPlayer.userId} 离开了房间`, "Play");
    });
  }

  private startGame() {
    const { actorId, userId } = this.client.room.playerList.find(
      player => !player.isMaster && player !== this.client.player
    )!;
    this.opponent = {
      actorId,
      userId
    };
  }

  private endGame(eventData: CustomEventData) {
    const { choices, winnerId } = eventData;
    if (choices !== undefined && this.opponent) {
      this.log(
        `对手选择的是 ${this.choices[choices[this.opponent.actorId - 2]]}`
      );
    }
    this.winnerId = winnerId;
    if (winnerId === null) {
      this.log("平局");
    } else {
      this.log(`${winnerId} 胜利`);
    }
  }

  private choose(index: number) {
    this.log(`你选择了 ${this.choices[index]}`);
    this.status = "pending";
    this.client.sendEvent(
      GameEvent.Play,
      {
        index
      },
      {
        receiverGroup: ReceiverGroup.MasterClient
      }
    );
  }

  private leave() {
    this.client.leaveRoom().then(() => this.onRoomLeft());
  }

  private log(log: string, scope = "Game") {
    this.logs.push(`[${scope}] ${log}`);
  }
}
</script>

<style>
</style>
