// Conteúdo clínico vindo das fisioterapeutas (Material Teórico). Só corrigi pontuação e espaços.
// Só altere o sentido dos textos depois da aprovação da coordenação clínica.

const AVISO = 'Esta tecnologia não substitui a assistência profissional.';

// Tipos de bico (papila mamária), na ordem do material das fisioterapeutas.
const TIPOS_DE_SEIO = [
  { id: 'comum', nome: 'Bico comum' },
  { id: 'protuso', nome: 'Bico protuso ou comprido' },
  { id: 'plano', nome: 'Bico plano' },
  { id: 'invertido', nome: 'Bico invertido' },
  { id: 'identificar', nome: 'Como identificar o tipo do bico' }
];

// Perguntas do quiz de perfil. O tamanho do seio ainda não muda nenhum texto: o material
// das fisioterapeutas só traz mensagens por tipo de bico.
const QUIZ = {
  perguntas: [
    {
      id: 'tamanho',
      titulo: 'Qual é o tamanho do seu seio?',
      ajuda: 'Toque no desenho que mais se parece com o seu.',
      fala: 'Qual é o tamanho do seu seio? Toque no desenho que mais se parece com o seu.',
      opcoes: [
        { id: 'pequeno', nome: 'Pequeno' },
        { id: 'medio', nome: 'Médio' },
        { id: 'grande', nome: 'Grande' }
      ]
    },
    {
      id: 'papila',
      titulo: 'Como é o bico do seu seio?',
      ajuda: 'Os mamilos apresentam diferentes formatos e tamanhos. Isso faz parte da diversidade natural do corpo feminino e, na maioria das vezes, não impede a amamentação. Toque no desenho que mais se parece com o seu.',
      fala: 'Como é o bico do seu seio? Os mamilos apresentam diferentes formatos e tamanhos. Isso faz parte da diversidade natural do corpo feminino e, na maioria das vezes, não impede a amamentação. Toque no desenho que mais se parece com o seu.',
      opcoes: [
        { id: 'comum', nome: 'Comum', legenda: 'Bico normal' },
        { id: 'protuso', nome: 'Protuso ou comprido', legenda: 'Bico elevado' },
        { id: 'plano', nome: 'Plano', legenda: 'Bico rente à aréola' },
        { id: 'invertido', nome: 'Invertido', legenda: 'Bico para dentro' },
        { id: 'identificar', nome: 'Não sei', legenda: 'Quero ajuda' }
      ]
    }
  ]
};

// Mensagem mostrada no resultado do quiz e na tela de módulos, por tipo de bico.
// "mensagem" é o texto principal; "pontos" são as orientações em lista.
const ORIENTACOES = {
  comum: {
    mensagem: 'O seu bico é do tipo comum. Você já pode seguir para os módulos.',
    pontos: []
  },
  protuso: {
    mensagem: 'Para os mamilos longos ou grandes que ficam mais elevados em relação à aréola, após o nascimento, realize o posicionamento e a pega da mama pelo bebê, de forma que haja uma grande quantidade da aréola (parte mais escura da mama) na boca, não apenas o mamilo.',
    pontos: [
      'Se o bebê engasgar repetidamente, retire seu leite e alimente o bebê com um copo durante alguns dias. Os bebês crescem rápido e suas bocas também crescem.',
      'Coloque o aleitamento em prática e, em caso de dúvidas, consulte um profissional.'
    ]
  },
  invertido: {
    mensagem: 'Para mamilos invertidos, aqueles retráteis e voltados para dentro, os bebês pegam a mama, não somente o mamilo. Os mamilos podem mudar de forma durante a gestação e se tornarem mais protuberantes ou “elásticos”.',
    pontos: [
      'Se a mama estiver muito cheia, retire um pouco do leite antes da mamada para deixar a aréola mais macia.',
      'Garanta que o bebê abocanhe bem a aréola e não apenas o mamilo.',
      'Coloque o aleitamento em prática e, em caso de dúvidas, consulte um profissional.'
    ]
  },
  plano: {
    mensagem: 'Para mamilos planos, que ficam no mesmo nível da aréola, sem projeção evidente, após o nascimento, realize o posicionamento e a pega da mama pelo bebê, de forma que haja uma grande quantidade da aréola (parte mais escura da mama) na boca, não apenas o mamilo.',
    pontos: [
      'Se a mama estiver muito cheia, retire um pouco do leite antes da mamada para deixar a aréola mais macia.',
      'Garanta que o bebê abocanhe bem a aréola e não apenas o mamilo.',
      'Coloque o aleitamento em prática e, em caso de dúvidas, consulte um profissional.'
    ]
  },
  identificar: {
    mensagem: 'Como saber o tipo de bico: com a ajuda dos dedos indicador e polegar, faça uma espécie de “C” e suavemente aperte a região da aréola.',
    pontos: [
      'Depois, escolha o desenho que mais se parece com o seu bico e refaça o quiz.'
    ]
  }
};

