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