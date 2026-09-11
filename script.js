class ProgressiveCircle {

  #el;
  #circle;
  
  #value = 0;
  #isAnimated = false;
  #isHidden = false;
  #isMounted = false;
  
  constructor(el) {
    this.#el = el
    this.#circle = this.#el.querySelector('.progress__circle')

    this.#isMounted = true;

    this.#updateProgress();
  }

  #emit() {
    this.#el.dispatchEvent(
      new CustomEvent('change', {
        detail: this.getStatus(),
        bubbles: true,
      })
    )
  }

  unmount() {
    this.#isMounted = false;
    this.#el.dispatchEvent(new CustomEvent('unmount', { bubbles: true }));
  }

  getElement() {
    if (!this.#isMounted) {
      return
    } else {
      return this.#el;
    }
  }

  getValue() {
    if (!this.#isMounted) {
      return
    } else {
      return this.#value;
    }
  }
  
  setValue(value) {
    this.#value = value;
    this.#updateProgress()
    this.#emit()
    return this
  }

  getAnimated() {
    if (!this.#isMounted) {
      return
    } else {
      return this.#isAnimated;
    }
  }
  
  setAnimated(isClicked) {
    this.#isAnimated = isClicked;
    if(this.#isAnimated) {
      this.#circle.classList.add('progress__circle--animate')
    } else {
      this.#circle.classList.remove('progress__circle--animate')
    }
    this.#emit()
    return this;
  }

  getHidden() {
    if (!this.#isMounted) {
      return
    } else {
      return this.#isHidden;
    }
  }

  setHidden(isClicked) {
    this.#isHidden = isClicked;
    if (this.#isHidden) {
      this.#circle.classList.add('progress__circle--hide')
    } else {
      this.#circle.classList.remove('progress__circle--hide')
    }
    this.#emit()
    return this;
  }

  getStatus() {
    return {
      value: this.#value,
      animated: this.#isAnimated,
      hidden: this.#isHidden,
    }
  }
  
  #updateProgress() {
    const isValid = validateValue(this.#value);

    this.#circle.classList.toggle('progress__circle--error', !isValid)
    
    if (isValid) {
      const angle = (this.#value / 100) * 360
      this.#circle.style.background = `conic-gradient(
      var(--primary-color) ${angle}deg,
        #e0e0e0 0
        )`
    } else {
      this.#circle.style.background = '';
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.progress').forEach(el => {
    el.progress = new ProgressiveCircle(el);
    el.controls = new ProgressControls(el, el.progress)
    el.controls.sync(el.progress.getStatus())
  })
})

function validateValue(value) {
  if (value >= 0 && value <= 100) {
    return true;
  } else {
    return false;
  }
}