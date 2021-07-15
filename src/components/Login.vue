<template>
  <div class="container text-white">
    <b-jumbotron
      header="TODO ☁"
      lead="A todo app using Vue, Mysky, and Skynet"
      class="text-center m-5"
      bg-variant="transparent"
      text-variant="white"
      border-variant="primary"
    >
      <b-button variant="primary" href="#" @click="Login()">Login</b-button>
    </b-jumbotron>
  </div>
</template>
<script>
export default {
  name: "Login",
  methods: {
    Login: function () {
      this.$store
        .dispatch("Skynet/login")
        .then(this.$bvToast.toast("Please refresh the page after logging in", { variant: "info" }))
        .catch((err) =>
          this.$bvToast.toast(err["message"], { variant: "danger" })
        );
    },
  },
};
</script>