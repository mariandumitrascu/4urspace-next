# this file contains commands and information used in this project


# apis for data:

# City
# Vendors
# Mall
# Category Name

# https://4urspace.com/autocomplete?type=vndrsbycity
# https://4urspace.com/autocomplete?type=vndrhdr&q=Houston&t=City
# https://4urspace.com/autocomplete?type=vndrprj&q=Houston&t=City
# https://4urspace.com/autocomplete?type=vndrcatg&q=Houston&t=City

# same, with a diff query:
# https://4urspace.com/autocomplete?type=vndrsbycity
# https://4urspace.com/autocomplete?type=vndrhdr&q=Soho%20House%20New%20York&t=Brand
# https://4urspace.com//autocomplete?type=vndrprj&q=Soho%20House%20New%20York&t=Brand
# https://4urspace.com//autocomplete?type=vndrcatg&q=Soho%20House%20New%20York&t=Brand


# ##############################################################################################
# prompt:
#
I have an api that I call it in order to get a list of cities, this is the url: `https://4urspace.com/autocomplete?type=vndrsbycity`.
The api is returning json data like this:
`
[
  {
    "con": "Albania",
    "cid": "2",
    "cn": "Tirana",
    "cc": "1"
  },
  {
    "con": "Andorra",
    "cid": "5",
    "cn": "Andorra la Vella",
    "cc": "1"
  },
  {
    "con": "Andorra",
    "cid": "5",
    "cn": "Escaldes-Engordany",
    "cc": "1"
  }
]
`
I want you to create a jsx page that fetch this api and display the list of elements, and each property, if exists. Some properties  may not exist.

npx create-next-app next-playground
cd next-playground
npm run dev

# http://localhost:3000/citylist


