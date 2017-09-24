<template>
  <div class="Grid">
    <slot />
  </div>
</template>

<style>
  .Grid {
    display: grid;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: repeat(12, 1fr);
    margin: 1rem 0;
    padding: 0 1rem;
  }

  /* Align */
  .Grid.is-aligned-vertical-center > * {
    align-self: center;
  }

  .Grid > * { position: relative; }

  .Grid > .is-1-col { grid-column: span 1; }
  .Grid > .is-2-col { grid-column: span 2; }
  .Grid > .is-3-col { grid-column: span 3; }
  .Grid > .is-4-col { grid-column: span 4; }
  .Grid > .is-5-col { grid-column: span 5; }
  .Grid > .is-6-col { grid-column: span 6; }
  .Grid > .is-7-col { grid-column: span 7; }
  .Grid > .is-8-col { grid-column: span 8; }
  .Grid > .is-9-col { grid-column: span 9; }
  .Grid > .is-10-col { grid-column: span 10; }
  .Grid > .is-11-col { grid-column: span 11; }
  .Grid > .is-12-col { grid-column: span 12; }

  .Grid > .is-1-row { grid-row: span 1; }
  .Grid > .is-2-row { grid-row: span 2; }
  .Grid > .is-3-row { grid-row: span 3; }
  .Grid > .is-4-row { grid-row: span 4; }

  @media (min-width: 25rem) {

    .Grid > .is-1-col-on-phablet { grid-column: span 1; }
    .Grid > .is-2-col-on-phablet { grid-column: span 2; }
    .Grid > .is-3-col-on-phablet { grid-column: span 3; }
    .Grid > .is-4-col-on-phablet { grid-column: span 4; }
    .Grid > .is-5-col-on-phablet { grid-column: span 5; }
    .Grid > .is-6-col-on-phablet { grid-column: span 6; }
    .Grid > .is-7-col-on-phablet { grid-column: span 7; }
    .Grid > .is-8-col-on-phablet { grid-column: span 8; }
    .Grid > .is-9-col-on-phablet { grid-column: span 9; }
    .Grid > .is-10-col-on-phablet { grid-column: span 10; }
    .Grid > .is-11-col-on-phablet { grid-column: span 11; }
    .Grid > .is-12-col-on-phablet { grid-column: span 12; }

  }

  @media (min-width: 48rem) {
    
    .Grid { 
      grid-column-gap: 1rem;
      grid-row-gap: 1rem;
      margin: 2rem 0;
      padding: 0 2.5rem;
    }

    .Grid > .is-1-col-on-tablet { grid-column: span 1; }
    .Grid > .is-2-col-on-tablet { grid-column: span 2; }
    .Grid > .is-3-col-on-tablet { grid-column: span 3; }
    .Grid > .is-4-col-on-tablet { grid-column: span 4; }
    .Grid > .is-5-col-on-tablet { grid-column: span 5; }
    .Grid > .is-6-col-on-tablet { grid-column: span 6; }
    .Grid > .is-7-col-on-tablet { grid-column: span 7; }
    .Grid > .is-8-col-on-tablet { grid-column: span 8; }
    .Grid > .is-9-col-on-tablet { grid-column: span 9; }
    .Grid > .is-10-col-on-tablet { grid-column: span 10; }
    .Grid > .is-11-col-on-tablet { grid-column: span 11; }
    .Grid > .is-12-col-on-tablet { grid-column: span 12; }

  }

  @media (min-width: 64rem) {
    
    .Grid { 
      margin: 3.5rem 0;
      padding: 0 4rem;
    }

    .Grid > .is-1-col-on-laptop { grid-column: span 1; }
    .Grid > .is-2-col-on-laptop { grid-column: span 2; }
    .Grid > .is-3-col-on-laptop { grid-column: span 3; }
    .Grid > .is-4-col-on-laptop { grid-column: span 4; }
    .Grid > .is-5-col-on-laptop { grid-column: span 5; }
    .Grid > .is-6-col-on-laptop { grid-column: span 6; }
    .Grid > .is-7-col-on-laptop { grid-column: span 7; }
    .Grid > .is-8-col-on-laptop { grid-column: span 8; }
    .Grid > .is-9-col-on-laptop { grid-column: span 9; }
    .Grid > .is-10-col-on-laptop { grid-column: span 10; }
    .Grid > .is-11-col-on-laptop { grid-column: span 11; }
    .Grid > .is-12-col-on-laptop { grid-column: span 12; }

  }

  @media (min-width: 96rem) {

    .Grid > .is-1-col-on-desktop { grid-column: span 1; }
    .Grid > .is-2-col-on-desktop { grid-column: span 2; }
    .Grid > .is-3-col-on-desktop { grid-column: span 3; }
    .Grid > .is-4-col-on-desktop { grid-column: span 4; }
    .Grid > .is-5-col-on-desktop { grid-column: span 5; }
    .Grid > .is-6-col-on-desktop { grid-column: span 6; }
    .Grid > .is-7-col-on-desktop { grid-column: span 7; }
    .Grid > .is-8-col-on-desktop { grid-column: span 8; }
    .Grid > .is-9-col-on-desktop { grid-column: span 9; }
    .Grid > .is-10-col-on-desktop { grid-column: span 10; }
    .Grid > .is-11-col-on-desktop { grid-column: span 11; }
    .Grid > .is-12-col-on-desktop { grid-column: span 12; }

  }
</style>
