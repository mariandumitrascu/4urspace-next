
# Data Analysis

## Overview of Data Structure

### Categories Data Sample

- **cid**: Category ID
- **pid**: Product ID
- **lid**: Location ID
- **cgid**: Category Group ID
- **cgname**: Category Group Name

### Cities Data Sample

- **con**: Country
- **cid**: City ID
- **cn**: City Name
- **cc**: Country Code

### Malls Data Sample

- **cid**: Company ID
- **pid**: Product ID
- **lid**: Location ID
- **bid**: Brand ID
- **brand**: Brand Name
- **mid**: Mall ID
- **mall**: Mall Name
- **city**: City
- **area**: Area
- **sc**: State Code

### Vendors Data Sample

- **cid**: Company ID
- **cn**: Company Name
- **pic**: Picture
- **bid**: Business ID
- **bn**: Business Name
- **pc**: Product Count
- **citys**, **malls**, **brands**, **bcatgs**: Various details

Based on this overview, it seems that the data across these files can be linked by identifiers like `cid` (Category ID or Company ID) and `pid` (Product ID), possibly across different cities and locations.

```python
import json

# Load the JSON files
def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# File paths
categories_path = 'temp-data/categories.json'
cities_path = 'temp-data/cities.json'
malls_path = 'temp-data/malls.json'
vendors_path = 'temp-data//data/vendors.json'

# Load data
categories_data = load_json(categories_path)
cities_data = load_json(cities_path)
malls_data = load_json(malls_path)
vendors_data = load_json(vendors_path)

# Display sample data from each file to understand structure
sample_data = {
    "categories": categories_data[:5],  # Show first 5 records
    "cities": cities_data[:5],
    "malls": malls_data[:5],
    "vendors": vendors_data[:5]
}
sample_data


```

--------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------

Alright, let's delve into the analysis. I'll focus on the following relationships based on the available data:

# To analyze Category Distribution Across Cities, we need to link categories to cities via malls or directly through location IDs if applicable

# Convert lists to dictionaries for faster access

cities_dict = {city['cid']: city for city in cities_data}
malls_dict = {mall['lid']: mall for mall in malls_data}

# Prepare a data structure to hold category distribution by city

category_distribution = {}

# Iterate over categories to populate the distribution

for category in categories_data:
    city_id = malls_dict.get(category['lid'], {}).get('city', 'Unknown')  # Get city from mall location ID
    city_name = cities_dict.get(city_id, {}).get('cn', 'Unknown')  # Get city name from city ID

    if city_name not in category_distribution:
        category_distribution[city_name] = {}

    category_name = category['cgname']
    if category_name in category_distribution[city_name]:
        category_distribution[city_name][category_name] += 1
    else:
        category_distribution[city_name][category_name] = 1

# Output the top cities and their category distributions

sorted_category_distribution = {k: v for k, v in sorted(category_distribution.items(), key=lambda item: len(item[1]), reverse=True)}
sorted_category_distribution

```python
# To analyze Category Distribution Across Cities, we need to link categories to cities via malls or directly through location IDs if applicable.

# Convert lists to dictionaries for faster access
cities_dict = {city['cid']: city for city in cities_data}
malls_dict = {mall['lid']: mall for mall in malls_data}

# Prepare a data structure to hold category distribution by city
category_distribution = {}

# Iterate over categories to populate the distribution
for category in categories_data:
    city_id = malls_dict.get(category['lid'], {}).get('city', 'Unknown')  # Get city from mall location ID
    city_name = cities_dict.get(city_id, {}).get('cn', 'Unknown')  # Get city name from city ID

    if city_name not in category_distribution:
        category_distribution[city_name] = {}

    category_name = category['cgname']
    if category_name in category_distribution[city_name]:
        category_distribution[city_name][category_name] += 1
    else:
        category_distribution[city_name][category_name] = 1

# Output the top cities and their category distributions
sorted_category_distribution = {k: v for k, v in sorted(category_distribution.items(), key=lambda item: len(item[1]), reverse=True)}
sorted_category_distribution


```

1. **Category Distribution Across Cities**: I'll check which categories are most prevalent in which cities.
2. **Mall Distribution Across Cities**: Analyze how malls are distributed among different cities and what kind of categories or vendors they host.
3. **Vendor Distribution**: Explore which vendors are present in which cities and malls.

Starting with the first analysis, I'll compute and summarize the category distribution across different cities.

The analysis of category distribution across cities using the current data reveals the following insights:

### Category Distribution by City

- **Unknown City**: The majority of category data is linked to an unknown city, suggesting either missing city IDs in the dataset or improper linkage between malls and cities. Here are the top categories in this unidentified location:
  - **Women's Apparel**: 148 entries
  - **Men's Apparel**: 85 entries
  - **Women's Accessory**: 69 entries
  - **Food & Beverage**: 55 entries
  - **Men's Accessory**: 33 entries
  - **Jewelry & Watches**: 28 entries
  - **Shoes**: 15 entries
  - **Beauty & Spa**: 9 entries
  - **Home & Furnishing**: 9 entries
  - **Convenience Store**: 10 entries

This data indicates a potential issue with the dataset's integrity or a need for further normalization to properly identify the cities associated with each record.

Next, I'll analyze how malls are distributed across different cities and what types of categories or vendors they host. Let's proceed with that analysis.

### Mall Distribution by City

Here's an overview of how malls are distributed across different cities, with a focus on Houston, TX, as it has the most detailed data:

#### Houston, TX

- **The Galleria**: 135 occurrences
- **River Oaks District**: 38 occurrences
- **Memorial City Mall**: 18 occurrences
- **Saks Fifth Avenue Galleria Mall**: 17 occurrences
- **George Bush Intercontinental Airport**: 19 occurrences
- **Willowbrook Mall**: 7 occurrences
- **Baybrook Mall**: 5 occurrences
- **Highland Village**: 6 occurrences
- **Citycentre Plaza**: 4 occurrences
- **River Oaks Shopping Center**: 4 occurrences
- **Almeda Mall**: 4 occurrences
- Other smaller malls with fewer occurrences.

This data points to a significant concentration of malls in the Houston area, indicating a potential hotspot for retail activity. The Galleria and River Oaks District are notably prominent shopping locations.

Finally, let's explore which vendors are present in which cities and malls to see if there's a pattern or a significant presence worth noting. I'll carry out this analysis next.

### Vendor Distribution by City

Here are some of the highlights from the vendor distribution analysis across various cities:

#### New York

- **Architecture & Design**: 9 occurrences
- **General Contractor**: 2 occurrences
- **Millwork Production & Installation**: 2 occurrences
- Several other specialized services each listed once

#### Houston

- **General Contractor**: 2 occurrences
- **Architecture & Design**: 2 occurrences
- Various other single listings for specialized construction and design services

#### Milano, Dallas, and other cities

- Smaller numbers of specific vendors like **Millwork Production & Installation** and roles like **Construction Project Manager** or **Store Planning Director**.

The data reveals a significant presence of architecture, design, and general contracting services in major cities like New York and Houston. These are likely hubs for construction and design due to the concentration of malls and commercial activities.

This analysis could help in understanding the market dynamics and the spread of various service providers across different urban areas. It also points to where more detailed data collection might be necessary to fully capture the distribution and influence of these entities.

If you have any more specific analyses or further questions on this data, let me know!
