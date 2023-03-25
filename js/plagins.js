(() => {
  //  свайпер на секцию "события"
  const headerSwiper = new Swiper('.header__swiper', {
    loop: true,
    speed: 700,
    autoplay: {
      delay: 8000,
    },
    slidesPerView: 1,
    spaceBetween: 100,
  });
  const galerySwiper = new Swiper('.gallery__swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    pagination: {
      el: '.js-gallery-pagination',
      type: 'fraction',
    },
    navigation: {
      prevEl: '.js-gallery-prev',
      nextEl: '.js-gallery-next',
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 35
      },
      1300: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      }
    },
  });
  const eventsSwiper = new Swiper('.events__swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    pagination: {
      el: '.js-events-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      prevEl: '.js-events-prev',
      nextEl: '.js-events-next',
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 10,
      },
      768: {
        spaceBetween: 34,
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 27,
      },
      1651: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      }
    },
  });
  const projectSwiper = new Swiper('.projects__swiper', {
    speed: 700,
    slidesPerView: 1,
    slidesPerGroup: 1,
    navigation: {
      prevEl: '.js-projects-prev',
      nextEl: '.js-projects-next',
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 37,
      },
      1300: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
    },
  });
  // селектор в галлерее
  // Pass single element
  function defaultSelect() {
    const element = document.querySelector('.js-choice');
    const choices = new Choices(element, {
      searchEnabled: false,
    });
  }
  defaultSelect();
  // tooltip (библиотека tippy)
  tippy('.js-tooltip-btn', {
    maxWidth: 350,
    theme: 'purple',
  });
  // Валидация формы в секции "контакты"

  const validation = new JustValidate('#js-contacts-form',
    {
      errorLabelStyle: {
        position: 'absolute',
        top: '-17px',
        left: '24px',
        color: '#d11616',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '16px',
      }
    });

  validation
    .addField('.contacts__input-name', [
      {
        rule: 'required',
        errorMessage: 'Имя обязательно',
      },
      {
        rule: 'customRegexp',
        value: /^[?!,.а-яА-ЯёЁ\s]+$/,
        errorMessage: 'Только буквы кирилицы',
      }
    ])
    .addField('.contacts__input-tel', [
      {
        rule: 'required',
        errorMessage: 'Телефон обязателен',
      },
      {
        rule: 'customRegexp',
        value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        errorMessage: 'Некорректный номер',
      }
    ]).onSuccess((event) => {

      let formData = new FormData(event.target);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            actionModalWrapper(null, 'visible');
          }
        }
      }

      xhr.open('GET', 'mail.php', true);
      xhr.send(formData);

      event.target.reset();
    });

  const telSelector = document.querySelector(".contacts__input-tel");
  const inputMask = new Inputmask("+7 (999) 999-99-99");
  inputMask.mask(telSelector);
  //  Карта
  // Функция ymaps.ready() будет вызвана, когда
  // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
  ymaps.ready(init);
  function init() {
    const myMap = new ymaps.Map(
      "map",
      {
        center: [55.75846806898367, 37.60108849999989],
        zoom: 14,
        controls: ["geolocationControl", "zoomControl"]
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "300px", right: "20px" },
        geolocationControlFloat: "none",
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "200px", right: "20px" }
      }
    );

    if (window.matchMedia("(max-width: 1280px)").matches) {
      if (Object.keys(myMap.controls._controlKeys).length) {
        myMap.controls.remove('zoomControl');
        myMap.controls.remove('geolocationControl');
      }
    }

    myMap.behaviors.disable("scrollZoom");

    myMap.events.add("sizechange", function () {
      if (window.matchMedia("(max-width: 1280px)").matches) {
        if (Object.keys(myMap.controls._controlKeys).length) {
          myMap.controls.remove('zoomControl');
          myMap.controls.remove('geolocationControl');
        }
      } else {
        if (!Object.keys(myMap.controls._controlKeys).length) {
          myMap.controls.add('zoomControl');
          myMap.controls.add('geolocationControl');
        }
      }
    });

    const myPlacemark = new ymaps.Placemark(
      [55.75846806898367, 37.60108849999989],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "./img/map-marker.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-20, -40]
      }
    );

    myMap.geoObjects.add(myPlacemark);
    myMap.container.fitToViewport();
  }

  //  аккордеон
  $(function () {
    $("#accordion").accordion({
      heightStyle: "content"
    });
  });

})()
