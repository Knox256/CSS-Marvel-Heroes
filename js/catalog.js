const search = document.querySelector("#search");
const catalogs = document.querySelectorAll(".catalog");

function normalize(text) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

catalogs.forEach((catalog) => {
    const cards = catalog.querySelectorAll(".character-card");
    const container = catalog.querySelector(".characters");
    const buttons = catalog.querySelectorAll("[data-view]");
    const status = catalog.querySelector(".result-status");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            container.classList.toggle("rows", button.dataset.view === "rows");
            buttons.forEach((control) => {
                control.setAttribute("aria-pressed", String(control === button));
            });
        });
    });

    search.addEventListener("input", () => {
        const query = normalize(search.value);
        let visible = 0;
        cards.forEach((card) => {
            const alias = normalize(card.querySelector("h3").textContent);
            const identity = normalize(card.querySelector(".real-name").textContent);
            card.hidden = !alias.includes(query) && !identity.includes(query);
            if (!card.hidden) visible += 1;
        });
        status.textContent = visible === 0
            ? "No se encontraron personajes."
            : visible === 1 ? "1 personaje" : visible + " personajes";
    });
});
