// Код для SpecialHeader и SpecialFooter остается без изменений.
class SpecialHeader extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
          <div class="header_container special-header">
              <nav>
                  <ul>
                      <li><a href="/">Главная страница</a></li>
                      <li><a href="/html/discussion.html">Обсуждения</a></li>
                      <li><a href="/html/contact.html">Помощь и связь</a></li>
                      <li><a href="/html/login.html">Войти в аккаунт</a></li>
                  </ul>
              </nav>
          </div>
      `;
  }
}

class SpecialFooter extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
          <div class="footer_container special-footer">
              <div class="unten">
                  <ul class="links">
                      <li><a href="#">О нас</a></li>
                      <li><a href="#">Связаться с нами</a></li>
                      <li><a href="#">Условия использования</a></li>
                      <li><a href="#">Политика конфиденциальности</a></li>
                  </ul>
              </div>
          </div>
      `;
  }
}

customElements.define('special-header', SpecialHeader);
customElements.define('special-footer', SpecialFooter);

document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (registerForm) {
    // Показать или скрыть пароль при клике на чекбокс
    const showPasswordCheckbox = document.getElementById('showPassword');
    if (showPasswordCheckbox) {
      showPasswordCheckbox.addEventListener('change', function() {
        const passwordField = document.getElementById('password');
        if (passwordField) {
          passwordField.type = this.checked ? 'text' : 'password';
        }
      });
    }

    // Обработка формы регистрации
    registerForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const messageElement = document.getElementById('message');

      try {
        const response = await fetch('http://localhost:7777/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (messageElement) {
          messageElement.textContent = data.message;
        } else {
          console.error('Элемент с id "message" не найден.');
        }

        // Проверяем успешность регистрации и перенаправляем на страницу after_login.html
        if (response.status === 200) {
          window.location.href = '/index.html';
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    });
  }

  if (loginForm) {
    // Показать или скрыть пароль при клике на чекбокс
    const showLoginPasswordCheckbox = document.getElementById('showLoginPassword');
    if (showLoginPasswordCheckbox) {
      showLoginPasswordCheckbox.addEventListener('change', function() {
        const loginPasswordField = document.getElementById('loginPassword');
        if (loginPasswordField) {
          loginPasswordField.type = this.checked ? 'text' : 'password';
        }
      });
    }

    // Обработка формы входа
    loginForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const loginEmail = document.getElementById('loginEmail').value;
      const loginPassword = document.getElementById('loginPassword').value;
      const messageElement = document.getElementById('message');

      try {
        const response = await fetch('http://localhost:7777/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: loginEmail, password: loginPassword })
        });

        const data = await response.json();
        if (messageElement) {
          messageElement.textContent = data.message;
        } else {
          console.error('Элемент с id "message" не найден.');
        }

        // Проверяем успешность входа и перенаправляем на страницу index.html
        if (response.status === 200) {
          window.location.href = '/index.html';
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    });
  }
});
