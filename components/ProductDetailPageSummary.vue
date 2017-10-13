<template>
  <div>
    <breadcrumb
      :paths="breadcrumbPaths"
      :current="product.titel"
    />
    <grid fullWidthOnSmallDevices class="has-no-top-margin">
      <div class="is-12-col has-white-background">
        <grid inner rowGap="none">
          <div class="is-1-col is-hidden-on-mobile is-visible-on-desktop">
            <thumbnails
              :images="product.images"
              :imagePosition="imagePosition"
              :changeImagePosiiton="setImagePosition"
            />
          </div>
          <div class="is-12-col is-6-col-on-tablet has-large-vertical-padding">
            <product-image
              :images="product.images"
              :imagePosition="imagePosition"
              :changeImagePosiiton="setImagePosition"
            />
          </div>
          <div class="is-12-col is-6-col-on-tablet is-5-col-on-desktop">
            <summary-box :product="product" />
          </div>
          <div class="is-12-col is-hidden-on-laptop has-padding" :class="$style.borderTop">
            <add-to-cart
              shadow
              hideReadMore
              height="large"
              quantityLabel="lagt i kurven"
              :product="product"
            />
            <p class="has-tiny-top-margin"><strong class="is-green">På lager.</strong> Kan også afhentes i 9 butikker. <a href="#">Se hvilke butikker</a></p>
            <p class="has-tiny-top-margin"><strong>3-5 dages til 29,-</strong> Eller få den allerede i morgen ved valg af hurtigere leveringsmulighed. <a href="#">Se alle leveringsmuligheder</a></p>
          </div>
          <div class="is-12-col is-hidden-on-tablet has-padding" :class="$style.borderTop">
            <p>{{product.shortDescription.slice(0,250)}}... <a href="#description">Læs mere</a></p>
            <h2 class="has-small-top-margin">Nøglespecifikationer</h2>
            <ul class="is-unstyled-list has-tiny-top-margin">
              <li v-for="keySpec in product.keySpecifications">
                <strong class="is-dimmed">{{keySpec.key}}:</strong> {{keySpec.value}}
              </li>
            </ul>
            <p class="has-tiny-top-margin"><a href="#specifications">Se alle specifikationer</a></p>
          </div>
        </grid>
      </div>
    </grid>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // eslint-disable-line
import kebabCase from 'lodash/kebabCase';
import Grid from './Grid.vue';
import Breadcrumb from './Breadcrumb.vue';
import ProductDetailPageSummaryThumbnails from './ProductDetailPageSummaryThumbnails.vue';
import ProductDetailPageSummaryBox from './ProductDetailPageSummaryBox.vue';
import ProductImage from './ProductImage.vue';
import AddToCart from './AddToCart.vue';

export default {
  components: {
    Grid,
    Breadcrumb,
    Thumbnails: ProductDetailPageSummaryThumbnails,
    SummaryBox: ProductDetailPageSummaryBox,
    ProductImage,
    AddToCart,
  },
  props: {
    product: Object,
    departments: Array,
  },
  data() {
    return {
      imagePosition: 0,
    };
  },
  computed: {
    breadcrumbPaths() {
      return this.departments.map((department, i) => {
        const currentPaths = this.departments.slice(0, i + 1).map(kebabCase);
        return {
          titel: department,
          url: `/afdeling/${currentPaths.join('/')}/`,
        };
      });
    },
  },
  methods: {
    setImagePosition(position) {
      this.imagePosition = position;
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.floatingBuy {
  position: fixed !important;
  top: 3.5rem; /* avoid ios tap */
  left: 0;
  right: 0;
  transform: translateZ(0);
  z-index: 100;
}

.borderTop {
  border-top: 1px solid var(--color-grey-lighter);
}

</style>
