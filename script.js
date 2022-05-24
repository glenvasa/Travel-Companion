window.addEventListener('load', () => {
    const font = JSON.parse(window.localStorage.getItem("font")); 
    document.body.style.fontFamily = font
})

const setFont = (event) => {
    event.preventDefault()
    console.log('set font')
    const fontSelect = document.getElementById('font_select')
    const value = fontSelect.value
    document.body.style.fontFamily = value
    window.localStorage.setItem("font", JSON.stringify(value));
}
// document.getElementById("font_select").onchange = function () {
//   console.log(this.value);
//   document.body.style.fontFamily = this.value;
// };



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
    window.localStorage.setItem("firstname", JSON.stringify(firstname));
    window.localStorage.setItem("lastname", JSON.stringify(lastname));
    location.replace("destination.html");
  }
};

const injectName = () => {
  const firstname = JSON.parse(window.localStorage.getItem("firstname"));
  const lastname = JSON.parse(window.localStorage.getItem("lastname"));
  const destinationFormHeader = document.getElementById(
    "destination_form_header"
  );
  const fullName = document.createElement("h3");
  fullName.setAttribute("id", "fullName");
  fullName.style.color = "black";
  fullName.style.textShadow = ".5px .5px .5px gray";
  fullName.innerText = `${firstname}, we are searching for your city`;
  destinationFormHeader.before(fullName);
};

let hotelArray;

const cityData = async (event) => {
  // event.preventDefault()
  const loader = document.getElementById("loader");
  loader.style.display = "block";
  injectName();

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
  //   location.replace('results.html')
  //   console.log(hotelArray)
  const resultsButton = document.createElement("a");
  resultsButton.setAttribute("class", "resultsButton");
  resultsButton.style.color = 'navajowhite';
  resultsButton.innerText = "Click Here";
  resultsButton.setAttribute("href", "results.html");
//   const form = document.getElementById("destination_form");

  const resconstainer = document.getElementById('result_container')
  const resultBox = document.createElement('div')
  resultBox.setAttribute('class', 'resultBox')
  resultBox.appendChild(resultsButton)
  resconstainer.appendChild(resultBox)
//   const header = document.getElementById('destination_form_header')
//   const destinput = document.getElementById('destination_form_input')
//   const submit = document.getElementById('destination_form_submit')
  const fullName = document.getElementById("fullName");
  fullName.style.display = "none";

  const destform = document.getElementById('destination_form')
  destform.style.display = 'none'
//   header.style.display = 'none';
//   submit.style.display = 'none'
//   destinput.style.display = 'noned';
  
  loader.style.display = "none";
};

const displayResults = (event) => {
  event.preventDefault();
  const results = JSON.parse(window.localStorage.getItem("hotels"));
  console.log(results);

  const container = document.getElementById("result_cards");

  results.map((result) => {
    const card = document.createElement("div");
    card.setAttribute("class", "hotel_card");
    const name = document.createElement("h3");
    name.setAttribute("class", "hotel_name");
    name.innerText = result.name;

    const streetAddress = document.createElement("p");
    streetAddress.setAttribute("class", "streetAddress");
    streetAddress.innerText = result.address.streetAddress;

    const cityStateZip = document.createElement("p");
    cityStateZip.setAttribute("class", "cityStateZip");
    cityStateZip.innerText = `${result.address.locality}, ${result.address.region} ${result.address.postalCode}`;

    const moreDetailsButton = document.createElement("button");
    moreDetailsButton.innerText = "More Details";
    moreDetailsButton.setAttribute("class", "moreDetailsButton");
    moreDetailsButton.setAttribute("id", "moreDetailsButton");
    moreDetailsButton.setAttribute("hotel", result.id);

    moreDetailsButton.addEventListener("click", () => {
      detailsPage(result.id, result.name);
    });

    card.appendChild(name);
    card.appendChild(streetAddress);
    card.appendChild(cityStateZip);
    card.appendChild(moreDetailsButton);
    container.appendChild(card);

    const form = document.getElementById("destination_form");
    form.style.display = "none";
  });
};

const detailsPage = (id, name) => {
  console.log(id);
  window.localStorage.setItem("hotelId", JSON.stringify(id));
  window.localStorage.setItem("hotelName", JSON.stringify(name));
  location.replace("details.html");
  const header = document.getElementById("detailsHeader");
  header.innerText = name;
};

