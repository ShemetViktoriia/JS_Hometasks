'use strict';

class Storage {
  constructor(key) {
    this.key = key;
  }

  save(data) {
    localStorage.setItem(this.key, data);
  }

  get(){
    return localStorage.getItem(this.key);
  }
}