// Chave do Google Maps Embed API (opcional). Sem chave, o mapa incorporado usa a busca simples do Google.
const CHAVE_MAPS = '';

// Bancos de leite com endereço confirmado pelas fisioterapeutas.
const BANCOS = [
  {
    nome: 'Banco de Leite do Hospital Maternidade Jesus Maria e José',
    endereco: 'Av. Francisco Almeida Pinheiro, nº 2268, Planalto Universitário',
    horario: 'De segunda a sexta, das 07h às 11h e das 14h às 16h',
    mapa: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Hospital Maternidade Jesus Maria e José, Av. Francisco Almeida Pinheiro 2268, Planalto Universitário')
  }
];

// Informações gerais e dúvidas. Cada pergunta usa as palavras do material das fisioterapeutas.
const GERAL = {
  intro: 'Amamentar é um gesto de cuidado, vínculo e amor. Cada mãe e cada bebê vivem essa experiência de uma maneira única. É normal ter dúvidas e precisar de apoio durante esse período. Este material foi preparado para ajudar você a conhecer melhor o aleitamento materno e se sentir mais segura para amamentar.',
  leite: 'O leite materno é o alimento mais completo para o bebê nos primeiros meses de vida. Sua composição se modifica de acordo com as necessidades da criança, oferecendo nutrientes e proteção importantes para seu crescimento e desenvolvimento.',
  sabia: [
    'Não existe leite materno fraco. O leite produzido pela mãe é adequado para alimentar o bebê.',
    'O leite materno ajuda a proteger a criança contra infecções e outras doenças.',
    'O sabor do leite pode variar conforme a alimentação da mãe, e isso é natural.',
    'O leite materno é de fácil digestão e está sempre pronto para o consumo.',
    'A amamentação também traz benefícios para a mãe, contribuindo para a recuperação após o parto e reduzindo o risco de algumas doenças, como câncer de mama e ovário e diabetes tipo 2.'
  ],
  lembrete: 'Lembre-se: cada mamada é uma oportunidade de nutrição, proteção e fortalecimento do vínculo entre você e seu bebê.'
};

