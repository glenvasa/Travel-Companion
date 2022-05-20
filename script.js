// gives you the City Group (City or Neighborhood), Hotel Group, Landmark Group, Transport Group, More suggestions?
// const options = {
//   method: "GET",
//   url: "https://hotels4.p.rapidapi.com/locations/v2/search",
//   params: { query: "boston", locale: "en_US", currency: "USD" },
//   headers: {
//     "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
//     "X-RapidAPI-Key": "e6432cbb9bmsh214a6bc7706df30p105b5fjsnd5530e346af1",
//   },
// };

const destId = 1401516;
// City Group - Boston - Search Results -
//Results - Shows 25 of 1379 hotel results -
//Pagination shows how many pages
//Filters - landmarks - 20 landmards, TD Gardern, Fenway, Faneuil Hall, etc.  - 2 fields (label, value)
//         -accommodationType - B&Bs, Cottages, Hotels, Hostels, etc. (label, value)
//         -facilities - Bar, bathtub in room, casino, kitchen, internet (label, value)
//         -guest rating - min 0, max 10
//         - neghborhooud; 128 listed, Charlestown, South End, West Roxbury, Longwood, etc. (label, value)
//         -themesAndTypes - Beach, Gold, Casino, Romantic
// const destId = 122147 // Hotel Group - Boston Park Plaza
// const destId = 756 // Landmark Group - Boston College - 939 results
// const destId = 1412040 // Transport Group - Airport

// Need destinationId from search endpoint
// const options = {
//   method: "GET",
//   url: "https://hotels4.p.rapidapi.com/properties/list",
//   params: {
//     destinationId: destId,
//     pageNumber: "1",
//     pageSize: "25",
//     checkIn: "2020-01-08",
//     checkOut: "2020-01-15",
//     adults1: "1",
//     sortOrder: "PRICE",
//     locale: "en_US",
//     currency: "USD",
//   },
//   headers: {
//     "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
//     "X-RapidAPI-Key": "e6432cbb9bmsh214a6bc7706df30p105b5fjsnd5530e346af1",
//   },
// };

// const propId = 408156; //Hyatt Braintree
//const propId = 107704 //Comfort Inn Randolph
//const propId = 142994 //DoubleTree by Hilton North Shore
//const propId = 121241 // Comfort Inn Rockland
//
// property details

// const options = {
//   method: "GET",
//   url: "https://hotels4.p.rapidapi.com/properties/get-details",
//   params: {
//     id: propId,
//     checkIn: "2020-01-08",
//     checkOut: "2020-01-15",
//     adults1: "1",
//     currency: "USD",
//     locale: "en_US",
//   },
//   headers: {
//     "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
//     "X-RapidAPI-Key": "e6432cbb9bmsh214a6bc7706df30p105b5fjsnd5530e346af1",
//   },
// };

//hotel photos - need to add size suffix (e.g. 'z') in baseUrl to get photo

const propId = 408156; //Hyatt Braintree
//const propId = 107704 //Comfort Inn Randolph
//const propId = 142994 //DoubleTree by Hilton North Shore
//const propId = 121241 // Comfort Inn Rockland

const options = {
  method: "GET",
  url: "https://hotels4.p.rapidapi.com/properties/get-hotel-photos",
  params: { id: propId },
  headers: {
    "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
    "X-RapidAPI-Key": "e6432cbb9bmsh214a6bc7706df30p105b5fjsnd5530e346af1",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
