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
# ############################################################################################################################


I need to do the same with a forth api for categorylist. but this api require two parameters.
Here is how it looks:
`
https://4urspace.com/autocomplete?type=vndrcatg&q={vendor_name}&t={search_type}
`

An example of the call with vendor_name=Houston and search_type=Brand looks like this:
`https://4urspace.com/autocomplete?type=vndrcatg&q=Houston&t=City`

Data returned by the api looks like this:
`[
  {
    "cid": "32",
    "pid": "230",
    "lid": "20263",
    "cgid": "3",
    "cgname": "Women's Apparel"
  },
  {
    "cid": "32",
    "pid": "230",
    "lid": "20263",
    "cgid": "4",
    "cgname": "Women's Accessory"
  }
  ]` But some properties may not exist. And I want to display all properties in the output page.

So, i want the same functionality as with citylist, considering that we need an api proxy the same as in your previous answer. The parameters can be hard code in this instance like this:

vendor_name='Houston';
search_type='City'

# http://localhost:3000/malllist
# https://github.com/mariandumitrascu/4urspace-next

Parameters that are now hardcoded, i want to replace them with url parameters. They will be specified in the url.
Please modify the last response to consider that vendor_name and search_type may be specified in the url. If they are not in the url, then fallback on the hardcoded values.

# http://localhost:3000/categorylist?vendor_name=Houston&search_type=City
