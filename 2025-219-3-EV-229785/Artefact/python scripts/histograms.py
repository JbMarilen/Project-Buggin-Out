# This script satisfies Basic Requirement 2: Data analysis and visualisation.
import pandas as pd
import pygal

files = {
    "2015": 'Artefact/CSVs/new_2015.csv',
    "2016": 'Artefact/CSVs/new_2016.csv',
    "2017": 'Artefact/CSVs/new_2017.csv',
    "2018": 'Artefact/CSVs/new_2018.csv',
    "2019": 'Artefact/CSVs/new_2019.csv'
}   

# loop through each year generate histograms
for year, file_path in files.items():
    df = pd.read_csv(file_path)

    first_country = df.iloc[0]  # first-ranked country
    last_country = df.iloc[-1]  # last-ranked country

    # columns to plot in the histogram (excluding 'Happiness Rank')
    columns_to_plot = df.columns[2:]

    # creates histograms
    hist = pygal.Bar(title=f"Comparison of {first_country['Country']} and {last_country['Country']} ({year})")

    # adds data 
    hist.add(first_country['Country'], [first_country[col] for col in columns_to_plot])
    hist.add(last_country['Country'], [last_country[col] for col in columns_to_plot])

    # x axis labels
    hist.x_labels = columns_to_plot 

    hist.render_to_file(f"Artefact/CSVs/histogram_{year}.svg")