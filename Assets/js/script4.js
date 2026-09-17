/* =========================================================
   HOLIDAY KDP JV PAGE
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(".site-header");
            const headerHeight = header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       COPY EMAIL SWIPES
    ===================================================== */

    const copyButtons = document.querySelectorAll(".copy-btn");

    copyButtons.forEach(function (button) {

        button.addEventListener("click", async function () {

            const targetId = this.getAttribute("data-copy");
            const emailElement = document.getElementById(targetId);

            if (!emailElement) {
                return;
            }

            const emailText = emailElement.innerText.trim();

            try {

                await navigator.clipboard.writeText(emailText);

                const originalText = this.textContent;

                this.textContent = "Copied ✓";

                this.style.background = "#1b9b69";
                this.style.borderColor = "#1b9b69";

                setTimeout(() => {

                    this.textContent = originalText;
                    this.style.background = "";
                    this.style.borderColor = "";

                }, 1800);

            } catch (error) {

                /* Fallback for browsers that block clipboard access */

                const textArea = document.createElement("textarea");

                textArea.value = emailText;

                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";

                document.body.appendChild(textArea);

                textArea.focus();
                textArea.select();

                try {
                    document.execCommand("copy");

                    const originalText = this.textContent;

                    this.textContent = "Copied ✓";

                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 1800);

                } catch (copyError) {

                    alert(
                        "Unable to copy automatically. Please select and copy the email manually."
                    );

                }

                document.body.removeChild(textArea);

            }

        });

    });


    /* =====================================================
       HEADER SHADOW ON SCROLL
    ===================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 10) {

            header.style.boxShadow =
                "0 8px 30px rgba(16, 27, 53, 0.08)";

        } else {

            header.style.boxShadow = "none";

        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       SIMPLE REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".snapshot-card, .product-block, .angle-grid article, " +
        ".benefit, .promotion-card, .creative-item, .swipe-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");

                    observerInstance.unobserve(entry.target);

                });

            },
            {
                threshold: 0.08
            }
        );

        revealElements.forEach(function (element) {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }


    /* =====================================================
       EXTERNAL AFFILIATE LINKS
    ===================================================== */

    const affiliateLinks = document.querySelectorAll(
        'a[href="https://warriorplus.com/affiliate/contest/ng7xv"]'
    );

    affiliateLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            console.log(
                "WarriorPlus affiliate contest link opened."
            );

        });

    });

});