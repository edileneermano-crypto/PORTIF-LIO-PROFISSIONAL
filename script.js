document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
     01. EFEITO MÁQUINA DE ESCREVER
     ========================================== */

  const h1 = document.querySelector(".hero-content .text-content h1");
  const techStack = document.querySelector(
    ".hero-content .text-content .tech-stack",
  );

  const h1Text = "Analista de Dados";
  const techStackText = "SQL | Python | Power BI | Excel";
  const typingSpeed = 100;

  function typeWriter(element, text, callback) {
    if (!element) return;

    let index = 0;

    element.textContent = "";

    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;

        setTimeout(type, typingSpeed);
        return;
      }

      if (callback) {
        callback();
      }
    }

    type();
  }

  if (h1 && techStack) {
    typeWriter(h1, h1Text, () => {
      typeWriter(techStack, techStackText);
    });
  }


  /* ==========================================
     02. CARROSSÉIS
     ========================================== */

  function setupCarousel(carouselId) {
    const track = document.querySelector(
      `[data-carousel-track="${carouselId}"]`,
    );

    const nextButton = document.querySelector(
      `.next-arrow[data-carousel="${carouselId}"]`,
    );

    const prevButton = document.querySelector(
      `.prev-arrow[data-carousel="${carouselId}"]`,
    );

    if (!track || !nextButton || !prevButton) return;

    const items = Array.from(track.children);

    if (items.length === 0) return;

    let currentIndex = 0;

    function getItemWidth() {
      return items[0].getBoundingClientRect().width;
    }

    function setSlidePosition() {
      const itemWidth = getItemWidth();

      track.style.transform =
        `translateX(-${itemWidth * currentIndex}px)`;
    }

    nextButton.addEventListener("click", () => {
      currentIndex++;

      if (currentIndex >= items.length) {
        currentIndex = 0;
      }

      setSlidePosition();
    });

    prevButton.addEventListener("click", () => {
      currentIndex--;

      if (currentIndex < 0) {
        currentIndex = items.length - 1;
      }

      setSlidePosition();
    });

    window.addEventListener("resize", setSlidePosition);
  }

  setupCarousel("projetos");
  setupCarousel("certificacoes");


  /* ==========================================
     03. FORMULÁRIO DE CONTATO
     ========================================== */

  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (contactForm && successMessage) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          contactForm.style.display = "none";
          successMessage.style.display = "block";

          contactForm.reset();

          return;
        }

        alert("❌ Ocorreu um erro ao enviar. Tente novamente.");
      } catch (error) {
        alert("❌ Ocorreu um erro ao enviar. Tente novamente.");
      }
    });
  }
});


/* ==========================================
   04. FILTRO DE PROJETOS
   ========================================== */

function filterProjects(type, button) {
  const projects = document.querySelectorAll(".project");
  const buttons = document.querySelectorAll("#projetos .filters button");

  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  projects.forEach((project) => {
    const shouldShow =
      type === "all" || project.classList.contains(type);

    project.style.display = shouldShow ? "block" : "none";
  });
}


/* ==========================================
   05. FILTRO DE CERTIFICAÇÕES
   ========================================== */

function filterCertificates(type, button) {
  const certificates = document.querySelectorAll(".certificate");
  const buttons = document.querySelectorAll(
    "#certificacoes .filters button",
  );

  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  certificates.forEach((certificate) => {
    const shouldShow =
      type === "all" ||
      certificate.classList.contains(type);

    certificate.style.display = shouldShow ? "block" : "none";
  });
}