import pandas as pd
import pygal
from pygal.style import DefaultStyle

files = {
    "2015": 'C:\\comp sci\\Artefact\\CSVs\\new_2015.csv',
    "2016": 'C:\\comp sci\\Artefact\\CSVs\\new_2016.csv',
    "2017": 'C:\\comp sci\\Artefact\\CSVs\\new_2017.csv',
    "2018": 'C:\\comp sci\\Artefact\\CSVs\\new_2018.csv',
    "2019": 'C:\\comp sci\\Artefact\\CSVs\\new_2019.csv'
}

# Loop through each year and generate separate charts
for year, file_path in files.items():
    # Load CSV file
    df = pd.read_csv(file_path)

    # Get top 10 happiest countries
    top_10 = df.sort_values(by="Happiness Rank").head(10)

    # Create the bar chart
    rank_chart = pygal.HorizontalBar(
        print_values=True, 
        style=DefaultStyle(
            value_font_family='googlefont:Raleway', 
            value_font_size=30
        )
    )
    rank_chart.title = f"Happiness Ranking of Top 10 Countries for {year} (1st, 2nd, 3rd, etc.)"

    # Add data for each country
    for _, row in top_10.iterrows():
        rank_chart.add(row["Country"], row["Happiness Rank"])

    # Save the chart
    rank_chart.render_to_file(f"C:\\comp sci\\Artefact\\SVGs\\happiness_leaderboard_{year}.svg")