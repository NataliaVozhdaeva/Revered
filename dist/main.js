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
const defaultPrices = [30, 276, 420];
const currencyPoints = document.querySelectorAll('.offer-currency');
const price = document.querySelectorAll('.offer-price');
const period = document.querySelectorAll('.offer-period');
let currencyCount = 0;

const makeContent = (el) => {
  el.querySelector('.offer-btn').textContent = el.classList.contains('active') ? 'Get Started' : 'Start Free Trial';
};

const countPrice = (currentCurrency, price, currentPeriod) => {
  if (currentPeriod === '/Months') {
    switch (currentCurrency) {
      case '\u20BD':
        return Math.round(price * 80);

      case '\u20AC':
        return Math.round(price * 0.8);

      default:
        return price;
    }
  } else {
    switch (currentCurrency) {
      case '\u20BD':
        return Math.ceil((price * 80) / 30);

      case '\u20AC':
        return Math.ceil((price * 0.8) / 30);

      default:
        return Math.ceil(price / 30);
    }
  }
};

const changeCurrency = () => {
  currencyCount = currencyCount === currencyArray.length - 1 ? 0 : (currencyCount += 1);
  currencyPoints.forEach((el, index) => {
    el.textContent = currencyArray[currencyCount];
    price[index].textContent = countPrice(el.textContent, defaultPrices[index], period[index].textContent);
  });
};

const handlePeriod = () => {
  period.forEach((el, index) => {
    el.textContent = el.textContent === '/Day' ? '/Months' : '/Day';
    price[index].textContent = countPrice(currencyArray[currencyCount], defaultPrices[index], el.textContent);
  });
};

cards.forEach((item) => makeContent(item));

const handleChanges = (e) => {
  switch (true) {
    case e.target.classList.contains('offer-currency'):
      changeCurrency();
      break;

    case e.target.classList.contains('offer-period'):
      handlePeriod();
      break;

    default:
      cards.forEach((item) => {
        item.classList.remove('active');
      });
      e.currentTarget.classList.add('active');
      cards.forEach((item) => makeContent(item));
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
