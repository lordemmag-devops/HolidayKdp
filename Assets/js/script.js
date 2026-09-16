/* =========================================================
   WINTER CONTENT VAULT
   VANILLA JAVASCRIPT
========================================================= */

(function () {
    "use strict";


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", function () {

            const isOpen = mobileMenu.classList.toggle("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mobileMenu.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(".site-header");

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                12;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqQuestions = document.querySelectorAll(
        ".faq-question"
    );

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const currentItem =
                question.closest(".faq-item");

            if (!currentItem) {
                return;
            }

            const currentlyOpen =
                currentItem.classList.contains("is-open");


            document.querySelectorAll(".faq-item.is-open")
                .forEach(function (item) {

                    if (item !== currentItem) {

                        item.classList.remove("is-open");

                        const button =
                            item.querySelector(".faq-question");

                        if (button) {
                            button.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        }

                    }

                });


            if (currentlyOpen) {

                currentItem.classList.remove("is-open");

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                currentItem.classList.add("is-open");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("is-visible");

        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        const toggleBackToTop = function () {

            if (window.scrollY > 700) {

                backToTop.classList.add(
                    "is-visible"
                );

            } else {

                backToTop.classList.remove(
                    "is-visible"
                );

            }

        };


        window.addEventListener(
            "scroll",
            toggleBackToTop,
            {
                passive: true
            }
        );


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


        toggleBackToTop();

    }


    /* =====================================================
       KEYBOARD ACCESSIBILITY FOR FAQ
    ===================================================== */

    faqQuestions.forEach(function (question) {

        question.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    question.click();

                }

            }
        );

    });


    /* =====================================================
       PREVENT STICKY CTA FROM COVERING FOOTER
    ===================================================== */

    const stickyCTA =
        document.querySelector(".mobile-sticky-cta");

    const footer =
        document.querySelector(".site-footer");

    if (stickyCTA && footer) {

        const updateStickyCTA = function () {

            const footerRect =
                footer.getBoundingClientRect();

            const viewportHeight =
                window.innerHeight;

            if (
                footerRect.top <
                viewportHeight
            ) {

                stickyCTA.style.transform =
                    "translateY(100%)";

            } else {

                stickyCTA.style.transform =
                    "translateY(0)";

            }

        };


        window.addEventListener(
            "scroll",
            updateStickyCTA,
            {
                passive: true
            }
        );

        window.addEventListener(
            "resize",
            updateStickyCTA
        );

        updateStickyCTA();

    }

})();