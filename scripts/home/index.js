const compliments = [
  "Wow he is super cool.",
  "I'm a better person having known him.",
  "His dog's also real cute",
  "Wow, stands over 6ft tall.",
  "I met him once.  It went ok.",
  "Wait he's the quiet one, right?",
  "I like pancakes",
];

const complimentIndex = Math.floor(Math.random() * 5);

const res = await fetch(
  "https://randomuser.me/api/?nat=us&inc=name,location,picture&results=3"
);
const { results } = await res.json();

const users = results.map((user) => ({
  name: `${user.name.first} ${user.name.last}`,
  address: `${user.location.city}, ${user.location.state}`,
  picture: user.picture.large,
}));

const carouselImages = document.querySelectorAll(".carousel-item img");
const carouselQuotes = document.querySelectorAll(".testimonial-quote");
const carouselNames = document.querySelectorAll(".name");
const carouselLocations = document.querySelectorAll(".location");

// insert images
carouselImages.forEach((img, i) => {
  img.src = users[i].picture;
  img.alt = users[i].name + " portrait";
});

// insert quotes
carouselQuotes.forEach((quote, i) => {
  quote.innerText = '"' + compliments[i + complimentIndex] + '"';
});

// insert names
carouselNames.forEach((name, i) => {
  name.innerText = users[i].name;
});

// insert locations
carouselLocations.forEach((location, i) => {
  location.innerText = users[i].address;
});
