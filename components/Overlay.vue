
<template>
  <div
    v-if="state.overlayActive"
    :class="$style.overlay"
    @click.self="deactivate"
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
    }, 500),
    deactivate() {
      if (this.hover) {
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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
</style>
