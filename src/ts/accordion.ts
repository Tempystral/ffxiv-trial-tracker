/**
 * Adapted from:
 * https://css-tricks.com/how-to-animate-the-details-element/
 */
export class Accordion {
  el: HTMLDetailsElement;
  summary: HTMLElement;
  content: any;
  animation: Animation | null;
  duration: number;
  isClosing: boolean;
  isExpanding: boolean;

  constructor(el: HTMLDetailsElement, contentSelector: string) {
    this.el = el;
    const sum = el.querySelector("summary");
    if (sum == null) throw new Error("Could not find summary object!");
    this.summary = sum;
    this.content = el.querySelector(contentSelector);
    this.duration = 400;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;

    if (this.summary != null)
      this.summary.addEventListener("click", (e) => this.onClick(e));
  }

  onClick(e: Event) {
    // Stop default behaviour from the browser
    e.preventDefault();
    this.el.setAttribute("data-clicked", "true"); // Add attribute when clicked only
    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = "hidden";
    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;

    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${
      this.summary.offsetHeight + this.getMarginBottom(this.summary)
    }px`;

    if (this.animation) {
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.el.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight]
      },
      {
        duration: this.duration,
        easing: "ease-out"
      }
    );
    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => (this.isClosing = false);
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${
      this.summary.offsetHeight + this.content.offsetHeight
    }px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight]
      },
      {
        duration: this.duration,
        easing: "ease-out"
      }
    );
    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => (this.isExpanding = false);
  }

  onAnimationFinish(open: boolean) {
    // Set the open attribute based on the parameter
    this.el.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = "";
  }

  getMarginBottom(el: HTMLElement): number {
    const styles = window.getComputedStyle(el);
    const mb = parseFloat(styles["marginBottom"]);
    return 0 + mb; // Force it into a number I guess?
  }
}
