import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    chat: {
      step: 0,
      showOverview: false,
    },
    declaration: {
      number: '',
      status: 'Concept',
      type: '',
      date: '',
      employeeNumber: '',
      employeeName: '',
      bankNumber: '',
      cost: '',
      location: '',
      hasAttachment: false,
      image: '',
      note: '',
      sent: false,
    },
    declarations: [
      {
        number: '',
        status: 'Requested',
        type: 'Hotel',
        date: '15/03/2019',
        employeeNumber: '',
        employeeName: '',
        bankNumber: '',
        cost: '',
        location: 'Greece',
        attachment: false,
        image: '',
        note: '',
      },
      {
        number: '',
        status: 'Paid',
        type: 'Food',
        date: '15/01/2019',
        employeeNumber: '',
        employeeName: '',
        bankNumber: '',
        cost: '',
        location: 'Hilton Amsterdam',
        attachment: false,
        image: '',
        note: '',
        sent: true,
      },
      {
        number: '',
        status: 'Concept',
        type: 'Equipment',
        date: '02/04/2019',
        employeeNumber: '',
        employeeName: '',
        bankNumber: '',
        cost: '',
        location: 'Apple Store',
        attachment: false,
        image: '',
        note: '',
        sent: true,
      },
      {
        number: '',
        status: 'Concept',
        type: 'Travel',
        date: '19/03/2019',
        employeeNumber: '',
        employeeName: '',
        bankNumber: '',
        cost: '',
        location: 'Norway',
        attachment: false,
        image: '',
        note: '',
        sent: true,
      },
    ],
    router: {
      path: '/',
    },
    user: {
      name: '',
    },
  },
  mutations: {
    addDeclarationCost(state, cost) {
      state.declaration.cost = cost;
    },
    addDeclarationDate(state, date) {
      state.declaration.date = date;
    },
    addDeclarationImage(state, image) {
      state.declaration.image = image;
    },
    addDeclarationLocation(state, location) {
      state.declaration.location = location;
    },
    addDeclarationNote(state, note) {
      state.declaration.note = note;
    },
    addDeclarationType(state, declarationType) {
      state.declaration.type = declarationType;
    },
    hasAttachment(state, hasAttachment) {
      state.declaration.hasAttachment = hasAttachment;
    },
    incrementChatStep(state) {
      state.chat.step++;
    },
    isDeclarationSent(state, isSent) {
      state.declaration.sent = isSent;
    },
    setChatStep(state, step) {
      state.chat.step = step;
    },
    setRouterPath(state, path) {
      state.router.path = path;
    },
    toggleChatDeclarationOverview(state) {
      state.chat.showOverview = !state.chat.showOverview;
    },
  },
});
