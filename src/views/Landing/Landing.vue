<template src="./Landing.html"></template>
<style src="./Landing.css"></style>
<script>
import ChatBlock from '../Chat/ChatBlock/ChatBlock';

import DeclarationsOverview from '../../shared/DeclarationsOverview/DeclarationsOverview';
import FixedRoundButton from '../../shared/FixedRoundButton/FixedRoundButton';
import Header from '../../shared/Header/Header';

export default {
  name: 'Landing',
  data() {
    return {
      welcomeMessage: '',
    };
  },
  created() {
    this.$store.state.chat.step = 0;
    this.welcomeMessage =
      'Hello ' + this.$store.state.user.name + ',<br /> I’m your virtual assistant <br /> Call me whenever you like!';
  },
  components: {
    Header,
    DeclarationsOverview,
    ChatBlock,
    FixedRoundButton,
  },
  methods: {
    navigateToChat() {
      this.$router.push({ path: '/chat' });
    },
  },
};
</script>