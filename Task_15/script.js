'use strict';

const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=';

const albumListElement = document.querySelector('#albumList');
const albumTemplate = document.querySelector('#albumItemTemplate').innerHTML;
const photoListElement = document.querySelector('#photoList');
const photoTemplate = document.querySelector('#photoItemTemplate').innerHTML;

albumListElement.addEventListener('click', onAlbumListClick);

getAlbums();

function getAlbums() {
    fetch(ALBUMS_URL)
        .then(response => {
            if (response.status != 200) {
                return null;
            } else {
                return response.json();
            }
        }
        )
        .then(renderAlbums)
        .catch(error => console.error(error));
}

function renderAlbums(list) {
    list.forEach(addAlbum);
}

function addAlbum(album) {
    const htmlTemplate = albumTemplate
        .replace('{{id}}', album.id)
        .replace('{{title}}', album.title);
    const newAlbumEl = htmlToElement(htmlTemplate);
    albumListElement.appendChild(newAlbumEl);
}

function getPhotos(albumId) {
    fetch(`${PHOTOS_URL}${albumId}`)
        .then(response => {
            if (response.status != 200) {
                return null;
            } else {
                return response.json();
            }
        }
        )
        .then(renderPhotos)
        .catch(error => console.error(error));
}

function renderPhotos(list) {
    list.forEach(addPhoto);
}

function addPhoto(photo) {
    const htmlTemplate = photoTemplate
        .replace('{{id}}', photo.id)
        .replace('{{url}}', photo.url)
        .replace('{{title}}', photo.title);
    const newPhotoEl = htmlToElement(htmlTemplate);
    photoListElement.appendChild(newPhotoEl);
}

function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function onAlbumListClick(e) {
    unselectAllAlbums();
    deletePhotoElements();
    const classList = e.target.classList;

    switch (true) {
        case classList.contains('album-item'):
            toggleAlbumState(e.target);
            getPhotos(e.target.dataset.id);
            break;
    }
}

function unselectAllAlbums() {
    document.querySelectorAll('.album-item').forEach(n => n.classList.remove('choosed'))
}

function deletePhotoElements() {
    let element = document.getElementById('photoList');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function toggleAlbumState(el) {
    el.classList.toggle('choosed');
}
