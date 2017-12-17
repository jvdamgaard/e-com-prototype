
<template>
  <div
    :class="[$style.overlay, { [$style.active]: state.overlayActive}]"
    @click.self="deactivateOverlay"
    @mouseover.self="over"
    @mouseleave.self="leave"
  ></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import debounce from 'lodash/debounce';

export default {
  computed: {
    ...mapState(['state']),
  },
  methods: {
    ...mapActions({
      deactivateOverlay: 'state/deactivateOverlay',
    }),
    debounceDeactivate: debounce((deactivateNav) => {
      deactivateNav();
    }, 250),
    deactivate() {
      if (this.hover && this.state.overlayHoverClose) {
        this.deactivateOverlay();
      }
    },
    leave() { this.hover = false; this.debounceDeactivate(this.deactivate); },
    over() { this.hover = true; this.debounceDeactivate(this.deactivate); },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.active {
  z-index: 99;
  opacity: 1;
}
</style>
