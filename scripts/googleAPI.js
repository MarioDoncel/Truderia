
// if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition((position) => {
//         localStorage.setItem('latitude', JSON.stringify(position.coords.latitude))
//         localStorage.setItem('longitude', JSON.stringify(position.coords.longitude))
//         }, 
//         (error) => console.log(error), 
//         {
//             enableHighAccuracy:true,
//             timeout: 5000
//         })
// }

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: -22.3586012, lng: -47.392323 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}


// Google Autocomplete

let autocomplete;
let address1Field;
let address2Field;
let postalField;

window.initAutocomplete = () => {
  address1Field = document.querySelector("input[name=street]") ;
  address2Field = document.querySelector("input[name=houseNumber]") ;
  postalField = document.querySelector("input[name=cep]") ;

  let cityBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-22.40119,-47.42764 ),
    new google.maps.LatLng(-22.32880, -47.31846));

  // Create the autocomplete object, restricting the search predictions to
  // addresses in the US and Canada.
  autocomplete = new google.maps.places.Autocomplete(address1Field, {
    componentRestrictions: { country: "br" },
    fields: ["address_components", "geometry"],
    types: ["address"],
    bounds: cityBounds,
  });
  

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

window.fillInAddress = () => {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  let address1 = "";
  let postcode = "";
  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // place.address_components are google.maps.GeocoderAddressComponent objects
  // which are documented at http://goo.gle/3l5i5Mr
  for (const component of place.address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    switch (componentType) {
      case "street_number": {
        address1 = `${component.long_name} ${address1}`;
        break;
      }

      case "route": {
        address1 += component.short_name;
        break;
      }

      case "postal_code": {
        postcode = `${component.long_name}${postcode}`;
        break;
      }

      case "postal_code_suffix": {
        postcode = `${postcode}-${component.long_name}`;
        break;
      }
      case "sublocality_level_1": {
        document.querySelector("input[name=district]").value = `${component.long_name}`;
        localStorage.setItem('client', JSON.stringify(Client.updateDistrict(component.long_name)))
        break;
      }
    }
  }

  address1Field.value = address1;
  localStorage.setItem('client', JSON.stringify(Client.updateStreet(address1)))
  if(postcode) postalField.value = postcode;
  

  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
  address2Field.focus();
  getDeliveryTax()
}