const DUVIDAS = [
  {
    pergunta: 'Até quando o bebê deve tomar só leite materno?',
    resposta: 'Nos primeiros seis meses, recomenda-se o aleitamento materno exclusivo, ou seja, o bebê deve receber somente leite materno, sem necessidade de água, chás, sucos ou outros alimentos. A partir dos seis meses, inicia-se a alimentação complementar, mas a amamentação deve continuar até os dois anos ou mais.'
  },
  {
    pergunta: 'Meu leite é fraco?',
    resposta: 'Não existe leite materno fraco. O leite produzido pela mãe é adequado para alimentar o bebê.'
  },
  {
    pergunta: 'Preciso limpar os mamilos antes ou depois de mamar?',
    resposta: 'Não é necessário limpar as aréolas e os mamilos antes ou após as mamadas. A higiene é feita diariamente, durante o banho, com água corrente. Evite sabão, sabonetes ou outros produtos que possam retirar a proteção natural dos mamilos.'
  },
  {
    pergunta: 'Posso passar creme ou pomada nos mamilos?',
    resposta: 'Não se recomenda utilizar cremes ou pomadas para lubrificar os mamilos. A secreção produzida pelos tubérculos de Montgomery é responsável pela hidratação natural dos mamilos.'
  },
  {
    pergunta: 'O que são os pontinhos ao redor do mamilo?',
    resposta: 'São naturais e ajudam a manter a região lubrificada.'
  },
  {
    pergunta: 'Preciso esticar os mamilos para me preparar?',
    resposta: 'Não é necessário esticar os mamilos para se preparar para amamentar. Você pode fazer massagens circulares com pressão moderada nos seios para ajudar na descida do leite.'
  },
  {
    pergunta: 'Como sei que o bebê está com fome?',
    resposta: 'Observe os sinais de fome, como abrir a boca, procurar o peito e levar as mãos à boca. O choro costuma ser um sinal tardio de fome. Por isso, observar os primeiros sinais pode facilitar o momento da mamada.'
  },
  {
    pergunta: 'A minha mama está muito cheia. O que ajuda?',
    resposta: 'Mamadas frequentes. Retirar gentilmente um pouco de leite antes das mamadas, para amaciar a aréola e facilitar a pega. Compressas mornas (pano úmido) na aréola logo antes da mamada, ou uma chuveirada ou banho morno. Massagens delicadas das mamas, com movimentos circulares, principalmente nas regiões mais afetadas.'
  },
  {
    pergunta: 'Quando devo procurar ajuda?',
    resposta: 'Procure um profissional de saúde ou um Banco de Leite Humano se tiver: dor persistente durante as mamadas; feridas ou fissuras nos mamilos; mama muito endurecida, vermelha ou dolorida; febre ou mal-estar associado a alterações nas mamas; dificuldade do bebê para abocanhar a mama ou manter a sucção; dúvidas sobre a quantidade de leite ou o ganho de peso do bebê.'
  }
];

const MODULOS = [
  {
    id: 'pega',
    titulo: 'Pega e posicionamento',
    resumo: 'Aprenda a realizar a pega correta e o posicionamento do bebê.',
    icone: 'bebe',
    href: 'pega.html'
  },
  {
    id: 'ordenha',
    titulo: 'Ordenha do leite',
    resumo: 'Saiba como fazer a ordenha de forma segura e adequada.',
    icone: 'frasco',
    href: 'modulo.html?id=ordenha'
  },
  {
    id: 'armazenamento',
    titulo: 'Armazenamento e doação do leite',
    resumo: 'Veja como conservar e doar o leite materno corretamente.',
    icone: 'gelo',
    href: 'modulo.html?id=armazenamento'
  },
  {
    id: 'cuidados',
    titulo: 'Cuidados na amamentação',
    resumo: 'Dicas importantes para uma amamentação tranquila.',
    icone: 'folha',
    href: 'modulo.html?id=cuidados'
  },
  {
    id: 'suporte',
    titulo: 'Suporte',
    resumo: 'Saiba quando procurar ajuda e onde encontrar apoio.',
    icone: 'conversa',
    href: 'modulo.html?id=suporte'
  }
];

