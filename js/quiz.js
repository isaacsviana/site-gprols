// Quiz de perfil: tamanho do seio e tipo de bico (papila). As respostas ficam só neste aparelho.
(function () {
  const caixa = document.getElementById('quiz');
  if (!caixa) return;

  const perguntas = QUIZ.perguntas;
  const respostas = {};
  let indice = 0;
  let emResultado = false;

  function nomeDaResposta(pergunta, id) {
    const opcao = QUIZ.perguntas[pergunta === 'tamanho' ? 0 : 1].opcoes.find(function (o) { return o.id === id; });
    return pergunta === 'papila' && id !== 'identificar' ? 'Bico ' + opcao.nome.toLowerCase() : opcao.nome;
  }

  function falar(texto) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = 'pt-BR';
    voz.rate = 0.9;
    window.speechSynthesis.speak(voz);
  }

  function botaoOuvir(texto) {
    if (!('speechSynthesis' in window)) return null;
    const b = el('button', 'botao-ouvir');
    b.type = 'button';
    b.innerHTML = svg('som') + '<span>Ouvir</span>';
    b.addEventListener('click', function () { falar(texto); });
    return b;
  }

  function titulo(texto) {
    const h2 = el('h2', 'titulo-quiz', texto);
    h2.tabIndex = -1;
    return h2;
  }

  function etapas() {
    const barra = el('ol', 'etapas');
    barra.setAttribute('aria-label', 'Pergunta ' + (indice + 1) + ' de ' + perguntas.length);
    perguntas.forEach(function (p, i) {
      const li = el('li', i < indice ? 'feita' : (i === indice ? 'atual' : ''));
      li.appendChild(el('span', 'bolinha', i < indice ? '' : String(i + 1)));
      if (i < indice) li.firstChild.innerHTML = svg('ok');
      li.appendChild(el('span', 'rotulo', i === 0 ? 'Tamanho' : 'Bico'));
      barra.appendChild(li);
    });
    return barra;
  }

  function botaoOpcao(pergunta, opcao) {
    const botao = el('button', 'opcao');
    botao.type = 'button';
    botao.setAttribute('aria-pressed', respostas[pergunta.id] === opcao.id ? 'true' : 'false');
    botao.setAttribute('aria-label', opcao.nome + (opcao.legenda ? ', ' + opcao.legenda : ''));
    const figura = el('span', 'figura');
    figura.innerHTML = pergunta.id === 'tamanho' ? Desenhos.tamanho(opcao.id) : Desenhos.papila(opcao.id);
    botao.appendChild(figura);
    botao.appendChild(el('strong', '', opcao.nome));
    if (opcao.legenda) botao.appendChild(el('span', 'legenda', opcao.legenda));
    botao.addEventListener('click', function () {
      respostas[pergunta.id] = opcao.id;
      if (indice < perguntas.length - 1) {
        indice += 1;
        mostrarPergunta();
      } else {
        salvarPerfil({ tamanho: respostas.tamanho, papila: respostas.papila });
        mostrarResultado();
      }
    });
    return botao;
  }

  function mostrarPergunta() {
    const pergunta = perguntas[indice];
    emResultado = false;
    caixa.replaceChildren();

    const painel = el('section', 'painel-quiz');
    painel.appendChild(etapas());

    const cabecalho = titulo(pergunta.titulo);
    painel.appendChild(cabecalho);
    painel.appendChild(el('p', 'introducao', pergunta.ajuda));
    const ouvir = botaoOuvir(pergunta.fala);
    if (ouvir) painel.appendChild(ouvir);

    const grade = el('div', pergunta.opcoes.length === 3 ? 'opcoes tres' : 'opcoes');
    pergunta.opcoes.forEach(function (opcao) { grade.appendChild(botaoOpcao(pergunta, opcao)); });
    painel.appendChild(grade);

    const rodape = el('div', 'rodape-quiz');
    if (indice > 0) {
      const voltar = el('button', 'botao-secundario', 'Voltar');
      voltar.type = 'button';
      voltar.addEventListener('click', function () { indice -= 1; mostrarPergunta(); });
      rodape.appendChild(voltar);
    } else {
      const pularBotao = el('a', 'link-discreto', 'Pular por agora');
      pularBotao.href = 'index.html';
      pularBotao.addEventListener('click', pular);
      rodape.appendChild(pularBotao);
    }
    painel.appendChild(rodape);
    caixa.appendChild(painel);
    cabecalho.focus({ preventScroll: true });
  }

  function figura(pergunta, id) {
    const f = el('figure');
    const imagem = el('span', 'figura');
    imagem.innerHTML = pergunta === 'tamanho' ? Desenhos.tamanho(id) : Desenhos.papila(id);
    f.appendChild(imagem);
    f.appendChild(el('figcaption', '', nomeDaResposta(pergunta, id)));
    return f;
  }

  function mostrarResultado() {
    emResultado = true;
    caixa.replaceChildren();
    const painel = el('section', 'painel-quiz');
    const cabecalho = titulo('Seu resultado');
    painel.appendChild(cabecalho);

    const resumo = el('div', 'resumo');
    resumo.append(figura('tamanho', respostas.tamanho), figura('papila', respostas.papila));
    painel.appendChild(resumo);

    const perfil = { tamanho: respostas.tamanho, papila: respostas.papila };
    const frase = descreverPerfil(perfil) + '.';
    painel.appendChild(el('p', 'introducao centro', frase));

    const falaFinal = frase + ' ' + textoOrientacoes(respostas.papila);
    const ouvir = botaoOuvir(falaFinal);
    if (ouvir) painel.appendChild(ouvir);

    const orientacoes = montarOrientacoes(respostas.papila);
    if (orientacoes) painel.appendChild(orientacoes);

    painel.appendChild(el('p', 'nota', 'O seu resultado fica guardado só neste aparelho. Você pode apagar quando quiser, na tela Perfil.'));

    const acoes = el('div', 'acoes');
    const ver = el('a', 'botao', respostas.papila === 'identificar' ? 'Como identificar o tipo do bico' : 'Ver os módulos');
    ver.href = 'modulos.html?tipo=' + respostas.papila + '&tamanho=' + respostas.tamanho;
    const banco = el('a', 'botao-secundario', 'Banco de leite mais próximo');
    banco.href = 'bancos.html';
    const refazer = el('button', 'botao-secundario', 'Refazer o quiz');
    refazer.type = 'button';
    refazer.addEventListener('click', function () {
      indice = 0;
      delete respostas.tamanho;
      delete respostas.papila;
      mostrarPergunta();
    });
    acoes.append(ver, banco, refazer);
    painel.appendChild(acoes);
    caixa.appendChild(painel);
    cabecalho.focus({ preventScroll: true });
  }

  function pular() {
    try { sessionStorage.setItem('gprols_pulou', '1'); } catch (erro) { /* segue para o início */ }
  }

  // A seta do topo volta uma etapa dentro do quiz. Na primeira pergunta, sai do quiz.
  document.querySelector('.topo a').addEventListener('click', function (evento) {
    if (emResultado) {
      evento.preventDefault();
      mostrarPergunta();
    } else if (indice > 0) {
      evento.preventDefault();
      indice -= 1;
      mostrarPergunta();
    } else {
      pular();
    }
  });

  window.addEventListener('pagehide', function () {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  });

  mostrarPergunta();
})();