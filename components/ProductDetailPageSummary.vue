<template>
  <div>
    <breadcrumb
      :paths="breadcrumbPaths"
      :current="product.titel"
      class="is-hidden-on-mobile is-visible-on-tablet"
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
          <div class="is-12-col is-6-col-on-tablet has-large-vertical-padding has-horizontal-padding">
            <product-sticker :product="product" :class="$style.sticker" />
            <product-image
              :images="product.images"
              :imagePosition="imagePosition"
              :changeImagePosiiton="setImagePosition"
            />
            <thumbnails
              :images="product.images"
              :imagePosition="imagePosition"
              :changeImagePosiiton="setImagePosition"
              class="is-hidden-on-desktop"
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
            <stock :product="product" />
          </div>
          <div class="is-12-col is-hidden-on-tablet has-padding" :class="$style.borderTop">
            <description :product="product" />
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
import ProductDetailPageSummaryStock from './ProductDetailPageSummaryStock.vue';
import ProductDetailPageSummaryDescription from './ProductDetailPageSummaryDescription.vue';
import ProductImage from './ProductImage.vue';
import AddToCart from './AddToCart.vue';
import ProductSticker from './ProductSticker.vue';

export default {
  components: {
    Grid,
    Breadcrumb,
    Thumbnails: ProductDetailPageSummaryThumbnails,
    SummaryBox: ProductDetailPageSummaryBox,
    Stock: ProductDetailPageSummaryStock,
    Description: ProductDetailPageSummaryDescription,
    ProductImage,
    AddToCart,
    ProductSticker,
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
    ...mapActions({
      addToLastSeen: 'user/addToLastSeen',
    }),
    setImagePosition(position) {
      this.imagePosition = position;
    },
  },
  mounted() {
    this.addToLastSeen(this.product);
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.sticker {
  top: 1rem;
  right: 0;
}

@media (min-width: 48rem) {
  .sticker { right: -1rem; }
}

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
