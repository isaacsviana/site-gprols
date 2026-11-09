# Aleitamento materno - site de teste

Site em HTML, CSS e JavaScript puros, feito para celular primeiro e que também se adapta a tablet e notebook. É a base para o projeto GPROLS e tem a tela de realidade aumentada com model-viewer.

## Como ver o site

O model-viewer não carrega abrindo o `index.html` com duplo clique. O site precisa estar em um servidor. Duas formas:

- **GitHub Pages**: suba a pasta inteira em um repositório, vá em Settings > Pages, escolha a branch `main` e a pasta `/ (root)`. O link sai em cerca de 1 minuto.
- **No computador, para testar**: dentro da pasta, rode `python3 -m http.server 8000` e abra `http://localhost:8000`.

## O que tem em cada pasta

- `index.html` e as outras páginas `.html`: uma para cada tela do Figma.
- `css/estilo.css`: todas as cores e o layout. As cores ficam no começo do arquivo, em `:root`.
- `js/conteudo.js`: **todos os textos** (módulos, ordenha, armazenamento, pega). Para mudar um texto, mexa só aqui.
- `js/app.js`: monta as telas, os favoritos e a barra de navegação.
- `js/model-viewer.min.js`: biblioteca do Google para o 3D, já incluída (não depende de internet).
- `modelos/pega-cavalinho.glb`: modelo da mãe amamentando, criado pelo Isaac (gerado com Tripo; confirmar licença/crédito). Otimizado de 60 MB para 4 MB (malha simplificada, texturas 1024px).
- `modelos/bico-comum|protuso|plano|invertido.glb`: modelos 3D simplificados (gerados por script) dos 4 tipos de bico, escolhidos por botões na página RA.

## Trocar a logo

A logo está em `imagens/logo.png` (fundo transparente) e aparece na tela inicial e no menu. O ícone da aba do navegador é `imagens/favicon.png`. Para trocar, substitua esses arquivos mantendo os nomes. Se a equipe tiver a logo vetorial (SVG), o ideal é usá-la no lugar do PNG.

A logo atual é a enviada pela equipe, com o fundo removido. Imagens de banco de imagens com marca d'água não podem ser publicadas.

## Cores

As cores ficam no começo de `css/estilo.css`, em `:root`, e vêm da paleta rosada enviada pela equipe de saúde. Texto branco sobre esses rosas tem pouco contraste, por isso os botões usam texto escuro.

## Trocar o modelo 3D

Coloque o novo arquivo `.glb` em `modelos/` e mude o nome em `pega-3d.html` (atributo `src`).

Cuidado com a escala. O model-viewer entende cada unidade como 1 metro, e modelos do Sketchfab costumam vir com milhares de unidades. Foi isso que fazia o modelo "carregar 100% e não aparecer" nos testes anteriores. Um modelo de mama deve ter uns 0,25 de largura. Se um modelo novo não aparecer, esse é o primeiro ponto a conferir.

## Quiz de perfil

O quiz fica em `quiz.html` e tem duas perguntas: tamanho do seio e tipo de bico (papila). As perguntas e opcoes ficam em `QUIZ`, no `js/conteudo.js`. As dicas mostradas no resultado ficam em `ORIENTACOES`, no mesmo arquivo, e sao provisorias (precisam da revisao das fisioterapeutas). Os desenhos sao esquematicos, feitos para o projeto, e ficam em `js/desenhos.js`. Para usar figuras aprovadas, e so trocar essas funcoes. O botao Ouvir usa a voz do proprio aparelho.

O resultado fica so no aparelho (localStorage, chave `gprols_perfil`) e pode ser apagado na tela Perfil.

## Dúvidas, banco de leite e entrada

- `duvidas.html`: perguntas e respostas em `DUVIDAS`, no `js/conteudo.js`. Os 3 primeiros itens vêm das dicas da equipe do banco de leite; os demais são perguntas comuns e precisam de revisão das fisioterapeutas. O mapa aparece no fim da página.
- `bancos.html` e fim de `duvidas.html`: mapa incorporado do Google Maps (sem chave), botão para centralizar na localização da pessoa e botão que abre o Google Maps. Se `CHAVE_MAPS` (em `js/conteudo.js`) tiver uma chave da Maps Embed API, o mapa oficial é usado no lugar. Restrinja a chave ao domínio do site.
- Na primeira visita o site abre no quiz. "Pular por agora" vale até fechar a aba. O Favoritos foi removido.

## Pendências

- Conteúdo de "Cuidados na amamentação" e "Suporte" (as telas já existem, mostram "em elaboração").
- Conteúdo por tipo de seio: hoje todos os tipos mostram os mesmos módulos.
- Ilustração aprovada na tela de instruções (hoje é um espaço marcado).
- Vídeos de demonstração.
- Modelo 3D da pega correta, no lugar do modelo de teste.
- Dicas por tipo de papila e por tamanho (`ORIENTACOES`) e desenhos do quiz: revisao e aprovacao das fisioterapeutas.
- Quiz: aprovacao das perguntas, opcoes e desenhos pelas fisioterapeutas, e definir se entra uma pergunta sobre a aureola.
- Lista de bancos de leite com endereço e telefone (hoje o mapa só busca no Google).
- Revisão das respostas de Dúvidas e indicações.
- Todo o conteúdo clínico precisa da aprovação da coordenação clínica.

## Padrão de texto

O tipo de papila aparece sempre como "bico" (bico plano, bico protuso, bico invertido, bico grande, bico pequeno). Os nomes ficam em `TIPOS_DE_SEIO`, no `js/conteudo.js`.

## Conteúdo do material teórico (08/11/2026)

- Textos das fisioterapeutas em `js/conteudo.js`: `ORIENTACOES` (por tipo de bico), `GERAL`, `DUVIDAS`, `TEXTOS` (ordenha, armazenamento, cuidados, suporte), `PEGA` e `BANCOS`.
- Ilustrações do material em `imagens/pega/` (pega, posicionamento e 3 posições), usadas em `pega-texto.html`.
- Tipos de bico: comum, protuso ou comprido, plano, invertido e "Não sei" (identificar). Tamanho do seio segue no quiz, sem texto próprio.

Pendências: revisão das fisioterapeutas; origem e créditos das imagens; imagem "futebol americano" não parece essa posição; cidade do banco de leite não consta no PDF.
