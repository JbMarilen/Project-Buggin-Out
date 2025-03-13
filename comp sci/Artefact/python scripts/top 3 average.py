import pandas as pd
from collections import Counter

def find_top_countries(csv_files):
    country_counts = Counter()
    
    for file in csv_files:
        df = pd.read_csv(file)
        if "Country" in df.columns:
            top_3_countries = df["Country"].head(3).tolist()
            country_counts.update(top_3_countries)
    
    # Get the 3 most common countries appearing in the top 3
    top_3_countries = country_counts.most_common(3)
    return top_3_countries

files = [
    'C:\\comp sci\\Artefact\\CSVs\\new_2015.csv',
    'C:\\comp sci\\Artefact\\CSVs\\new_2016.csv',
    'C:\\comp sci\\Artefact\\CSVs\\new_2017.csv',
    'C:\\comp sci\\Artefact\\CSVs\\new_2018.csv',
    'C:\\comp sci\\Artefact\\CSVs\\new_2019.csv'
]

top_countries = find_top_countries(files)
print("Top 3 countries appearing in the top 3 the most:", top_countries)
