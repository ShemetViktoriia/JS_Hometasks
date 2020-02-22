'use strict';

class Tabset {

  static WRAPPER_CLASS = 'tabset-wrapper';
  static TITLES_LIST_CLASS = 'tabset-titles';
  static TITLE_CLASS = 'tabset-title';
  static ELEMENTS_LIST_CLASS = 'tabset-elements';
  static TAB_ACTIVE_CLASS = 'active';
  static BUTTONS_CONTAINER_CLASS = 'tabset-buttons';
  static BUTTON_CLASS = 'tabset-button';

  constructor(container) {
    this.container = container;

    this.wrapContainer();
    this.copyTitles();
    this.bindEventListener();
    this.addButtons();
    this.show(0);
  }

  wrapContainer() {
    this.titlesList = document.createElement('div');
    this.titlesList.className = Tabset.TITLES_LIST_CLASS;

    const wrapper = document.createElement('div');
    wrapper.className = Tabset.WRAPPER_CLASS;
    wrapper.appendChild(this.titlesList);

    this.container.parentNode.insertBefore(wrapper, this.container);
    wrapper.appendChild(this.container);

    this.container.classList.add(Tabset.ELEMENTS_LIST_CLASS);
  }

  copyTitles() {
    const titles = this.container.querySelectorAll(`.${Tabset.TITLE_CLASS}`);

    Array.prototype.forEach.call(titles, el =>
      this.titlesList.appendChild(el)
    );
  }

  bindEventListener() {
    this.titlesList.addEventListener('click', e => this.onElementClick(e));
  }

  addButtons() {
    const btnsContainer = document.createElement('div');
    btnsContainer.className = Tabset.BUTTONS_CONTAINER_CLASS;

    const prevBtn = this.createMoveBtn('<');
    prevBtn.addEventListener('click', () => this.prev());
    const nextBtn = this.createMoveBtn('>');
    nextBtn.addEventListener('click', () => this.next());

    btnsContainer.append(prevBtn, nextBtn);
    this.titlesList.append(btnsContainer);
  }

  createMoveBtn(sign) {
    const btn = document.createElement('span');
    btn.textContent = sign;
    btn.className = Tabset.BUTTON_CLASS;
    return btn;
  }

  onElementClick(e) {
    const titleIndex = Array.prototype.indexOf.call(
      this.titlesList.children,
      e.target
    );

    if (titleIndex >= 0) {
      this.show(titleIndex);
    }
  }

  hide(index) {
    if (!this.titlesList.children[index]) {
      return;
    }
    this.titlesList.children[index].classList.remove(Tabset.TAB_ACTIVE_CLASS);
    this.container.children[index].classList.remove(Tabset.TAB_ACTIVE_CLASS);
  }

  show(index) {
    if (!this.titlesList.children[index]) {
      return;
    }

    this.hide(this.activeIndex);
    this.activeIndex = index;

    this.titlesList.children[index].classList.add(Tabset.TAB_ACTIVE_CLASS);
    this.container.children[index].classList.add(Tabset.TAB_ACTIVE_CLASS);
  }

  next() {
    let newIndex = this.activeIndex + 1;

    if (newIndex >= this.titlesList.children.length - 1) {
      newIndex = 0;
    }

    this.show(newIndex);
  }

  prev() {
    let newIndex = this.activeIndex - 1;

    if (newIndex < 0) {
      newIndex = this.titlesList.children.length - 2;
    }

    this.show(newIndex);
  }
}