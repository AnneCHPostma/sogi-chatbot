<template src="./Header.html"></template>
<style src="./Header.css" scoped></style>
<script>
export default {
  name: 'Header',
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleMenu: function() {
      this.isActive = !this.isActive;
    },
    showHome: function() {
      this.isActive = false;
      this.$router.push({ path: 'landing' });
    },
    showOverview: function() {
      this.isActive = false;
      this.$router.push({ path: 'overview' });
    },
    addDeclaration: function() {
      this.isActive = false;
      this.$router.push({ path: 'chat' });
    },
    logOut: function() {
      this.isActive = false;
      this.$router.push({ path: '/' });
    },
  },
};
</script>