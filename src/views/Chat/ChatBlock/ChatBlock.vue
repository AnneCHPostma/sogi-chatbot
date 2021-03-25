<template src="./ChatBlock.html"></template>
<style src="./ChatBlock.css"></style>
<script>
import { mapState } from 'vuex';
import { store } from '../../../store/store';

export default {
  name: 'ChatBlock',
  props: {
    type: String,
    message: String,
  },
  computed: mapState({
    step() {
      return store.state.chat.step;
    },
  }),
  methods: {
    addDeclarationType(declarationType) {
      store.commit('addDeclarationType', declarationType);
    },
    addDeclarationAttachment(addAttachment) {
      store.commit('hasAttachment', addAttachment);
    },
    navigateTo(path) {
      store.commit('setRouterPath', path);
    },
  },
};
</script>