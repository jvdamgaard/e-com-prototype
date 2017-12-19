<template>
  <footer :class="$style.container">
    <!-- <unique-selling-points /> -->
    <footer-highlighted-content />
    <grid row-gap="large" :class="$style.links">
      <grid-col
        v-for="linkSection in linkSections"
        :key="linkSection.header"
        phablet="6"
        tablet="3"
        laptop="2"
      >
        <h3 :class="$style.header">{{ linkSection.header }}</h3>
        <p v-for="link in linkSection.links">
          <nuxt-link to="/" :class="$style.link">{{ link.label }}</nuxt-link>
        </p>
      </grid-col>
      <grid-col laptop="4">
        <h3 :class="$style.header">Tilmeld nyhedsbrev</h3>
        <div :class="$style.newsletterGroup">
          <input type="text" placeholder="Din e-mail adresse" :class="$style.newsletterInput">
          <Btn type="grey" height="small" :class="$style.newsletterBtn">Tilmeld</Btn>
        </div>
        <p :class="$style.newsletterDescription">
          Tilmeld dig mrkts nyhedsbrev og få ugens tilbudsavis samt gode tilbud, information om spændende kampagner og konkurrencer.<br>
          Hver måned trækkes en vinder af tre måneders forbrug af Nivea produkter til dame eller herre blandt alle modtagere af nyhedsmailen.
        </p>
      </grid-col>
    </grid>
    <grid row-gap="large" :class="$style.links">
      <grid-col
        v-for="imageSection in imageSections"
        :key="imageSection.header"
        tablet="4"
      >
        <h3 :class="$style.header">{{ imageSection.header }}</h3>
        <p>
          <img
            v-for="image in imageSection.images"
            v-lazy="image.src"
            />
        </p>
      </grid-col>
    </grid>
    <grid :class="$style.bottomNav">
      <grid-col tablet="6">
        <p>Copyright mrkt</p>
      </grid-col>
      <grid-col tablet="6">
        <p :class="$style.bottomNavLinks">
          <nuxt-link to="/">Datapolitk</nuxt-link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <nuxt-link to="/">Handelsbetingelser</nuxt-link>
        </p>
      </grid-col>
    </grid>
  </footer>
</template>

<script>
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import Btn from './Btn.vue';
// import UniqueSellingPoints from './UniqueSellingPoints.vue';
import FooterHighlightedContent from './FooterHighlightedContent.vue';

export default {
  components: {
    Grid,
    GridCol,
    // UniqueSellingPoints,
    FooterHighlightedContent,
    Btn,
  },
  data() {
    return {
      linkSections: [{
        header: 'mrkt',
        links: [
          { label: 'Om os', link: '/' },
          { label: 'Kerneværdier', link: '/' },
          { label: 'Karriere', link: '/' },
          { label: 'Blog', link: '/' },
          { label: 'Engineering', link: '/' },
          { label: 'Sitemap', link: '/' },
        ],
      }, {
        header: 'Brug hjælp?',
        links: [
          { label: 'Kundeservice', link: '/' },
          { label: 'Sådan handler du på mrkt.io', link: '/' },
          { label: 'Levering', link: '/' },
          { label: 'Returnering', link: '/' },
          { label: 'Reklamation', link: '/' },
        ],
      }, {
        header: 'Inspiration & Tips',
        links: [
          { label: 'Shopping inspiration', link: '/' },
          { label: 'Shopping guides', link: '/' },
        ],
      }, {
        header: 'Tjen sammen med os',
        links: [
          { label: 'Online shopping', link: '/' },
          { label: 'Sælg på mrkt.io', link: '/' },
          { label: 'Annoncer på mrkt.io', link: '/' },
          { label: 'Medie forespørgsler', link: '/' },
          { label: 'Bliv en affiliate', link: '/' },
        ],
      }],
      imageSections: [{
        header: 'Betalingsmuligheder',
        images: [
          { src: 'https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/dankort.png' },
          { src: 'https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/master-card.png' },
          { src: 'https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/mobilepay.png' },
          { src: 'https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/paypal.png' },
          { src: 'https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/visa-electron.png' },
          { src: 'https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/visa.png' },
        ],
      }, {
        header: 'Partnere',
        images: [
          { src: 'https://jvdamgaard.github.io/e-com-prototype/icons/partners/iposen.png' },
          { src: 'https://jvdamgaard.github.io/e-com-prototype/icons/partners/wupti.png' },
        ],
      }, {
        header: 'Følg os',
        images: [
          { src: 'https://jvdamgaard.github.io/e-com-prototype/icons/social-media/facebook.png' },
          { src: 'https://jvdamgaard.github.io/e-com-prototype/icons/social-media/instagram.png' },
          { src: 'https://jvdamgaard.github.io/e-com-prototype/icons/social-media/twitter.png' },
          { src: 'https://jvdamgaard.github.io/e-com-prototype/icons/social-media/youtube.png' },
        ],
      }],
    };
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container > * { margin-bottom: 1px; }
.container > *:not(:first-child) { margin-top: 1px; }

.header { margin-bottom: 1rem; }

.links {
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
  background-color: var(--color-white);
}

.links img {
  display: inline-block;
  height: 1.5rem;
  margin-right: 1rem;
}

.link {
  composes: small from global;
  color: var(--color-grey-darker);
}

.newsletterGroup {
  composes: group from global;
}
.newsletterInput {
  background-color: var(--color-grey-lighter);
  border: 0;
}
.newsletterBtn { width: auto; }
.newsletterDescription {
  composes: small from global;
  color: var(--color-grey-dark);
}

.bottomNav {
  composes: links;
  composes: small from global;
  background-color: var(--color-white);
  color: var(--color-grey-darker);
}
.bottomNav a { color: var(--color-grey-darker); }
.bottomNavLinks { text-align: right; }
</style>
