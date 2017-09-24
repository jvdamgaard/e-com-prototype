<template>
  <highlighted-content :items="items"/>
</template>

<script>
import HighlightedContent from './HighlightedContent.vue';

export default {
  components: {
    HighlightedContent,
  },
  data() {
    return {
      items: [{
        id: 'USP-1',
        html: `
          <p><img src="https://www.bilka.dk/medias/sys_master/images/9108814921758/KHlogo_174x87.png" /></p>
          <p>Altid <strong>fri fragt</strong> til Bilka, føtex eller NETTO</p>
        `,
      }, {
        id: 'USP-2',
        html: `
          <p><img src="https://bilkadk.imgix.net/medias/sys_master/root/h11/h69/9250093432862.png" /></p>
          <p><strong>30 dages returret</strong></p>
        `,
      }, {
        id: 'USP-3',
        html: `
          <p><img src="https://bilkadk.imgix.net/medias/sys_master/root/h0e/h69/9250093334558/Fragt.png" /></p>
          <p><strong>Fri fragt</strong> på ordre over 1000,-</p>
        `,
      }],
    };
  },
};
</script>

<style>
</style>
