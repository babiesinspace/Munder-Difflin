let colorBox = new iro.ColorPicker("#color-picker-container", {
  color: {r: 163, g: 223, b: 255},
  borderWidth: 1,
  borderColor: "black",
  css: {
    "#swatch-box": {
      "background-color": "$color"
    },
    ".default": {
      "background-color": "$color" 
    }
  }
});

let randAvailability = ["High - In Stock", "On Order", "Low - Please contact for details"]

//Pick random availability for stock since no data
function isAvailable() {
  return randAvailability[Math.floor(Math.random() * randAvailability.length)];
}

//apply font color based on stock availability (ex: low = red)
function stoplight(availability){
  if (availability === randAvailability[0]) {
    return "green"
  }
  if (availability === randAvailability[1]) {
    return "yellow"
  }
  if (availability === randAvailability[2]) {
    return "red"
  }
}

function shippingEst() {
  let color = window.getComputedStyle(availability, null).getPropertyValue("color")
  let estimate = document.getElementById("ship-time");
  let warning = "There is an availability issue in your cart. Please call for details."
  let caution = "3-5 Weeks. There are items in your cart on order."
  let high = "1-2 Business Days"
  if (color === "rgb(255, 0, 0)") {
    estimate.innerHTML = warning;
  } else if (color === "rgb(255, 255, 0)" && estimate.innerHTML != warning) {
    estimate.innerHTML = caution;
  } else if (estimate != high && estimate.innerHTML != warning) {
    estimate.innerHTML = high;
  } 
}

//check if you need to show similar stock items
function needAlternatives(color) {
  if (color === "red") {
    similarStock.classList.remove("hidden")
  } else {
    similarStock.classList.add("hidden")
  }
}

let colorValues = document.getElementById('color-value')
let availability = document.getElementById('available')
let similarStock = document.getElementById('similar')
let addToBag = document.getElementById('add')
let swatchColor = document.getElementById('swatch-box')
let currentCost = document.getElementById("subtotal")
let cart = document.getElementById("cart")
let cartContainer = document.getElementById("cart-container")

colorBox.on('input:end', function() {

  colorValues.innerHTML = [
    "hex: " + colorBox.color.hexString,
    "rgb: " + colorBox.color.rgbString,
    "hsl: " + colorBox.color.hslString,
  ].join("<br>");

  let inStock = isAvailable();
  availability.innerHTML = inStock;
  let colorCode = stoplight(inStock);
  availability.style.color = colorCode;
  needAlternatives(colorCode);

})

function setPrice(){
  let cartCount = cart.children.length
  let price = cartCount * 5.35
  return price.toFixed(2)
}

function adjustPrice() {
  let cost = setPrice();
  currentCost.innerHTML = cost;
}

function fireAnimation(){
  swatchColor.classList.add("rotateOut")
  setTimeout(function() { swatchColor.classList.remove("rotateOut"); }, 500);
  cart.classList.add("animate");
  cart.classList.add("slideInRight");
  setTimeout(function() { cart.classList.remove("slideInRight"); }, 500);
}

//count the number of divs in parent
//create a new div
//set width with flex-box
//append to parent element
addToBag.addEventListener("click", function(){
  let color = window.getComputedStyle(swatchColor, null).getPropertyValue("background-color");
  let swatch = document.createElement("div");
  swatch.style.background = color;
  swatch.style.flexGrow = "1";
  cart.appendChild(swatch);
  adjustPrice();
  shippingEst();
  fireAnimation();
})

let checkOut = document.getElementById('checkout')

checkOut.addEventListener("click", function(){
  let total = currentCost.innerHTML
  let cartCount = cart.children.length
  alert(`Your order for ${cartCount} swatches, totaling $${currentCost.innerHTML} has been placed!`)
  location.reload()
})
