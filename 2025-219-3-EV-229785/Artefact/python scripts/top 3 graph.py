import csv
import pygal

def extract_country_data(files, country_name):
    country_data = {}
    columns = set()
    
    for year, file_path in files.items():
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if country_name in row.get('Country', ''):
                    if year not in country_data:
                        country_data[year] = {}
                    for key, value in row.items():
                        if key not in ['Country', 'Year']:
                            columns.add(key)
                            country_data[year][key] = float(value) if value else 0
    
    return dict(sorted(country_data.items())), sorted(columns)

def create_line_graph(data, columns, country_name):
    line_chart = pygal.Line()
    line_chart.title = country_name
    line_chart.x_labels = list(map(str, data.keys()))
    line_chart.x_title = "Years"
    line_chart.y_title = "Values"
    
    for column in columns:
        values = [data[year].get(column, 0) for year in data]
        line_chart.add(column, values)
    
    file_name = f'{country_name.lower()}_graph.svg'
    line_chart.render_to_file(file_name)


files = {
    "2015": 'Artefact/CSVs/new_2015.csv',
    "2016": 'Artefact/CSVs/new_2016.csv',
    "2017": 'Artefact/CSVs/new_2017.csv',
    "2018": 'Artefact/CSVs/new_2018.csv',
    "2019": 'Artefact/CSVs/new_2019.csv'
}

# Extract and create graphs for Denmark, Iceland, and Norway
for country in ['Denmark', 'Iceland', 'Norway']:
    country_data, columns = extract_country_data(files, country)
    create_line_graph(country_data, columns, country)