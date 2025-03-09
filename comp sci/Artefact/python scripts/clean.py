import pandas as pd

file_2015 = "C:\\comp sci\\Artefact\CSVs\\2015.csv"
file_2016 = "C:\\comp sci\\Artefact\CSVs\\2016.csv"
file_2017 = "C:\\comp sci\\Artefact\CSVs\\2017.csv"
file_2018 = "C:\\comp sci\\Artefact\CSVs\\2018.csv"
file_2019 = "C:\\comp sci\\Artefact\CSVs\\2019.csv"

output_2015 = "C:\\comp sci\\Artefact\CSVs\\new_2015.csv"
output_2016 = "C:\\comp sci\\Artefact\CSVs\\new_2016.csv"
output_2017 = "C:\\comp sci\\Artefact\CSVs\\new_2017.csv"
output_2018 = "C:\\comp sci\\Artefact\CSVs\\new_2018.csv"
output_2019 = "C:\\comp sci\\Artefact\CSVs\\new_2019.csv"

# Function to remove specified columns and save the updated file
def remove_columns(input_file, output_file, columns_to_remove):
    df = pd.read_csv(input_file)
    # Remove specified columns if they exist
    df = df.drop(columns=[col for col in columns_to_remove if col in df.columns])
    # Save the updated DataFrame to a new CSV file
    df.to_csv(output_file, index=False)
    return f"Updated file saved to {output_file}."

def process_2017(input_file, output_file):
    df = pd.read_csv(input_file)
    df.rename(columns={"Happiness.Rank": "Happiness Rank", "Happiness.Score": "Happiness Score", "Economy..GDP.per.Capita.": "Economy (GDP per Capita)", "Health..Life.Expectancy.": "Health (Life Expectancy)" }, inplace=True)
    df.drop(columns=["Whisker.high", "Whisker.low", "Trust..Government.Corruption.", "Dystopia.Residual", "Family"], errors='ignore', inplace=True)
    df.to_csv(output_file, index=False)
    return f"Processed file saved to {output_file}."

def process_2018(input_file, output_file):
    df = pd.read_csv(input_file)
    df.rename(columns={"Overall rank": "Happiness Rank", "Country or region": "Country", "Score": "Happiness Score", "GDP per capita": "Economy (GDP per Capita)", "Healthy life expectancy": "Health (Life Expectancy)", "Freedom to make life choices": "Freedom"}, inplace=True)
    df.drop(columns=["Social support", "Perceptions of corruption"], errors='ignore', inplace=True)
    df.to_csv(output_file, index=False)
    return f"Processed file saved to {output_file}."

def process_2019(input_file, output_file):
    df = pd.read_csv(input_file)
    df.rename(columns={"Overall rank": "Happiness Rank", "Country or region": "Country", "Score": "Happiness Score", "GDP per capita": "Economy (GDP per Capita)", "Healthy life expectancy": "Health (Life Expectancy)", "Freedom to make life choices": "Freedom"}, inplace=True)
    df.drop(columns=["Social support", "Perceptions of corruption"], errors='ignore', inplace=True)
    df.to_csv(output_file, index=False)
    return f"Processed file saved to {output_file}."

result_2015 = remove_columns(file_2015, output_2015, ["Region", "Standard Error", "Family", "Dystopia Residual", "Trust (Government Corruption)"])
result_2016 = remove_columns(file_2016, output_2016, ["Region", "Upper Confidence Interval", "Lower Confidence Interval", "Family", "Dystopia Residual", "Trust (Government Corruption)"])
result_2017 = process_2017(file_2017, output_2017)
result_2018 = process_2018(file_2018, output_2018)
result_2019 = process_2019(file_2019, output_2019)  