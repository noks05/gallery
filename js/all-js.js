(() => {
  // glop
  document.querySelectorAll('.js-scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const href = this.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
        top: elementPosition,
        behavior: 'smooth'
      });
    });
  });
  //  шапка
  // активация бургер меню
  function activeBurgerMenu(){
    const btnClose = document.querySelector('.head-mini__close');
    const btnBurgerMenu = document.querySelector('.head-mini__btn-burger-menu');
    const itemsBurgerMenu = document.querySelector('.burger-menu__list');
    const body = document.body;

    btnBurgerMenu.addEventListener('click', () => {
      const navMini = document.querySelector('.burger-menu');
      navMini.classList.add('burger-menu-active');
      body.classList.add('hidden-scroll');
    });
    btnClose.addEventListener('click', disabledBurgerMenu);
    itemsBurgerMenu.addEventListener('click', (e) => {
      const target = e.target;
      const checkItem = target.closest('.burger-menu__item');
      if (checkItem) disabledBurgerMenu();
    });
    function disabledBurgerMenu() {
      const navMini = document.querySelector('.burger-menu');
      navMini.classList.remove('burger-menu-active');
      body.classList.remove('hidden-scroll');
    }
  }
  activeBurgerMenu();


  // активация поля для поиска
  const btnSearch = document.getElementById('btn-search');

  btnSearch.addEventListener('click', () => {
    const searchBox = document.querySelector('.search-box');
    searchBox.classList.add('search-box-active');
  });
  const btnSearchClose = document.querySelector('.search-box__close');
  btnSearchClose.addEventListener('click', () => {
    const searchBox = btnSearchClose.closest('.search-box');

    searchBox.classList.remove('search-box-active');
  });


  //  меню с авторами из шапки
  function showSelectorArtists() {
    const linksNavStyles = document.querySelectorAll('.style-nav__btn');
    const listsAutors = document.querySelectorAll('.box-styles__autors');

    linksNavStyles.forEach((link) => {
      link.addEventListener('click', (event) => {
        const curTarget = event.currentTarget;

        linksNavStyles.forEach((it) => {
          if (it === curTarget) return;
          it.classList.remove('style-nav__btn-active');
        });
        curTarget.classList.toggle('style-nav__btn-active');
      });
    });

    listsAutors.forEach((list) => {
      list.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('.box-styles__autor')) {
          const parent = target.closest('.style-nav__item');
          console.log(parent.firstElementChild)
          parent.firstElementChild.classList.remove('style-nav__btn-active');
        }
      });
    });
  }
  showSelectorArtists();


  // Каталог
  function addListenerOnList() {
    const itemsList = document.querySelector('.years__list');
    itemsList.addEventListener('click', (e) => {

      function addActiveClass(event) {
        const target = event.target;
        const targetTitle = target.closest('.years__title');
        if (!targetTitle) return;
        const titleContr = document.querySelectorAll('.years__item');

        titleContr.forEach(item => item.classList.remove('years__item-active'));
        targetTitle.parentElement.classList.add('years__item-active');
      };
      addActiveClass(e);

      function addId(event) {
        const target = event.target;
        if (!target.classList.contains('years__btn')) return;

        const contrsDataArtist = document.querySelectorAll('.artist__contr');
        contrsDataArtist.forEach((item) => {
          item.classList.remove('artist__contr-active');
        });

        const idArtist = target.dataset.idArtist;
        const choicedArtist = document.getElementById(idArtist);
        const noneArtist = document.getElementById('none-artist');

        if (choicedArtist) {
          noneArtist.classList.remove('none-artist-active');
          choicedArtist.classList.add('artist__contr-active');
        } else {
          noneArtist.classList.add('none-artist-active');
        };
      };
      addId(e);
    });
  }
  addListenerOnList();


  //  модальные окна
  function addListener() {
    const modalWrapper = document.querySelector('.modal-wrapper');
    const zommItems = document.querySelectorAll('.gallery__slide');

    modalWrapper.addEventListener('click', (e) => {
      const clickOnBg = e.target.classList.contains('modal-wrapper');
      const clickOnClose = e.target.classList.contains('modal-close');
      const okSubmitMessage = e.target.classList.contains('submit-message__ok');

      if (clickOnBg || clickOnClose || okSubmitMessage) {
        actionModalWrapper(e, 'remove');
      }
    });
    zommItems.forEach((it) => {
      it.addEventListener('click', (e) => {
        actionModalWrapper(e, 'visible');
      });
    });
  }
  function actionModalWrapper(event, action) {
    const modalWrapper = document.querySelector('.modal-wrapper');
    const item = event ?
      event.currentTarget :
      document.querySelector('.contacts__btn');
    const mainWrap = document.querySelector('.wrapper');
    const bodyTeg = document.body;

    function disableScroll(body) {
      const pagePosition = window.scrollY;
      body.dataset.position = pagePosition;
      body.style.top = -pagePosition + 'px';

      const paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      body.classList.add('hidden-scroll');
      body.style.paddingRight = paddingOffset;
    }
    function enableScroll(body) {
      body.classList.remove('hidden-scroll');
      body.removeAttribute('style');

      const elementPosition = parseInt(body.dataset.position, 10);
      window.scroll({
        top: elementPosition,
      });
    }

    function addInertBody(mainWrapper) {
      mainWrapper.setAttribute('inert', true);
      const idItem = item.getAttribute('id');
      modalWrapper.setAttribute('data-focus', idItem);
    }
    function removeInertBody(mainWrapper) {
      mainWrapper.removeAttribute('inert');
      const idElemFocus = modalWrapper.dataset.focus;
      const elemFocus = document.getElementById(idElemFocus);
      const elementPosition = elemFocus.getBoundingClientRect().top;
      window.scrollBy({
        top: elementPosition - 300,
        behavior: 'smooth'
      });
      setTimeout(() => elemFocus.focus(), 200);
    }

    if (action === 'visible') {
      disableScroll(bodyTeg);
      addInertBody(mainWrap);
      if (item.classList.contains('contacts__btn')) {
        modalWrapper.classList.add('contacts-modal-active');
      } else {
        modalWrapper.classList.add('gallery-modal-active');
      }
    } else {
      enableScroll(bodyTeg);
      removeInertBody(mainWrap);
      modalWrapper.classList.remove('contacts-modal-active', 'gallery-modal-active');
    }
  }
  addListener();

  window.actionModalWrapper = actionModalWrapper;
})();
