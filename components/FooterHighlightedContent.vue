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
        icon: '/icons/ic_payment_primary_24px.svg',
        html: `
          <h2>100% sikker betaling</h2>
          <p class="is-small">Alle større kreditkort og MobilePay er accepteret.</p>
        `,
      }, {
        id: 'FHC-2',
        icon: '/icons/ic_security_primary_24px.svg',
        html: `
          <h2>Sikker handel</h2>
          <p class="is-small">Køberbeskyttelse på 10.000 kr og en nem og overskuelig handel.</p>
        `,
      }, {
        id: 'FHC-3',
        icon: '/icons/ic_headset_mic_primary_24px.svg',
        html: `
          <h2>Kundeservice</h2>
          <p class="is-small">Har du et spørgsmål? Fortvivl ikke. Se vores FAQ eller send os en forespørgsel.</p>
        `,
      }, {
        id: 'FHC-4',
        icon: '/icons/ic_phone_iphone_primary_24px.svg',
        html: `
          <h2>Shop på farten</h2>
          <p class="is-small">Download vores prisvindende app både til iPhone og Android.</p>
        `,
      }],
    };
  },
};
</script>

<style></style>
