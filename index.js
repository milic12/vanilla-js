class Carousel extends HTMLElement {
  constructor() {
    super();
    this.swiper = null;
  }

  connectedCallback() {
    const autoplay = this.getAttribute("autoplay") === "true";
    const loop = this.getAttribute("loop") === "true";
    const delay = parseInt(this.getAttribute("delay"), 10) || 3000;

    // Create the structure with custom navigation buttons
    this.innerHTML = `
        <div class="swiper">
          <div class="swiper-wrapper">
            ${this.innerHTML}
          </div>
          <div class="custom-button-prev">
          <img src="../images/Arrowleft.svg" alt="Arrow left" />
          </div>
          <div class="custom-button-next">
            <img src="../images/ArrowRight.svg" alt="Arrow right" />
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
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 8,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3,
          spaceBetween: 8,
        },

        1441: {
          slidesPerView: 3,
          spaceBetween: 8,
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
