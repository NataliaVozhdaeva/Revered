//mobile-menu

const menuIcon = document.querySelector('.navigation-mobile');
const menuItems = document.querySelectorAll('.navigation-item');
const nav = document.querySelector('.navigation');

const toggleMobileMenu = () => {
  nav.style.transition = 'transform 0.55s cubic-bezier(0.785, 0.135, 0.15, 0.86)';
  menuIcon.classList.toggle('clicked');
  nav.classList.toggle('show');
};

menuIcon.addEventListener('click', toggleMobileMenu);

menuItems.forEach((item) => {
  item.addEventListener('click', toggleMobileMenu);
});

document.addEventListener('click', (e) => {
  if (e.target != nav && nav.classList.contains('show') && e.target != menuIcon) {
    toggleMobileMenu();
  }
});

//hover for cards

const cards = document.querySelectorAll('.offer-item');
const cardBtns = document.querySelectorAll('.offer-btn');

const makeContent = (el) => {
  el.querySelector('.offer-btn').textContent = el.classList.contains('active') ? 'Get Started' : 'Start Free Trial';
};

cards.forEach((item) => makeContent(item));

const makeActive = (e) => {
  cards.forEach((item) => {
    item.classList.remove('active');
  });
  e.currentTarget.classList.add('active');
  cards.forEach((item) => makeContent(item));
};

cards.forEach((item) => {
  item.addEventListener('click', makeActive); //mouseover as a variant
  item.addEventListener('touchstart', makeActive);
});

// smooth appearance

const showCard = (el) => {
  console.log(el, count);
  el.style.transform = 'scale(1)';
};

window.addEventListener('load', () => {
  count = 0;

  const intervalId = setInterval(function () {
    showCard(cards[count]);
    count++;
    if (count === cards.length) {
      clearInterval(intervalId);
    }
  }, (count + 1) * 1000);
});
