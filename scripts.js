function scrollLeft1() {
    const grid = document.querySelector('.image-grid');
    grid.scrollBy({
        left: -400, // Прокрутка влево на 400px
        behavior: 'smooth', // Плавная прокрутка
    });
}

function scrollRight1() {
    const grid = document.querySelector('.image-grid');
    grid.scrollBy({
        left: 400, // Прокрутка вправо на 400px
        behavior: 'smooth', // Плавная прокрутка
    });
}
function scrollLeft() {
    const grid = document.querySelector('.scrollable-cards');
    grid.scrollBy({
        left: -400, // Прокрутка влево на 400px
        behavior: 'smooth', // Плавная прокрутка
    });
}

function scrollRight() {
    const grid = document.querySelector('.scrollable-cards');
    grid.scrollBy({
        left: 400, // Прокрутка вправо на 400px
        behavior: 'smooth', // Плавная прокрутка
    });
}

// Закрытие меню при клике на ссылку
document.querySelectorAll('.fullscreen-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('menu-toggle').checked = false; // Закрываем меню
    });
});

// Открытие и закрытие корзины
function toggleCart() {
    const cartWindow = document.getElementById('cart-window');
    cartWindow.style.display = (cartWindow.style.display === 'none' || cartWindow.style.display === '') ? 'flex' : 'none';
}


//Функция для открытия/закрытия чата
function toggleChat() {
    var chatWindow = document.getElementById("chat-window");
    if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
        chatWindow.style.display = "flex";
    } else {
        chatWindow.style.display = "none";
    }
}

function toggleCart() {
    var cartWindow = document.getElementById("cart-window");
    if (cartWindow.style.display === "none" || cartWindow.style.display === "") {
        cartWindow.style.display = "flex";
    } else {
        cartWindow.style.display = "none";
    }
}

// Открытие и закрытие модального окна
const loginButton = document.getElementById('login-button');
const modal = document.getElementById('login-modal');
const closeButton = document.querySelector('.close-btn');

// Открыть модальное окно при нажатии на кнопку "Войти"
loginButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Закрыть модальное окно при нажатии на крестик
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрыть модальное окно при клике вне его содержимого
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function truncate(str, maxlength) {
    // Проверяем, если длина строки больше, чем максимальная длина
    if (str.length > maxlength) {
        // Возвращаем усечённую строку с "…"
        return str.slice(0, maxlength - 1) + '…';
    }
    // Если усечение не требуется, возвращаем исходную строку
    return str;
}

function toggleHeart(element) {
    element.classList.toggle('active'); // Переключает класс "active"
}

document.querySelectorAll('.product-title').forEach(titleElement => {
    const originalText = titleElement.innerText;
    titleElement.innerText = truncate(originalText, 25); // Ограничиваем название до 20 символов
});

// Массив для хранения товаров в корзине
let cart = [];

// Функция для обновления отображения корзины
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = ''; // Очищаем содержимое корзины
    let total = 0; // Общая стоимость

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        // Создаем HTML для каждого товара
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">${item.price} руб.</span>
            <span class="cart-item-quantity">
                <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                ${item.quantity}
                <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
            </span>
            <button class="remove-btn" onclick="removeFromCart(${index})">&times;</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // Обновляем общую стоимость
    cartTotalElement.innerText = total;
}

// Добавление товара в корзину
function addToCart(event) {
    const productCard = event.target.closest('.product-card');
    const productName = productCard.querySelector('.product-title').innerText;
    const productPrice = parseInt(event.target.getAttribute('data-price'), 10);

    // Проверяем, есть ли товар уже в корзине
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity++; // Увеличиваем количество
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    renderCart(); // Обновляем отображение корзины
}

// Удаление товара из корзины
function removeFromCart(index) {
    cart.splice(index, 1); // Удаляем товар по индексу
    renderCart(); // Обновляем отображение корзины
}

// Увеличение количества товара
function increaseQuantity(index) {
    cart[index].quantity++;
    renderCart();
}

// Уменьшение количества товара
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeFromCart(index); // Удаляем товар, если количество стало 0
    }
    renderCart();
}

// Назначаем обработчики событий для кнопок "В корзину"
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', addToCart);
});

// Рендерим корзину при загрузке страницы
renderCart();




