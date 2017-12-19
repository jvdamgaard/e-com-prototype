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
        icon: '/icons/click-n-collect.svg',
        html: `
          <p>Altid <strong>fri fragt</strong> til Bilka, føtex og NETTO</p>
        `,
      }, {
        id: 'USP-2',
        icon: '/icons/returns.svg',
        html: `
          <p><strong>30 dages returret</strong></p>
        `,
      }, {
        id: 'USP-3',
        icon: '/icons/free-delivery.svg',
        html: `
          <p><strong>Fri fragt</strong> på ordre over 1000,-</p>
        `,
      }],
    };
  },
};
</script>

<style>
</style>
