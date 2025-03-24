import pandas as pd
import pygal

files = {
    "2015": 'Artefact/CSVs/new_2015.csv',
    "2016": 'Artefact/CSVs/new_2016.csv',
    "2017": 'Artefact/CSVs/new_2017.csv',
    "2018": 'Artefact/CSVs/new_2018.csv',
    "2019": 'Artefact/CSVs/new_2019.csv'
}   

# Loop through each year and generate histograms separately
for year, file_path in files.items():
    # Load CSV file
    df = pd.read_csv(file_path)

    # Extract the first- and last-ranked countries
    first_country = df.iloc[0]  # First-ranked country
    last_country = df.iloc[-1]  # Last-ranked country

    # Columns to include in the histogram (excluding 'Happiness Rank')
    columns_to_plot = df.columns[2:]

    # Create the histogram
    hist = pygal.Bar(title=f"Comparison of {first_country['Country']} and {last_country['Country']} ({year})")

    # Add data for each country
    hist.add(first_country['Country'], [first_country[col] for col in columns_to_plot])
    hist.add(last_country['Country'], [last_country[col] for col in columns_to_plot])

    # Set x-axis labels
    hist.x_labels = columns_to_plot 

    # Render histogram to file
    hist.render_to_file(f"Artefact/CSVs/histogram_{year}.svg")