# this file contains commands and information used in this project

# on github
# https://github.com/mariandumitrascu/4urspace-next

# #################################################################################
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

# type of search can be:
# City
# Brand
# Mall

# #################################################################################
# examples of 4urspace original calls:
# https://4urspace.com/search/City/Houston
# https://4urspace.com/search/State/New%20York
# https://4urspace.com/search/Mall/Almeda%20Mall

# #################################################################################
# examples of nextjs calls:
# http://localhost:3000/search/City/Houston
# http://localhost:3000/search/State/New%20York
# http://localhost:3000/search/Mall/Almeda%20Mall

# prjs?: string;
# citys: string[]; DONE
# malls: string[]; DONE
# brands: string[]; DONE
# bcatgs?: string[];

# prjs, citys, malls, brands, bcatgs


# u need to do that in the fetchAllData function

By Type
    Architecture & Design (1)
By City
    Houston Tx (1)
By Mall
    Houston Galleria (1)
By Brand
    Saint Laurent (1)
By Business Category
    Women's Accessory (1)
    Women's Apparel (1)


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
# a category
{'cid': '55', 'pid': '18144', 'lid': '119381', 'cgid': '3', 'cgname': "Women's Apparel"}

category.lid <-----> mall.lid


# You are using Node.js 18.0.0. For Next.js, Node.js version >= v18.17.0 is required. Please update Node.js.
# Check if Node.js version is less than v18.17.0
if [[ "$(node -v)" < "v18.17.0" ]]; then
  # Install Node Version Manager (NVM)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

  # Load NVM
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

  # Install Node.js v18.17.0
  nvm install v18.17.0

  # Use Node.js v18.17.0
  nvm use v18.17.0
fi

Could not read source map for file:///Users/marian.dumitrascu/Library/CloudStorage/Dropbox/work-P/4urspace/4urspace-next-lll/node_modules/next/dist/compiled/%40next/react-refresh-utils/dist/runtime.js: ENOENT: no such file or directory, open '/Users/marian.dumitrascu/Library/CloudStorage/Dropbox/work-P/4urspace/4urspace-next-lll/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/runtime.js.map'
Could not read source map for file:///Users/marian.dumitrascu/Library/CloudStorage/Dropbox/work-P/4urspace/4urspace-next-lll/node_modules/next/dist/compiled/%40next/react-refresh-utils/dist/internal/helpers.js: ENOENT: no such file or directory, open '/Users/marian.dumitrascu/Library/CloudStorage/Dropbox/work-P/4urspace/4urspace-next-lll/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/internal/helpers.js.map'
Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools
Could not read source map for file:///Users/marian.dumitrascu/Library/CloudStorage/Dropbox/work-P/4urspace/4urspace-next-lll/node_modules/next/dist/compiled/%40next/react-refresh-utils/dist/runtime.js: ENOENT: no such file or directory, open '/Users/marian.dumitrascu/Library/CloudStorage/Dropbox/work-P/4urspace/4urspace-next-lll/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/runtime.js.map'
Could not read source map for file:///Users/marian.dumitrascu/Library/CloudStorage/Dropbox/work-P/4urspace/4urspace-next-lll/node_modules/next/dist/compiled/%40next/react-refresh-utils/dist/internal/helpers.js: ENOENT: no such file or directory, open '/Users/marian.dumitrascu/Library/CloudStorage/Dropbox/work-P/4urspace/4urspace-next-lll/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/internal/helpers.js.map'
Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools
WARNING!
Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.
Do not enter or paste code that you do not understand.
Could not read source map for file:///Users/marian.dumitrascu/Library/CloudStorage/Dropbox/work-P/4urspace/4urspace-next-lll/node_modules/next/dist/compiled/%40next/react-refresh-utils/dist/runtime.js: ENOENT: no such file or directory, open '/Users/marian.dumitrascu/Library/CloudStorage/Dropbox/work-P/4urspace/4urspace-next-lll/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/runtime.js.map'
Could not read source map for file:///Users/marian.dumitrascu/Library/CloudStorage/Dropbox/work-P/4urspace/4urspace-next-lll/node_modules/next/dist/compiled/%40next/react-refresh-utils/dist/internal/helpers.js: ENOENT: no such file or directory, open '/Users/marian.dumitrascu/Library/CloudStorage/Dropbox/work-P/4urspace/4urspace-next-lll/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/internal/helpers.js.map'

# ##############################################################################################
# prompt:

