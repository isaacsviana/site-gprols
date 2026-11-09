const ICONES = {
  casa: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  usuario: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  voltar: '<path d="M15 5l-7 7 7 7"/>',
  seta: '<path d="M9 5l7 7-7 7"/>',
  lista: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  video: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/>',
  cubo: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9"/>',
  bebe: '<circle cx="12" cy="12" r="8"/><path d="M9 10h.01M15 10h.01"/><path d="M9.5 14.5c1.5 1.3 3.5 1.3 5 0"/>',
  frasco: '<path d="M9 3h6v3l1.5 2v11a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2V8L9 6z"/><path d="M8 13h8"/>',
  gelo: '<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/>',
  folha: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19c3-5 6-8 10-10"/>',
  conversa: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/>',
  som: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/>',
  ok: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  mapa: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  pergunta: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7"/><path d="M12 17h.01"/>'
};

function svg(nome) {
  return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" ' +
    'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICONES[nome] + '</svg>';
}

function el(tag, classe, texto) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (texto) e.textContent = texto;
  return e;
}

function parametro(nome) {
  return new URLSearchParams(location.search).get(nome);
}

/* ---------- perfil do quiz ---------- */

const CHAVE_PERFIL = 'gprols_perfil';

function descreverPerfil(perfil) {
  if (!perfil) return '';
  const tamanho = QUIZ.perguntas[0].opcoes.find(function (o) { return o.id === perfil.tamanho; });
  const papila = TIPOS_DE_SEIO.find(function (t) { return t.id === perfil.papila; });
  if (!tamanho || !papila) return '';
  const textoPapila = papila.id === 'identificar' ? 'bico ainda não identificado' : papila.nome.toLowerCase();
  return 'Seio ' + tamanho.nome.toLowerCase() + ', ' + textoPapila;
}

function lerPerfil() {
  try {
    const perfil = JSON.parse(localStorage.getItem(CHAVE_PERFIL));
    return descreverPerfil(perfil) ? perfil : null;
  } catch (erro) {
    return null;
  }
}

function salvarPerfil(perfil) {
  try {
    localStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
  } catch (erro) {
    // sem armazenamento, o resultado só vale nesta visita
  }
}

function apagarPerfil() {
  try {
    localStorage.removeItem(CHAVE_PERFIL);
  } catch (erro) {
    // nada a apagar
  }
}

/* ---------- orientações por tipo de bico ---------- */

function textoOrientacoes(tipoId) {
  const dados = ORIENTACOES[tipoId];
  return dados ? [dados.mensagem].concat(dados.pontos).join(' ') : '';
}

function montarOrientacoes(tipoId) {
  const dados = ORIENTACOES[tipoId];
  if (!dados) return null;
  const bloco = el('div', 'orientacoes');
  bloco.appendChild(el('h3', '', tipoId === 'identificar' ? 'Como saber o tipo do seu bico' : 'Orientações para o seu tipo de bico'));
  bloco.appendChild(el('p', '', dados.mensagem));
  if (dados.pontos.length) {
    const lista = el('ul', 'marcadores');
    dados.pontos.forEach(function (p) { lista.appendChild(el('li', '', p)); });
    bloco.appendChild(lista);
  }
  return bloco;
}

/* ---------- bancos de leite (endereços) ---------- */

function montarListaBancos(caixa) {
  BANCOS.forEach(function (b) {
    const cartao = el('div', 'cartao-banco');
    cartao.appendChild(el('strong', '', b.nome));
    cartao.appendChild(el('p', '', b.endereco));
    cartao.appendChild(el('p', 'horario', b.horario));
    const rota = el('a', 'botao-secundario', 'Como chegar');
    rota.href = b.mapa;
    rota.target = '_blank';
    rota.rel = 'noopener';
    cartao.appendChild(rota);
    caixa.appendChild(cartao);
  });
}

/* ---------- bancos de leite (mapa) ---------- */

