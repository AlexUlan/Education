import Slider from "./slider";

export default class MiniSlider extends Slider {
  constructor(container, prev, next, classActive, animation, autoplay) {
    super(container, prev, next, classActive, animation, autoplay);
  }

  decorationSlide() {
    this.slides.forEach((slide) => {
      if (slide.classList.contains(this.classActive)) {
        slide.classList.remove(this.classActive);
      }

      if (this.animation) {
        slide.querySelector(".card__controls-arrow").style.opacity = "0";
        slide.querySelector(".card__title").style.opacity = ".4";
      }
    });

    this.slides[0].classList.add(this.classActive);

    if (this.animation) {
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
      this.slides[0].querySelector(".card__title").style.opacity = "1";
    }
  }

  nextSlide() {
    if (
      this.slides[this.slides.length - 1].tagName === "BUTTON" &&
      this.slides[this.slides.length - 2].tagName === "BUTTON"
    ) {
      this.container.insertBefore(
        this.slides[0],
        this.slides[this.slides.length - 2],
      );
    } else if (this.slides[this.slides.length - 1].tagName === "BUTTON") {
      this.container.insertBefore(
        this.slides[0],
        this.slides[this.slides.length - 1],
      );
    } else {
      this.container.appendChild(this.slides[0]);
    }

    this.decorationSlide();
  }

  bindTriger() {
    this.prev.addEventListener("click", () => {
      if (
        this.slides[this.slides.length - 1].tagName === "BUTTON" &&
        this.slides[this.slides.length - 2].tagName === "BUTTON"
      ) {
        let active = this.slides[this.slides.length - 3];
        this.container.insertBefore(active, this.slides[0]);
      } else if (this.slides[this.slides.length - 1].tagName === "BUTTON") {
        let active = this.slides[this.slides.length - 2];
        this.container.insertBefore(active, this.slides[0]);
      } else {
        let active = this.slides[this.slides.length - 1];
        this.container.insertBefore(active, this.slides[0]);
      }

      this.decorationSlide();
    });
    this.next.addEventListener("click", () => {
      this.nextSlide();
    });
  }

  autoChangeSlide() {
    let playChange = setInterval(() => {
      this.nextSlide();
    }, 5000);

    this.container.addEventListener("mouseover", () => {
      clearInterval(playChange);
    });

    this.container.addEventListener("mouseout", () => {
      this.autoChangeSlide();
    });
  }

  init() {
    this.container.style.cssText = `
        display:flex;
        flex-wrap:wrap;
        overflow:hidden;
        align-items: flex-start;`;
    this.bindTriger();
    this.decorationSlide();
    if (this.autoplay) {
      this.autoChangeSlide();
    }
  }
}
