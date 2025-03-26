# This script satisfies Basic Requirement 2: Data analysis and visualisation.
import pandas as pd
import pygal
from pygal.style import LightColorizedStyle

files = {
    "2015": 'Artefact/CSVs/new_2015.csv',
    "2016": 'Artefact/CSVs/new_2016.csv',
    "2017": 'Artefact/CSVs/new_2017.csv',
    "2018": 'Artefact/CSVs/new_2018.csv',
    "2019": 'Artefact/CSVs/new_2019.csv'
}

factors = {
    "Economy (GDP per Capita)": "scatter_gdp_happiness.svg",
    "Health (Life Expectancy)": "scatter_life_expectancy_happiness.svg",
    "Freedom": "scatter_freedom_happiness.svg",
    "Generosity": "scatter_generosity_happiness.svg"
}

#  scatter plots for each factor    
for factor, output_file in factors.items():
    scatter_plot = pygal.XY(stroke=False, style=LightColorizedStyle,
                             title=f"{factor} vs. Happiness Score (2015-2019)",
                             x_title=factor, y_title="Happiness Score")
        
    for year, file_path in files.items():
        df = pd.read_csv(file_path) 
        scatter_plot.add(f"{year}", [(row[factor], row["Happiness Score"]) for _, row in df.iterrows()])

    scatter_plot.render_to_file(f"Artefact/CSVs/{output_file}")