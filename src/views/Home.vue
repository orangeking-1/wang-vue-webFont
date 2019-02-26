<template>
  <div class="home">
    <div class="con">
      <p>Orangkingliness</p>
      <p>不忘初心，才能始终</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style  scoped lang="sass">
.home
  width: 100%
  height: 100%
  background-image: url("../assets/bg.png")
  background-size: cover
  display: flex
  align-items: center
  justify-content: center
  .con
    padding: 10px
    font-size: 30px
    color: #fff
    text-align: center
</style>
