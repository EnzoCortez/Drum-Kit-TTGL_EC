function playSound(e) {
  // allow click/tap as well
  let keyCode = e.keyCode || e.currentTarget && e.currentTarget.dataset && Number(e.currentTarget.dataset.key);
  if (!keyCode && e.type === 'click') {
    keyCode = Number(e.currentTarget.dataset.key);
  }
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition);
  key.addEventListener('click', playSound);
});

window.addEventListener('keydown', playSound);

// accessibility: allow focus + enter/space
keys.forEach(k => {
  k.setAttribute('tabindex', '0');
  k.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      playSound(ev);
    }
  });
});
