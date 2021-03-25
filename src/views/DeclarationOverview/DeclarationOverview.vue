<template src="./DeclarationOverview.html"></template>
<style src="./DeclarationOverview.css" scope></style>
<script>
import { mapState } from 'vuex';
import { store } from '../../store/store';

export default {
  name: 'DeclarationOverview',
  computed: mapState({
    declarationCost() {
      return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(
        store.state.declaration.cost
      );
    },
    declarationDate() {
      return store.state.declaration.date;
    },
    declarationImage() {
      return store.state.declaration.image;
    },
    declarationLocation() {
      return store.state.declaration.location;
    },
    declarationNote() {
      return store.state.declaration.note;
    },
    declarationType() {
      return store.state.declaration.type;
    },
    userName() {
      return store.state.user.name;
    },
  }),
  methods: {
    declarationSent() {
      this.$store.commit('toggleChatDeclarationOverview');
      this.$store.commit('isDeclarationSent', true);
    },
    closeOverview() {
      this.$store.commit('toggleChatDeclarationOverview');
    },
  },
};
</script>