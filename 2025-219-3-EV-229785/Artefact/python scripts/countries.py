import csv

# Path to the CSV file
csv_file_path = "Artefact/CSVs/new_2019.csv"

# Open the CSV file
with open(csv_file_path, mode='r', newline='', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    
    # Extract and sort all countries
    countries = sorted([row['Country'] for row in reader])
    for country in countries:
        print(f'<option value="{country}">{country}</option>')