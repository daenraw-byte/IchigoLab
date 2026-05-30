// Función para rastrear páginas visitadas
function trackPageVisit() {
    const currentPage = window.location.pathname;
    const pageTitle = document.title;
    
    // Obtener páginas recientes del localStorage
    let recentPages = JSON.parse(localStorage.getItem('recentPages')) || [];
    
    // Crear objeto de página actual
    const pageData = {
        url: currentPage,
        title: pageTitle,
        timestamp: new Date().toISOString(),
        icon: getPageIcon(currentPage)
    };
    
    // Eliminar si ya existe para actualizarla al principio
    recentPages = recentPages.filter(page => page.url !== currentPage);
    
    // Agregar página actual al principio
    recentPages.unshift(pageData);
    
    // Mantener solo las últimas 5 páginas
    recentPages = recentPages.slice(0, 5);
    
    // Guardar en localStorage
    localStorage.setItem('recentPages', JSON.stringify(recentPages));
}

// Función para obtener el icono según la página
function getPageIcon(url) {
    if (url.includes('mundos.html')) return '🌍';
    if (url.includes('index.html') || url === '/' || url.endsWith('/')) return '🏠';
    return '📄';
}

// Función para mostrar páginas recientes
function displayRecentPages() {
    const recentPagesContainer = document.getElementById('recentPages');
    if (!recentPagesContainer) return;
    
    const recentPages = JSON.parse(localStorage.getItem('recentPages')) || [];
    
    if (recentPages.length === 0) {
        recentPagesContainer.innerHTML = '<p style="color: var(--text-light);">No has visitado páginas recientemente.</p>';
        return;
    }
    
    recentPagesContainer.innerHTML = recentPages.map(page => `
        <div class="recent-item">
            <a href="${page.url}" class="recent-link">
                <div class="recent-icon">${page.icon}</div>
                <div class="recent-info">
                    <h4>${getPageTitle(page.title)}</h4>
                    <p>${getPageDescription(page.url)}</p>
                </div>
            </a>
        </div>
    `).join('');
}

// Función para obtener el título limpio
function getPageTitle(title) {
    if (title.includes('Mundos')) return 'Mundos';
    if (title.includes('Wiki') || title.includes('Conocimiento')) return 'Inicio';
    return title.split(' - ')[0];
}

// Función para obtener descripción de la página
function getPageDescription(url) {
    if (url.includes('mundos.html')) return 'Explora los diferentes mundos disponibles';
    if (url.includes('index.html') || url === '/' || url.endsWith('/')) return 'Página principal de la wiki';
    return 'Página visitada recientemente';
}

// Ejecutar cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    // Rastrear visita actual
    trackPageVisit();
    
    // Mostrar páginas recientes si estamos en index.html
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        displayRecentPages();
    }
});
