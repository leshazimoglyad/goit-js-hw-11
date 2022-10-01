import axios from 'axios';
import Notiflix from 'notiflix';
const API_KEY = '30146257-64982587d71520e4d5095fa16';

export default class PixabayImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  getGalleryImages(name) {
    return axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=false&per_page=40&page=${this.page}`
    );
  }
}