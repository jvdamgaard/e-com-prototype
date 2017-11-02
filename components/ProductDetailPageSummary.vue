<template>
  <div>
    <breadcrumb
      :paths="breadcrumbPaths"
      :current="product.titel"
      class="hiddenOnMobile visibleOnTablet"
    />
    <grid fullWidthUntil="tablet" :class="$style.grid">
      <grid-col :class="$style.background">
        <grid inner rowGap="none" colGap="none">
          <grid-col mobile="0" desktop="1">
            <thumbnails
              :images="variantImages"
              :imagePosition="imagePosition"
              :changeImagePosiiton="setImagePosition"
              :limit="8"
            />
          </grid-col>
          <grid-col tablet="6">
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
                class="hiddenOnDesktop"
              />
            </div>
          </grid-col>
          <grid-col tablet="6" desktop="5">
            <summary-box
              :product="product"
              :activeVariants="activeVariants"
              :changeVariant="changeVariant"
            />
          </grid-col>
          <grid-col laptop="0" :class="$style.borderTop">
            <variants
              v-if="product.variants"
              :product="product"
              :activeVariants="activeVariants"
              :changeVariant="changeVariant"
            />
            <price
              :product="product"
              :activeVariants="activeVariants"
              :class="$style.price" />
            <add-to-cart
              shadow
              hideReadMore
              height="large"
              quantityLabel="lagt i kurven"
              ref="mobileAddToCart"
              :product="product"
            />
            <stock :product="product" />
          </grid-col>
          <grid-col tablet="0" :class="$style.borderTop">
            <description :product="product" />
          </grid-col>
        </grid>
      </grid-col>
    </grid>
    <sticky-scroll-wrapper :bottomEl="lastDescription" :heightEl="stickyProductCard">
      <grid :class="$style.stickyContainer">
        <grid-col mobile="9" desktop="10" />
        <grid-col mobile="3" desktop="2">
          <product-card
            :product="product"
            :images="variantImages"
            lazy
            static
            ref="stickyProductCard"
            class="hiddenOnMobile visibleOnLaptop"
          />
        </grid-col>
      </grid>
    </sticky-scroll-wrapper>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // eslint-disable-line
import kebabCase from 'lodash/kebabCase';
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import Breadcrumb from './Breadcrumb.vue';
import Thumbnails from './ProductDetailPageSummaryThumbnails.vue';
import SummaryBox from './ProductDetailPageSummaryBox.vue';
import Stock from './ProductDetailPageSummaryStock.vue';
import Description from './ProductDetailPageSummaryDescription.vue';
import Price from './ProductDetailPageSummaryPrice.vue';
import Variants from './ProductDetailPageSummaryVariants.vue';
import ProductImage from './ProductImage.vue';
import AddToCart from './AddToCart.vue';
import ProductSticker from './ProductSticker.vue';
import ProductCard from './ProductCard.vue';
import StickyScrollWrapper from './StickyScrollWrapper.vue';

export default {
  components: {
    Grid,
    GridCol,
    Breadcrumb,
    Thumbnails,
    SummaryBox,
    Stock,
    Description,
    Price,
    Variants,
    ProductImage,
    AddToCart,
    ProductSticker,
    ProductCard,
    StickyScrollWrapper,
  },
  props: {
    product: Object,
    departments: Array,
  },
  data() {
    return {
      imagePosition: 0,
      activeVariants: [],
      lastDescription: null,
      stickyProductCard: null,
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
  },
  created() {
    if (this.product.variants) {
      this.activeVariants = this.product.variants.map(variant => variant.default);
    }
  },
  mounted() {
    this.addToLastSeen(this.product);
    const descriptionSections = document.getElementsByClassName('section__ProductDetailPageDescription');
    this.lastDescription = descriptionSections[descriptionSections.length - 1];
    this.stickyProductCard = this.$refs.stickyProductCard.$el;
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.grid { margin-top: 0; }
.background { background-color: var(--color-white); }

.sticker {
  top: 1rem;
  right: 0;
}

.borderTop {
  border-top: 1px solid var(--color-grey-lighter);
  padding: 1rem;
}

.price { margin-bottom: 2rem; }

.marginThumbnail { margin: 1rem; }

.stickyContainer {
  margin: 0;
}

@media (min-width: 48rem) {
  .sticker { top: 2rem; }
  .marginImage { margin: 1rem; }
}

@media (min-width: 64rem) {
  .marginThumbnail, .marginImage { margin: 2rem; }
}

</style>
