<template>
    <div id="spinner-detail">
            <div class="xdot1"></div>
            <div class="xdot2"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
@require '../styles/wrapper.styl';
#spinner-detail {
  width: 50px;
  height: 50px;
  position: relative;
  text-align: center;
  animation: rotate1 2.0s infinite linear;
  -webkit-animation:rotate1 2.0s infinite linear;
}
 
.xdot1, .xdot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: $accentColor;
  border-radius: 100%;
  animation: bounce1 2.0s infinite ease-in-out;
  -webkit-animation:bounce1 2.0s infinite ease-in-out;
}
 
.xdot2 {
  top: auto;
  bottom: 0px;
  animation-delay: -1.0s;
  -webkit-animation-delay: -1.0s;
}
@keyframes rotate1 { 
  100% { 
    transform: rotate(360deg); 
    -webkit-transform: rotate(360deg) 
  }
}
@keyframes bounce1 {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
