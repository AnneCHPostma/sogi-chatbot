<template src="./FixedRoundButton.html"></template>
<style src="./FixedRoundButton.css" scoped></style>
<script>
export default {
  name: 'FixedRoundButton',
  props: {
    navigateTo: String, //It navigates to the value passed in this variable
  },
  methods: {
    goTo: function() {
      if (this.navigateTo) {
        this.$router.push({ path: '/' + this.navigateTo });
      }
    },
  },
};
</script>
