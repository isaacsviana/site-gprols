// Desenhos esquemáticos do seio, feitos para este projeto: corte lateral, com o tórax à esquerda.
// Se as fisioterapeutas tiverem figuras aprovadas, é só trocar estas funções.
const Desenhos = (function () {
  const PELE = '#f7cdb9';
  const PELE_SOMBRA = '#e9a98f';
  const AREOLA = '#d98f7a';
  const CONTORNO = '#b8654f';
  let contador = 0;

  // trecho do contorno na altura da papila, de (58,40) até (58,60)
  const PAPILA = {
    comum: 'C65 42 67 46 67 50 C67 54 65 58 58 60',
    protuso: 'C76 41 84 46 84 50 C84 54 76 59 58 60',
    plano: 'C60 44 61 47 61 50 C61 53 60 56 58 60',
    invertido: 'C53 44 49 47 49 50 C49 53 53 56 58 60'
  };
  // [quanto o seio avança para a direita, metade da altura]
  const TAMANHO = { pequeno: [40, 15], medio: [58, 26], grande: [78, 38] };

  function moldura(corpo, id) {
    return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
      '<defs><clipPath id="c' + id + '"><circle cx="50" cy="50" r="46"/></clipPath></defs>' +
      '<circle cx="50" cy="50" r="46" fill="#fffafa"/>' +
      '<g clip-path="url(#c' + id + ')">' + corpo + '</g>' +
      '<circle cx="50" cy="50" r="46" fill="none" stroke="#9d2532" stroke-width="3.5"/></svg>';
  }

  function papila(tipo) {
    const id = 'p' + (contador += 1);
    if (tipo === 'identificar') return interrogacao(id);
    const seg = PAPILA[tipo];
    const entrada = 'M0 6 C34 8 54 22 58 40 ';
    const saida = ' C54 76 34 90 0 94';
    const pele = entrada + seg + saida + ' Z';
    const contorno = entrada + seg + saida;
    const bico = 'M58 40 ' + seg + ' Z';
    const corpo =
      '<path d="' + pele + '" fill="' + PELE + '"/>' +
      '<path d="M0 6 C34 8 54 24 58 43 L58 60 C54 76 34 90 0 94 Z" fill="' + PELE_SOMBRA + '" opacity="0.35"/>' +
      '<path d="M56 36 L58 43 L58 57 L56 64" fill="none" stroke="' + AREOLA + '" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="' + bico + '" fill="' + AREOLA + '"/>' +
      '<path d="' + contorno + '" fill="none" stroke="' + CONTORNO + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
    return moldura(corpo, id);
  }

  function tamanho(tipo) {
    const id = 't' + (contador += 1);
    const avanco = TAMANHO[tipo][0];
    const altura = TAMANHO[tipo][1];
    const meio = 22 + (avanco - 22) * 0.55;
    const topo = 50 - altura;
    const base = 50 + altura;
    const seio = 'L22 ' + topo + ' C' + meio + ' ' + topo + ' ' + avanco + ' ' + (50 - altura / 2.4) + ' ' + avanco + ' 50 ' +
      'C' + avanco + ' ' + (50 + altura / 2.4) + ' ' + meio + ' ' + base + ' 22 ' + base;
    const corpo =
      '<path d="M0 0 H22 ' + seio + ' L22 100 H0 Z" fill="' + PELE + '"/>' +
      '<path d="M0 0 H22 L22 100 H0 Z" fill="' + PELE_SOMBRA + '" opacity="0.35"/>' +
      '<path d="M22 0 ' + seio + ' L22 100" fill="none" stroke="' + CONTORNO + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<ellipse cx="' + (avanco - 2) + '" cy="50" rx="3" ry="' + Math.min(9, altura / 2.5) + '" fill="' + AREOLA + '"/>';
    return moldura(corpo, id);
  }

  function interrogacao(id) {
    const corpo =
      '<path d="M38 40a12 12 0 1 1 18 10c-4 3-6 5-6 10" fill="none" stroke="#9d2532" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="50" cy="75" r="4" fill="#9d2532"/>';
    return moldura(corpo, id);
  }

  return { papila: papila, tamanho: tamanho };
})();
