<template src="./Login.html"></template>
<style src="./Login.css"></style>
<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      promptPassword: false,
    };
  },
  methods: {
    next: function() {
      this.$store.state.user.name = this.username;
      this.promptPassword = true;
    },
    login: function() {
      this.$router.push({ path: '/landing' });
    },
  },
};
</script>