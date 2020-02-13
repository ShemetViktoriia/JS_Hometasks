'use strict';

const STICKER_TAG = 'textarea';
const STICKER_CLASS = 'sticker';

class Sticker {
  constructor(parent, key, id, zIndexer) {
    this._elem = document.createElement(STICKER_TAG);
    this._elem.className = STICKER_CLASS;

    this._parent = parent;
    this._parent.appendChild(this._elem);

    this._zIndexer = zIndexer;

    this._initRelocation();
    this._initRemove();
    this._initTopState();

    this._watchSize();
    this._watchText();

    this._stock = new Stock(key, id);
  }

  create(w, h, x, y) {
    this._setW(w);
    this._setH(h);
    this._setX(x);
    this._setY(y);
    this._setText('');
    this._setMaxZ();
  }

  restore(data) {
    this._setW(data.w);
    this._setH(data.h);
    this._setX(data.x);
    this._setY(data.y);
    this._setZ(data.z);

    this._setText(data.text);
  }

  _save() {
    let data = {
      x: this._getX(),
      y: this._getY(),
      z: this._getZ(),
      w: this._getW(),
      h: this._getH(),
      text: this._getText()
    };

    this._stock.save(data);
  }

  _setW(value) {
    this._w = value;
    this._elem.style.width = value + 'px';

    this._save();
  }

  _getW() {
    return this._w;
  }

  _setH(value) {
    this._h = value;
    this._elem.style.height = value + 'px';

    this._save();
  }

  _getH() {
    return this._h;
  }

  _setX(value) {
    this._x = value;
    this._elem.style.left = value + 'px';

    this._save();
  }

  _getX() {
    return this._x;
  }

  _setY(value) {
    this._y = value;
    this._elem.style.top = value + 'px';

    this._save();
  }

  _getY() {
    return this._y;
  }

  _setZ(value) {
    this._z = value;
    this._elem.style.zIndex = value;

    this._save();
  }

  _getZ() {
    return this._z;
  }

  _setText(text) {
    this._text = text;
    this._elem.value = text;

    this._save();
  }

  _getText() {
    return this._text;
  }

  _setMaxZ() {
    const maxZ = this._zIndexer.getMaxZ();

    if (maxZ !== this._getZ() || maxZ === 0) {
      this._setZ(maxZ + 1);
    }
  }

  _watchSize() {
    this._elem.addEventListener('mouseup', () => {
      let newWidth = parseInt(this._elem.clientWidth);
      let newHeight = parseInt(this._elem.clientHeight);

      if (newWidth !== this._getW()) {
        this._setW(newWidth);
      }

      if (newHeight !== this._getH()) {
        this._setH(newHeight);
      }
    });
  }

  _watchText() {
    this._elem.addEventListener('blur', () => {
      let newText = this._elem.value;

      if (newText !== this._getText()) {
        this._setText(newText);
      }
    });
  }

  _initTopState() {
    this._elem.addEventListener('click', () => {
      this._setMaxZ();
    });

    this._elem.addEventListener('dragstart', () => {
      this._setMaxZ();
    });
  }

  _initRemove() {
    this._elem.addEventListener('contextmenu', event => {
      event.preventDefault();
      this._parent.removeChild(this._elem);
      this._stock.remove();
    });
  }

  _initRelocation() {
    this._elem.draggable=true;

    let correctionX=0;
    let correctionY=0;

    this._elem.addEventListener('dragstart', event => {
      correctionX=this._getX() - event.pageX;
      correctionY=this._getY() - event.pageY;
    });

    this._elem.addEventListener('dragend', event => {
      this._setX(event.pageX + correctionX);
      this._setY(event.pageY + correctionY);

      this._elem.blur();
    });
  }
}