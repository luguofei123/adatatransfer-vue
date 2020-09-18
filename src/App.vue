<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
// import '@/assets/js/heart'
export default {
  data () {
    return {
    }
  },
  created () {
    // let str = window.location.href
    // let lastStr = str.slice(str.lastIndexOf('/')).split('/')[1]
    // console.log(lastStr)
    // if (this.$store.state.auth.authRoutes[0].children === false) {
    //   // console.log(this.$router.currentRoute)
    //   this.$store.dispatch('auth/setAuthRouter')
    //     .then(() => {
    //       this.$router.addRoutes(this.$store.state.auth.authRoutes)
    //       // console.log(this.$router.currentRoute)
    //       this.$router.push({
    //         name: lastStr
    //       })
    //       // console.log(this.$router)
    //     })
    // }
  }
}
</script>
