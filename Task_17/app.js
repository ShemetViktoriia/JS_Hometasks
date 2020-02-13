'use strict';

const KEY = 'stickers';
const STICKER_PARENT = document.body;
const STICKER_START_WEIGHT = 150;
const STICKER_START_HEIGHT = 200;

let zIndexer = new ZIndexer;
const stock = new Stock(KEY);
const globalData = stock.getAll();

window.addEventListener('dblclick',onWindowDblClick);

let id = 0;
for(id in globalData){
    let sticker =new Sticker(document.body, KEY, id, zIndexer);
    sticker.restore(globalData[id]);
    zIndexer.add(sticker);
};

function onWindowDblClick(event) {
    id++;
    let sticker = new Sticker(STICKER_PARENT, KEY, id, zIndexer);
    sticker.create(STICKER_START_WEIGHT, STICKER_START_HEIGHT, event.pageX, event.pageY);

    zIndexer.add(sticker);
}