document.addEventListener("partes-prontas", () => {
    const botao = document.querySelector(".menu-button");
    const lista = document.querySelector(".nav-list");
    if (!botao || !lista) return;

    botao.addEventListener("click", () => {
        const aberto = lista.classList.toggle("aberto");
        botao.setAttribute("aria-expanded", aberto);
    });

    document.querySelectorAll(".submenu > a").forEach((link) => {
        link.addEventListener("click", (evento) => {
            if (window.innerWidth > 1080) return;
            evento.preventDefault();
            link.parentElement.classList.toggle("aberto");
        });
    });
});