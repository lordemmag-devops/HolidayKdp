/* =========================================================
   OTO3 — DONE-FOR-YOU HOLIDAY BUNDLE
   JavaScript
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById("year");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach((item) => {


        const question =
            item.querySelector(".faq-question");


        const answer =
            item.querySelector(".faq-answer");


        if (!question || !answer) {
            return;
        }


        question.addEventListener("click", () => {


            const isOpen =
                question.getAttribute(
                    "aria-expanded"
                ) === "true";


            /*
             * Close all other FAQ items
             */

            faqItems.forEach((otherItem) => {


                const otherQuestion =
                    otherItem.querySelector(
                        ".faq-question"
                    );


                const otherAnswer =
                    otherItem.querySelector(
                        ".faq-answer"
                    );


                if (
                    !otherQuestion ||
                    !otherAnswer ||
                    otherItem === item
                ) {

                    return;

                }


                otherQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );


                otherAnswer.style.maxHeight =
                    null;

            });



            /*
             * Toggle clicked FAQ item
             */

            question.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            answer.style.maxHeight =
                isOpen
                    ? null
                    : `${answer.scrollHeight}px`;

        });

    });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {


        const observer =
            new IntersectionObserver(

                (entries, obs) => {


                    entries.forEach((entry) => {


                        if (
                            entry.isIntersecting
                        ) {


                            entry.target.classList.add(
                                "is-visible"
                            );


                            obs.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"
                }

            );


        revealElements.forEach(
            (element) =>
                observer.observe(element)
        );


    } else {


        /*
         * Fallback for older browsers
         */

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }



    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {


            link.addEventListener(
                "click",
                (event) => {


                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const header =
                        document.querySelector(
                            ".site-header"
                        );


                    const headerOffset =
                        header
                            ? header.offsetHeight + 12
                            : 12;


                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top
                        +
                        window.pageYOffset
                        -
                        headerOffset;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }

            );

        });

});