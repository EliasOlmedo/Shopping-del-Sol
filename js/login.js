document.addEventListener('DOMContentLoaded', function() {
    createRays();
    setupFormValidation(); // Formulario
    setupPasswordToggle();
    setupForgotPassword(); // Para realizar el enlace de contraseña olvidada
    checkLoginStatus();
});

function createRays() {
    const raysContainer = document.getElementById('rays');
    const rayCount = 36;
    
    for (let i = 0; i < rayCount; i++) {
        const ray = document.createElement('div');
        ray.className = 'ray';
        
        const angle = (i * (360 / rayCount));
        ray.style.transform = `rotate(${angle}deg)`;

        if (i % 2 === 0) {
            ray.style.width = '60px';
        } else {
            ray.style.width = '40px';
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

function setupFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const loginButton = document.getElementById('loginButton');
    const apiError = document.getElementById('apiError');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
       
        usernameInput.classList.remove('input-error');
        passwordInput.classList.remove('input-error');
        usernameError.classList.remove('show-error');
        passwordError.classList.remove('show-error');
        apiError.classList.remove('show-error');
        
        // Validamos los usuarios
        if (usernameInput.value.trim() === '') {
            usernameInput.classList.add('input-error');
            usernameError.classList.add('show-error');
            isValid = false;
        }
        
        // Validamos las contraseñas
        if (passwordInput.value.trim() === '') {
            passwordInput.classList.add('input-error');
            passwordError.classList.add('show-error');
            isValid = false;
        }
        
        if (isValid) {
            // Para mostrar el estado de carga
            loginButton.classList.add('loading');
            loginButton.disabled = true;
            
            // Preparamos el inicio
            const loginData = {
                username: usernameInput.value.trim(),
                password: passwordInput.value.trim()
            };
            
       // Envia la solicitud de inicio de sesión a la API
            fetch('httpS://a2e1-190-128-228-66.ngrok-free.app/delsolerp/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                // Para ocultar el estado de carga
                loginButton.classList.remove('loading');
                loginButton.disabled = false;
                
                if (data.success) {
                   // Almacena los datos de sesión en localStorage
                    localStorage.setItem('sessionId', data.data.sessionId);
                    localStorage.setItem('username', data.data.usuario);
                    localStorage.setItem('name', data.data.nombre);
                    localStorage.setItem('role', data.data.rol);
                    
                    // Redirigimos al panel
                    window.location.href = 'principal.html';
                } else {
            
                    apiError.textContent = data.message || 'Error al iniciar sesión. Verifique sus credenciales.';
                    apiError.classList.add('show-error');
                }
            })
            .catch(error => {
                // CONEXION
                loginButton.classList.remove('loading');
                loginButton.disabled = false;
                apiError.textContent = 'Error de conexión. Por favor, intente nuevamente.';
                apiError.classList.add('show-error');
                console.error('Error:', error);
            });
        }
    });
}

function setupPasswordToggle() {
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.getElementById('passwordIcon');
    
    passwordIcon.addEventListener('click', function() {
        if (passwordInput.type === 'contraseña') {
            passwordInput.type = 'text';
           
        } else {
            passwordInput.type = 'contraseña';
          
        }
    });
}

function setupForgotPassword() {
    const forgotLink = document.getElementById('forgotLink');
    
    forgotLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Se enviará un correo con instrucciones para recuperar su contraseña.');
    });
}

function checkLoginStatus() {
   // Verifica si el usuario ya ha iniciado sesión con una sesión válida
    const sessionId = localStorage.getItem('sessionId');
    
    if (sessionId) {
        // Redirigir al panel de control si existe sesión
        window.location.href = 'principal.html';
    }
}