export default () => {
  let timer;
  let scrolling = false;

  window.addEventListener('scroll', () => {
    clearTimeout(timer);
    if (!scrolling) {
      document.body.classList.add('disable-hover');
    }
    scrolling = true;

    timer = setTimeout(() => {
      document.body.classList.remove('disable-hover');
      scrolling = false;
    }, 250);
  }, { passive: true });
};
