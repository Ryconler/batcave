<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- <div class="navbar navbar-inverse" role="navigation" style="border-radius: 0">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/"><img src="./assets/images/logo1.png" class="navbar-brand" style="width: 85px;">
          </router-link>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li :class="{select: homeSelect}">
              <router-link to="/">首页</router-link>
            </li>
            <li :class="{select: urlSelect}">
              <router-link to="/urls">链接资源</router-link>
            </li>
            <li :class="{select: fileSelect}">
              <router-link to="/files">文件资源</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown" v-if="user"
                :class="{select: myLikeSelect||myURLSelect||myFileSelect||changePswSelect}">
              <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
                <img src="./assets/images/head_portrait.png" style="width: 20px;height: 20px; margin-right: 10px">{{
                user.username }}<b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
                <li :class="{select: myLikeSelect}">
                  <router-link to="/my/likes">我的喜欢<img src="./assets/images/liked.png" style="width: 30px;">
                  </router-link>
                </li>
                <li :class="{select: myURLSelect}">
                  <router-link to="/my/urls">我的链接<img src="./assets/images/url.png"
                                                      style="margin-left:5px; width: 20px;">
                  </router-link>
                </li>
                <li :class="{select: myFileSelect}">
                  <router-link to="/my/files">我的文件<img src="./assets/images/file.png"
                                                       style="margin-left:5px; width: 20px;">
                  </router-link>
                </li>
                <li :class="{select: changePswSelect}">
                  <router-link to="/change-password">修改密码&nbsp;<img src="./assets/images/lock.png"
                                                                    style="margin-left:4px; width: 15px;">
                  </router-link>
                </li>
                <li><a href="javascript:void(0);" @click="logout()">注销</a></li>
              </ul>
            </li>
            <li v-if="!user" :class="{select: login}">
              <router-link to="/login">登录</router-link>
            </li>
            <li v-if="!user" :class="{select: register}">
              <router-link to="/register">注册</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="alert alert-warning" v-for="(msg,index) of errorMessages" :key="index" v-show="errorMessages.length">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{ msg }}
      </div>
      <router-view></router-view>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { State } from 'vuex-class'

@Options({})
export default class App extends Vue {
  @State appData: any
}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
body {
  background-image: url('./assets/images/bg.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
#app {
  * {
    box-sizing: border-box;
  }
}
.clearfix::after {
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
  overflow: hidden;
  content: '';
}
</style>
