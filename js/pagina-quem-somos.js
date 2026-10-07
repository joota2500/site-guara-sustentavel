document.addEventListener("partes-prontas", () => {
    const dados = {
        inicio: "2026-10-05",
        ajusteDias: 0,
        perguntas: [
            ["A associação já existe formalmente?", "Ainda não. A GuaráSustentável está em formação e o CNPJ será publicado quando existir."],
            ["Onde fica a sede?", "O ponto de encontro fica no Pé de Ladeira, em Guaramiranga, Ceará."],
            ["O que a associação faz?", "Orienta, recolhe e separa o material reciclável da casa, da pousada e do comércio."],
            ["A associação tem fins lucrativos?", "Não. A proposta é uma associação sem fins lucrativos."],
            ["Como falar com a iniciativa?", "Pelo WhatsApp (85) 98921-4864 ou pelo e-mail guarasustentavel25@gmail.com."]
        ]
    };
    const lista = document.querySelector("#perguntas");
    const visiveis = 3;
    if (!lista) return;

    dados.perguntas.forEach((item, indice) => {
        const artigo = document.createElement("article");
        const botao = document.createElement("button");
        const resposta = document.createElement("p");
        artigo.className = "pergunta";
        if (indice >= visiveis) artigo.hidden = true;
        botao.type = "button";
        botao.textContent = item[0];
        botao.setAttribute("aria-expanded", "false");
        resposta.hidden = true;
        resposta.textContent = item[1];
        artigo.append(botao, resposta);
        lista.append(artigo);
    });

    lista.addEventListener("click", (evento) => {
        const botao = evento.target.closest("button");
        if (!botao) return;
        const resposta = botao.nextElementSibling;
        resposta.hidden = !resposta.hidden;
        botao.setAttribute("aria-expanded", String(!resposta.hidden));
    });

    document.querySelector("#ver-mais").addEventListener("click", () => {
        [...lista.children].slice(visiveis).forEach((item) => { item.hidden = false; });
    });
    document.querySelector("#fechar").addEventListener("click", () => {
        [...lista.children].slice(visiveis).forEach((item) => { item.hidden = true; });
    });

    const caixa = document.querySelector("#tempo-criacao");
    if (!caixa) return;
    const dias = Math.max(0, Math.floor((Date.now() - new Date(dados.inicio + "T00:00:00-03:00")) / 86400000) + dados.ajusteDias);
    const anos = Math.floor(dias / 365);
    const meses = Math.floor((dias % 365) / 30);
    const resto = (dias % 365) % 30;
    const partes = [];
    if (anos) partes.push(anos + (anos > 1 ? " anos" : " ano"));
    if (meses) partes.push(meses + (meses > 1 ? " meses" : " mês"));
    partes.push(resto + (resto === 1 ? " dia" : " dias"));
    caixa.textContent = partes.join(", ");
});