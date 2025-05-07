// login.ts
export function setupLoginModal() {
  document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const googleLoginButton = document.getElementById('google-login');
    const loginForm = document.getElementById('login-form');

    // Abrir modal
    if (loginButton && loginModal) {
      loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    }

    // Cerrar modal
    if (closeModal && loginModal) {
      closeModal.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }

    // Cerrar con overlay
    if (modalOverlay && loginModal) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          loginModal.classList.add('hidden');
          document.body.style.overflow = '';
        }
      });
    }

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && loginModal && !loginModal.classList.contains('hidden')) {
        loginModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });

    // Enviar formulario login
    if (loginForm && loginForm instanceof HTMLFormElement) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(loginForm);

        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            const errorText = await response.text();
            alert(`Error: ${errorText}`);
            return;
          }

          window.location.href = '/dashboard';
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          alert('Ocurrió un error al intentar iniciar sesión.');
        }
      });
    }

    // Login con Google
    if (googleLoginButton) {
      googleLoginButton.addEventListener('click', () => {
        const formData = new FormData();
        formData.append('provider', 'google');

        fetch('/api/auth/login', {
          method: 'POST',
          body: formData
        })
          .then(res => res.json())
          .then(data => {
            if (data.url) {
              window.location.href = data.url;
            }
          })
          .catch(err => {
            console.error('Error:', err);
            alert('Error con inicio de sesión de Google');
          });
      });
    }
  });
}