// Tipos de seção: "checklist" (com caixinhas), "passos" (numerada) e "lista" (com marcadores).
const TEXTOS = {
  ordenha: {
    titulo: 'Ordenha do leite',
    intro: 'A ordenha manual é a retirada do leite materno das mamas com as mãos.',
    secoes: [
      {
        titulo: '1. Preparar-se para a ordenha',
        tipo: 'checklist',
        itens: [
          'Escolha um local tranquilo e confortável.',
          'Prenda os cabelos e utilize uma touca ou lenço limpo.',
          'Lave bem as mãos e os antebraços com água e sabão.',
          'Evite falar, tossir ou espirrar durante a retirada do leite.'
        ]
      },
      {
        titulo: '2. Prepare o recipiente',
        tipo: 'checklist',
        itens: [
          'Utilize um recipiente de vidro com tampa plástica, previamente higienizado e esterilizado.',
          'Prefira recipientes de boca larga para facilitar a coleta.',
          'Deixe o recipiente próximo à mama.'
        ]
      },
      {
        titulo: '3. Prepare as mamas',
        tipo: 'checklist',
        itens: [
          'Massageie delicadamente toda a mama com movimentos circulares, da base em direção à aréola.',
          'Procure ficar relaxada e em uma posição confortável.'
        ]
      },
      // A fisioterapeuta pediu uma demonstração em vídeo desta técnica, porque é onde mais se erra.
      {
        titulo: '4. Faça a retirada do leite',
        tipo: 'passos',
        itens: [
          'Posicione os dedos em formato de C, com o polegar acima e o indicador abaixo da aréola.',
          'Pressione suavemente os dedos um em direção ao outro e depois em direção ao tórax.',
          'Pressione e solte, repetindo o movimento de forma ritmada.',
          'Não aperte o mamilo e não provoque dor. Evite deslizar os dedos sobre a pele.',
          'Quando o fluxo diminuir, mude a posição dos dedos ao redor da aréola.',
          'Alterne entre as mamas, repetindo o processo até retirar a quantidade desejada.'
        ]
      },
      {
        titulo: '5. Como oferecer leite ao bebê?',
        tipo: 'passos',
        itens: [
          'Utilize preferencialmente um copinho, xícara ou colher.',
          'Mantenha o bebê acordado, tranquilo e em posição sentada ou semissentada.',
          'Encoste a borda do copinho no lábio inferior do bebê.',
          'Deixe que ele retire o leite com pequenos movimentos de lambida e deglutição.',
          'Nunca despeje o leite diretamente na boca do bebê.'
        ]
      },
      {
        titulo: '6. Cuidados importantes',
        tipo: 'lista',
        itens: [
          'A ordenha não deve causar dor ou machucar as mamas.',
          'Não é necessário estabelecer um tempo fixo: a duração varia conforme cada mulher.',
          'O leite pode sair em gotas ou em pequenos jatos.',
          'Não se preocupe se sair pouca quantidade no início. Com a prática, você pode ganhar mais facilidade.'
        ]
      }
    ]
  },

  armazenamento: {
    titulo: 'Armazenamento e doação do leite',
    intro: 'Veja onde e por quanto tempo guardar o leite materno ordenhado e como doar.',
    secoes: [
      {
        titulo: 'Onde guardar',
        tipo: 'lista',
        itens: [
          'Em ar ambiente: é recomendado que o leite seja consumido rapidamente.',
          'Na geladeira: o tempo máximo para consumo é de 12 horas. O leite nunca deve ser armazenado na porta da geladeira, devido à oscilação constante de temperatura.',
          'No freezer ou congelador: até 15 dias de validade.'
        ]
      },
      {
        titulo: 'Pontos importantes',
        tipo: 'checklist',
        itens: [
          'Identifique o pote com data e horário da ordenha.',
          'Guarde sempre o leite mais antigo na frente, para ser usado primeiro.',
          'Não complete um pote já congelado com leite morno de uma nova ordenha.'
        ]
      },
      {
        titulo: 'Descongelamento, oferta e consumo',
        tipo: 'passos',
        itens: [
          'Descongele primeiro na geladeira, depois aqueça em banho-maria (nunca no micro-ondas ou fervendo: isso destrói fatores de proteção do leite).',
          'Agite suavemente em círculo (não sacuda) para misturar a gordura, que se separa naturalmente.',
          'Teste a temperatura pingando uma gota no dorso da mão: deve estar morna, nunca quente.',
          'O que sobrar após a mamada deve ser descartado, nunca reaproveitado.'
        ]
      },
      {
        titulo: 'Doação para o Banco de Leite',
        tipo: 'passos',
        intro: 'A equipe do Banco de Leite Humano orienta sobre os recipientes adequados, a identificação e o transporte do leite. Um pequeno gesto pode fazer uma grande diferença na vida de muitos bebês!',
        itens: [
          'Cadastro: vá até o Banco de Leite Humano mais próximo levando RG e CPF, comprovante de endereço e Cartão do SUS.',
          'No local, você receberá todas as instruções necessárias sobre a coleta e a higiene.',
          'Siga o passo a passo ensinado para retirar e armazenar o leite em casa.',
          'Você não precisa ir até o banco de leite para fazer a entrega: outra pessoa pode levar o frasco para você.'
        ],
        bancos: true,
        link: { texto: 'Bancos de leite humano no Ceará', url: 'https://www.ce.gov.br/saude/doeleitehumano/' }
      }
    ]
  },

  cuidados: {
    titulo: 'Cuidados na amamentação',
    intro: 'Durante a amamentação, alguns cuidados simples ajudam a manter a saúde das mamas e proporcionar mais conforto.',
    secoes: [
      {
        titulo: 'Cuidados com as mamas',
        tipo: 'lista',
        itens: [
          'Realize a higiene diária durante o banho, com água corrente. Evite o uso de sabão, sabonetes ou outros produtos que possam retirar a proteção natural dos mamilos.',
          'Não é necessário limpar as aréolas e os mamilos antes ou após as mamadas.',
          'Mantenha os mamilos secos. Se usar algum tipo de absorvente para os mamilos, cuide para que ele seja limpo e troque-o com frequência.',
          'Não se recomenda utilizar cremes ou pomadas para lubrificar os mamilos.',
          'A secreção produzida pelos tubérculos de Montgomery é responsável pela hidratação natural dos mamilos.',
          'Use sutiã de tamanho adequado, que não aperte as mamas, com alças largas para dar firmeza às mamas. Seu uso não é indispensável.'
        ],
        nota: 'Atenção: dor persistente, fissuras, vermelhidão, inchaço ou febre são sinais que precisam de avaliação por um profissional de saúde.'
      },
      {
        titulo: 'Preparação das mamas para amamentar',
        tipo: 'lista',
        itens: [
          'Escolha um sutiã confortável e do tamanho adequado para sustentar as mamas.',
          'Não é necessário esticar os mamilos para se preparar para amamentar. Você pode fazer massagens circulares com pressão moderada nos seios para ajudar na descida do leite.',
          'Evite passar cremes, óleos ou álcool nos mamilos e nas aréolas.',
          'Não esfregue os mamilos com buchas ou toalhas ásperas, pois isso pode machucar a pele.',
          'Saiba que os pequenos pontinhos ao redor dos mamilos são naturais e ajudam a manter a região lubrificada.',
          'Se não conseguir mamar na primeira hora, ofereça o peito assim que possível.',
          'Mantenha o bebê junto com você desde o nascimento, favorecendo o vínculo entre mãe e filho.',
          'Observe os sinais de fome, como abrir a boca, procurar o peito e levar as mãos à boca.',
          'Ofereça carinho, proteção e atenção às necessidades do bebê.',
          'Em caso de dúvidas ou dificuldades, procure ajuda de um profissional de saúde.'
        ]
      },
      {
        titulo: 'Medidas que ajudam na retirada do leite',
        tipo: 'lista',
        itens: [
          'Mamadas frequentes.',
          'Retire gentilmente das mamas um pouco de leite antes das mamadas, para amaciar a aréola e facilitar a pega adequada.',
          'Faça compressas mornas (pano úmido) na aréola logo antes da mamada para ativar o reflexo de ejeção do leite, ou tome uma chuveirada ou banho morno.',
          'Retire leite entre as mamadas, o suficiente para se sentir confortável.',
          'Faça massagens delicadas das mamas, com movimentos circulares, particularmente nas regiões mais afetadas pelo ingurgitamento. Elas fluidificam o leite viscoso acumulado e estimulam o reflexo de ejeção do leite.',
          'Massagens nas costas e pescoço ou outras formas de relaxamento também podem ajudar o leite a fluir.',
          'Retire leite materno após as mamadas, mesmo quando a mama parecer vazia.',
          'Ingira líquidos em quantidade suficiente. Nunca fique com sede. Repouse nos intervalos das mamadas, sempre que possível.',
          'O choro costuma ser um sinal tardio de fome. Por isso, observar os primeiros sinais pode facilitar o momento da mamada.',
          'Não tenha medo de pedir ajuda! O apoio dos profissionais de saúde e da família faz diferença nessa fase.'
        ]
      }
    ]
  },

  suporte: {
    titulo: 'Suporte',
    intro: 'A amamentação é um processo de aprendizado. Você não precisa enfrentar as dificuldades sozinha.',
    secoes: [
      {
        titulo: 'Quando procurar ajuda?',
        tipo: 'lista',
        intro: 'Procure um profissional de saúde ou um Banco de Leite Humano se apresentar:',
        itens: [
          'Dor persistente durante as mamadas.',
          'Feridas ou fissuras nos mamilos.',
          'Mama muito endurecida, vermelha ou dolorida.',
          'Febre ou mal-estar associado a alterações nas mamas.',
          'Dificuldade do bebê para abocanhar a mama ou manter a sucção.',
          'Dúvidas sobre a quantidade de leite ou o ganho de peso do bebê.'
        ],
        nota: 'O acompanhamento profissional ajuda a identificar as dificuldades e encontrar estratégias adequadas para cada mãe e bebê.'
      },
      {
        titulo: 'Onde encontrar um Banco de Leite',
        tipo: 'lista',
        itens: [],
        bancos: true,
        link: { texto: 'Ver o mapa de bancos de leite', url: 'bancos.html', interno: true }
      }
    ],
    fechamento: 'A amamentação é uma experiência construída aos poucos, com carinho, paciência e aprendizado. Nem todos os dias serão iguais, e pedir ajuda não é sinal de dificuldade ou incapacidade: é uma forma de cuidar de você e do seu bebê. Respeite seu tempo, confie no seu processo e lembre-se: você não está sozinha nessa jornada! Amamentar é nutrir, proteger e fortalecer vínculos.'
  }
};

