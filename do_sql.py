

import pandas as pd

# Load the CSV file
file_path = 'temp_data/malls.csv'
data = pd.read_csv(file_path)

# Display the first few rows of the dataframe and the column names to understand its structure
data.head(), data.columns

# put data in a sqllite3 new db
import sqlite3
conn = sqlite3.connect('malls.db')
data.to_sql('malls', conn, if_exists='replace', index=False)

