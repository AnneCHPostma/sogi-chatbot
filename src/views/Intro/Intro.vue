<template src="./Intro.html"></template>
<style src="./Intro.css"></style>
<script>
export default {
  name: 'Intro',
  data() {
    return {
      leave: false,
    };
  },
  methods: {
    login() {
      this.leave = true;

      setTimeout(() => {
        this.$router.push({ path: 'login' });
      }, 1200);
    },
  },
};
</script>