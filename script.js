const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const bookingForm = document.querySelector("[data-booking-form]");
const whatsappNumber = "6282144260185";

const buildWhatsAppUrl = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

nav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
});

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  const context = link.getAttribute("data-wa-context");
  const baseMessage =
    context === "hero"
      ? "Halo Coconut Garden Beach Resort, saya ingin reservasi dan mengetahui pilihan kamar yang tersedia."
      : context === "footer"
        ? "Halo Coconut Garden Beach Resort, saya ingin bertanya tentang ketersediaan kamar dan informasi menginap."
        : "Halo Coconut Garden Beach Resort, saya ingin mendapatkan informasi reservasi.";

  link.setAttribute("href", buildWhatsAppUrl(baseMessage));
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noreferrer");
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const arrival = formData.get("arrival") || "-";
  const departure = formData.get("departure") || "-";
  const guests = formData.get("guests") || "-";
  const name = formData.get("name") || "-";
  const notes = formData.get("notes") || "-";

  const message = [
    "Halo Coconut Garden Beach Resort, saya ingin cek ketersediaan kamar.",
    "",
    `Nama: ${name}`,
    `Arrival: ${arrival}`,
    `Departure: ${departure}`,
    `Guests: ${guests}`,
    `Catatan: ${notes}`,
  ].join("\n");

  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
});