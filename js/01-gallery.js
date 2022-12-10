import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryCollection = document.querySelector('.gallery');

const galleryMarkup = galleryItems.reduce(
  (acc, { preview, original, description }) =>
    acc +
    `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`,
  ''
);

galleryCollection.insertAdjacentHTML('beforeend', galleryMarkup);

galleryCollection.addEventListener('click', onGalleryPicClick);

function onGalleryPicClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const instance = basicLightbox.create(
    `<img src= ${event.target.dataset.source}>`,

    {
      onShow: instance => {
        document.addEventListener('keydown', onEscapeClick);
      },

      onClose: instance => {
        document.removeEventListener('keydown', onEscapeClick);
      },
    }
  );

  instance.show();

  function onEscapeClick(event) {
    if (event.code !== 'Escape') {
      return;
    }
    instance.close();
  }
}
