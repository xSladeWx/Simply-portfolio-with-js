document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const currentYearSpan = document.getElementById('current-year');

    // Función para actualizar el año en el footer
    function updateYear() {
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
    }

    // Función para cambiar la sección visible
    function showSection(targetId) {
        // Ocultar todas las secciones
        contentSections.forEach(section => {
            section.classList.remove('active-section');
        });

        // Mostrar la sección objetivo
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        }

        // Actualizar el enlace activo en la navegación
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            // Compara el data-target del enlace con el ID de la sección objetivo
            if (link.dataset.target === targetId) {
                link.classList.add('active-link');
            }
        });
    }

    // Añadir event listeners a los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace (#)
            const targetId = link.dataset.target; // Obtener el ID del data-attribute
            showSection(targetId);

            // Opcional: Hacer scroll suave hacia la sección (útil si el header es muy alto)
             const targetElement = document.getElementById(targetId);
             if(targetElement) {
                 // Considerar la altura del header si es sticky
                 const headerOffset = document.querySelector('header').offsetHeight;
                 const elementPosition = targetElement.getBoundingClientRect().top;
                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20; // 20px extra padding

                 window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth"
                 });
             }
        });
    });

    // Mostrar la sección inicial correcta al cargar (basado en la clase 'active-section' en HTML)
    // Opcionalmente, podrías leer la URL hash (#about o #projects) para mostrar la sección correcta al cargar/refrescar
    const initialActiveSection = document.querySelector('.content-section.active-section');
    if (initialActiveSection) {
        showSection(initialActiveSection.id); // Asegura que el enlace activo coincida
    } else {
        // Si ninguna está activa por defecto en HTML, muestra la primera (about)
        showSection('about');
    }


    // Actualizar el año en el footer
    updateYear();

    console.log("Portafolio interactivo cargado."); // Mensaje para depuración
});