# This script satisfies Basic Requirement 1b: Collect and prepare the data.
import csv

csv_file_path = "Artefact/CSVs/new_2019.csv"

with open(csv_file_path, mode='r', encoding='utf-8') as file:
    countries = sorted({row['Country'] for row in csv.DictReader(file)})
    for country in countries:
        print(f'<option value="{country}">{country}</option>')
