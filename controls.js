class ProgressControls {

  #circle;

  #valueInput;
  #animateToggle;
  #hideToggle;

  #onValueChange;
  #onAnimateSet;
  #onHideSet;

  #onCircleChange;
  #onCircleUnmount;
  
  constructor(el, circle) {
    this.#circle = circle;
    this.#valueInput = el.querySelector('.progress__input');
    this.#animateToggle = el.querySelector('.progress__toggle--animate');
    this.#hideToggle = el.querySelector('.progress__toggle--hide');

    this.#setEvents();
  }

  #setEvents() {
    
    this.#onValueChange = () => { this.#circle.setValue(this.#valueInput.value) }
    this.#onAnimateSet = () => { this.#circle.setAnimated(this.#animateToggle.checked) }
    this.#onHideSet = () => { this.#circle.setHidden(this.#hideToggle.checked) }
    
    this.#onCircleChange = (e) => { if (e.detail) { this.sync(e.detail) } }
    this.#onCircleUnmount = () => {this.#removeEvents()}
    
    this.#valueInput.addEventListener('change', this.#onValueChange)
    this.#animateToggle.addEventListener('change', this.#onAnimateSet)
    this.#hideToggle.addEventListener('change', this.#onHideSet)

    this.#circle.getElement().addEventListener('change', this.#onCircleChange)
    this.#circle.getElement().addEventListener('unmount', this.#onCircleUnmount)
  }

  sync(state) {
    this.#valueInput.value = state.value;
    this.#animateToggle.checked = state.animated;
    this.#hideToggle.checked = state.hidden;
  }

  #removeEvents() {
    this.#valueInput.removeEventListener('change', this.#onValueChange);
    this.#animateToggle.removeEventListener('change', this.#onAnimateSet);
    this.#hideToggle.removeEventListener('change', this.#onHideSet);

    this.#circle.getElement().removeEventListener('change', this.#onCircleChange);
    this.#circle.getElement().removeEventListener('unmount', this.#onCircleUnmount);
  }
}