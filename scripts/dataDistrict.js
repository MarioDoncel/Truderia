const districts = [
    {
        name: 'Centro',
        price: 4
    },
    {
        name: 'Campinho',
        price: 5
    },
    {
        name: 'Jardim Alto das Araras',
        price: 5
    },
    {
        name: 'Jardim Anhangüera',
        price: 5
    },
    {
        name: 'Jardim Belvedere',
        price: 5
    },
    {
        name: 'Jardim Boa Esperanca',
        price: 6
    },
    {
        name: 'Jardim Candida',
        price: 5
    },
    {
        name: 'Jardim Maria Lúcia',
        price: 6
    },
    {
        name: 'Jardim Nossa Senhora Aparecida',
        price: 5
    },
    {
        name: 'Jardim Residencial Itapua',
        price: 5
    },
    {
        name: 'Jardim Rollo',
        price: 5
    },
    {
        name: 'Jardim Santa Cruz',
        price: 5
    },
    {
        name: 'Jardim do Filtro',
        price: 5
    },
    {
        name: 'Matadouro',
        price: 6
    },
    {
        name: 'Novo Jardim Candida',
        price: 6
    },
    {
        name: 'Parque Santa Candida',
        price: 6
    },
    {
        name: 'Vila Bressan',
        price: 5
    },
    {
        name: 'Vila Candinha',
        price: 6
    },
    {
        name: 'Vila Europa',
        price: 5
    },
    {
        name: 'Vila Michelin',
        price: 5
    },
    {
        name: 'Vila Pastorello',
        price: 5
    },
    {
        name: 'Vila Queiroz',
        price: 5
    },
    {
        name: 'Bom Jesus',
        price: 6
    },
    {
        name: 'Center Martini',
        price: 6
    },
    {
        name: 'Condominio Palmeiras de Piratininga',
        price: 6
    },
    {
        name: 'Condominio Residencial Alto das Araras',
        price: 6
    },
    {
        name: 'Condominio Villagio Las Palmas',
        price: 6
    },
    {
        name: 'Conjunto Habitacional Heitor Villa Lobos',
        price: 6
    },
    {
        name: 'Conjunto Habitacional Narciso Gomes',
        price: 7
    },
    {
        name: 'Conjunto Residencial Arnaldo Mazon',
        price: 6
    },
    {
        name: 'Jardim 15 de Agosto',
        price: 6
    },
    {
        name: 'Jardim 8 de Abril',
        price: 6
    },
    {
        name: 'Jardim Abolicao de Lourenco Dias',
        price: 6
    },
    {
        name: 'Jardim Alto da Colina',
        price: 6
    },
    {
        name: 'Jardim Alto da Represa',
        price: 6
    },
    {
        name: 'Jardim Bela Vista',
        price: 6
    },
    {
        name: 'Jardim Bosque dos Ipes',
        price: 6
    },
    {
        name: 'Jardim Buzolin',
        price: 6
    },
    {
        name: 'Jardim Cambui',
        price: 6
    },
    {
        name: 'Jardim Campestre',
        price: 6
    },
    {
        name: 'Jardim Celina',
        price: 7
    },
    {
        name: 'Jardim Copacabana',
        price: 6
    },
    {
        name: 'Jardim Dalla Costa',
        price: 6
    },
    {
        name: 'Jardim Dom Bosco',
        price: 6
    },
    {
        name: 'Jardim Encosta do Sol (Esperanca)',
        price: 6
    },
    {
        name: 'Jardim Esmeralda',
        price: 7
    },
    {
        name: 'Jardim Florenca',
        price: 6
    },
    {
        name: 'Jardim Francisco Buzolin',
        price: 6
    },
    {
        name: 'Jardim Geny Mercatelli',
        price: 6
    },
    {
        name: 'Jardim Haise Maria',
        price: 6
    },
    {
        name: 'Jardim Italia',
        price: 6
    },
    {
        name: 'Jardim Luiza Maria',
        price: 6
    },
    {
        name: 'Jardim Maraba',
        price: 6
    },
    {
        name: 'Jardim Maria Rosa',
        price: 6
    },
    {
        name: 'Jardim Nossa Senhora de Fatima',
        price: 6
    },
    {
        name: 'Jardim Nova Araras',
        price: 6
    },
    {
        name: 'Jardim Nova Europa',
        price: 6
    },
    {
        name: 'Jardim Nova Olinda',
        price: 6
    },
    {
        name: 'Jardim Nova Rosana',
        price: 6
    },
    {
        name: 'Jardim Nova Suica',
        price: 6
    },
    {
        name: 'Jardim Oswaldo Buzolin',
        price: 6
    },
    {
        name: 'Jardim Ouro Verde',
        price: 6
    },
    {
        name: 'Jardim Ouro Verde II',
        price: 6
    },
    {
        name: 'Jardim Piratininga',
        price: 6
    },
    {
        name: 'Jardim Portal do Parque',
        price: 6
    },
    {
        name: 'Jardim Presidente Tancredo Neves',
        price: 6
    },
    {
        name: 'Jardim Residencial Alvorada',
        price: 6
    },
    {
        name: 'Jardim Residencial Flamboyant',
        price: 6
    },
    {
        name: 'Jardim Residencial Lago Azul',
        price: 6
    },
    {
        name: 'Jardim Residencial Lagoa',
        price: 6
    },
    {
        name: 'Jardim Residencial Pedras Preciosas',
        price: 7
    },
    {
        name: 'Jardim Rosana',
        price: 6
    },
    {
        name: 'Jardim Santa Catarina',
        price: 6
    },
    {
        name: 'Jardim Santa Efigenia',
        price: 6
    },
    {
        name: 'Jardim Santa Marta',
        price: 6
    },
    {
        name: 'Jardim Santa Olivia II',
        price: 6
    },
    {
        name: 'Jardim Santa Rosa',
        price: 6
    },
    {
        name: 'Jardim Santo Andre',
        price: 6
    },
    {
        name: 'Jardim Sobradinho',
        price: 6
    },
    {
        name: 'Jardim Sao Conrado',
        price: 6
    },
    {
        name: 'Jardim Sao Joao',
        price: 6
    },
    {
        name: 'Jardim Sao Luiz',
        price: 6
    },
    {
        name: 'Jardim Sao Nicolau',
        price: 6
    },
    {
        name: 'Jardim Sao Pedro',
        price: 6
    },
    {
        name: 'Jardim Tangara',
        price: 6
    },
    {
        name: 'Jardim Taruma',
        price: 6
    },
    {
        name: 'Jardim Terra Nobre I',
        price: 6
    },
    {
        name: 'Jardim Terra Nobre II',
        price: 6
    },
    {
        name: 'Jardim Terras de Carolina',
        price: 6
    },
    {
        name: 'Jardim Terras de Santa Elisa',
        price: 6
    },
    {
        name: 'Jardim Universitario',
        price: 6
    },
    {
        name: 'Jardim Vista Alegre',
        price: 6
    },
    {
        name: 'Jardim da Colina',
        price: 6
    },
    {
        name: 'Jardim das Flores',
        price: 6
    },
    {
        name: 'Jardim das Nacoes',
        price: 6
    },
    {
        name: 'Jardim das Nacoes II',
        price: 6
    },
    {
        name: 'Jardim das Palmeiras',
        price: 6
    },
    {
        name: 'Jardim dos Eucaliptos',
        price: 6
    },
    {
        name: 'Jardim dos Ypes',
        price: 6
    },
    {
        name: 'Jardins de Samantha I',
        price: 6
    },
    {
        name: 'Jardins de Samantha II',
        price: 6
    },
    {
        name: 'Jardins de Samantha III',
        price: 6
    },
    {
        name: 'Parque Cidade Jardim',
        price: 6
    },
    {
        name: 'Parque Industrial',
        price: 6
    },
    {
        name: 'Parque Terras de Santa Olivia',
        price: 6
    },
    {
        name: 'Parque das Arvores',
        price: 6
    },
    {
        name: 'Residencial Bosque de Versalles',
        price: 6
    },
    {
        name: 'Residencial Jardim America',
        price: 6
    },
    {
        name: 'Residencial Jardim Paulista',
        price: 6
    },
    {
        name: 'Residencial Vila Inglesa',
        price: 6
    },
    {
        name: 'Vila Dona Rosa Zurita',
        price: 6
    },
    {
        name: 'Vila Madalena de Canossa',
        price: 6
    },
    {
        name: 'Vila Rodini',
        price: 6
    },
    {
        name: 'Vila Santo Antonio',
        price: 6
    },
    {
        name: 'Vila Sao Jorge',
        price: 6
    },
    {
        name: 'Chacara Bela Vista',
        price: 7
    },
    {
        name: 'Chacara Daltro',
        price: 7
    },
    {
        name: 'Chacara Morada do Sol',
        price: 7
    },
    {
        name: 'Chacara Recreio Vila Rica',
        price: 7
    },
    {
        name: 'Chacaras Granja Sao Francisco',
        price: 7
    },
    {
        name: 'Chacaras de Recreio Colina Verde',
        price: 6
    },
    {
        name: 'Chacaras de Recreio Parque das Grevilhas',
        price: 7
    },
    {
        name: 'Condominio Villagio Loretto',
        price: 7
    },
    {
        name: 'Conjunto Residencial Prefeito Professor Jair Della Colleta',
        price: 7
    },
    {
        name: 'Conjunto Residencial Prefeito Professor Milton Severino',
        price: 7
    },
    {
        name: 'Conjunto Residencial Prefeito Warley Colombini   ',
        price: 7
    },
    {
        name: 'Distrito Industrial I Professor Jair Della Colleta',
        price: 7
    },
    {
        name: 'Distrito Industrial II Guilherme Buck Junior',
        price: 7
    },
    {
        name: 'Distrito Industrial III Jacob Maretto',
        price: 7
    },
    {
        name: 'Distrito Industrial V',
        price: 7
    },
    {
        name: 'Distrito Industrial VI',
        price: 7
    },
    {
        name: 'Distrito Municipal Industrial IV Adolpho Matthiesen',
        price: 7
    },
    {
        name: 'Facao',
        price: 7
    },
    {
        name: 'Jardim Apolo - Luiz Bertoline',
        price: 7
    },
    {
        name: 'Jardim Campos Verdes',
        price: 6
    },
    {
        name: 'Jardim Chacara Araruna',
        price: 6
    },
    {
        name: 'Jardim Costa Verde',
        price: 7
    },
    {
        name: 'Jardim Esplanada',
        price: 7
    },
    {
        name: 'Jardim Itamaraty',
        price: 7
    },
    {
        name: 'Jardim Jose Ometto I',
        price: 7
    },
    {
        name: 'Jardim Jose Ometto II',
        price: 7
    },
    {
        name: 'Jardim Jose Ometto III',
        price: 7
    },
    {
        name: 'Jardim Jose Ometto IV',
        price: 7
    },
    {
        name: 'Jardim Jose Ometto V',
        price: 7
    },
    {
        name: 'Jardim Monte Verde',
        price: 7
    },
    {
        name: 'Jardim Morumbi',
        price: 7
    },
    {
        name: 'Jardim Morumbi II',
        price: 7
    },
    {
        name: 'Jardim Myriam',
        price: 7
    },
    {
        name: 'Jardim Planalto',
        price: 7
    },
    {
        name: 'Jardim Portal do Sol',
        price: 7
    },
    {
        name: 'Jardim do Lago',
        price: 7
    },
    {
        name: 'Loteamento Industrial Fechado',
        price: 7
    },
    {
        name: 'Parque Dom Pedro',
        price: 7
    },
    {
        name: 'Parque Portal das Laranjeiras',
        price: 7
    },
    {
        name: 'Parque Tiradentes',
        price: 7
    },
    {
        name: 'Parque da Cascata das Piaparas',
        price: 7
    },
    {
        name: 'Residencial Santa Mônica',
        price: 7
    },
    {
        name: 'Residencial Morada do Sol',
        price: 7
    },
    {
        name: 'Sitios de Recreio Independencia',
        price: 7
    },
    {
        name: 'Pacaembu',
        price: 7
    },
    {
        name: 'Samantha',
        price: 7
    },

]