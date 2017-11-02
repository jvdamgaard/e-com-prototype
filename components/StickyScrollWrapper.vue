<template>
  <div>
    <div ref="top" />
    <div
      :class="[
        $style.stickyContainer,
        { [$style.stickyContainerSticks]: sticky },
      ]"
      :style="{ top: stickyTopPosition }"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    offsetTop: {
      type: Number,
      default: 72,
    },
    offsetBottom: {
      type: Number,
      default: 0,
    },
    heightEl: HTMLElement,
    bottomEl: HTMLElement,
  },
  data() {
    return {
      sticky: false,
      stickyTopPosition: 'auto',
    };
  },
  methods: {
    handleScroll() {
      if (!this.bottomEl || !this.heightEl) { return; }

      const stickyTop = this.$refs.top.getBoundingClientRect().top;
      const stickyHeight = this.heightEl.getBoundingClientRect().height;
      const {
        bottom: lastElBottom,
      } = this.bottomEl.getBoundingClientRect();

      const offsetFromBottom = lastElBottom
        - this.offsetTop
        - stickyHeight
        - this.offsetBottom;

      if (offsetFromBottom < 0) {
        const scrollTop = window.pageYOffset;
        const { clientTop } = document.documentElement;
        const lastElBottomPos = (lastElBottom + scrollTop) - clientTop;
        this.stickyTopPosition = `${lastElBottomPos - stickyHeight - this.offsetBottom}px`;
        this.sticky = false;
      } else if (stickyTop <= this.offsetTop) {
        this.stickyTopPosition = `${this.offsetTop}px`;
        this.sticky = true;
      } else {
        this.stickyTopPosition = 'auto';
        this.sticky = false;
      }
    },
  },
  mounted() {
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

</style>
