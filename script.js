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

    // 1. Dados dos Projetos (MOCK DATA
    const PROJECTS_DATA = {
        "Power BI": [
            { id: 1, title: "Employee Report", subtitle: "Tickets, Customers and Employees", description: "Interactive dashboard developed in Power BI, bringing together strategic indicators in clear and dynamic data visualizations about the clients and employees of a fictitious company. It allows for quick analysis, monitoring of metrics such as monthly hires, number of employees, contract values, etc. in real time and ensures support for data-driven decision making.", link: "https://app.powerbi.com/view?r=eyJrIjoiMDA0Y2VmN2QtZjNiYi00MjEwLWFjYzItY2YwMzg2MzllNmYwIiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelFuncP.png" },
            { id: 2, title: "KPI (Key Performance Indicators) Report", subtitle: "Total Revenue, Accumulated Revenue, Revenue Y-1", description: "Interactive dashboard developed in Power BI, bringing together Key Performance Indicators in clear and dynamic visualizations. It allows for quick analysis, monitoring of Total Revenue, Accumulated Revenue, and Year-1 Revenue metrics for a fictitious company in real time, and ensures support for data-driven decision making.", link: "https://app.powerbi.com/view?r=eyJrIjoiYTY5MWRjYjYtMjFjNC00ZWU3LWEwMTctMDZiNmRjMzY1ZTAzIiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelKPI.png" },
            { id: 3, title: "Bank Transaction Report", subtitle: "Revenue, Payments, Tax and Profit", description: "Interactive dashboard developed in Power BI, bringing together strategic indicators on Revenue, Payments, Tax and Profits of Brazilian banking institutions in clear and dynamic visualizations. Allows for quick analysis, real-time metric monitoring, and support for data-driven decision making.", link: "https://app.powerbi.com/view?r=eyJrIjoiNmMwN2EzY2UtMWU4Ni00OTYyLWEwZTctMWRjNDYzYTAyZWFkIiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelBanc.png" },
            { id: 4, title: "Product Report", subtitle: "Revenue, Bestselling Products and Revenue by Continent", description: "Interactive dashboard developed in Power BI, bringing together strategic indicators on Revenue and Quantity Sold by year and month, Total Revenue, Bestselling Product Worldwide, Revenue by Brand and Revenue by Continent in clear and dynamic visualizations. Allows for quick analysis, real-time metric tracking and support for data-driven decision making.", link: "https://app.powerbi.com/view?r=eyJrIjoiNzk5MDBlOTYtNTNmMi00ZWM0LTlhZWEtMWE3MTU3OGRjNTI0IiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelVendas.png" },
            { id: 5, title: "Production Report", subtitle: "Total Produced, Total Rejected, Productive Hours, and Downtime", description: "Interactive dashboard developed in Power BI, bringing together strategic indicators on Total Produced, Total Rejected, Productive Hours, Downtime, Quantity Produced per month, % Productivity and % Quantity in clear and dynamic visualizations. Allows for quick analysis, real-time metric tracking, and support for data-driven decision making.", link: "https://app.powerbi.com/view?r=eyJrIjoiYjU0YTkxNGEtZWU0NC00NzQ4LTk5ZDEtODdmZDk4OTkwYjBiIiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelProd.png" },
            { id: 6, title: "Human Resources Report", subtitle: "Total Hires, Active Employees, and Terminations", description: "Interactive dashboard developed in Power BI, bringing together strategic indicators on Total Hires, Active Employees, Terminations, Turnover Rate, Active Employees by Year of Hire, Active Employees by Gender, and Employees by Company Area in clear and dynamic visualizations. It allows for quick analysis, real-time metric tracking, and supports data-driven decision making.", link: "https://app.powerbi.com/view?r=eyJrIjoiNzhiMzAwMWEtM2E0YS00MTcwLWJkOTItOTc0MTFjMDNmM2VmIiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelRH.png" },
            { id: 7, title: "Sales Report", subtitle: "Company Revenue, Company Profit, Total Revenue by Type, Total Profit by Brand.", description: "Interactive dashboard developed in Power BI, bringing together strategic indicators on Company Revenue, Company Profit, Total Revenue by Product Type, and Total Profit by Brand in clear and dynamic visualizations. It allows for quick analysis, real-time metric tracking, and support for data-driven decision making.", link: "https://app.powerbi.com/view?r=eyJrIjoiOWNlMTMwMmYtM2I4YS00ZjY4LWFlZGEtMGE5ZGNjZDEwYzc4IiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelVendas2.png" },
        ],
        "Python": [
            { id: 8, title: "Sales Dashboard with Tkinter and Matplotlib", subtitle: "Data Visualization and Graphical Interface in Python", description: "This project was developed as a practical exercise for creating sales dashboards using the Tkinter library for the graphical interface and Matplotlib for visualizations. The data used is fictitious, with a focus on the visual and interactive construction of the dashboard.", link: "https://github.com/RiquelmoFerreira/Tkinter_Dashboard", image: "img/PythonTkinter.png" },
            { id: 9, title: "Analysis of Wind Turbine Efficiency", subtitle: "Renewable Energy, Data Analysis and Visualization", description: "This project was developed during a practical exercise in Data Analysis with Python, with versions in Portuguese and English. The objective was to evaluate the efficiency of wind turbines by comparing real generation values ​​with the theoretical curve declared by the manufacturer, as well as identifying anomalies within an acceptable variation. The Pandas, Matplotlib, and Seaborn libraries were used in the Jupyter Notebook environment.", link: "https://github.com/RiquelmoFerreira/Wind_Energy_Project", image: "img/PythonVento.png" },
            { id: 10, title: "Analysis of Professional Experience and Salary", subtitle: "Human Resources, Correlation and Statistics", description: "This project was developed during a practical exercise in Data Analysis with Python, available in Portuguese and English. The objective was to investigate the relationship between years of experience and annual employee salary, verifying the existence of a correlation between these variables. The exploratory analysis showed bimodal distributions for both salaries and years of experience, as well as boxplots that highlighted salary ranges and career levels without outliers. Through scatterplots, linear regression, and correlation matrix (Pearson = 0.98), a strong positive linear relationship was confirmed: the greater the experience, the greater the tendency for salary increases.", link: "https://github.com/RiquelmoFerreira/DataAnalysisHuman_Resources_Project", image: "img/PythonExp.png" },
            { id: 11, title: "Analysis of Magalu's Stock Performance (2021 - 2022)", subtitle: "Financial Markets, Time Series and Visualization", description: "This project was developed during a practical exercise in Data Analysis with Python, and is available in Portuguese and English. The objective was to analyze the evolution of Magalu's closing stock price between 2021 and 2022, identifying peaks, fluctuations, and dips during the period. The analysis included line graphs for price evolution, calculation of moving averages (5 and 30 days), and a candlestick chart to better understand upward and downward movements. The study highlighted the stock price peak at the beginning of 2021, followed by a continuous decline until the beginning of 2022.", link: "https://github.com/RiquelmoFerreira/DataAnalysisFinancial_Market", image: "img/PythonMagalu.png" },
            { id: 12, title: "PS4 Game Sales Analysis (2013 - 2018)", subtitle: "Sales, Games and Data Analysis", description: "This project, developed during a practical exercise in Data Analysis with Python, is available in Portuguese and English. The objective was to analyze the number of games sold on the Playstation 4 platform between 2013 and 2018, identifying sales trends by year, genre, and region. The analysis included bar charts, KDE charts, and boxplots to identify sales concentrations and outliers, as well as stacked charts and scatterplots to explore distribution by continent, genre, and publisher. The study showed the most successful years (2015–2017), the presence of outliers such as GTA V in 2014, and highlighted North America as the main sales market.", link: "https://github.com/RiquelmoFerreira/DataAnalysisGame_Sales_PRoject", image: "img/PythonPS.png" },
            { id: 13, title: "Analysis of Unicorn Companies by Country", subtitle: "Startups, Global Market and Innovation", description: "This project was developed during a practical exercise in Data Analysis with Python, and is available in Portuguese and English. The objective was to analyze the number of unicorn companies per country, identifying the sectors with the highest generation of billion-dollar startups, the countries that contribute most to this phenomenon, and the presence of unicorn companies in Brazil. The analysis used bar charts to identify the most productive sectors (Fintech and Internet/Services), treemaps to map the 10 countries with the most unicorns (USA, China, India, UK, Germany, Israel, France, Brazil, Canada, and South Korea), and line graphs to evaluate the countries that generate the most value with these companies. Thirteen Brazilian unicorn companies were identified in the dataset, and differences were observed between the countries that generate the most companies versus those that generate the most value, providing a complete view of the global landscape of high-value startups.", link: "https://github.com/RiquelmoFerreira/DataAnalysisUnicorns", image: "img/PythonUni.png" },
            { id: 14, title: "Analysis of Bitcoin's Closing Price (2017-2022)", subtitle: "Cryptocurrencies, Time Series and Visualization", description: "This project was developed during a practical exercise in Data Analysis with Python, and is available in Portuguese and English. The objective was to analyze the closing price of Bitcoin, its moving averages, and trends between 2017 and 2022, identifying peaks, oscillations, and the explosive growth of the cryptocurrency. The analysis used line graphs to track the evolution of the closing price, highlighting the first peak in 2018 and the maximum peak in 2021, in addition to 5-day moving averages and 30-day closing trends for a better understanding of price movements over the period.", link: "https://github.com/RiquelmoFerreira/DataAnalysisBitcoinProject", image: "img/PythonBit.png" },
            { id: 15, title: "Educational Performance Analysis", subtitle: "Education, Performance and Statistics", description: "This project was developed during a practical exercise in Data Analysis with Python, and is available in Portuguese and English. The objective was to analyze the relationship between parental education level, pre-exam meals, and participation in preparatory courses with student performance in mathematics, reading, and writing. The analysis used boxplot graphs and descriptive statistics to identify trends, showing that students who took preparatory courses had better grades and fewer outliers, and that students whose parents had an education level higher than high school had higher average and median scores on all exams.", link: "https://github.com/RiquelmoFerreira/DataAnalysisEducation_Project", image: "img/PythonEdu.png" },
            { id: 16, title: "Analysis of GDP per capita in Brazil and its states (2013–2016)", subtitle: "Economy, GDP and Visualization", description: "This project was developed during a practical exercise in Data Analysis with Python, and is available in Portuguese and English. The objective was to analyze the evolution of Brazil's GDP per capita and its states between 2013 and 2016, identifying regional and national trends. The analysis used grid line graphs to compare the performance of each state and the country as a whole, showing that Brazil experienced a decline in GDP per capita, most states remained stagnant or in decline, and only Mato Grosso had a significant increase, reflecting its importance in the agricultural and livestock sector.", link: "https://github.com/RiquelmoFerreira/DataAnalysisBrazil_GDP", image: "img/PythonPIB.png" },
            { id: 17, title: "Exploratory Data Analysis of Netflix", subtitle: "Streaming, Popularity and Insights", description: "This project was developed during a practical exercise in Data Analysis with Python, available in Portuguese and English. The objective was to perform an exploratory analysis of films and series that entered Netflix's TOP 10, verifying viewing time and scores, to understand popularity patterns and guide investment decisions in formats and genres. The analysis showed that most titles were exclusive to the platform, identified outliers such as the animated series Cocomelon, which had the longest time in the TOP 10 and the highest score, and revealed, through histograms, that most titles remain in the ranking for a short time, reflecting lower scores.", link: "https://github.com/RiquelmoFerreira/Exploratory_Data_Analysis_Netflix_Top_10", image: "img/PythonNET.png" },
            { id: 18, title: "Analysis of Brazilian Energy Company Stocks (2021–2022)", subtitle: "Financial Markets, Stocks and Investments", description: "This project was developed during a practical exercise in Data Analysis with Python, and is available in Portuguese and English. The objective was to analyze the stock value of Brazilian energy companies between 2021 and 2022, identifying trends and investment opportunities. The analysis used line graphs after adjustments to the dataset, showing the evolution of the closing stock value of Petrobras, AES Brasil, Alupar, Cesp, Cemig, and Aeris Energy, highlighting that Petrobras showed consistent growth and regained the highest market capitalization during the analyzed period.", link: "https://github.com/RiquelmoFerreira/DataAnalysisEnergy_Companies_Projects", image: "img/PythonENE.png" },
            { id: 19, title: "Analysis of Forest Fires in Brazil (1997–2017)", subtitle: "Environment, Sustainability and Visualization", description: "This project, developed during a practical exercise in Data Analysis with Python, is available in Portuguese and English. The objective was to analyze the total number of forest fires in Brazil and its states between 1997 and 2017, identifying temporal and regional patterns. The analysis used line graphs, boxplots, bar graphs, treemaps, and density maps, showing an increase in the number of fires until 2002, a decrease until 2007, and fluctuations until 2017; it highlighted that fires are more frequent from the middle of the year, peaking in August; and it highlighted the most affected states (Mato Grosso, Paraíba, São Paulo, Rio de Janeiro, and Bahia), offering a clear view of the severity of the problem and areas that require greater attention and prevention.", link: "https://github.com/RiquelmoFerreira/DataAnalysisBushfires_in_Brazil", image: "img/PythonFOG.png" },
        ],
        "Excel": [
            { id: 20, title: "Grocery Inventory Control in Excel", subtitle: "Excel, Macros, Advanced Formulas, and Pivot Tables", description: "This project was developed during a practical Excel exercise, from Basic to Advanced, available in Portuguese and English. The objective was to create a complete spreadsheet for controlling a grocery store, demonstrating the use of advanced formulas, macros, and pivot tables. The spreadsheet includes a menu with tabbed navigation, expense control, merchandise registration with insertion and deletion via macro, investment tracking, inventory control with conditional formatting, overall revenue results, weekly sales with graphs, detailed sales log with buttons for data manipulation via macro, weekly analyses using pivot tables, and a calculation and testing tab with VLOOKUP, INDEX, and MATCH to populate the other tables.", link: "https://github.com/RiquelmoFerreira/Grocery_Store_Control_Excel", image: "img/ExcelMerc.png" },
            { id: 21, title: "Sales Dashboard in Excel", subtitle: "Excel, Dashboard and Performance Indicators", description: "This project was developed during a practical Excel dashboard exercise, focusing on creating an interactive panel to analyze the performance of a fictitious e-commerce site. The dashboard features line graphs showing the evolution of sales for products A, B, and C, with total annual sales linked to filters by year (2018, 2019, and 2020), area graphs combined with line graphs to visualize overall performance and total sales per year, and horizontal bar graphs detailing payment options and the number of transactions according to the selected year, allowing for a dynamic and comprehensive analysis of the indicators.", link: "https://github.com/RiquelmoFerreira/Dashboard_de_Vendas_Excel", image: "img/ExcelVendas.png" },
            { id: 22, title: "Movie Dashboard with SQL and Excel", subtitle: "Entertainment, Pricing, and Data Analysis", description: "This project was developed during a practical SQL and Excel exercise, using the Hashtag Programação hashtagmovies database, adapted for SSMS 19, with complementary analyses in Microsoft Excel. The objective was to create a dashboard with average prices by genre and the TOP 10 films with above-average ratings. The analysis used bar charts and treemaps, showing that the highest average price by genre was Art (considering only one production), with Action and Adventure having the highest actual average price; for titles from 2011, the highest average price was in the Mystery and Suspense genre; and the treemap highlighted the 10 films with above-average scores, facilitating data visualization and interpretation.", link: "https://github.com/RiquelmoFerreira/Analise_de_Dados_com_SSMS19", image: "img/ExcelSQLCinema.png" },
            { id: 23, title: "E-commerce Sales Dashboard", subtitle: "SQL, Excel, Performance Indicators and Visualization", description: "This project was developed during a practical SQL and Excel exercise, using a fictitious e-commerce database with complementary analyses in Excel. The objective was to create a sales dashboard highlighting the performance of key indicators. The dashboard presents graphs showing the evolution of revenue and average order value, demonstrating an increase in revenue and a decrease in average order value, the evolution of website visits and sales conversion, a map showing the Brazilian states with the best sales, the top 5 best-selling brands and stores, and the number of website visits per day of the week, highlighting that Monday is the day with the most visits and Sunday the day with the fewest.", link: "https://github.com/RiquelmoFerreira/Excel_PostgreSQL_Sales_Dashboard", image: "img/ExcelSQLVendas.png" },
            { id: 24, title: "E-commerce Customer Profile Dashboard", subtitle: "SQL, Excel, Customer Analytics and Visualization", description: "This project was developed during a practical SQL and Excel exercise, using a fictitious e-commerce database. The objective was to create a dashboard to analyze the main characteristics of customers visiting the website. The dashboard presents graphs showing that most visitors are women, the majority have formal employment (CLT - Brazilian labor law), the predominant age range is between 20 and 40 years old, and the salary range is concentrated between 5,000 and 10,000. Information about viewed vehicles is also displayed, indicating that most are nearly new, aged between 8 and 10 years, in addition to a treemap highlighting the most viewed brands.", link: "https://github.com/RiquelmoFerreira/Excel_PostgreSQL_Customer_Profile", image: "img/ExcelSQLPerfil.png" },
            //{ id: 7, title: "", subtitle: "", description: "", link: "", image: "img/" },
        ],
        "Database": [
            { id: 25, title: "Integration between Python and SQL", subtitle: "Python, SQL, Pyodbc and Jupyter Notebook", description: "This project was developed during a practical Python for Data Analysis exercise and is available in Portuguese and English. The goal was to demonstrate a simple integration between Python and SQL, using the Pyodbc library in Jupyter Notebook to connect to, read, and manipulate data stored in an SQL database within the SSMS 19 environment, allowing for automated and efficient execution of queries and operations.", link: "https://github.com/RiquelmoFerreira/Python_SQL_Integration", image: "img/PythonSQL.png" },
            { id: 26, title: "Movie Dashboard with SQL and Excel", subtitle: "Entertainment, Pricing, and Data Analysis", description: "This project was developed during a practical SQL and Excel exercise, using the Hashtag Programação hashtagmovies database, adapted for SSMS 19, with complementary analyses in Microsoft Excel. The objective was to create a dashboard with average prices by genre and the TOP 10 films with above-average ratings. The analysis used bar charts and treemaps, showing that the highest average price by genre was Art (considering only one production), with Action and Adventure having the highest actual average price; for titles from 2011, the highest average price was in the Mystery and Suspense genre; and the treemap highlighted the 10 films with above-average scores, facilitating data visualization and interpretation.", link: "https://github.com/RiquelmoFerreira/Analise_de_Dados_com_SSMS19", image: "img/ExcelSQLCinema.png" },
            { id: 27, title: "E-commerce Sales Dashboard", subtitle: "SQL, Excel, Performance Indicators and Visualization", description: "This project was developed during a practical SQL and Excel exercise, using a fictitious e-commerce database with complementary analyses in Excel. The objective was to create a sales dashboard highlighting the performance of key indicators. The dashboard presents graphs showing the evolution of revenue and average order value, demonstrating an increase in revenue and a decrease in average order value, the evolution of website visits and sales conversion, a map showing the Brazilian states with the best sales, the top 5 best-selling brands and stores, and the number of website visits per day of the week, highlighting that Monday is the day with the most visits and Sunday the day with the fewest.", link: "https://github.com/RiquelmoFerreira/Excel_PostgreSQL_Sales_Dashboard", image: "img/ExcelSQLVendas.png" },
            { id: 28, title: "E-commerce Customer Profile Dashboard", subtitle: "SQL, Excel, Customer Analytics and Visualization", description: "This project was developed during a practical SQL and Excel exercise, using a fictitious e-commerce database. The objective was to create a dashboard to analyze the main characteristics of customers visiting the website. The dashboard presents graphs showing that most visitors are women, the majority have formal employment (CLT - Brazilian labor law), the predominant age range is between 20 and 40 years old, and the salary range is concentrated between 5,000 and 10,000. Information about viewed vehicles is also displayed, indicating that most are nearly new, aged between 8 and 10 years, in addition to a treemap highlighting the most viewed brands.", link: "https://github.com/RiquelmoFerreira/Excel_PostgreSQL_Customer_Profile", image: "img/ExcelSQLPerfil.png" },
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

