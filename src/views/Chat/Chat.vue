<template src="./Chat.html"></template>
<style src="./Chat.css"></style>
<script>
import Vue from 'vue';

import { mapState } from 'vuex';
import { store } from '../../store/store';

import moment from 'moment';
import axios from 'axios';

import ChatBlock from './ChatBlock/ChatBlock';

import DeclarationOverview from '../DeclarationOverview/DeclarationOverview';

import Header from '../../shared/Header/Header';
import SendChatButton from '../../shared/SendChatButton/SendChatButton';

export default {
  name: 'Chat',
  components: {
    Header,
    DeclarationOverview,
    ChatBlock,
    SendChatButton,
  },
  data() {
    return {
      chatResponse: null,
      declarationCostValue: '',
      declarationDateValue: '',
      declarationLocationValue: '',
      declarationNoteValue: '',
      placeholderText: 'Select an option',
      placeholderDefaultText: 'Type here to chat',
      placeholderDisabledText: 'Select an option',
      placeholderUploadText: 'Click here to upload',
    };
  },
  mounted() {
    this.startChatting();
  },
  computed: mapState({
    declarationCost() {
      return store.state.declaration.cost + ' EUR';
    },
    declarationDate() {
      return store.state.declaration.date;
    },
    declarationHasAttachment() {
      return store.state.declaration.hasAttachment ? 'Yes' : 'No';
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
    declarationSent() {
      return store.state.declaration.sent;
    },
    declarationType() {
      return store.state.declaration.type;
    },
    routerPath() {
      return store.state.router.path;
    },
    showOverview() {
      return store.state.chat.showOverview;
    },
    step() {
      return store.state.chat.step;
    },
    userName() {
      return store.state.user.name;
    },
  }),
  watch: {
    chatResponse() {
      let newMessages = [];
      let response = this.chatResponse;

      if (this.step === 1) {
        let optionsPanel = document.getElementsByClassName('options-panel');

        for (let i = 0; i < optionsPanel.length; i++) {
          optionsPanel[0].parentNode.parentNode.removeChild(optionsPanel[0].parentElement);
        }
      }

      if (this.step === 10) {
        let choicePanel = document.getElementsByClassName('yes-no');

        for (let i = 0; i < choicePanel.length; i++) {
          choicePanel[0].parentNode.parentNode.removeChild(choicePanel[0].parentElement);
        }
      }

      if (this.step === 1) {
        newMessages.push({ type: 'user', message: this.declarationType });
      } else if (this.step === 3) {
        newMessages.push({ type: 'user', message: this.declarationLocation });
      } else if (this.step === 5) {
        newMessages.push({ type: 'user', message: this.declarationCost });
      } else if (this.step === 10) {
        newMessages.push({ type: 'user', message: this.declarationHasAttachment });
        newMessages.push({ type: 'upload-preview', message: this.declarationImage });
      } else if (this.step === 12) {
        newMessages.push({ type: 'user', message: this.declarationNote });
      }

      for (let i = 0; i < response.length; i++) {
        if (response[i].speech.trim() != '') {
          newMessages.push({ type: 'bot', message: response[i].speech });
        }
      }

      if (this.step === 7) {
        newMessages.push({ type: 'check', message: '' });
      } else if (this.step === 14) {
        newMessages.push({ type: 'finalOptions', message: '' });
      }

      this.displayMessages(newMessages);
      store.commit('incrementChatStep');
    },
    declarationHasAttachment() {
      store.commit('incrementChatStep');

      Vue.nextTick(function() {
        document.getElementById('triggerUpload').click();
      });
    },
    declarationSent() {
      this.getBotProviderResponse('declaration sent');
      store.commit('incrementChatStep');
    },
    declarationType() {
      this.getBotProviderResponse(this.declarationType);
      store.commit('incrementChatStep');
    },
    step(newStep) {
      //console.log(`step: ${newStep}`);

      if (newStep === 2) {
        this.placeholderText = this.placeholderDefaultText;
      } else if (newStep === 10) {
        this.getBotProviderResponse('upload success');
      }
    },
    routerPath(newPath) {
      this.$router.push({ path: '/' + newPath });
    },
  },
  methods: {
    addDeclarationCost() {
      store.commit('addDeclarationCost', this.declarationCostValue);
      this.getBotProviderResponse(this.declarationCostValue);
      store.commit('incrementChatStep');
    },
    addDeclarationDate() {
      store.commit('addDeclarationDate', moment(this.declarationDateValue).format('Do of MMMM, YYYY'));
      this.getBotProviderResponse(this.declarationDateValue);
      store.commit('incrementChatStep');
    },
    addDeclarationLocation() {
      store.commit('addDeclarationLocation', this.declarationLocationValue);
      this.getBotProviderResponse(this.declarationLocationValue);
      store.commit('incrementChatStep');
    },
    addDeclarationNote() {
      store.commit('addDeclarationNote', this.declarationNoteValue);
      this.getBotProviderResponse('note added');
      store.commit('incrementChatStep');
    },
    displayMessages(messages) {
      let delay = 0;

      for (let i = 0; i < messages.length; i++) {
        let newDelay = delay;

        if (messages[i].type.toLowerCase() === 'bot' || messages[i].type.toLowerCase() === 'user') {
          if (messages[i].message.length > 0) {
            delay += 33 * messages[i].message.length;
            newDelay = delay;
          }
        } else if (messages[i].type.toLowerCase() === 'options') {
          newDelay += 1000;
        }

        setTimeout(() => {
          const ChatBlockClass = Vue.extend(ChatBlock);
          const newChatBlock = new ChatBlockClass();

          newChatBlock.$mount();
          newChatBlock.type = messages[i].type;
          newChatBlock.message = messages[i].message;

          this.$refs.chatcontainer.appendChild(newChatBlock.$el);
        }, newDelay);
      }
    },
    getBotProviderResponse(queryString) {
      const config = {
        headers: {
          Authorization: 'Bearer a235d778290748dbba39d071d92612ee',
          'Content-Type': 'application/json',
        },
      };

      const data = {
        contexts: [' '],
        lang: 'en',
        query: queryString,
        sessionId: '12345',
      };

      axios.post('https://api.dialogflow.com/v1/query?v=20190630', data, config).then(response => {
        this.chatResponse = response.data.result.fulfillment.messages;
      });
    },
    startChatting() {
      const initialChatMessages = [
        { type: 'bot', message: `'Hello ${this.userName}, let's start the declaration process.` },
        { type: 'bot', message: 'What kind of cost have you made?' },
        { type: 'options', values: ['Food', 'Travel', 'Training', 'Hotel', 'Gifts', 'Other'] },
      ];

      this.displayMessages(initialChatMessages);
    },

    loadFile(event) {
      let input = event.target;
      let imageData = '';

      let self = this;

      if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.addEventListener(
          'load',
          function() {
            imageData = reader.result;

            self.$store.commit('addDeclarationImage', imageData);
            self.$store.commit('incrementChatStep');
          },
          false
        );

        reader.readAsDataURL(input.files[0]);
      }
    },
    openLoadFile() {
      document.getElementById('upload-hidden').click();
    },
    showDeclarationOverview() {
      store.commit('toggleChatDeclarationOverview');
    },
    triggerUpload() {
      this.$refs.uploadAttachment.click();
    },
  },
};
</script>