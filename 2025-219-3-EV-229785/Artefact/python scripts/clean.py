# This script satisfies Basic Requirement 1b: Collect and prepare the data.
import pandas as pd

file_2015 = "Artefact/CSVs/2015.csv"
file_2016 = "Artefact/CSVs/2016.csv"
file_2017 = "Artefact/CSVs/2017.csv"
file_2018 = "Artefact/CSVs/2018.csv"
file_2019 = "Artefact/CSVs/2019.csv"

output_2015 = "Artefact/CSVs/new_2015.csv"
output_2016 = "Artefact/CSVs/new_2016.csv"
output_2017 = "Artefact/CSVs/new_2017.csv"
output_2018 = "Artefact/CSVs/new_2018.csv"
output_2019 = "Artefact/CSVs/new_2019.csv"

# remove columns function
def remove_columns(input_file, output_file, columns_to_remove):
    df = pd.read_csv(input_file) # read csv to dataframe
    df = df.drop(columns=columns_to_remove, errors='ignore') # removes columns from dataframe if it exists
    # saves the updated dataframe to the output file
    df.to_csv(output_file, index=False)

def process_file(input_file, output_file, year):
    df = pd.read_csv(input_file) # read csv to dataframe
    if year == 2017:
        # rename
        df = df.rename(columns={
            "Happiness.Rank": "Happiness Rank", 
            "Happiness.Score": "Happiness Score", 
            "Economy..GDP.per.Capita.": "Economy (GDP per Capita)", 
            "Health..Life.Expectancy.": "Health (Life Expectancy)"
        }) 
        # remove columns
        df= df.drop(columns=["Whisker.high", "Whisker.low", "Trust..Government.Corruption.", "Dystopia.Residual", "Family"], errors='ignore')
    elif year == 2018 or year == 2019:
        # rename
        df = df.rename(columns={
            "Overall rank": "Happiness Rank", 
            "Country or region": "Country", 
            "Score": "Happiness Score", 
            "GDP per capita": "Economy (GDP per Capita)", 
            "Healthy life expectancy": "Health (Life Expectancy)", 
            "Freedom to make life choices": "Freedom"
        })
        df = df.drop(columns=["Social support", "Perceptions of corruption"], errors='ignore') # remove columns
    df.to_csv(output_file, index=False) # save updated dataframe to output file

result_2015 = remove_columns(file_2015, output_2015, ["Region", "Standard Error", "Family", "Dystopia Residual", "Trust (Government Corruption)"])
result_2016 = remove_columns(file_2016, output_2016, ["Region", "Upper Confidence Interval", "Lower Confidence Interval", "Family", "Dystopia Residual", "Trust (Government Corruption)"])
result_2017 = process_file(file_2017, output_2017, 2017)
result_2018 = process_file(file_2018, output_2018, 2018)
result_2019 = process_file(file_2019, output_2019, 2019)