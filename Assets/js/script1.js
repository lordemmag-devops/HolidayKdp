/* =========================================================
   HOLIDAY KDP MASTER-PACK
   OTO1 SALES PAGE JAVASCRIPT
   Vanilla JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            mobileNav.classList.toggle(
                "open",
                !isOpen
            );

            mobileNav.setAttribute(
                "aria-hidden",
                String(isOpen)
            );

        });


        mobileNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileNav.classList.remove("open");

                mobileNav.setAttribute(
                    "aria-hidden",
                    "true"
                );

            });

        });

    }


    /* =====================================================
       SMOOTH INTERNAL SCROLLING
    ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header =
                document.querySelector(".site-header");

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {

        question.addEventListener("click", () => {

            const currentItem =
                question.closest(".faq-item");

            const answer =
                currentItem.querySelector(".faq-answer");

            const isExpanded =
                question.getAttribute("aria-expanded") === "true";


            /* Close all other FAQ items */

            faqQuestions.forEach(otherQuestion => {

                if (otherQuestion !== question) {

                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const otherItem =
                        otherQuestion.closest(".faq-item");

                    const otherAnswer =
                        otherItem.querySelector(".faq-answer");

                    otherAnswer.style.maxHeight = null;

                }

            });


            /* Toggle current item */

            question.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            if (!isExpanded) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            } else {

                answer.style.maxHeight = null;

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
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        const updateBackToTop =
            () => {

                if (window.scrollY > 700) {

                    backToTop.classList.add(
                        "visible"
                    );

                } else {

                    backToTop.classList.remove(
                        "visible"
                    );

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


    /* =====================================================
       PREVENT ACCIDENTAL HORIZONTAL OVERFLOW
       ===================================================== */

    const checkOverflow = () => {

        if (document.documentElement.scrollWidth >
            document.documentElement.clientWidth) {

            document.body.classList.add(
                "has-horizontal-overflow"
            );

        } else {

            document.body.classList.remove(
                "has-horizontal-overflow"
            );

        }

    };

    window.addEventListener(
        "resize",
        checkOverflow,
        { passive: true }
    );

    checkOverflow();


    /* =====================================================
       KEYBOARD ACCESSIBILITY FOR FAQ
    ===================================================== */

    faqQuestions.forEach(question => {

        question.addEventListener(
            "keydown",
            event => {

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
       CLOSE MOBILE NAV WITH ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            if (!menuToggle || !mobileNav) {
                return;
            }

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileNav.classList.remove("open");

            mobileNav.setAttribute(
                "aria-hidden",
                "true"
            );

        }
    );


});