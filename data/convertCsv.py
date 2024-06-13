import pandas as pd

# Load the CSV file
csv_file_path = 'Mobile_Food_Facility_Permit.csv'
food_truck_data = pd.read_csv(csv_file_path)

# Convert to JSON
json_file_path = '/mnt/data/food_truck_data.json'
food_truck_data.to_json(json_file_path, orient='records', lines=True)
