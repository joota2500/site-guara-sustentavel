document.addEventListener("partes-prontas", () => {
    const caixa = document.querySelector(".horario");
    const texto = caixa && caixa.querySelector("span");
    if (!caixa || !texto) return;

    const hora = Number(new Date().toLocaleString("pt-BR", {
        hour: "2-digit",
        hourCycle: "h23",
        timeZone: "America/Fortaleza"
    }));
    const aberto = hora >= 7 && hora < 16;

    caixa.classList.add(aberto ? "aberto" : "fechado");
    texto.textContent = aberto ? "Aberto agora • 7h às 16h" : "Fechado agora • abre às 7h";
});