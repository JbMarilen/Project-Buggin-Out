document.getElementById('compareButton').addEventListener('click', function() {
    // Get the selected country from the input field
    const country = document.getElementById('comparisonCountry').value;
    
    // If no country is selected, alert the user and return
    if (!country) {
        alert('Please select a country.');
        return;
    }

    // Define the years and corresponding CSV file paths
    const years = [2015, 2016, 2017, 2018, 2019];
    const files = {
        2015: 'CSVs/new_2015.csv',
        2016: 'CSVs/new_2016.csv',
        2017: 'CSVs/new_2017.csv',
        2018: 'CSVs/new_2018.csv',
        2019: 'CSVs/new_2019.csv'
    };

    // Clear any previous comparison results
    const comparisonResults = document.getElementById('comparisonResults');
    comparisonResults.innerHTML = '';

    // Loop through each year and fetch the corresponding CSV file
    years.forEach(year => {
        fetch(files[year])
            .then(response => response.text())
            .then(csvText => {
                // Split the CSV text into rows and remove the header row
                const rows = csvText.split('\n').slice(1);
                
                // Find the row that contains the selected country
                const countryData = rows.find(row => row.includes(country));
                
                // If country data is found, extract and display the relevant information
                if (countryData) {
                    const columns = countryData.split(',');
                    let happinessRank;
                    
                    // Determine the happiness rank (handle cases where the first column is not a number)
                    if (!isNaN(columns[0])) {
                        happinessRank = columns[0];
                    } else {
                        happinessRank = columns[1];
                    }
                    
                    // Extract other relevant data
                    const happinessScore = columns[2];
                    const economyGDP = columns[3];
                    const healthLifeExpectancy = columns[4];
                    const freedom = columns[5];
                    
                    // Create a new div element to display the results
                    const resultDiv = document.createElement('div');
                    resultDiv.classList.add('result');
                    resultDiv.innerHTML = `<h3>${year}</h3>
                    <p>Happiness Rank: ${happinessRank}</p>
                    <p>Happiness Score: ${happinessScore}</p>
                    <p>Economy (GDP per Capita): ${economyGDP}</p>
                    <p>Health (Life Expectancy): ${healthLifeExpectancy}</p>`;
                    
                    // Append the result div to the comparison results container
                    comparisonResults.appendChild(resultDiv);
                }
            });
    });
});