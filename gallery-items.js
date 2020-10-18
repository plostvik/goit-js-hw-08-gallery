const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

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
  <a class="gallery__link" href="${el.original}" data-index="${i}">
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
  console.log(event.target);
  if (event.code === 'Escape') {
    closeModal();
  } else if (event.code === 'ArrowLeft') {
    currentIndex -= 1;
    currentIndex < 0 ? (currentIndex = images.length - 1) : '';
    largeImage.src = images[currentIndex].original;
  } else if (event.code === 'ArrowRight') {
    console.log(currentIndex);
    currentIndex += 1;
    currentIndex > images.length - 1 ? (currentIndex = 0) : '';
    largeImage.src = images[currentIndex].original;
  }
};

renderGallery(images);
gallery.addEventListener('click', onGalleryClick);
closeBtn.addEventListener('click', closeModal);
