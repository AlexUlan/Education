export default class VideoPlayer {
  constructor(triger, overlaySelector) {
    this.btns = document.querySelectorAll(triger);
    this.overlay = document.querySelector(overlaySelector);
    this.close = this.overlay.querySelector(".close");
  }

  bindTrigger() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!document.querySelector("iframe#frame")) {
          const path = btn.getAttribute("data-url");
          this.createPlayer(path);
        } else {
          this.overlay.style.display = "flex";
        }
      });
    });
  }

  createPlayer(url) {
    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: `${url}`,
    });

    this.overlay.style.display = "flex";
    console.log(this.player);
  }

  bindCloseBtn() {
    /*   console.log(this.close); */
    this.player.stopVideo();
    this.overlay.style.display = "none";
    console.log(this.player);
  }

  init() {
    const tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTrigger();
    this.close.addEventListener("click", () => {
      this.bindCloseBtn();
    });
  }
}