const displayHotelDetails = async () => {
  const imagesContainer = document.getElementById("images_container"); // to hide images_container when clicking button to direclty view hotel info
  imagesContainer.style.display = "none";
  // const hotelInfoButton = document.getElementById('hotelInfoButton')
  // hotelInfoButton.style.display = 'none';
  //     const soleImagesButton = document.getElementById('sole_images_button')
  //    soleImagesButton.style.display = 'block';
  //     const soleInfoButton = document.getElementById('sole_info_button')
  //    soleInfoButton.style.display = 'none';
  const loader = document.getElementById("loader");
  loader.style.display = "block";
  const hotelId = JSON.parse(window.localStorage.getItem("hotelId"));
  const hotelName = JSON.parse(window.localStorage.getItem("hotelName"));

  const detailOptions = {
    method: "GET",
    url: "https://hotels4.p.rapidapi.com/properties/get-details",
    params: {
      id: hotelId,
      checkIn: "2020-01-08",
      checkOut: "2020-01-15",
      adults1: "1",
      currency: "USD",
      locale: "en_US",
    },
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "e6432cbb9bmsh214a6bc7706df30p105b5fjsnd5530e346af1",
    },
  };

  const detailsBox = document.getElementById("details_box");
  detailsBox.style.display = "none";
  const detailResults = await axios.request(detailOptions);

  console.log(detailResults.data.data.body);

  const price =
    detailResults.data.data.body.propertyDescription.featuredPrice.currentPrice
      .formatted;
  console.log(price);

  const pricing = document.getElementById("pricing");
  const name = document.createElement("h2");
  name.innerText = hotelName;
  name.style.color = "black";
  const specialPrice = document.createElement("h3");
  specialPrice.innerText = `Current Special: ${price}/Night`;
  pricing.appendChild(name);
  pricing.appendChild(specialPrice);

  let amenities = detailResults.data.data.body.amenities[1].listItems;

  const showDetails = document.getElementById("show_details");

  amenities.map((result) => {
    const amenitiesContainer = document.createElement("div");
    amenitiesContainer.setAttribute("class", "amenitiesContainer");
    const heading = document.createElement("h3");
    heading.innerText = result.heading;
    const listItemsContainer = document.createElement("div");

    result.listItems.map((item) => {
      const amen = document.createElement("p");
      amen.innerText = item;
      listItemsContainer.appendChild(amen);
    });

    const amenitiesSection = document.getElementById("amenitiesSection");
    amenitiesContainer.appendChild(heading);
    amenitiesContainer.appendChild(listItemsContainer);
    amenitiesSection.appendChild(amenitiesContainer);
  });

  //Add attractions to the page
  const attractionsTable = document.createElement("table");
  const headingRow = document.createElement("tr");
  const heading = document.createElement("th");
  heading.style.fontSize = "20px";
  heading.style.marginBottom = "10px";
  heading.style.color = 'white'
  //   heading.style.textDecoration = 'underline'
  let attractionsTitle =
    detailResults.data.data.body.overview.overviewSections[1].title;
  heading.innerText = attractionsTitle;
  headingRow.appendChild(heading);
  attractionsTable.appendChild(headingRow);

  let attractions =
    detailResults.data.data.body.overview.overviewSections[1].content;
  //   console.log(attractions)
  //   const contentItemsContainer = document.createElement("div");
  attractions.map((result) => {
    const attractionRow = document.createElement("tr");
    attractionRow.setAttribute("class", "tableRow");
    const attraction = document.createElement("td");
    attraction.innerText = result;
    attractionRow.appendChild(attraction);
    attractionsTable.appendChild(attractionRow);
  });

  // attractionsContainer.appendChild(heading);
  // attractionsContainer.appendChild(contentItemsContainer);
  attractionsTable.style.border = "2px solid black";
  attractionsTable.style.padding = "5px";
  showDetails.appendChild(attractionsTable);

  loader.style.display = "none";
};

const displayHotelImages = async () => {
  //    const soleInfoButton = document.getElementById('sole_info_button')
  //    soleInfoButton.style.display = 'block';
  //    const showDetails = document.getElementById('show_details')
  //    showDetails.style.display = 'none';
  //    const soleImagesButton = document.getElementById('sole_images_button')
  //    soleInfoButton.style.display = 'none';

  const loader = document.getElementById("loader");
  loader.style.display = "block";

  const hotelName = JSON.parse(window.localStorage.getItem("hotelName"));
  const hotelId = JSON.parse(window.localStorage.getItem("hotelId"));

  const photoOptions = {
    method: "GET",
    url: "https://hotels4.p.rapidapi.com/properties/get-hotel-photos",
    params: { id: hotelId },
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "e6432cbb9bmsh214a6bc7706df30p105b5fjsnd5530e346af1",
    },
  };

  const detailsBox = document.getElementById("details_box");
  detailsBox.style.display = "none";

  const photoResults = await axios.request(photoOptions);

  const name = document.createElement("h2");
  name.innerText = hotelName;
  name.style.textAlign = "center";

  const imagesContainer = document.getElementById("images_container");

  imagesContainer.before(name);

  photoResults.data.hotelImages.map((result) => {
    const source = result.baseUrl.replace("{size}", "z");
    const image = new Image(350, 250);
    image.src = source;
    image.style.marginTop = "25px";
    image.style.border = "1px dashed black";
    image.style.boxShadow = "2px 1px 2px black";
    image.style.backgroundColor = "black";
    image.style.borderRadius = "5px";

    imagesContainer.appendChild(image);
    console.log(image.src);
  });

  loader.style.display = "none";
};
