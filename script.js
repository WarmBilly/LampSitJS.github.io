document.addEventListener("DOMContentLoaded", () => { 
    const app = document.getElementById("app");

    const routes = {
        "index": createHomePage,
        "catalog": createCatalogPage,
        "about": createAboutPage,
        "cart": createCartPage,
        "product": createProductPage
    };

    window.navigate = function (page, param) {
        if (!routes[page]) {
            console.error(`Невідомий маршрут: "${page}"`);
            return;
        }
        
        app.innerHTML = "";
        //window.history.pushState({}, "", `/${page}${param ? `?id=${param}` : ""}`);
        routes[page](param);
    };
    
    

    function createHeader() {
        const header = document.createElement("header");
        header.innerHTML = `
            <div class="logo"><img src="logo.png" alt="Лого"></div>
            <nav>
                <a href="#" onclick="navigate('index')">Головна</a>
                <a href="#" onclick="navigate('catalog')">Каталог</a>
                <a href="#" onclick="navigate('about')">Про нас</a>
                <a href="#" onclick="alert('Кошик поки порожній')">Кошик 🛒</a>
            </nav>
        `;
        app.appendChild(header);
    }

    function createHomePage() {
        createHeader();
        const section = document.createElement("section");
        section.classList.add("hero");
        section.innerHTML = `
            <h1>Справжні витвори мистецтва</h1>
            <p>Неповторний дизайн із багатою стилістикою</p>
            <a href="#" onclick="navigate('catalog')" class="btn">Дивитися каталог</a>
        `;
        app.appendChild(section);
    }

    function createCatalogPage() {
        createHeader();
        const section = document.createElement("section");
        section.classList.add("catalog");

        const lamps = [
            { id: 1, name: "Сонячна Лампа", price: "800 грн", img: "lamp1.jpg" },
            { id: 2, name: "Pazzle Lamp", price: "600 грн", img: "lamp2.jpg" },
            { id: 3, name: "Світло Квіт", price: "750 грн", img: "lamp3.jpg" },
            { id: 4, name: "Лампа Ніч", price: "900 грн", img: "lamp4.jpg" },
            { id: 5, name: "Лампа Ліс", price: "850 грн", img: "lamp5.jpg" },
            { id: 6, name: "Місячне Світло", price: "950 грн", img: "lamp6.jpg" }
        ];

        const grid = document.createElement("div");
        grid.classList.add("product-grid");

        lamps.forEach(lamp => {
            const div = document.createElement("div");
            div.classList.add("product");
            div.innerHTML = `
                <img src="${lamp.img}" alt="${lamp.name}">
                <h2>${lamp.name}</h2>
                <p>Якісний та стильний дизайн.</p>
                <span>${lamp.price}</span>
                <a href="#" onclick="alert('Купівля ${lamp.name}') " class="btn">Купити</a>
            `;
            grid.appendChild(div);
        });

        section.appendChild(grid);
        app.appendChild(section);
    }

    function createAboutPage() {
        createHeader();
        const section = document.createElement("section");
        section.classList.add("about");
        section.innerHTML = `
            <h1>Про нашу компанію</h1>
            <p>Ми спеціалізуємось на виробництві унікальних ламп та світильників.</p>
        `;
        app.appendChild(section);
    }
    function createCartPage() {
        createHeader();
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const section = document.createElement("section");
        section.classList.add("cart");

        if (cart.length === 0) {
            section.innerHTML = "<h2>Ваш кошик порожній</h2>";
        } else {
            cart.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("cart-item");
                div.innerHTML = `<p>${item}</p>`;
                section.appendChild(div);
            });
            section.innerHTML += `<button onclick="clearCart()" class="btn">Очистити кошик</button>`;
        }

        app.appendChild(section);
    }

    window.addToCart = (id) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(`Лампа ${id}`);
        localStorage.setItem("cart", JSON.stringify(cart));
        
        alert("Товар додано в кошик!");
    };

    window.clearCart = () => {
        localStorage.setItem("cart", JSON.stringify([]));
        navigate("cart");
    };

    window.onpopstate = () => {
        const page = location.pathname.substring(1); // Отримуємо сторінку без "/"
        const param = new URLSearchParams(location.search).get("id");
        navigate(page || "index", param);
    };
    
    function createProductPage(id) {
        createHeader();
        const lamps = {
            1: { name: "Сонячна Лампа", price: "800 грн", img: "lamp1.jpg", desc: "Тепле світло для затишку." },
            2: { name: "Pazzle Lamp", price: "600 грн", img: "lamp2.jpg", desc: "Модульний дизайн." },
            3: { name: "Світло Квіт", price: "750 грн", img: "lamp3.jpg", desc: "Квітковий стиль." },
            4: { name: "Лампа Ніч", price: "900 грн", img: "lamp4.jpg", desc: "Ідеальна для вечорів." },
            5: { name: "Лампа Ліс", price: "850 грн", img: "lamp5.jpg", desc: "Натуральний стиль." },
            6: { name: "Місячне Світло", price: "950 грн", img: "lamp6.jpg", desc: "М'яке біле світло." }
        };

        const lamp = lamps[id];
        const section = document.createElement("section");
        section.classList.add("product-detail");
        section.innerHTML = `
            <img src="${lamp.img}" alt="${lamp.name}">
            <h1>${lamp.name}</h1>
            <p>${lamp.desc}</p>
            <span>${lamp.price}</span>
            <button onclick="addToCart(${id})" class="btn">Додати в кошик</button>
        `;
        app.appendChild(section);
    }

    window.addToCart = (id) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(id);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Товар додано в кошик!");
    };

    function createCartPage() {
        createHeader();
        const section = document.createElement("section");
        section.classList.add("cart");
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) {
            section.innerHTML = "<h2>Ваш кошик порожній</h2>";
        } else {
            section.innerHTML = "<h2>Ваш кошик</h2>";
            cart.forEach(id => {
                section.innerHTML += `<p>Товар з ID: ${id}</p>`;
            });
        }
        app.appendChild(section);
    }

    window.onpopstate = () => {
        const page = location.pathname.substring(1) || "index";
        const param = new URLSearchParams(location.search).get("id");
        navigate(page, param);
    }
    navigate("index"); // Завантаження головної сторінки
});
