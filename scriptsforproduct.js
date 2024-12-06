const products = [
    {
        id: 1,
        name: "Электрический перфоратор",
        image: "images\\perforator.png",
        description: "Мощный инструмент для сверления и долбления.",
        price: 10000,
        gallery: [
            "images\\perforator.png",
            "images\\perforator2.jpg",
            "images\\perforator3.png"
        ]
    },
    {
        id: 2,
        name: "Угловая шлифмашина AEG WS13-125SXE 4935451309",
        description: "Угловая шлифмашина AEG WS13-125SXE 4935451309 предназначена для резки, шлифовки различных поверхностей. Фрезерованные металлические шестерни повышают надежность конструкции. Плоский металлический корпус редуктора позволяет работать в ограниченном пространстве. Специальный поворотный кожух защищает оператора при работе, он может устанавливаться в нескольких угловых положениях вручную, без отвертки.",
        price: 13430,
        image: "images\\bolgar1.jpg",
        gallery: [
            "images\\bolgar1.jpg",
            "images\\bolgar2.jpg",
            "images\\bolgar3.png"
        ]
    },
    {
        id: 3,
        name: "Аккумуляторный гайковерт AEG BSS 18C12ZLi-0 4935446449",
        description: "Аккумуляторный гайковерт AEG BSS 18C12ZLi-0 4935446449 - прекрасно сбалансированный ударный инструмент с встроенной трехточечной подсветкой, которая позволяет вести работу даже при плохом освещении. Рукоятка имеет покрытие с микротекстурой, что обеспечивает надежный хват. Металлический корпус редуктора увеличивает рабочий ресурс гайковерта.",
        price: 9300,
        image: "images\\gayka1.jpg",
        gallery: [
            "images\\gayka1.jpg",
            "images\\gayka2.jpg",
            "images\\gayka3.jpg"
        ]
    }
];

function openProductPage(productId) {
    window.location.href = `product-detail.html?productId=${productId}`;
}

// Пример использования в карточках
document.querySelectorAll(".product-card").forEach((card, index) => {
    card.addEventListener("click", () => openProductPage(index + 1));
});


// Функция для извлечения параметров из URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.slice(1); // Убираем "?" из строки
    queryString.split("&").forEach(param => {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value);
    });
    return params;
}

// Загрузка данных товара на странице product-detail.html
if (window.location.pathname.includes("product-detail.html")) {
    const params = getQueryParams();
    const productId = parseInt(params.productId, 10);

    // Найти товар по ID
    const product = products.find(p => p.id === productId);

    if (product) {
        // Отображение данных товара
        document.getElementById("product-title").innerText = product.name;
        document.getElementById("product-description").innerText = product.description;
        document.getElementById("product-image").setAttribute("src", product.image);
        document.getElementById("product-price").innerText = product.price;

        // Добавить товар в корзину
        document.querySelector(".add-to-cart-btn").addEventListener("click", () => {
            addToCartFromDetails(product.name, product.price);
        });
    } else {
        // Если товара нет
        document.getElementById("product-details").innerHTML = "<p>Товар не найден.</p>";
    }
}

// Добавить товар в избранное
function toggleFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.includes(productId)) {
        // Удалить из избранного
        favorites = favorites.filter(id => id !== productId);
        alert('Товар удалён из избранного.');
    } else {
        // Добавить в избранное
        favorites.push(productId);
        alert('Товар добавлен в избранное.');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

if (window.location.pathname.includes("product-detail.html")) {
    const params = getQueryParams();
    const productId = parseInt(params.productId, 10);

    // Найти товар по ID
    const product = products.find(p => p.id === productId);

    if (product) {
        // Отображение данных товара
        document.getElementById("product-title").innerText = product.name;
        document.getElementById("product-description").innerText = product.description;
        document.getElementById("product-image").setAttribute("src", product.image);
        document.getElementById("product-price").innerText = product.price;

        // Создание галереи
        const galleryContainer = document.getElementById("gallery");
        product.gallery.forEach((image, index) => {
            const thumbnail = document.createElement("img");
            thumbnail.src = image;
            thumbnail.alt = `Галерея ${index + 1}`;
            thumbnail.classList.add("thumbnail");

            // Смена основного изображения при клике
            thumbnail.addEventListener("click", () => {
                document.getElementById("product-image").src = image;

                // Убираем класс "active" у всех миниатюр
                document.querySelectorAll(".thumbnail").forEach(tn => tn.classList.remove("active"));

                // Добавляем класс "active" к текущей миниатюре
                thumbnail.classList.add("active");
            });

            // Добавляем миниатюру в галерею
            galleryContainer.appendChild(thumbnail);
        });
    } else {
        // Если товара нет
        document.getElementById("product-details").innerHTML = "<p>Товар не найден.</p>";
    }
}
