class CustomContent extends HTMLElement {
  constructor() {
    super();

    const content = this.innerHTML;

    this.innerHTML = "";

    const container = document.createElement("div");
    container.classList.add("content");

    container.innerHTML = content;

    this.appendChild(container);

    this.setupToggle();

    this.setupIntersectionObserver();
  }

  setupToggle() {
    const button = this.querySelector(".content__button");
    const text = this.querySelector(".content__extra-text");

    if (button && text) {
      button.addEventListener("click", () => {
        text.classList.toggle("content__extra-text--visible");
      });
    }
  }

  setupIntersectionObserver() {
    const contentDiv = this.querySelector(".content");

    if (contentDiv) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              contentDiv.classList.add("content--visible");
            } else {
              contentDiv.classList.remove("content--visible");
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(contentDiv);
    }
  }
}

customElements.define("custom-content", CustomContent);
