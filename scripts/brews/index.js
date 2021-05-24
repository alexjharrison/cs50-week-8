navigator.geolocation.getCurrentPosition(success, error);
let latitude = null;
let longitude = null;
let breweries = null;

function error() {
  alert("Position not found");
}

function success(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

document.querySelector("#find-brews-btn").onclick = async function (evt) {
  if (latitude === null) {
    alert("Doesn't have geolocation permission");
    return;
  }
  breweries = await fetchBreweries();
  createCards();
};

function fetchBreweries() {
  return fetch(
    `https://api.openbrewerydb.org/breweries?by_dist=${latitude},${longitude}`
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

function createCards() {
  const section = document.querySelector("#results");
  const el = (classes, node = "div", text = "", attrs = []) => {
    const div = document.createElement(node);
    div.innerText = text;
    classes.split(" ").forEach((classe) => {
      div.classList.add(classe);
    });
    attrs.forEach(([name, value]) => {
      div.setAttribute(name, value);
    });
    return div;
  };

  breweries.forEach((brewery) => {
    const { street, state, postal_code, city } = brewery;
    const address = `${street}, ${city}, ${state} ${postal_code}`;

    const col = el("col");
    const card = el("card h-100");
    const cardBody = el("card-body");
    const header = el("card-title", "h3", brewery.name);
    const type = el("brewery-type", "p", brewery.brewery_type);
    const addressText = el("address-text", "p", address);
    const addressLink = el("address-link", "a", "Google Maps", [
      ["href", "http://maps.google.com/?q=" + brewery.name + " " + address],
      ["target", "_blank"],
    ]);
    const siteLink = el("site-link", "a", brewery.website_url, [
      ["href", brewery.website_url],
      ["target", "_blank"],
    ]);

    section.appendChild(col);
    col.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(header);
    cardBody.appendChild(type);
    cardBody.appendChild(addressText);
    cardBody.appendChild(addressLink);
    cardBody.appendChild(siteLink);
  });
}
