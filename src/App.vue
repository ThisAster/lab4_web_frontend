<template>
  <div class="app-wrapper">
      <div class="app" id="app">


          <router-view/>
      </div>
  </div>
</template>

<style>

body{
  background-image: url(./bg.png);
  background-attachment: fixed;
  background-color: #464646;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