// Mapa incorporado do Google Maps, sem chave. Com CHAVE_MAPS (conteudo.js) usa a Maps Embed API oficial.
// Os botões ficam sempre visíveis porque o mapa incorporado pode não carregar em algumas redes.
function montarMapaBancos(caixa) {
  const busca = 'banco de leite humano';
  const moldura = document.createElement('iframe');
  moldura.className = 'mapa';
  moldura.title = 'Mapa de bancos de leite humano';
  moldura.loading = 'lazy';
  moldura.referrerPolicy = 'no-referrer-when-downgrade';

  function mostrar(lat, lng) {
    const perto = lat !== null;
    const consulta = perto ? busca : busca + ' Ceará';
    if (CHAVE_MAPS) {
      moldura.src = 'https://www.google.com/maps/embed/v1/search?key=' + encodeURIComponent(CHAVE_MAPS) +
        '&q=' + encodeURIComponent(consulta) + (perto ? '&center=' + lat + ',' + lng + '&zoom=12' : '');
    } else {
      moldura.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(consulta) +
        (perto ? '&ll=' + lat + ',' + lng + '&z=12' : '') + '&output=embed';
    }
  }

  const usar = el('button', 'botao', 'Mostrar o mais próximo de mim');
  usar.type = 'button';
  const abrir = el('a', 'botao-secundario', 'Abrir no Google Maps');
  abrir.href = 'https://www.google.com/maps/search/' + encodeURIComponent(busca + ' perto de mim');
  abrir.target = '_blank';
  abrir.rel = 'noopener';
  const estado = el('p', 'estado-mapa', 'Sua localização só é usada para centralizar o mapa e não é guardada. Ligue antes para confirmar o endereço e o horário.');

  usar.addEventListener('click', function () {
    if (!navigator.geolocation) {
      estado.textContent = 'Este aparelho não permite usar a localização. Use o mapa abaixo ou o botão do Google Maps.';
      return;
    }
    estado.textContent = 'Procurando a sua localização...';
    navigator.geolocation.getCurrentPosition(function (pos) {
      mostrar(pos.coords.latitude.toFixed(5), pos.coords.longitude.toFixed(5));
      estado.textContent = 'Mapa centralizado perto de você.';
    }, function () {
      estado.textContent = 'Não foi possível usar a localização. Veja o mapa abaixo ou permita o acesso nas configurações do navegador.';
    }, { timeout: 10000 });
  });

  mostrar(null);
  const acoes = el('div', 'acoes');
  acoes.append(usar, abrir);
  caixa.append(moldura, acoes, estado);
}

function montarBancos() {
  const lista = document.getElementById('lista-bancos');
  if (lista) montarListaBancos(lista);
  const caixa = document.getElementById('mapa-bancos');
  if (caixa) montarMapaBancos(caixa);
}

/* ---------- dúvidas e indicações ---------- */

function montarDuvidas() {
  const caixa = document.getElementById('lista-duvidas');
  if (!caixa) return;

  caixa.appendChild(el('p', 'introducao', GERAL.intro));

  const leite = el('section', 'secao painel');
  leite.appendChild(el('h2', '', 'Sobre o leite materno'));
  leite.appendChild(el('p', '', GERAL.leite));
  caixa.appendChild(leite);

  const sabia = el('section', 'secao painel');
  sabia.appendChild(el('h2', '', 'Você sabia?'));
  const lista = el('ul', 'marcadores');
  GERAL.sabia.forEach(function (t) { lista.appendChild(el('li', '', t)); });
  sabia.appendChild(lista);
  sabia.appendChild(el('p', 'destaque', GERAL.lembrete));
  caixa.appendChild(sabia);

  const perguntas = el('section', 'secao');
  perguntas.appendChild(el('h2', '', 'Perguntas comuns'));
  DUVIDAS.forEach(function (item) {
    const d = el('details', 'duvida');
    d.appendChild(el('summary', '', item.pergunta));
    d.appendChild(el('p', '', item.resposta));
    perguntas.appendChild(d);
  });
  caixa.appendChild(perguntas);
}

/* ---------- barra de navegação ---------- */

function montarBarra() {
  const itens = [
    { secao: 'inicio', href: 'index.html', rotulo: 'Início', icone: 'casa' },
    { secao: 'duvidas', href: 'duvidas.html', rotulo: 'Dúvidas', icone: 'pergunta' },
    { secao: 'bancos', href: 'bancos.html', rotulo: 'Banco de leite', icone: 'mapa' },
    { secao: 'perfil', href: 'perfil.html', rotulo: 'Perfil', icone: 'usuario' }
  ];
  const atual = document.body.dataset.secao;

  const barra = el('nav', 'barra');
  barra.setAttribute('aria-label', 'Navegação principal');

  const marca = el('span', 'marca');
  marca.innerHTML = '<img class="logo" src="imagens/logo.png" alt="" width="34" height="32"><span>Aleitamento materno</span>';
  barra.appendChild(marca);

  itens.forEach(function (item) {
    const link = el('a');
    link.href = item.href;
    link.innerHTML = svg(item.icone) + '<span>' + item.rotulo + '</span>';
    if (item.secao === atual) link.setAttribute('aria-current', 'page');
    barra.appendChild(link);
  });

  document.body.appendChild(barra);
}

/* ---------- telas ---------- */

