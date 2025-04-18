document.getElementById('compareButton').addEventListener('click', function() {
    // get the selected country from the input field
    const country = document.getElementById('comparisonCountry').value;
    
    // no country is selected alert user and return
    if (!country) {
        alert('Please select a country.');
        return;
    }

    const years = [2015, 2016, 2017, 2018, 2019];
    const files = {
        2015: 'CSVs/new_2015.csv',
        2016: 'CSVs/new_2016.csv',
        2017: 'CSVs/new_2017.csv',
        2018: 'CSVs/new_2018.csv',
        2019: 'CSVs/new_2019.csv'
    };

    // clear any previous comparison results
    const comparisonResults = document.getElementById('comparisonResults');
    comparisonResults.innerHTML = '';

    let totalHappinessScore = 0;
    let totalEconomyGDP = 0;
    let totalHealthLifeExpectancy = 0;
    let totalHappinessRank = 0;
    let totalFreedom = 0;
    let count = 0;

    // loop through each year and fetch the corresponding CSV file
    years.forEach(year => {
        fetch(files[year])
            .then(response => response.text())
            .then(csvText => {
                // split  CSV text into rows remove the header row
                const rows = csvText.split('\n').slice(1);
                
                // find  row that contains selected country
                const countryData = rows.find(row => row.includes(country));
                
                // if country data is found, extract and display the relevant information
                if (countryData) {
                    const columns = countryData.split(',');
                    let happinessRank;
                    
                    // determine the happiness rank
                    // (handles if first column is not a number)
                    if (!isNaN(columns[0])) {
                        happinessRank = parseInt(columns[0]);
                    } else {
                        happinessRank = parseInt(columns[1]);
                    }
                    
                    // extract data
                    const happinessScore = parseFloat(columns[2]);
                    const economyGDP = parseFloat(columns[3]);
                    const healthLifeExpectancy = parseFloat(columns[4]);
                    const freedom = parseFloat(columns[5]);
                    
                    // add each factor
                    totalHappinessScore += happinessScore;
                    totalEconomyGDP += economyGDP;
                    totalHealthLifeExpectancy += healthLifeExpectancy;
                    totalHappinessRank += happinessRank;
                    totalFreedom += freedom; 
                    count++;
                    
                    //new div to display the results
                    const resultDiv = document.createElement('div');
                    resultDiv.classList.add('result');
                    resultDiv.innerHTML = `<h3>${year}</h3>
                    <p>Happiness Rank: ${happinessRank}</p>
                    <p>Happiness Score: ${happinessScore}</p>
                    <p>Economy (GDP per Capita): ${economyGDP}</p>
                    <p>Health (Life Expectancy): ${healthLifeExpectancy}</p>
                    <p>Freedom: ${freedom}</p>`;
                    
                    // append the div to the comparison results container
                    comparisonResults.appendChild(resultDiv);
                }
            })
            .then(() => {
                // after all years, calculate the average scores and rank
                if (count === years.length) {
                    const averageHappinessScore = totalHappinessScore / count;
                    const averageEconomyGDP = totalEconomyGDP / count;
                    const averageHealthLifeExpectancy = totalHealthLifeExpectancy / count;
                    const averageHappinessRank = totalHappinessRank / count;
                    const averageFreedom = totalFreedom / count;
                    let happinessCategory, economyCategory, healthCategory, freedomCategory;
                    
                    if (averageHappinessScore >= 6) {
                        happinessCategory = 'Happy Country';
                    } else if (averageHappinessScore >= 4) {
                        happinessCategory = 'Average-Happy Country';
                    } else {
                        happinessCategory = 'Unhappy Country';
                    }
        
                    if (averageEconomyGDP >= 1.0) {
                        economyCategory = 'Good (Country has a strong economy)';
                    } else if (averageEconomyGDP >= 0.5) {
                        economyCategory = 'Average (Country has room for economic growth)';
                    } else {
                        economyCategory = 'Poor (Country should heavily focus on economy)';
                    }
                    
                    if (averageHealthLifeExpectancy >= 70) {
                        healthCategory = 'Good (Country has a high life expectancy)';
                    } else if (averageHealthLifeExpectancy >= 60) {
                        healthCategory = 'Average (Country has room to improve life expectancy)';
                    } else {
                        healthCategory = 'Bad (Country should focus on improving life expectancy)';
                    }

                    if (averageFreedom >= 0.7) {
                        freedomCategory = 'Good (Country has a high freedom)';
                    } else if (averageFreedom >= 0.5) {
                        freedomCategory = 'Average (Country has room to improve freedom)';
                    } else {
                        freedomCategory = 'Bad (Country should focus on improving freedom)';
                    }
                    
                    // display the average scores, rank, and categories
                    const averageDiv = document.createElement('div');
                    averageDiv.classList.add('average-result');
                    averageDiv.innerHTML = `<h3>Average Scores</h3>
                    <p><b>Average Happiness Rank:</b> ${averageHappinessRank.toFixed(2)}</p> <!-- Add this line to display the average rank -->
                    <p><b>Average Happiness Score:</b> ${averageHappinessScore.toFixed(2)} <i>${happinessCategory}</i></p>
                    <p><b>Average Economy (GDP per Capita):</b> ${averageEconomyGDP.toFixed(2)} <i>${economyCategory}</i></p>
                    <p><b>Average Health (Life Expectancy):</b> ${averageHealthLifeExpectancy.toFixed(2)} <i> ${healthCategory} </i> </p>
                    <p><b>Average Freedom:</b> ${averageFreedom.toFixed(2)} <i> ${freedomCategory} </i> </p>`;
                    comparisonResults.appendChild(averageDiv);
                }
            });
    });
});