// Pega e posicionamento. Os textos vêm do material das fisioterapeutas.
const PEGA = {
  intro: 'A pega é a maneira como o bebê abocanha a mama. Quando está adequada, favorece a retirada do leite e ajuda a prevenir dores e lesões nos mamilos.',
  imagemPega: { arquivo: 'imagens/pega/pega-aproximacao.jpg', alt: 'Ilustração aproximada de um bebê com a boca bem aberta, abocanhando a mama com boa parte da aréola.' },
  passos: [
    'Posicione a mão em formato de C para apoiar a mama, sem apertar a aréola.',
    'Espere o bebê abrir bem a boca e abaixar a língua antes de oferecer o peito.',
    'Aproxime o bebê da mama, permitindo que ele abocanhe boa parte da aréola (círculo mais escuro do seio) e não apenas o mamilo (“bico do peito”).'
  ],
  sinais: [
    'Observe se os lábios estão voltados para fora (boca de peixinho).',
    'O queixo deve tocar a mama e o nariz deve ficar livre.',
    'Deve aparecer mais aréola acima da boca do bebê do que abaixo.',
    'Observe se o bebê suga de forma lenta e profunda, com pequenas pausas e deglutição perceptível.',
    'O bebê deve permanecer bem próximo e firme na mama durante a mamada.'
  ],
  posicionamentoIntro: 'Não existe uma única posição correta para amamentar. O mais importante é que mãe e bebê estejam confortáveis e que a pega seja adequada.',
  imagemPosicionamento: { arquivo: 'imagens/pega/posicionamento-geral.jpg', alt: 'Ilustração de uma mãe sentada, com as costas apoiadas e uma almofada sob o bebê, amamentando com o bebê alinhado e voltado para ela.' },
  posicionamento: [
    'Mantenha o bebê bem próximo ao seu corpo, com a barriga voltada para a sua.',
    'Deixe a cabeça e o tronco do bebê alinhados, sem torcer o pescoço.',
    'Mantenha o bebê bem apoiado durante a mamada.',
    'Posicione o rosto do bebê de frente para a mama, com o nariz na altura do mamilo.',
    'Escolha uma posição confortável e relaxada para amamentar.',
    'Apoie bem as costas e os braços. Se necessário, utilize travesseiros ou almofadas para maior conforto.'
  ],
  posicoesNota: 'Você pode escolher diferentes posições para você e seu bebê, de acordo com o ambiente em que estiver. O importante é manter alguns cuidados com o posicionamento e o alinhamento do bebê durante a amamentação.',
  posicoes: [
    { nome: 'Posição jogador de futebol americano', arquivo: 'imagens/pega/posicao-futebol-americano.jpg', alt: 'Ilustração de um bebê apoiado em uma almofada, mamando, com a mãe sentada.' },
    { nome: 'Posição cavalinho', arquivo: 'imagens/pega/posicao-cavalinho.jpg', alt: 'Ilustração de um bebê sentado sobre a coxa da mãe, de frente para o peito, mamando.' },
    { nome: 'Posição deitada', arquivo: 'imagens/pega/posicao-deitada.jpg', alt: 'Ilustração de uma mãe reclinada, com o bebê deitado sobre o seu corpo, mamando.' }
  ]
};