import { pixabayImages } from '..';
import Notiflix from 'notiflix';
import { gallery } from '..';
import { lightbox } from './gallery-slider';
const sentinel = document.querySelector('.sentinel');
export default function createScrollMarkup() {
  pixabayImages
    .getGalleryImages(pixabayImages.query)
    .then(response => {
      if (
        response.data.totalHits === gallery.children.length ||
        response.data.totalHits < 40
      ) {
        sentinel.classList.remove('loading');
        sentinel.classList.add('finished');
        sentinel.textContent = 'Sorry, there no more images found';
      }
      return response.data.hits;
    })
    .then(data =>
      data.map(
        ({
          likes,
          comments,
          webformatURL,
          largeImageURL,
          tags,
          views,
          downloads,
        }) => {
          const markup = `
   <div class="photo-card">
   <a href = ${largeImageURL}> 
<img src=${webformatURL} alt="${tags}" width = 400 height = 300 loading="lazy" /> </a>
<div class="info">
  <p class="info-item">
    <b>Likes: ${likes}</b>
  </p>
  <p class="info-item">
    <b>Views: ${views}</b>
  </p>
  <p class="info-item">
    <b>Comments: ${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads: ${downloads}</b>
  </p>
</div>
</div>`;
          gallery.insertAdjacentHTML('beforeend', markup);
          lightbox.refresh();
        }
      )
    );
}