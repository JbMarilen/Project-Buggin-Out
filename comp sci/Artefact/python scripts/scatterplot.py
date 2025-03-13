import pandas as pd
import pygal
from pygal.style import LightColorizedStyle

# List of dataset filenames
years = [2015, 2016, 2017, 2018, 2019]
files = [f"C:\\comp sci\\Artefact\\CSVs\\new_{year}.csv" for year in years]

# Factors to plot against Happiness Score
factors = {
    "Economy (GDP per Capita)": "scatter_gdp_happiness.svg",
    "Health (Life Expectancy)": "scatter_life_expectancy_happiness.svg",
    "Freedom": "scatter_freedom_happiness.svg",
    "Generosity": "scatter_generosity_happiness.svg"
}

# Generate scatter plots for each factor    
for factor, output_file in factors.items():
    scatter_plot = pygal.XY(stroke=False, style=LightColorizedStyle,
                             title=f"{factor} vs. Happiness Score (2015-2019)",
                             x_title=factor, y_title="Happiness Score")
        
    for year, file_path in zip(years, files):
        df = pd.read_csv(file_path)  # Load dataset
        scatter_plot.add(f"{year}", [(row[factor], row["Happiness Score"]) for _, row in df.iterrows()])

    # Render the chart to file
    scatter_plot.render_to_file(f"C:\\comp sci\\Artefact\\SVGs\\{output_file}")
