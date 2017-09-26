<template>
  <highlighted-content :items="items" theme="primary"/>
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
          <p><img src="/icons/click-n-collect.svg" /></p>
          <p>Altid <strong>fri fragt</strong> til Bilka, føtex og NETTO</p>
        `,
      }, {
        id: 'USP-2',
        html: `
          <p><img src="/icons/returns.svg" /></p>
          <p><strong>30 dages returret</strong></p>
        `,
      }, {
        id: 'USP-3',
        html: `
          <p><img src="/icons/free-delivery.svg" /></p>
          <p><strong>Fri fragt</strong> på ordre over 1000,-</p>
        `,
      }],
    };
  },
};
</script>

<style>
</style>
