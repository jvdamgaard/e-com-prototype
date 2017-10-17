<template>
  <div>
    <breadcrumb
      :paths="breadcrumbPaths"
      :current="product.titel"
      class="is-hidden-on-mobile is-visible-on-tablet"
    />
    <grid fullWidthUntil="tablet" class="has-no-top-margin">
      <div class="is-12-col has-white-background">
        <grid inner rowGap="none" colGap="none">
          <div class="is-1-col is-hidden-on-mobile is-visible-on-desktop">
            <thumbnails
              :images="variantImages"
              :imagePosition="imagePosition"
              :changeImagePosiiton="setImagePosition"
              :limit="8"
            />
          </div>
          <div class="is-12-col is-6-col-on-tablet">
            <product-sticker :product="product" :class="$style.sticker" />
            <div :class="$style.marginImage">
              <product-image
                :images="variantImages"
                :imagePosition="imagePosition"
                :changeImagePosiiton="setImagePosition"
              />
            </div>
            <div :class="$style.marginThumbnail">
              <thumbnails
                :images="variantImages"
                :imagePosition="imagePosition"
                :changeImagePosiiton="setImagePosition"
                class="is-hidden-on-desktop"
              />
            </div>
          </div>
          <div class="is-12-col is-6-col-on-tablet is-5-col-on-desktop">
            <summary-box
              :product="product"
              :activeVariants="activeVariants"
              :changeVariant="changeVariant"
            />
          </div>
          <div class="is-12-col is-hidden-on-laptop has-padding" :class="$style.borderTop">
            <variants
              v-if="product.variants"
              :product="product"
              :activeVariants="activeVariants"
              :changeVariant="changeVariant"
            />
            <price
              :product="product"
              :activeVariants="activeVariants"
              class="has-bottom-margin" />
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
    <div ref="stickyContainer" />
    <grid
      :class="[
        $style.stickyContainer,
        {
          [$style.stickyContainerSticks]: sticky,
        },
      ]"
      :style="{ top: stickyTopPosition }"
    >
      <div class="is-9-col is-10-col-on-desktop" />
      <div class="is-3-col is-2-col-on-desktop">
        <product-card
          :product="product"
          :images="variantImages"
          lazy
          static
          ref="stickyProductCard"
          class="is-hidden-on-mobile is-visible-on-laptop"
        />
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
import ProductDetailPageSummaryPrice from './ProductDetailPageSummaryPrice.vue';
import ProductDetailPageSummaryVariants from './ProductDetailPageSummaryVariants.vue';
import ProductImage from './ProductImage.vue';
import AddToCart from './AddToCart.vue';
import ProductSticker from './ProductSticker.vue';
import ProductCard from './ProductCard.vue';

export default {
  components: {
    Grid,
    Breadcrumb,
    Thumbnails: ProductDetailPageSummaryThumbnails,
    SummaryBox: ProductDetailPageSummaryBox,
    Stock: ProductDetailPageSummaryStock,
    Description: ProductDetailPageSummaryDescription,
    Price: ProductDetailPageSummaryPrice,
    Variants: ProductDetailPageSummaryVariants,
    ProductImage,
    AddToCart,
    ProductSticker,
    ProductCard,
  },
  props: {
    product: Object,
    departments: Array,
  },
  data() {
    return {
      imagePosition: 0,
      activeVariants: [],
      sticky: false,
      stickyTopPosition: 'auto',
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
    variantImages() {
      if (this.product.variants && this.product.variants.length > 0) {
        let variantImages = this.product.images;

        this.product.variants.some((variant, i) => {
          if (variant.items[0].images && variant.items[0].images.length > 0) {
            const activeVariant = this.activeVariants[i];
            variantImages = variant.items[activeVariant].images;
            return true;
          }
          return false;
        });

        return variantImages;
      }
      return this.product.images;
    },
  },
  methods: {
    ...mapActions({
      addToLastSeen: 'user/addToLastSeen',
    }),
    setImagePosition(position) {
      this.imagePosition = position;
    },
    changeVariant(variantPos, itemPos) {
      this.activeVariants = this.activeVariants.map((value, i) => {
        if (i === variantPos) {
          return itemPos;
        }
        return value;
      });
    },
    handleScroll() {
      const stickyOffset = 72;
      const sectionMargin = 56;
      const stickyTop = this.$refs.stickyContainer.getBoundingClientRect().top;
      const stickyHeight = this.$refs.stickyProductCard.$el.getBoundingClientRect().height;
      const {
        top: lastElTop,
      } = document.getElementsByClassName('section__ProductSlider')[0].getBoundingClientRect();
      const offsetFromBottom = lastElTop - stickyOffset - stickyHeight - sectionMargin;

      if (offsetFromBottom < 0) {
        const scrollTop = window.pageYOffset;
        const { clientTop } = document.documentElement;
        const lastElBottomPos = (lastElTop + scrollTop) - clientTop;
        this.stickyTopPosition = `${lastElBottomPos - stickyHeight - sectionMargin}px`;
        this.sticky = false;
      } else if (stickyTop <= stickyOffset) {
        this.stickyTopPosition = `${stickyOffset}px`;
        this.sticky = true;
      } else {
        this.stickyTopPosition = 'auto';
        this.sticky = false;
      }
    },
  },
  created() {
    if (this.product.variants) {
      this.activeVariants = this.product.variants.map(variant => variant.default);
    }
  },
  mounted() {
    this.addToLastSeen(this.product);

    if (process.browser) {
      this.handleScroll();
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll, { passive: true });
    }
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.sticker {
  top: 1rem;
  right: 0;
}

.borderTop {
  border-top: 1px solid var(--color-grey-lighter);
}

.marginThumbnail { margin: 1rem; }

.stickyContainer {
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  margin: 0;
  overflow: visible;
}

.stickyContainerSticks {
  position: fixed;
}

@media (min-width: 48rem) {
  .sticker { top: 2rem; }
  .marginImage { margin: 1rem; }
}

@media (min-width: 64rem) {
  .marginThumbnail, .marginImage { margin: 2rem; }
}

</style>
