// initialize the database
let db = new PouchDB('happiness_survey');

// variable chart instances for Chart.js pie charts
let happinessChart, ageChart, factorsChart;

showData();
generateCharts();
updateFormCount();

// listener for form submission (so page doesnt reload)
document.getElementById('happinessPoll').addEventListener('submit', function(event) {
    event.preventDefault(); // prevents
    
    //  form values
    const country = document.getElementById('country').value;
    const age = document.getElementById('age').value;
    const happiness = document.querySelector('input[name="happiness"]:checked').value;
    const factors = Array.from(document.querySelectorAll('input[name="factors"]:checked')).map(el => el.value);
    const comments = document.getElementById('comments').value;
    const email = document.getElementById('email').value;

    // save form data to database
    db.post({
        _id: new Date().toISOString(), // sorted by time
        country: country,
        age: age,
        happiness: happiness,
        factors: factors,
        comments: comments,
        email: email
    }).then(function() {
        console.log('Data saved successfully');
        showData(); // refresh data display
        document.getElementById('happinessPoll').reset(); // reset form
        document.getElementById('storedDataTable').scrollIntoView({ behavior: 'smooth' }); // scroll to data table
    }).catch(function(error) {
        console.log('Error saving data:', error);
    });
});

// display data in a table
function showData() {
    db.allDocs({include_docs: true, descending: true }).then(function(result) {
        const data = result.rows.map(row => row.doc);
        const tableBody = document.getElementById('storedData');
        tableBody.innerHTML = ''; // clear existing table data

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

// generate charts
function generateCharts() {
    db.allDocs({include_docs: true, descending: true }).then(function(result) {
        const data = result.rows.map(row => row.doc);

        // extract data for charts
        const happinessData = data.map(row => row.happiness);
        const ageData = data.map(row => row.age);
        const factorsData = data.flatMap(row => row.factors);

        // create pie charts
        createPieChart('happinessPieChart', 'Happiness Distribution', happinessData, happinessChart);
        createPieChart('agePieChart', 'Age Distribution', ageData, ageChart);
        createPieChart('factorsPieChart', 'Factors Distribution', factorsData, factorsChart);
        
    }).catch(function(error) {
        console.log('Error fetching data:', error);
    });
}

// function to create a pie chart
function createPieChart(chartId, title, data, chartInstance) {
    const ctx = document.getElementById(chartId).getContext('2d');
    const counts = data.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});

    // if existsing chart instance exists, deletes
    if (chartInstance) {
        chartInstance.destroy();
    }

    // new chart instance
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

    // update chart instance variable
    if (chartId === 'happinessPieChart') {
        happinessChart = chartInstance;
    } else if (chartId === 'agePieChart') {
        ageChart = chartInstance;
    } else if (chartId === 'factorsPieChart') {
        factorsChart = chartInstance;
    }
}

//observe changes in the table and update charts and form count
const observer = new MutationObserver(() => {
    generateCharts();
    updateFormCount();
});

observer.observe(document.getElementById('storedData'), { childList: true });