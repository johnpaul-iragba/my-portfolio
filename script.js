var typed = new Typed(".typing",{
    strings:["","web Designer","web Developer","YouTuber","Graphics Designer"],
    typeSpeed:100,
    BackSpread:60,
    loop:true
})

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    const formData = Object.fromEntries(new FormData(contactForm));
    submitButton.disabled = true;
    formStatus.textContent = "Sending...";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error("Form submission failed");
        }

        contactForm.reset();
        formStatus.textContent = "Thanks! Your message was sent.";
    } catch (error) {
        formStatus.textContent = "Something went wrong. Please try again.";
    } finally {
        submitButton.disabled = false;
    }
});

/* ---------- mobile nav toggle ---------- */
const aside = document.querySelector(".aside");
const navToggler = document.querySelector(".nav-toggler");
const navLinks = document.querySelectorAll(".aside .nav a");

// create an overlay element that dims the page behind the open sidebar on mobile
const overlay = document.createElement("div");
overlay.classList.add("aside-overlay");
document.body.appendChild(overlay);

function openNav() {
    aside.classList.add("open");
    navToggler.classList.add("open");
    overlay.classList.add("show");
}

function closeNav() {
    aside.classList.remove("open");
    navToggler.classList.remove("open");
    overlay.classList.remove("show");
}

navToggler.addEventListener("click", () => {
    if (aside.classList.contains("open")) {
        closeNav();
    } else {
        openNav();
    }
});

overlay.addEventListener("click", closeNav);

// close the menu automatically after tapping a link (mobile UX)
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        closeNav();
    });
});

// keep things tidy if the viewport is resized back up to desktop
window.addEventListener("resize", () => {
    if (window.innerWidth > 1199) {
        closeNav();
    }
});