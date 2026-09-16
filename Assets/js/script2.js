document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     MOBILE MENU
  ========================================================== */

  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector("#mobileMenu");

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen = mobileMenu.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

    mobileMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =========================================================
     FAQ ACCORDION
  ========================================================== */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    const button = item.querySelector("button");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) return;

    button.addEventListener("click", () => {

      const isActive = item.classList.contains("active");

      faqItems.forEach(otherItem => {

        otherItem.classList.remove("active");

        const otherButton =
          otherItem.querySelector("button");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        if (otherButton) {
          otherButton.setAttribute(
            "aria-expanded",
            "false"
          );
        }

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

      });

      if (!isActive) {

        item.classList.add("active");

        button.setAttribute(
          "aria-expanded",
          "true"
        );

        answer.style.maxHeight =
          answer.scrollHeight + "px";

      }

    });

  });


  /* =========================================================
     SCROLL REVEAL
  ========================================================== */

  const revealItems =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );

    revealItems.forEach(item => {
      revealObserver.observe(item);
    });

  } else {

    revealItems.forEach(item => {
      item.classList.add("visible");
    });

  }


  /* =========================================================
     BACK TO TOP
  ========================================================== */

  const backToTop =
    document.querySelector(".back-to-top");

  if (backToTop) {

    const updateBackToTop =
      () => {

        if (window.scrollY > 700) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }

      };

    window.addEventListener(
      "scroll",
      updateBackToTop,
      { passive: true }
    );

    updateBackToTop();

    backToTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* =========================================================
     SMOOTH INTERNAL LINKS
  ========================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#" ||
          targetId.length < 2
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const header =
          document.querySelector(".site-header");

        const headerHeight =
          header ? header.offsetHeight : 0;

        const top =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          12;

        window.scrollTo({
          top,
          behavior: "smooth"
        });

      });

    });


  /* =========================================================
     CLOSE MOBILE MENU WHEN RESIZING
  ========================================================== */

  window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {

      if (mobileMenu) {
        mobileMenu.classList.remove("open");
      }

      if (menuToggle) {
        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    }

  });


  /* =========================================================
     IMAGE ERROR HANDLING
     
     Local mockup images can be added later without
     breaking the page. This handler hides broken images.
  ========================================================== */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.style.opacity = "0";

        }
      );

    });


  /* =========================================================
     ACCESSIBLE KEYBOARD FAQ SUPPORT
  ========================================================== */

  document
    .querySelectorAll(".faq-item button")
    .forEach(button => {

      button.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();
            button.click();

          }

        }
      );

    });


  /* =========================================================
     ACTIVE NAVIGATION STATE
  ========================================================== */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      '.desktop-nav a[href^="#"]'
    );

  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const id =
              entry.target.getAttribute("id");

            navLinks.forEach(link => {

              link.classList.remove("active");

              if (
                link.getAttribute("href") ===
                `#${id}`
              ) {
                link.classList.add("active");
              }

            });

          });

        },
        {
          rootMargin: "-35% 0px -55% 0px"
        }
      );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }


  /* =========================================================
     PREVENT EMPTY HASH NAVIGATION
  ========================================================== */

  document
    .querySelectorAll('a[href="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => event.preventDefault()
      );

    });

});