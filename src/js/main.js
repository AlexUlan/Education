import VideoPlayer from "./modules/playVideo";
import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import Difference from "./modules/difference";
import Form from "./modules/forms";

window.addEventListener("DOMContentLoaded", () => {
  const slider = new MainSlider({ container: ".page", btns: ".next" });
  slider.render();

  const player = new VideoPlayer(".showup .play", ".overlay");
  player.init();

  const showUpSlider = new MiniSlider({
    container: ".showup__content-slider",
    prev: ".showup__content-title .showup__prev",
    next: ".showup__content-title .showup__next",
    classActive: "card-active",
    animation: true,
  });
  showUpSlider.init();

  const feedSlider = new MiniSlider({
    container: ".feed__slider",
    prev: ".feed__slider .slick-prev",
    next: ".feed__slider .slick-next",
    classActive: "feed__item-active",
    animation: false,
  });
  feedSlider.init();

  const modulesSlider = new MiniSlider({
    container: ".modules__content-slider",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
    classActive: "card-active",
    animation: true,
    autoplay: true,
  });
  modulesSlider.init();

  new Difference({
    officerold: ".officerold",
    officernew: ".officernew",
    cardSelector: ".officer__card-item",
  }).init();

  new Form(".form").init();

});