function montarInicio() {
  const area = document.getElementById('area-quiz');
  const caixa = document.getElementById('lista-tipos');
  if (!area || !caixa) return;

  const perfil = lerPerfil();
  const cartao = el('section', 'chamada-quiz');
  if (perfil) {
    cartao.appendChild(el('p', 'chamada-etiqueta', 'Seu perfil'));
    const figuras = el('div', 'chamada-figuras');
    const f1 = el('span', 'figura');
    f1.innerHTML = Desenhos.tamanho(perfil.tamanho);
    const f2 = el('span', 'figura');
    f2.innerHTML = Desenhos.papila(perfil.papila);
    figuras.append(f1, f2);
    cartao.appendChild(figuras);
    cartao.appendChild(el('strong', '', descreverPerfil(perfil)));
    const acoes = el('div', 'acoes');
    const ver = el('a', 'botao', 'Ver os meus módulos');
    ver.href = 'modulos.html?tipo=' + perfil.papila + '&tamanho=' + perfil.tamanho;
    const refazer = el('a', 'botao-secundario', 'Refazer o quiz');
    refazer.href = 'quiz.html';
    acoes.append(ver, refazer);
    cartao.appendChild(acoes);
  } else {
    cartao.appendChild(el('strong', '', 'Descubra o seu perfil'));
    cartao.appendChild(el('p', '', 'Responda 2 perguntas com desenhos para receber orientações pensadas para você.'));
    const fazer = el('a', 'botao', 'Começar o quiz');
    fazer.href = 'quiz.html';
    cartao.appendChild(fazer);
  }
  area.appendChild(cartao);

  TIPOS_DE_SEIO.forEach(function (tipo) {
    const link = el('a', 'cartao-tipo');
    link.href = 'modulos.html?tipo=' + tipo.id;
    const figura = el('span', 'figura');
    figura.innerHTML = Desenhos.papila(tipo.id);
    link.appendChild(figura);
    link.appendChild(el('strong', '', tipo.id === 'identificar' ? 'Não sei qual é o meu' : tipo.nome));
    caixa.appendChild(link);
  });

  const atalhos = document.getElementById('lista-atalhos');
  if (atalhos) {
    [
      { href: 'duvidas.html', icone: 'pergunta', titulo: 'Dúvidas e indicações', texto: 'Perguntas comuns de quem amamenta' },
      { href: 'bancos.html', icone: 'mapa', titulo: 'Banco de leite', texto: 'Encontre o mais próximo de você' }
    ].forEach(function (item) {
      const link = el('a', 'cartao');
      link.href = item.href;
      const icone = el('span', 'icone');
      icone.innerHTML = svg(item.icone);
      const texto = el('div', 'texto');
      texto.append(el('strong', '', item.titulo), el('span', '', item.texto));
      const seta = el('span', 'seta');
      seta.innerHTML = svg('seta');
      link.append(icone, texto, seta);
      atalhos.appendChild(link);
    });
  }
}

function montarModulos() {
  const caixa = document.getElementById('lista-modulos');
  if (!caixa) return;

  const tipo = TIPOS_DE_SEIO.find(function (t) { return t.id === parametro('tipo'); });
  if (!tipo) {
    location.replace('index.html');
    return;
  }
  document.getElementById('titulo-tipo').textContent = tipo.nome;
  document.title = tipo.nome + ' - Aleitamento materno';

  const tamanho = QUIZ.perguntas[0].opcoes.find(function (o) { return o.id === parametro('tamanho'); });
  if (tamanho) {
    const etiqueta = el('p', 'perfil-etiqueta', 'Seu perfil: ' + descreverPerfil({ tamanho: tamanho.id, papila: tipo.id }));
    caixa.parentNode.insertBefore(etiqueta, caixa);
  }

  const orientacoes = montarOrientacoes(tipo.id);
  if (orientacoes) {
    if (tipo.id === 'identificar') {
      const refazer = el('a', 'botao-secundario', 'Refazer o quiz');
      refazer.href = 'quiz.html';
      orientacoes.appendChild(refazer);
    }
    caixa.parentNode.insertBefore(orientacoes, caixa);
  }

  MODULOS.forEach(function (m, posicao) {
    const link = el('a', posicao === 0 ? 'cartao cartao-grande' : 'cartao');
    link.href = m.href;
    const icone = el('span', 'icone');
    icone.innerHTML = svg(m.icone);
    const texto = el('div', 'texto');
    texto.append(el('strong', '', m.titulo), el('span', '', m.resumo));
    if (posicao === 0) texto.appendChild(el('em', 'selo', 'Com modelo 3D e realidade aumentada'));
    const seta = el('span', 'seta');
    seta.innerHTML = svg('seta');
    link.append(icone, texto, seta);
    caixa.appendChild(link);
  });
}

