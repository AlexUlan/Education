import Slider from "./slider";

export default class MainSlider extends Slider {
  constructor(btns) {
    super(btns);
  }
  showSlid(n) {
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    try {
      if (n === 3) {
        this.hanson.style.opacity = "0";

        setTimeout(() => {
          this.hanson.classList.add("animated", "fadeInUp");
        }, 3000);
      } else {
        this.hanson.classList.remove("fadeInUp");
      }
    } catch (e) {}

    this.slides.forEach((slide) => {
      slide.style.display = "none";
    });

    this.slides[this.slideIndex - 1].style.display = "block";
  }

  slidePlus(n) {
    this.showSlid((this.slideIndex += n));
  }

  render() {
    try {
      this.hanson = document.querySelector(".hanson");
    } catch (e) {}

    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.slidePlus(1);
      });

      btn.parentNode.previousElementSibling.addEventListener("click", (e) => {
        e.preventDefault();
        this.showSlid((this.slideIndex = 1));
      });
    });
    this.showSlid(this.slideIndex);
  }
}
