//for get location of user
var x = document.getElementById("loc");
x.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }

  function showPosition(position) {
    x.innerHTML =
      "Latitude: " +
      position.coords.latitude +
      "<br>Longitude: " +
      position.coords.longitude;
    console.log(position.coords.latitude, position.coords.longitude);
    fetch(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${position.coords.latitude}%20%2C${position.coords.longitude}&language=en`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
        "x-rapidapi-key": "9079f6ddbemsha3fe70229d3f47cp108909jsn0077a9ddd1da"
      }
    })
    .then(response => {
      return response.json();
    })
    .then(err => {
      console.log(err.results[0].address)
      document.getElementById("locbox").innerText=err.results[0].address;
    });
  }
});

//for boxes after clicking loc or dish search option

let loc = document.getElementById("loc");
let adrs = document.getElementById("dish");
let arrow = document.getElementById("ar");
let locbox = document.getElementById("locbox");
let ds = document.getElementById("ds");

loc.addEventListener("click", () => {
  arrow.style.transform = "rotate(180deg)";
  locbox.style.display = "block";
});
let c = 0;
arrow.addEventListener("click", () => {
  if (c % 2 === 0) {
    locbox.style.display = "block";
    arrow.style.transform = "rotate(180deg)";
  } else {
    locbox.style.display = "none";
    arrow.style.transform = "rotate(0deg)";
  }
  c = c + 1;
});

adrs.addEventListener("click", () => {
  arrow.style.transform = "rotate(0deg)";
  ds.style.display = "block";
  ds.style.height = "101px";
});

//for render country name

let name = [
  "India",
  "Australia",
  "Brazil",
  "Canada",
  "Chile",
  "Czech Republic",
  "Indonesia",
  "Ireland",
  "Italy",
  "Lebanon",
  "Malaysia",
  "New Zealand",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Singapore",
  "Slovakia",
  "South Africa",
  "Sri Lanka",
  "Turkey",
  "UAE",
  "United Kingdom",
  "USA",
];
let country_html = "";
name.forEach((element) => {
  country_html += `<div class="${element}" id ="${element}"onclick=cname("${element}")><div class="flag"></div> <p>${element}</p></div>`;
});
document.getElementById("country").innerHTML = country_html;
let cn = "";
function cname(e) {
  cn = `<div class=${e}><div class="flag"><p>${e}</p></div></div>`;
  document.getElementById("cname").innerHTML = cn;
  let s = document.getElementsByClassName("selected");
  Array.from(s).forEach((element) => {
    element.classList.remove("selected");
  });
  document.getElementById(e).classList.add("selected");
}
let n = 0;
document.getElementById("cname").addEventListener("click", () => {
  if (n % 2 === 0) {
    document.getElementById("country").style.display = "inline-flex";
    document.getElementById("rbox").style.display = "inline-block";
  } else {
    document.getElementById("country").style.display = "none";
    document.getElementById("rbox").style.display = "none";
  }
  n++;
});
//render language option
let o=0;
document.getElementById("lan").addEventListener("click",()=>{
if (o % 2 === 0) {
  document.getElementById("optn").style.display = "inline-block";
  document.getElementById("rbox2").style.display = "inline-block";
} else {
  document.getElementById("optn").style.display = "none";
  document.getElementById("rbox2").style.display = "none";
}
o++;
})
function changelan(ln) {
  let h=document.getElementById(ln).innerText;
  let s2 = document.getElementsByClassName("selected");
  Array.from(s2).forEach((element) => {
    element.classList.remove("selected");
  });
  document.getElementById(ln).classList.add("selected")
  document.getElementById("sln").innerText=h;
}
//How to hide a div when the user clicks outside of it using js?
document.addEventListener("mouseup", function (e) {
  var container = document.getElementById("country");
  if (!container.contains(e.target)) {
    container.style.display = "none";
    document.getElementById("rbox").style.display = "none";
    document.getElementById("rbox2").style.display = "none";
    locbox.style.display = "none";
    ds.style.display = "none";
    document.getElementById("optn").style.display="none"
  }
});
//change input of radio button
function ci(rb) {
  document.getElementById("box").placeholder=rb;

  
}