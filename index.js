// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо". (data-index i+=1)

import images from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const largeImage = document.querySelector('.lightbox__image');
const modal = document.querySelector('.lightbox');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const backdrop = document.querySelector('.lightbox__overlay');
let currentIndex;

const renderGallery = function (images) {
  images.forEach((el, i) => {
    gallery.insertAdjacentHTML(
      'beforeend',
      `<li class="gallery__item">
  <a class="gallery__link" href="${el.original}">
    <img class="gallery__image"
      src="${el.preview}"
      data-source="${el.original}"
      alt="${el.description}"
      data-index="${i}"
    />
  </a>
  </li>`,
    );
  });
};

const openModal = () => {
  modal.classList.add('is-open');
  backdrop.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onBtnPress);
};

const closeModal = () => {
  modal.classList.remove('is-open');
  largeImage.src = '#';
  window.removeEventListener('keydown', onBtnPress);
  backdrop.removeEventListener('click', onBackdropClick);
};

const onGalleryClick = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  let imageRef = event.target;
  let largeImageURL = imageRef.dataset.source;
  largeImage.src = largeImageURL;
  currentIndex = +imageRef.dataset.index;
  openModal();
};

const onBackdropClick = event =>
  event.currentTarget === event.target ? closeModal() : '';
const onBtnPress = event => {
  if (event.code === 'Escape') {
    closeModal();
  } else if (event.code === 'ArrowLeft') {
    currentIndex -= 1;
    currentIndex < 0 ? (currentIndex = images.length - 1) : '';
    largeImage.src = images[currentIndex].original;
  } else if (event.code === 'ArrowRight') {
    currentIndex += 1;
    currentIndex > images.length - 1 ? (currentIndex = 0) : '';
    largeImage.src = images[currentIndex].original;
  }
};

renderGallery(images);
gallery.addEventListener('click', onGalleryClick);
closeBtn.addEventListener('click', closeModal);
