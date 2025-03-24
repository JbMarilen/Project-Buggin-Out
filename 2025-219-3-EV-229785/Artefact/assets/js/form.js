// Initialize the PouchDB database
let db = new PouchDB('happiness_survey');

// Variables to hold chart instances
let happinessChart, ageChart, factorsChart;

// Call functions to display data, generate charts, and update form count
showData();
generateCharts();
updateFormCount();

// Add event listener for form submission
document.getElementById('happinessPoll').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Get form values
    const country = document.getElementById('country').value;
    const age = document.getElementById('age').value;
    const happiness = document.querySelector('input[name="happiness"]:checked').value;
    const factors = Array.from(document.querySelectorAll('input[name="factors"]:checked')).map(el => el.value);
    const comments = document.getElementById('comments').value;
    const email = document.getElementById('email').value;

    // Save form data to the database
    db.post({
        _id: new Date().toISOString(),
        country: country,
        age: age,
        happiness: happiness,
        factors: factors,
        comments: comments,
        email: email
    }).then(function() {
        console.log('Data saved successfully');
        showData(); // Refresh data display
        document.getElementById('happinessPoll').reset(); // Reset form
        document.getElementById('storedDataTable').scrollIntoView({ behavior: 'smooth' }); // Scroll to data table
    }).catch(function(error) {
        console.log('Error saving data:', error);
    });
});

// Function to display data in a table
function showData() {
    db.allDocs({include_docs: true, descending: true }).then(function(result) {
        const data = result.rows.map(row => row.doc);
        const tableBody = document.getElementById('storedData');
        tableBody.innerHTML = ''; // Clear existing table data

        // Populate table with data
        data.forEach(function(row, index) {
            const newRow = document.createElement('tr');
            if (index === 0) {
                newRow.classList.add('new-data-highlight');
                setTimeout(() => newRow.classList.remove('new-data-highlight'), 2000);
            }
            newRow.innerHTML = `
                <td>${row.country}</td>
                <td>${row.age}</td>
                <td>${row.happiness}</td>
                <td>${Array.isArray(row.factors) ? row.factors.join(', ') : row.factors}</td>
                <td>${row.comments}</td>
                <td>${row.email}</td>
            `;
            tableBody.appendChild(newRow);
        });
        
    }).catch(function(error) {
        console.log('Error fetching data:', error);
    });
}

// Function to generate charts
function generateCharts() {
    db.allDocs({include_docs: true, descending: true }).then(function(result) {
        const data = result.rows.map(row => row.doc);

        // Extract data for charts
        const happinessData = data.map(row => row.happiness);
        const ageData = data.map(row => row.age);
        const factorsData = data.flatMap(row => row.factors);

        // Create pie charts
        createPieChart('happinessPieChart', 'Happiness Distribution', happinessData, happinessChart);
        createPieChart('agePieChart', 'Age Distribution', ageData, ageChart);
        createPieChart('factorsPieChart', 'Factors Distribution', factorsData, factorsChart);
        
    }).catch(function(error) {
        console.log('Error fetching data:', error);
    });
}

// Function to create a pie chart
function createPieChart(chartId, title, data, chartInstance) {
    const ctx = document.getElementById(chartId).getContext('2d');
    const counts = data.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});

    // Destroy existing chart instance if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Create new chart instance
    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(counts),
            datasets: [{
                data: Object.values(counts),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });

    // Update the chart instance variable
    if (chartId === 'happinessPieChart') {
        happinessChart = chartInstance;
    } else if (chartId === 'agePieChart') {
        ageChart = chartInstance;
    } else if (chartId === 'factorsPieChart') {
        factorsChart = chartInstance;
    }
}

// Function to update the form count display
function updateFormCount() {
    db.allDocs().then(function(result) {
        document.getElementById('numForms').innerText = `Number of forms submitted: ${result.total_rows}`;
    }).catch(function(error) {
        console.log('Error fetching form count:', error);
    });
}

// Observe changes in the table and update charts and form count
const observer = new MutationObserver(() => {
    generateCharts();
    updateFormCount();
});

observer.observe(document.getElementById('storedData'), { childList: true });

// Add event listener for reset database button
document.getElementById('resetDatabaseButton').addEventListener('click', function() {
    db.destroy().then(function() {
        console.log('Database reset successfully');
        // Reinitialize the database
        db = new PouchDB('happiness_survey');
        showData();
        generateCharts();
        updateFormCount();
    }).catch(function(error) {
        console.log('Error resetting database:', error);
    });
});