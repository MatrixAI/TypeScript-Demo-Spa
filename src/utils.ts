async function sleep(t) {
  return await new Promise((r) => setTimeout(r, t));
}

function debounce(f, t = 0) {
  let timeout;
  return function (...args) {
    const later = () => {
      timeout = null;
      f(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, t);
  };
}

export { sleep, debounce };
