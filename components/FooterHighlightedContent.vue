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
        id: 'FHC-1',
        html: `
          <p><img src="https://jvdamgaard.github.io/e-com-prototype/icons/security-badge.png" /></p>
          <h2>100% sikker betaling</h2>
          <p class="is-small">Alle større kreditkort og MobilePay er accepteret.</p>
        `,
      }, {
        id: 'FHC-2',
        html: `
          <p><img src="https://jvdamgaard.github.io/e-com-prototype/icons/secure-trace.png" /></p>
          <h2>Sikker handel</h2>
          <p class="is-small">Køberbeskyttelse på 10.000 kr og en nem og overskuelig handel.</p>
        `,
      }, {
        id: 'FHC-3',
        html: `
          <p><img src="https://jvdamgaard.github.io/e-com-prototype/icons/customer-service.png" /></p>
          <h2>Kundeservice</h2>
          <p class="is-small">Har du et spørgsmål? Fortvivl ikke. Se vores FAQ eller send os en forespørgsel.</p>
        `,
      }, {
        id: 'FHC-4',
        html: `
          <p><img src="https://jvdamgaard.github.io/e-com-prototype/icons/mobile-app.png" /></p>
          <h2>Shop på farten</h2>
          <p class="is-small">Download vores prisvindende app både til iPhone og Android.</p>
        `,
      }],
    };
  },
};
</script>

<style></style>
