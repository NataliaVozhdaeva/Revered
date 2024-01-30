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

//cards manipulation

const cards = document.querySelectorAll('.offer-item');
const cardBtns = document.querySelectorAll('.offer-btn');
const currencyArray = ['\u0024', '\u20BD', '\u20AC'];
//const exchangeRate = [100, 0.8];
const currencyPoints = document.querySelectorAll('.offer-currency');
const price = document.querySelectorAll('.offer-price');
let currencyCount = 0;

const makeContent = (el) => {
  el.querySelector('.offer-btn').textContent = el.classList.contains('active') ? 'Get Started' : 'Start Free Trial';
};

const countPrice = (currentCurrency, currentPrice) => {
  switch (currentCurrency) {
    case '\u20BD':
      return Math.round(currentPrice * 80);

    case '\u20AC':
      return Math.round(currentPrice / 100);

    default:
      return Math.round(currentPrice * 1.25);
  }
};

const changeCurrency = () => {
  currencyCount === currencyArray.length - 1 ? (currencyCount = 0) : currencyCount++;
  currencyPoints.forEach((el, index) => {
    el.textContent = currencyArray[currencyCount];
    price[index].textContent = countPrice(el.textContent, price[index].textContent);
  });
};

cards.forEach((item) => makeContent(item));

const handleChanges = (e) => {
  switch (true) {
    case e.target.classList.contains('offer-currency'):
      changeCurrency();

      break;

    default:
      cards.forEach((item) => {
        item.classList.remove('active');
      });
      e.currentTarget.classList.add('active');
      cards.forEach((item) => makeContent(item));
      break;
  }
};

cards.forEach((item) => {
  item.addEventListener('click', handleChanges);
  item.addEventListener('touchstart', handleChanges);
});

// smooth appearance

const showCard = (el) => {
  el.style.transform = 'scale(1)';
};

window.addEventListener('load', () => {
  document.querySelector('.loader-box').style.display = 'none';

  let count = 0;

  const intervalId = setInterval(function () {
    showCard(cards[count]);
    count++;
    if (count === cards.length) {
      clearInterval(intervalId);
    }
  }, (count + 1) * 100);
});
