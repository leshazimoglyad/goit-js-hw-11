import pixabayImages from './fetch-gallerry';
import { pixabayImages } from '../index';
import { gallery } from '../index';
import Notiflix from 'notiflix';
import { lightbox } from './gallery-slider';

export default function createGalleryMarkup() {
  pixabayImages
    .getGalleryImages(pixabayImages.query)
    .then(response => {
      if (response.data.totalHits === 0) {
        return Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      }
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
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