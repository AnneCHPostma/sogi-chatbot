<template src="./DeclarationsOverview.html"></template>
<style src="./DeclarationsOverview.css"></style>
<script>
export default {
  name: 'DeclarationsOverview',
  props: {
    title: String,
  },
  data() {
    return {
      myOverview: 'My overview',
      ammenities: [
        {
          bullet: '• ',
          item: 'Hotel',
          place: 'Greece',
          status: 'Requested',
          date: '15/03/2019',
        },
        {
          bullet: '• ',
          item: 'Food',
          place: 'Hilton Amsterdam',
          status: 'Paid',
          date: '15/01/2019',
        },
        {
          bullet: '• ',
          item: 'Equipment',
          place: 'Apple Adapter',
          status: 'Concept',
          date: '02/04/2019',
        },
        {
          bullet: '• ',
          item: 'Travel',
          place: 'Norway',
          status: 'Concept',
          date: '19/03/2019',
        }
      ],
    };
  },
};
</script>