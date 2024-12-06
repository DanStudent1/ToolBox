document.addEventListener('DOMContentLoaded', function () {
    const favoritesContainer = document.getElementById('favorites-container');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const products = [
        {
            id: 1,
            name: "Электрический перфоратор",
            image: "images\\perforator.png",
            description: "Мощный инструмент для сверления и долбления.",
            price: 10000
        },
        {
            id: 2,
            name: "Угловая шлифмашина AEG WS13-125SXE 4935451309",
            image: "images\\bolgar1.jpg",
            description: "Угловая шлифмашина AEG WS13-125SXE 4935451309 предназначена для резки, шлифовки различных поверхностей.",
            price: 13430
        },
        {
            id: 3,
            name: "Аккумуляторный гайковерт AEG BSS 18C12ZLi-0 4935446449",
            image: "images\\gayka1.jpg",
            description: "Прекрасно сбалансированный ударный инструмент.",
            price: 9300
        }
    ];

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>У вас нет избранных товаров.</p>';
    } else {
        favorites.forEach(productId => {
            const product = products.find(p => p.id === productId);
            if (product) {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">Цена: ${product.price} руб.</p>
                    <button class="remove-favorite-btn" onclick="removeFavorite(${product.id})">Удалить</button>
                `;
                favoritesContainer.appendChild(productCard);
            }
        });
    }
});

function removeFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    location.reload(); // Обновление страницы
}
