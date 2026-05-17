document.addEventListener('DOMContentLoaded', function() {
    // --- LÓGICA DO MENU RESPONSIVO (CORRIGIDA) ---
    const menuToggle = document.querySelector('.menu');
    const navMenu = document.querySelector('.nav-menu');

    // Função de TOGGLE
    menuToggle.addEventListener('click', () => {
        // Usa a classe 'ativo' no menuToggle para o CSS de animação/transformação
        menuToggle.classList.toggle('ativo');
        // Usa a classe 'active' no navMenu para mostrar/esconder o menu
        navMenu.classList.toggle('active'); 
        
        // Troca o texto do botão entre Hambúrguer (☰) e X (✕)
        if (navMenu.classList.contains('active')) {
             menuToggle.textContent = '✕'; 
        } else {
             menuToggle.textContent = '☰';
        }
    });

    // Fechar o menu ao clicar em um link (para mobile)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 785) {
                if(navMenu.classList.contains('active')) {
                   menuToggle.classList.remove('ativo');
                   navMenu.classList.remove('active');
                   menuToggle.textContent = '☰'; // Volta para o hambúrguer
                }
            }
        });
    });

    // --- LÓGICA DO CARROSSEL DE PROJETOS (RESTAURADA E COMPLETA) ---

    // 1. Dados dos Projetos (MOCK DATA)
    const PROJECTS_DATA = {
        "Power BI": [
            { id: 1, title: "Relatório de Funcionários", subtitle: "Tickets, Clientes e Funcionários", description: "Dashboard interativo desenvolvido em Power BI, reunindo indicadores estratégicos em visualizações claras e dinâmicas de dados sobre os clientes e funcionários de uma empresa fictícia. Permite análise rápida, acompanhamento de métricas como contratações mensais, quantidade de funcionários, valores de contrato, etc em tempo real e garante apoio à tomada de decisão baseada em dados.", link: "https://app.powerbi.com/view?r=eyJrIjoiMDA0Y2VmN2QtZjNiYi00MjEwLWFjYzItY2YwMzg2MzllNmYwIiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelFuncP.png" },
            { id: 2, title: "Relatório KPI (Key Perfomance Indicators)", subtitle: "Faturamento Total, Faturamento Acumulado, Faturamento Y-1", description: "Dashboard interativo desenvolvido em Power BI, reunindo Indicadores Chaves de Perfomance em visualizações claras e dinâmicas. Permite análise rápida, acompanhamento de métricas de Faturamento Total, Faturamento Acumulado e Faturamento Y-1 de uma empresa fictícia em tempo real e garante apoio à tomada de decisão baseada em dados.", link: "https://app.powerbi.com/view?r=eyJrIjoiYTY5MWRjYjYtMjFjNC00ZWU3LWEwMTctMDZiNmRjMzY1ZTAzIiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelKPI.png" },
            { id: 3, title: "Relatório de Movimentações Bancárias", subtitle: "Receita, Pagamentos, Imposto e Lucro", description: "Dashboard interativo desenvolvido em Power BI, reunindo indicadores estratégicos sobre a Receita, Pagamentos, Imposto e Lucros de instituições bancárias brasileiras em visualizações claras e dinâmicas. Permite análise rápida, acompanhamento de métricas em tempo real e apoio à tomada de decisão baseada em dados.", link: "https://app.powerbi.com/view?r=eyJrIjoiNmMwN2EzY2UtMWU4Ni00OTYyLWEwZTctMWRjNDYzYTAyZWFkIiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelBanc.png" },
            { id: 4, title: "Relatório de Produtos", subtitle: "Faturamento, Produtos mais vendidos e Faturamento por Continente", description: "Dashboard interativo desenvolvido em Power BI, reunindo indicadores estratégicos sobre o Faturamento e Quantidade Vendida por ano e mês, Faturamento Total, Produto mais Vendido Mundialmente, Faturamento por Marca e Faturamento por Continente em visualizações claras e dinâmicas. Permite análise rápida, acompanhamento de métricas em tempo real e apoio à tomada de decisão baseada em dados.", link: "https://app.powerbi.com/view?r=eyJrIjoiNzk5MDBlOTYtNTNmMi00ZWM0LTlhZWEtMWE3MTU3OGRjNTI0IiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelVendas.png" },
            { id: 5, title: "Relatório de Produção", subtitle: "Total Produzido, Total Rejeitado, Horas Produtivas e Horas Paradas", description: "Dashboard interativo desenvolvido em Power BI, reunindo indicadores estratégicos sobre o Total Produzido, Total Rejeitado, Horas Produtivas, Horas Paradas, Quantidade Produzida por mês, %Produtividade e %Quantidade em visualizações claras e dinâmicas. Permite análise rápida, acompanhamento de métricas em tempo real e apoio à tomada de decisão baseada em dados.", link: "https://app.powerbi.com/view?r=eyJrIjoiYjU0YTkxNGEtZWU0NC00NzQ4LTk5ZDEtODdmZDk4OTkwYjBiIiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelProd.png" },
            { id: 6, title: "Relatório de Recursos Humanos", subtitle: "Total de Contratações, Funcionário Ativos e Desligamentos", description: "Dashboard interativo desenvolvido em Power BI, reunindo indicadores estratégicos sobre o Total de Contratações, Funcionários Ativos, Desligamentos, %Turnover, Funcionários Ativos por Ano de Contratação, Funcionários Ativos por Gênero, Funcionários por Área da empresa em visualizações claras e dinâmicas. Permite análise rápida, acompanhamento de métricas em tempo real e apoio à tomada de decisão baseada em dados.", link: "https://app.powerbi.com/view?r=eyJrIjoiNzhiMzAwMWEtM2E0YS00MTcwLWJkOTItOTc0MTFjMDNmM2VmIiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelRH.png" },
            { id: 7, title: "Relatório de Vendas", subtitle: "Faturamento da Empresa e Lucro da Empresa", description: "Dashboard interativo desenvolvido em Power BI, reunindo indicadores estratégicos sobre o Faturamento da Empresa, Lucro da Empresa, Soma de Faturamento por Tipo de Produto e Soma de Lucro por Marca em visualizações claras e dinâmicas. Permite análise rápida, acompanhamento de métricas em tempo real e apoio à tomada de decisão baseada em dados.", link: "https://app.powerbi.com/view?r=eyJrIjoiOWNlMTMwMmYtM2I4YS00ZjY4LWFlZGEtMGE5ZGNjZDEwYzc4IiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelVendas2.png" },
        ],
        "Python": [
            { id: 8, title: "Dashboard de Vendas com Tkinter e Matplotlib", subtitle: "Visualização de Dados e Interface Gráfica em Python", description: "Projeto desenvolvido como exercício prático para criação de dashboards de vendas utilizando a biblioteca Tkinter para interface gráfica e Matplotlib para visualizações. Os dados utilizados são fictícios, com foco na construção visual e interativa do painel.", link: "https://github.com/RiquelmoFerreira/Tkinter_Dashboard", image: "img/PythonTkinter.png" },
            { id: 9, title: "Análise de Eficiência de Turbinas Eólicas", subtitle: "Energia Renovável, Análise de Dados e Visualização", description: "Projeto desenvolvido durante o exercício prático de Análise de Dados com Python, com versões em Português e Inglês. O objetivo foi avaliar a eficiência de turbinas eólicas comparando valores reais de geração com a curva teórica declarada pelo fabricante, além de identificar anomalias dentro de uma variação aceitável. Foram utilizadas as bibliotecas Pandas, Matplotlib e Seaborn no ambiente do Jupyter Notebook.", link: "https://github.com/RiquelmoFerreira/Wind_Energy_Project", image: "img/PythonVento.png" },
            { id: 10, title: "Análise de Experiência Profissional e Salário", subtitle: "Recursos Humanos, Correlação e Estatística", description: "Projeto desenvolvido durante o exercício prático de Análise de Dados com Python, disponível em Português e Inglês. O objetivo foi investigar a relação entre anos de experiência e salário anual dos funcionários, verificando a existência de correlação entre essas variáveis. A análise exploratória mostrou distribuições bimodais tanto para salários quanto para anos de experiência, além de boxplots que evidenciaram faixas salariais e níveis de carreira sem ocorrência de outliers. Por meio de scatterplots, regressão linear e matriz de correlação (Pearson = 0,98), foi confirmada uma forte relação linear positiva: quanto maior o tempo de experiência, maior a tendência de aumento salarial.", link: "https://github.com/RiquelmoFerreira/DataAnalysisHuman_Resources_Project", image: "img/PythonExp.png" },
            { id: 11, title: "Análise das Ações da Magalu (2021 - 2022)", subtitle: "Mercado Financeiro, Séries Temporais e Visualização", description: "Projeto desenvolvido durante o exercício prático de Análise de Dados com Python, disponível em Português e Inglês. O objetivo foi analisar a evolução do valor de fechamento das ações da Magalu entre 2021 e 2022, identificando picos, oscilações e quedas no período. A análise incluiu gráficos de linha para evolução dos preços, cálculo de médias móveis (5 e 30 dias) e um gráfico Candlestick para compreender melhor os movimentos de alta e baixa. O estudo destacou o pico das ações no início de 2021, seguido por queda contínua até o começo de 2022.", link: "https://github.com/RiquelmoFerreira/DataAnalysisFinancial_Market", image: "img/PythonMagalu.png" },
            { id: 12, title: "Análise de Vendas de Jogos PS4 (2013 - 2018)", subtitle: "Vendas, Jogos e Análise de Dados", description: "Projeto desenvolvido durante o exercício prático de Análise de Dados com Python, disponível em Português e Inglês. O objetivo foi analisar o número de jogos vendidos na plataforma Playstation 4 entre 2013 e 2018, identificando tendências de vendas por ano, gênero e região. A análise incluiu gráficos de barras, KDE e boxplots para identificar concentração de vendas e outliers, além de gráficos empilhados e scatterplots para explorar distribuição por continente, gênero e publisher. O estudo mostrou os anos de maior sucesso (2015–2017), a presença de outliers como GTA V em 2014 e destacou a América do Norte como principal mercado de vendas.", link: "https://github.com/RiquelmoFerreira/DataAnalysisGame_Sales_PRoject", image: "img/PythonPS.png" },
            { id: 13, title: "Análise de Empresas Unicórnios por País", subtitle: "Startups, Mercado Global e Inovação", description: "Projeto desenvolvido durante o exercício prático de Análise de Dados com Python, disponível em Português e Inglês. O objetivo foi analisar o número de empresas unicórnios por país, identificando os setores com maior geração de startups bilionárias, os países que mais contribuem para esse fenômeno e a presença de empresas unicórnios no Brasil. A análise utilizou gráficos de barras para identificar os setores mais produtivos (Fintech e Internet/Serviços), treemaps para mapear os 10 países com mais unicórnios (EUA, China, Índia, Reino Unido, Alemanha, Israel, França, Brasil, Canadá e Coreia do Sul), e gráficos de linha para avaliar os países que mais geram valor com essas empresas. Foram identificadas 13 empresas unicórnio brasileiras no dataset e observadas diferenças entre os países que mais geram empresas versus os que mais geram valor, fornecendo uma visão completa do cenário global de startups de alto valor.", link: "https://github.com/RiquelmoFerreira/DataAnalysisUnicorns", image: "img/PythonUni.png" },
            { id: 14, title: "Análise do Valor de Fechamento do Bitcoin (2017 -2022)", subtitle: "Criptomoedas, Séries Temporais e Visualização", description: "Projeto desenvolvido durante o exercício prático de Análise de Dados com Python, disponível em Português e Inglês. O objetivo foi analisar o valor de fechamento do Bitcoin, suas médias móveis e tendências entre 2017 e 2022, identificando picos, oscilações e o crescimento explosivo da criptomoeda. A análise utilizou gráficos de linha para acompanhar a evolução do fechamento, destacando o primeiro pico em 2018 e o pico máximo em 2021, além de médias móveis de 5 dias e tendências de fechamento de 30 dias para melhor compreensão dos movimentos de preço ao longo do período.", link: "https://github.com/RiquelmoFerreira/DataAnalysisBitcoinProject", image: "img/PythonBit.png" },
            { id: 15, title: "Análise de Desempenho Educacional", subtitle: "Educação, Performance e Estatística", description: "Projeto desenvolvido durante o exercício prático de Análise de Dados com Python, disponível em Português e Inglês. O objetivo foi analisar a relação entre o grau de escolaridade dos pais, a refeição antes da prova e a participação em cursos preparatórios com o desempenho dos estudantes em matemática, leitura e redação. A análise utilizou gráficos boxplot e estatísticas descritivas para verificar tendências, mostrando que alunos que realizaram cursos de preparação tiveram melhores notas e menos outliers, e que estudantes com pais de grau de escolaridade superior ao nível médio apresentaram médias e medianas mais altas em todas as provas.", link: "https://github.com/RiquelmoFerreira/DataAnalysisEducation_Project", image: "img/PythonEdu.png" },
            { id: 16, title: "Análise do PIB per Capita do Brasil e Estados (2013–2016)", subtitle: "Economia, PIB e Visualização", description: "Projeto desenvolvido durante o exercício prático de Análise de Dados com Python, disponível em Português e Inglês. O objetivo foi analisar a evolução do PIB per capita do Brasil e de seus estados entre 2013 e 2016, identificando tendências regionais e nacionais. A análise utilizou gráficos de linha em grid para comparar o desempenho de cada estado e do país como um todo, mostrando que o Brasil apresentou queda no PIB per capita, a maioria dos estados permaneceu estagnada ou em declínio, e apenas o Mato Grosso teve aumento significativo, refletindo sua importância no setor agrícola e pecuário.", link: "https://github.com/RiquelmoFerreira/DataAnalysisBrazil_GDP", image: "img/PythonPIB.png" },
            { id: 17, title: "Análise Exploratória de Dados da Netflix", subtitle: "Streaming, Popularidade e Insights", description: "Projeto desenvolvido durante o exercício prático de Análise de Dados com Python, disponível em Português e Inglês. O objetivo foi realizar uma análise exploratória dos filmes e séries que entraram no TOP 10 da Netflix, verificando tempo de permanência e pontuação, para entender padrões de popularidade e direcionar decisões de investimento em formatos e gêneros. A análise mostrou que a maioria dos títulos era exclusiva da plataforma, identificou outliers como a animação Cocomelon, que teve maior tempo no TOP 10 e maior pontuação, e revelou, por meio de histogramas, que a maior parte dos títulos permanece pouco tempo no ranking, refletindo pontuações menores.", link: "https://github.com/RiquelmoFerreira/Exploratory_Data_Analysis_Netflix_Top_10", image: "img/PythonNET.png" },
            { id: 18, title: "Análise das Ações de Empresas Brasileiras de Energia (2021–2022)", subtitle: "Mercado Financeiro, Ações e Investimento", description: "Projeto desenvolvido durante o exercício prático de Análise de Dados com Python, disponível em Português e Inglês. O objetivo foi analisar o valor das ações de empresas brasileiras de energia entre 2021 e 2022, identificando tendências e oportunidades de investimento. A análise utilizou gráficos de linha após ajustes no dataset, mostrando a evolução do valor de fechamento das ações de Petrobras, AES Brasil, Alupar, Cesp, Cemig e Aeris Energy, destacando que a Petrobras apresentou crescimento consistente e retornou a ocupar o maior valor de mercado no período analisado.", link: "https://github.com/RiquelmoFerreira/DataAnalysisEnergy_Companies_Projects", image: "img/PythonENE.png" },
            { id: 19, title: "Análise de Incêndios Florestais no Brasil (1997–2017)", subtitle: "Meio Ambiente, Sustentabilidade e Visualização", description: "Projeto desenvolvido durante o exercício prático de Análise de Dados com Python, disponível em Português e Inglês. O objetivo foi analisar o total de incêndios florestais no Brasil e em seus estados entre 1997 e 2017, identificando padrões temporais e regionais. A análise utilizou gráficos de linha, boxplots, barras, treemaps e mapas de densidade, mostrando crescimento do número de incêndios até 2002, queda até 2007 e oscilações até 2017; evidenciou que os incêndios são mais frequentes a partir do meio do ano, com pico em agosto; e destacou os estados mais afetados (Mato Grosso, Paraíba, São Paulo, Rio de Janeiro e Bahia), oferecendo uma visão clara sobre a gravidade do problema e áreas que necessitam de maior atenção e prevenção.", link: "https://github.com/RiquelmoFerreira/DataAnalysisBushfires_in_Brazil", image: "img/PythonFOG.png" },
        ],
        "Excel": [
            { id: 20, title: "Controle de Mercearia no Excel", subtitle: "Excel, Macros, Fórmulas Avançadas e Tabelas Dinâmicas", description: "Projeto desenvolvido durante um exercício prático de Excel do Básico ao Avançado, disponível em Português e Inglês. O objetivo foi criar uma planilha completa de controle de uma mercearia, demonstrando o uso de fórmulas avançadas, macros e tabelas dinâmicas. A planilha inclui menu com navegação por abas, controle de despesas, registro de mercadorias com inserção e exclusão via macro, acompanhamento de investimentos, controle de estoque com formatação condicional, resultados gerais de receita, vendas semanais com gráficos, registro detalhado de vendas com botões para manipulação de dados via macro, análises semanais utilizando tabelas dinâmicas e uma aba de cálculos e testes com PROCV, ÍNDICE e CORRESP para alimentar as demais tabelas.", link: "https://github.com/RiquelmoFerreira/Grocery_Store_Control_Excel", image: "img/ExcelMerc.png" },
            { id: 21, title: "Dashboard de Vendas no Excel", subtitle: "Excel, Dashboard e Indicadores de Performance", description: "Projeto desenvolvido durante um exercício prático de Dashboards em Excel, com foco na criação de um painel interativo para analisar a performance de um e-commerce fictício. O dashboard apresenta gráficos de linha mostrando a evolução das vendas dos produtos A, B e C, com total de vendas anual vinculado a filtros por ano (2018, 2019 e 2020), gráficos de área combinados com linha para visualizar desempenho global e total de vendas por ano, e gráficos de barras horizontais detalhando as opções de pagamento e quantidade de transações de acordo com o ano selecionado, permitindo uma análise dinâmica e completa dos indicadores.", link: "https://github.com/RiquelmoFerreira/Dashboard_de_Vendas_Excel", image: "img/ExcelVendas.png" },
            { id: 22, title: "Dashboard de Filmes com SQL e Excel", subtitle: "Entretenimento, Preços e Análise de Dados", description: "Projeto desenvolvido durante um exercício prático de SQL e Excel, utilizando o banco de dados hashtagmovies da Hashtag Programação, adaptado para o SSMS 19, com análises complementares no Microsoft Excel. O objetivo foi criar um dashboard com os preços médios por gênero e o TOP 10 de filmes com nota acima da média. A análise utilizou gráficos de barras e treemaps, mostrando que o maior preço médio por gênero seria Arte (considerando apenas uma produção), sendo Ação e Aventura o maior preço médio real; para os títulos de 2011, o maior preço médio foi do gênero Mistério e Suspense; e o treemap destacou os 10 filmes com pontuação acima da média, facilitando a visualização e interpretação dos dados.", link: "https://github.com/RiquelmoFerreira/Analise_de_Dados_com_SSMS19", image: "img/ExcelSQLCinema.png" },
            { id: 23, title: "Dashboard de Vendas de E-commerce", subtitle: "SQL, Excel, Indicadores de Performance e Visualização", description: "Projeto desenvolvido durante um exercício prático de SQL e Excel, utilizando um banco de dados fictício de e-commerce com análises complementares no Excel. O objetivo foi criar um dashboard de vendas destacando a performance dos principais indicadores. O dashboard apresenta gráficos da evolução da receita e do ticket médio, mostrando aumento na receita e queda no ticket médio, evolução do número de visitas no site e conversão de vendas, mapa com os estados brasileiros com melhores vendas, TOP 5 marcas e lojas mais vendidas, e número de visitas ao website por dia da semana, evidenciando que segunda-feira é o dia com mais visitas e domingo o dia com menos.", link: "https://github.com/RiquelmoFerreira/Excel_PostgreSQL_Sales_Dashboard", image: "img/ExcelSQLVendas.png" },
            { id: 24, title: "Dashboard de Perfil de Clientes de E-commerce", subtitle: "SQL, Excel, Análise de Clientes e Visualização", description: "Projeto desenvolvido durante um exercício prático de SQL e Excel, utilizando um banco de dados fictício de e-commerce. O objetivo foi criar um dashboard para analisar as principais características dos clientes que visitam o site. O dashboard apresenta gráficos mostrando que a maior parte dos visitantes são mulheres, a maioria possui emprego CLT, a faixa etária predominante está entre 20 e 40 anos e a faixa salarial concentra-se entre 5.000 e 10.000. Também são exibidas informações sobre veículos visitados, indicando que a maioria é seminova, com idade entre 8 e 10 anos, além de um treemap destacando as marcas mais visualizadas.", link: "https://github.com/RiquelmoFerreira/Excel_PostgreSQL_Customer_Profile", image: "img/ExcelSQLPerfil.png" },
            //{ id: 7, title: "", subtitle: "", description: "", link: "", image: "img/" },
        ],
        "Banco de Dados": [
            { id: 25, title: "Integração entre Python e SQL", subtitle: "Python, SQL, Pyodbc e Jupiter Notebook", description: "Projeto desenvolvido durante um exercício prático de Python para Análise de Dados, disponível em Português e Inglês. O objetivo foi demonstrar uma integração simples entre Python e SQL, utilizando a biblioteca Pyodbc no Jupyter Notebook para conectar, ler e manipular dados armazenados em um banco SQL no ambiente SSMS 19, permitindo a execução de consultas e operações de forma automatizada e eficiente.", link: "https://github.com/RiquelmoFerreira/Python_SQL_Integration", image: "img/PythonSQL.png" },
            { id: 26, title: "Dashboard de Filmes com SQL e Excel", subtitle: "Entretenimento, Preços e Análise de Dados", description: "Projeto desenvolvido durante um exercício prático de SQL e Excel, utilizando o banco de dados hashtagmovies da Hashtag Programação, adaptado para o SSMS 19, com análises complementares no Microsoft Excel. O objetivo foi criar um dashboard com os preços médios por gênero e o TOP 10 de filmes com nota acima da média. A análise utilizou gráficos de barras e treemaps, mostrando que o maior preço médio por gênero seria Arte (considerando apenas uma produção), sendo Ação e Aventura o maior preço médio real; para os títulos de 2011, o maior preço médio foi do gênero Mistério e Suspense; e o treemap destacou os 10 filmes com pontuação acima da média, facilitando a visualização e interpretação dos dados.", link: "https://github.com/RiquelmoFerreira/Analise_de_Dados_com_SSMS19", image: "img/ExcelSQLCinema.png" },
            { id: 27, title: "Dashboard de Vendas de E-commerce", subtitle: "SQL, Excel, Indicadores de Performance e Visualização", description: "Projeto desenvolvido durante um exercício prático de SQL e Excel, utilizando um banco de dados fictício de e-commerce com análises complementares no Excel. O objetivo foi criar um dashboard de vendas destacando a performance dos principais indicadores. O dashboard apresenta gráficos da evolução da receita e do ticket médio, mostrando aumento na receita e queda no ticket médio, evolução do número de visitas no site e conversão de vendas, mapa com os estados brasileiros com melhores vendas, TOP 5 marcas e lojas mais vendidas, e número de visitas ao website por dia da semana, evidenciando que segunda-feira é o dia com mais visitas e domingo o dia com menos.", link: "https://github.com/RiquelmoFerreira/Excel_PostgreSQL_Sales_Dashboard", image: "img/ExcelSQLVendas.png" },
            { id: 28, title: "Dashboard de Perfil de Clientes de E-commerce", subtitle: "SQL, Excel, Análise de Clientes e Visualização", description: "Projeto desenvolvido durante um exercício prático de SQL e Excel, utilizando um banco de dados fictício de e-commerce. O objetivo foi criar um dashboard para analisar as principais características dos clientes que visitam o site. O dashboard apresenta gráficos mostrando que a maior parte dos visitantes são mulheres, a maioria possui emprego CLT, a faixa etária predominante está entre 20 e 40 anos e a faixa salarial concentra-se entre 5.000 e 10.000. Também são exibidas informações sobre veículos visitados, indicando que a maioria é seminova, com idade entre 8 e 10 anos, além de um treemap destacando as marcas mais visualizadas.", link: "https://github.com/RiquelmoFerreira/Excel_PostgreSQL_Customer_Profile", image: "img/ExcelSQLPerfil.png" },
        ]
    };

    // 2. Elementos DOM do Carrossel
    const categoryDisplay = document.getElementById('current-category');
    const prevCategoryBtn = document.getElementById('prev-category-btn');
    const nextCategoryBtn = document.getElementById('next-category-btn');
    const projectsContainer = document.getElementById('projects-container');
    const projectDetailsSection = document.getElementById('project-details');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');
    const detailLink = document.getElementById('detail-link');
    const detailImage = document.getElementById('detail-image');
    
    // 3. Controle do Carrossel de Categorias
    const categories = Object.keys(PROJECTS_DATA);
    let currentCategoryIndex = 0;

    function renderCategoryProjects(category) {
        projectsContainer.innerHTML = '';
        projectDetailsSection.style.display = 'none';

        const projects = PROJECTS_DATA[category];
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('sample-item');
            projectElement.dataset.projectId = project.id;
            
            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <h2>${project.title}</h2>
                <p>${project.subtitle}</p>
            `;
            
            projectElement.addEventListener('click', () => displayProjectDetails(project));
            projectsContainer.appendChild(projectElement);
        });
    }

    function updateCategory() {
        const category = categories[currentCategoryIndex];
        categoryDisplay.textContent = category;
        renderCategoryProjects(category);
    }

    prevCategoryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
        updateCategory();
    });

    nextCategoryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
        updateCategory();
    });

    function displayProjectDetails(project) {
        detailTitle.textContent = project.title;
        detailDescription.textContent = project.description;
        detailLink.href = project.link;
        detailImage.src = project.image;
        detailImage.alt = project.title;

        projectDetailsSection.style.display = 'flex';
        projectDetailsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Inicializa a página
    updateCategory();
});