function montarSecao(secao) {
  const bloco = el('section', 'secao');
  bloco.appendChild(el('h2', '', secao.titulo));
  if (secao.intro) bloco.appendChild(el('p', '', secao.intro));

  let lista;
  if (secao.tipo === 'checklist') {
    lista = el('ul', 'checklist');
    secao.itens.forEach(function (texto) {
      const li = el('li');
      const rotulo = el('label');
      const caixa = document.createElement('input');
      caixa.type = 'checkbox';
      rotulo.append(caixa, el('span', '', texto));
      li.appendChild(rotulo);
      lista.appendChild(li);
    });
  } else if (secao.tipo === 'passos') {
    lista = el('ol', 'passos');
    secao.itens.forEach(function (texto) {
      const li = el('li');
      li.appendChild(el('span', '', texto));
      lista.appendChild(li);
    });
  } else {
    lista = el('ul', 'marcadores');
    secao.itens.forEach(function (texto) {
      lista.appendChild(el('li', '', texto));
    });
  }
  if (secao.itens.length) bloco.appendChild(lista);

  if (secao.bancos) montarListaBancos(bloco);
  if (secao.nota) bloco.appendChild(el('p', 'nota', secao.nota));
  if (secao.link) {
    const a = el('a', 'link-externo', secao.link.texto);
    a.href = secao.link.url;
    if (!secao.link.interno) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    bloco.appendChild(a);
  }
  return bloco;
}

function montarModulo() {
  const caixa = document.getElementById('conteudo-modulo');
  if (!caixa) return;

  const modulo = TEXTOS[parametro('id')];
  if (!modulo) {
    location.replace('index.html');
    return;
  }
  document.getElementById('titulo-modulo').textContent = modulo.titulo;
  document.title = modulo.titulo + ' - Aleitamento materno';

  if (modulo.emElaboracao) {
    const vazio = el('div', 'vazio', 'O conteúdo deste módulo ainda está em elaboração.');
    caixa.appendChild(vazio);
    return;
  }

  caixa.appendChild(el('p', 'introducao', modulo.intro));
  modulo.secoes.forEach(function (s) { caixa.appendChild(montarSecao(s)); });
  if (modulo.fontes) caixa.appendChild(el('p', 'nota', 'Fontes: ' + modulo.fontes));
  if (modulo.fechamento) caixa.appendChild(el('p', 'destaque', modulo.fechamento));
}

function figuraPega(imagem, classe) {
  const f = el('figure', classe || 'ilustracao');
  const img = document.createElement('img');
  img.src = imagem.arquivo;
  img.alt = imagem.alt;
  img.loading = 'lazy';
  img.decoding = 'async';
  f.appendChild(img);
  return f;
}

function listaPega(itens) {
  const lista = el('ul', 'marcadores');
  itens.forEach(function (t) { lista.appendChild(el('li', '', t)); });
  return lista;
}

function montarPegaTexto() {
  const caixa = document.getElementById('pega-passos');
  if (!caixa) return;

  const pega = el('section', 'secao bloco-imagem');
  const textoPega = el('div', 'bloco-texto');
  textoPega.appendChild(el('h2', '', 'Pega'));
  textoPega.appendChild(el('p', '', PEGA.intro));
  const passos = el('ol', 'passos');
  PEGA.passos.forEach(function (t) {
    const li = el('li');
    li.appendChild(el('span', '', t));
    passos.appendChild(li);
  });
  textoPega.appendChild(passos);
  textoPega.appendChild(el('h3', '', 'Como saber se a pega está correta'));
  textoPega.appendChild(listaPega(PEGA.sinais));
  pega.append(textoPega, figuraPega(PEGA.imagemPega));
  caixa.appendChild(pega);

  const posicionamento = el('section', 'secao bloco-imagem');
  const textoPos = el('div', 'bloco-texto');
  textoPos.appendChild(el('h2', '', 'Posicionamento'));
  textoPos.appendChild(el('p', '', PEGA.posicionamentoIntro));
  textoPos.appendChild(listaPega(PEGA.posicionamento));
  posicionamento.append(textoPos, figuraPega(PEGA.imagemPosicionamento));
  caixa.appendChild(posicionamento);

  const posicoes = el('section', 'secao');
  posicoes.appendChild(el('h2', '', 'Posições para amamentar'));
  posicoes.appendChild(el('p', '', PEGA.posicoesNota));
  const grade = el('div', 'grade-posicoes');
  PEGA.posicoes.forEach(function (p, i) {
    const cartao = el('div', 'cartao-posicao');
    cartao.appendChild(figuraPega(p));
    cartao.appendChild(el('strong', '', (i + 1) + '. ' + p.nome));
    grade.appendChild(cartao);
  });
  posicoes.appendChild(grade);
  caixa.appendChild(posicoes);
}

