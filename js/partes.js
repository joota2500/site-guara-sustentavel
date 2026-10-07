async function ler(caminho) {
    const resposta = await fetch(caminho);
    if (!resposta.ok) return "";
    return resposta.text();
}

async function lerParte(nome) {
    const naPasta = await ler("/partes/" + nome + ".html");
    if (naPasta) return naPasta;
    return ler("/" + nome + ".html");
}

async function colocarNav() {
    const barra = document.querySelector(".header-bar");
    if (barra && !barra.querySelector("nav")) {
        barra.insertAdjacentHTML("beforeend", await lerParte("nav"));
    }
}

async function carregarPartes() {
    const montagem = document.querySelector("#montagem");

    if (montagem) {
        montagem.innerHTML = await lerParte("header");
        await colocarNav();

        for (const nome of ["index-quem-somos", "institucional", "footer"]) {
            const caixa = document.createElement("div");
            caixa.innerHTML = await lerParte(nome);
            montagem.append(caixa);
        }
    }

    for (const alvo of document.querySelectorAll("[data-parte]")) {
        alvo.innerHTML = await lerParte(alvo.dataset.parte);
    }

    await colocarNav();

    if (location.hash) {
        const alvo = document.querySelector(location.hash);
        if (alvo) alvo.scrollIntoView();
    }

    document.dispatchEvent(new Event("partes-prontas"));
}

carregarPartes();