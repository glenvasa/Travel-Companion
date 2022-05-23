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

// const destId = 1401516;
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

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

// let destId;

const validate = () => {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  console.log(email);

  // checks for only letters in names
  const regexpName = /^[A-Za-z]+$/;
  const isValidFirstname = regexpName.test(String(firstname).toLowerCase());
  const isValidLastname = regexpName.test(String(lastname).toLowerCase());

  // checks for email pattern
  // anything@anything.anything
  const regexpEmail = /\S+@\S+\.\S+/;
  const isValidEmail = regexpEmail.test(String(email).toLowerCase());

  if (isValidEmail) {
    console.log("valid email");
  } else {
    alert("Please enter a valid email address");
  }

  if (isValidFirstname) {
    console.log("valid first name");
  } else {
    alert("Please enter valid first name");
  }

  if (isValidLastname) {
    console.log("valid last name");
  } else {
    alert("Please enter valid last name");
  }

  if (isValidEmail && isValidFirstname && isValidLastname) {
    location.replace("destination.html");
  }
};

let hotelArray;

const cityData = async (event) => {
  // event.preventDefault()
  console.log("hello");
  const city = document.getElementById("city").value;

  const cityOptions = {
    method: "GET",
    url: "https://hotels4.p.rapidapi.com/locations/v2/search",
    params: { query: city, locale: "en_US", currency: "USD" },
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "e6432cbb9bmsh214a6bc7706df30p105b5fjsnd5530e346af1",
    },
  };

  const cityResults = await axios.request(cityOptions);
  const destId = cityResults.data.suggestions[0].entities[0].destinationId;
  console.log(destId);

  // const locationOptions = {
  //     method: 'GET',
  //     url: 'https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete',
  //     params: {query: city, lang: 'en_US', units: 'km'},
  //     headers: {
  //       'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
  //       'X-RapidAPI-Key': 'e6432cbb9bmsh214a6bc7706df30p105b5fjsnd5530e346af1'
  //     }
  //   };

  //   const cityResults = await axios.request(locationOptions)
  //   console.log(cityResults.data.data.Typeahead_autocomplete)
  //   const destId = cityResults.data.data.Typeahead_autocomplete.results[0].detailsV2.locationId
  //   console.log(destId)

  //   const attractionOptions = {
  //     method: 'GET',
  //     url: 'https://travel-advisor.p.rapidapi.com/attractions/get-details',
  //     params: {location_id: destId, currency: 'USD', lang: 'en_US'},
  //     headers: {
  //       'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
  //       'X-RapidAPI-Key': 'e6432cbb9bmsh214a6bc7706df30p105b5fjsnd5530e346af1'
  //     }
  //   };

  //   const attractionResults = await axios.request(attractionOptions)

  //   console.log(attractionResults.data)

  const hotelOptions = {
    method: "GET",
    url: "https://hotels4.p.rapidapi.com/properties/list",
    params: {
      destinationId: destId,
      pageNumber: "1",
      pageSize: "25",
      checkIn: "2022-01-08",
      checkOut: "2022-01-15",
      adults1: "1",
      sortOrder: "PRICE",
      locale: "en_US",
      currency: "USD",
    },
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "e6432cbb9bmsh214a6bc7706df30p105b5fjsnd5530e346af1",
    },
  };

  const hotelResults = await axios.request(hotelOptions);

  hotelArray = hotelResults.data.data.body.searchResults.results;
  window.localStorage.setItem("hotels", JSON.stringify(hotelArray));
  //   location.replace('details.html')
  //   console.log(hotelArray)
  const resultsButton = document.createElement("a");
  resultsButton.innerText = "See Results";
  resultsButton.setAttribute("href", "details.html");
  const form = document.getElementById("destination_form");
  form.appendChild(resultsButton);
};

const displayResults = (event) => {
  event.preventDefault();
  const results = JSON.parse(window.localStorage.getItem("hotels"));
  console.log(results);

  const container = document.getElementById("result_cards");

  results.map((result) => {
    const card = document.createElement("div");
    card.setAttribute('class', 'hotel_card')
    const name = document.createElement("h3");
    name.setAttribute('class', 'hotel_name')
    name.innerText = result.name;
    card.appendChild(name);
    container.appendChild(card);

    const form = document.getElementById('destination_form')
    form.style.display = 'none'
  });
};
