document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    createMiniRays();
    setupLogout();      // Configuracion de la funcionalidad de cierre de sesión
    displayUserInfo();  // Informacion del Usuario
    setupMenuItems();
});

function checkAuthentication() {
    const sessionId = localStorage.getItem('sessionId');
    
    if (!sessionId) {
        // Redirecciona al login
        window.location.href = 'index.html';
    }
}

function createMiniRays() {
    const raysContainer = document.getElementById('miniRays');
    const rayCount = 24; // Diseño    
    for (let i = 0; i < rayCount; i++) {
        const ray = document.createElement('div');
        ray.className = 'mini-ray';
        
       
        const angle = (i * (360 / rayCount));
        ray.style.transform = `rotate(${angle}deg)`;
    
        if (i % 2 === 0) {
            ray.style.width = '22px';
        } else {
            ray.style.width = '18px';
        }

        const hueShift = i % 3;
        if (hueShift === 0) {
            ray.style.background = 'linear-gradient(90deg, #f0ca61, #e58e3d)';
        } else if (hueShift === 1) {
            ray.style.background = 'linear-gradient(90deg, #e5b861, #e5843d)';
        } else {
            ray.style.background = 'linear-gradient(90deg, #f0ca61, #e59a4d)';
        }
        
        raysContainer.appendChild(ray);
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    logoutBtn.addEventListener('click', function() {
        const sessionId = localStorage.getItem('sessionId');
        
        if (sessionId) {
            // Confirmación
            if (confirm('¿Está seguro que desea cerrar sesión?')) {
        
                fetch('http://190.128.228.66:5300/delsolerp/api/auth/logout', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ sessionId: sessionId })
                })
                .then(response => response.json())
                .then(data => {
                    clearSessionAndRedirect();
                })
                .catch(error => {
                    console.error('Error al cerrar sesión:', error);
                    clearSessionAndRedirect();
                });
            }
        } else {
          
            window.location.href = 'index.html';
        }
    });
}

function clearSessionAndRedirect() {
  // Borramos todos los datos de la sesión
    localStorage.removeItem('sessionId');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    
   
    window.location.href = 'index.html';
}

function displayUserInfo() {
    const userName = document.getElementById('userName');
    const name = localStorage.getItem('name');
    
    if (name) {
        userName.textContent = name;
    } else {
     
        // Volver al nombre de usuario si el nombre no está disponible
        const username = localStorage.getItem('username');
        if (username) {
            userName.textContent = username;
        }
    }
}

function setupMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
           // Aquí es donde normalmente navegarías a las diferentes secciones.
            // Para esta demostración, solo mostraremos una alerta.
            const menuTitle = this.querySelector('h3').textContent;
            alert(`Navegando a: ${menuTitle}`);
        });
    });
}