class Carousel extends HTMLElement {
  constructor() {
    super();
    this.swiper = null;
  }

  connectedCallback() {
    const autoplay = this.getAttribute("autoplay") === "true";
    const loop = this.getAttribute("loop") === "true";
    const delay = parseInt(this.getAttribute("delay"), 10) || 3000;

    const originalContent = this.innerHTML;

    this.innerHTML = `
          <div class="carousel-container">
            <div class="carousel-loader">
              <div class="loader-spinner"></div>
            </div>
            <div class="swiper">
              <div class="swiper-wrapper">
                ${originalContent}
              </div>
              <div class="custom-button-prev">
                <img src="../images/Arrowleft.svg" alt="Arrow left" />
              </div>
              <div class="custom-button-next">
                <img src="../images/ArrowRight.svg" alt="Arrow right" />
              </div>
            </div>
          </div>
        `;

    this.swiper = new Swiper(this.querySelector(".swiper"), {
      slidesPerView: 3,
      spaceBetween: 8,
      loop: loop,
      centerInsufficientSlides: true,
      navigation: {
        nextEl: this.querySelector(".custom-button-next"),
        prevEl: this.querySelector(".custom-button-prev"),
      },
      autoplay: autoplay
        ? {
            delay: delay,
            disableOnInteraction: false,
          }
        : false,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 8,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 8,
        },
      },
      on: {
        init: () => {
          const loader = this.querySelector(".carousel-loader");
          const swiperElement = this.querySelector(".swiper");

          loader.style.opacity = "0";
          swiperElement.style.opacity = "1";

          setTimeout(() => {
            loader.style.display = "none";
          }, 300);
        },
      },
    });
  }

  disconnectedCallback() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
  }
}

customElements.define("custom-carousel", Carousel);
