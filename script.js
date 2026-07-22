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