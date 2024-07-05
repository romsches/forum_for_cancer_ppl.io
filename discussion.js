document.addEventListener('DOMContentLoaded', function () {
    // Проверяем, находимся ли мы на странице обсуждений (discussion.html)
    if (document.getElementById('discussion-form')) {
        // Код для работы с комментариями и пагинацией
        const discussionForm = document.getElementById('discussion-form');
        discussionForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let nickname = document.getElementById('nickname').value.trim();
            let comment = document.getElementById('comment').value.trim();

            if (nickname === '') {
                alert('Пожалуйста, введите ваш никнейм.');
                return;
            }

            if (comment === '') {
                alert('Пожалуйста, введите комментарий.');
                return;
            }

            fetch('/submit-discussion-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nickname, comment }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showNotification('Комментарий успешно отправлен');

                    document.getElementById('nickname').value = '';
                    document.getElementById('comment').value = '';

                    loadComments(1);
                } else {
                    alert('Ошибка при отправке комментария');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка сервера');
            });
        });

        function loadComments(page = 1) {
            fetch(`/get-comments?page=${page}&limit=10`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const { comments, totalPages } = data;
        
                    let commentsSection = document.getElementById('discussion-comments-section');
                    commentsSection.innerHTML = '';
        
                    comments.forEach(comment => {
                        showComment(comment.id, comment.nickname, comment.comment);
                    });
        
                    showPaginationButtons(page, totalPages);
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    alert('Ошибка при загрузке комментариев');
                });
        }
        

        function showComment(id, nickname, comment) {
            let commentsSection = document.getElementById('discussion-comments-section');
            let commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <p><strong>${nickname}</strong>: ${comment}</p>
            `;
            commentsSection.appendChild(commentElement);
        }

        function showPaginationButtons(currentPage, totalPages) {
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = '';

            const prevButton = document.createElement('button');
            prevButton.textContent = 'Предыдущая страница';
            prevButton.addEventListener('click', () => {
                loadComments(currentPage - 1);
            });
            pagination.appendChild(prevButton);

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Следующая страница';
            nextButton.addEventListener('click', () => {
                loadComments(currentPage + 1);
            });
            pagination.appendChild(nextButton);

            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;

            const currentPageSpan = document.createElement('span');
            currentPageSpan.textContent = `Страница ${currentPage} из ${totalPages}`;
            currentPageSpan.classList.add('current-page');
            pagination.appendChild(currentPageSpan);
        }

        // Загрузка комментариев при загрузке страницы
        loadComments();

        // Отображение количества символов при вводе комментария
        const commentTextarea = document.getElementById('comment');
        if (commentTextarea) {
            commentTextarea.addEventListener('input', function() {
                const maxLength = commentTextarea.maxLength;
                const currentLength = commentTextarea.value.length;
                const remaining = maxLength - currentLength;
                document.getElementById('char-count').textContent = remaining;

                const charCountInfo = document.getElementById('char-count-info');
                if (remaining >= 0) {
                    charCountInfo.style.color = '#333';
                } else {
                    charCountInfo.style.color = 'red';
                }
            });
        }

        // Функция для показа уведомления
        function showNotification(message) {
            let notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;

            document.getElementById('discussion-form').appendChild(notification);

            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    notification.remove();
                }, 1000);
            }, 3000);
        }
    }
});  

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