function montarPerfilQuiz() {
  const caixa = document.getElementById('perfil-quiz');
  if (!caixa) return;
  caixa.replaceChildren();

  const perfil = lerPerfil();
  if (!perfil) {
    caixa.appendChild(el('p', '', 'Você ainda não respondeu ao quiz.'));
    const fazer = el('a', 'botao', 'Fazer o quiz');
    fazer.href = 'quiz.html';
    caixa.appendChild(fazer);
    return;
  }

  caixa.appendChild(el('p', '', descreverPerfil(perfil) + '.'));
  const acoes = el('div', 'acoes');
  const refazer = el('a', 'botao', 'Refazer o quiz');
  refazer.href = 'quiz.html';
  const apagar = el('button', 'botao-secundario', 'Apagar o meu resultado');
  apagar.type = 'button';
  apagar.addEventListener('click', function () {
    apagarPerfil();
    montarPerfilQuiz();
  });
  acoes.append(refazer, apagar);
  caixa.appendChild(acoes);
}

function montarVisualizador3D() {
  const visualizador = document.getElementById('visualizador');
  if (!visualizador) return;

  const aviso = document.getElementById('aviso-3d');
  const erro = document.getElementById('erro-3d');
  const caixaTipos = document.getElementById('tipos-3d');
  const modelos = { comum: 'bico-comum', protuso: 'bico-protuso', plano: 'bico-plano', invertido: 'bico-invertido' };
  const opcoes = [{ id: 'pega', nome: 'Pega (mãe e bebê)', arquivo: 'pega-cavalinho', alt: 'Modelo 3D de uma mãe amamentando o bebê', orbita: '40deg 78deg auto' }]
    .concat(TIPOS_DE_SEIO.filter(function (t) { return modelos[t.id]; }).map(function (t) {
      return { id: t.id, nome: t.nome, arquivo: modelos[t.id], alt: 'Modelo 3D de seio com ' + t.nome.toLowerCase(), orbita: '0deg 75deg auto' };
    }));
  if (location.protocol === 'file:') { erro.hidden = false; }
  opcoes.forEach(function (t, i) {
    const b = el('button', 'opcao-3d', t.nome);
    b.type = 'button';
    b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.addEventListener('click', function () {
      caixaTipos.querySelectorAll('button').forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
      erro.hidden = true;
      visualizador.src = 'modelos/' + t.arquivo + '.glb';
      visualizador.alt = t.alt;
      visualizador.cameraOrbit = t.orbita;
    });
    caixaTipos.appendChild(b);
  });

  visualizador.addEventListener('load', function () {
    aviso.textContent = visualizador.canActivateAR
      ? 'Arraste para girar e use dois dedos para aproximar. Toque em "Ver no seu espaço" para colocar o modelo no ambiente com a câmera.'
      : 'Arraste para girar e use a roda do mouse ou dois dedos para aproximar. Para ver em realidade aumentada, abra esta página no celular ou no tablet (Chrome no Android, Safari no iPhone).';
  });

  visualizador.addEventListener('error', function () {
    erro.hidden = false;
  });
}

/* ---------- início ---------- */

document.querySelectorAll('[data-icone]').forEach(function (e) {
  e.innerHTML = svg(e.dataset.icone);
});

// Botão voltar: usa o histórico quando a pessoa veio de outra tela do site; senão vai para o início
document.querySelectorAll('[data-voltar]').forEach(function (link) {
  link.addEventListener('click', function (evento) {
    if (history.length > 1 && document.referrer.indexOf(location.origin) === 0) {
      evento.preventDefault();
      history.back();
    }
  });
});

document.querySelectorAll('[data-aviso]').forEach(function (e) {
  e.textContent = AVISO;
});

// Na primeira visita o site abre no quiz. "Pular" vale só até fechar a aba.
(function () {
  if (document.body.dataset.pagina !== 'inicio') return;
  let pulou = false;
  try { pulou = sessionStorage.getItem('gprols_pulou') === '1'; } catch (erro) { pulou = true; }
  if (!lerPerfil() && !pulou) location.replace('quiz.html');
})();

montarBarra();
montarInicio();
montarModulos();
montarModulo();
montarDuvidas();
montarBancos();
montarPegaTexto();
montarPerfilQuiz();
montarVisualizador3D();
