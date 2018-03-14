let colorBox = new iro.ColorPicker("#color-picker-container", {
  width: 350,
  height: 400,
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

colorBox.on('color:change', function(color, changes) {

  colorValues.innerHTML = [
    "hex: " + color.hexString,
    "rgb: " + color.rgbString,
    "hsl: " + color.hslString,
  ].join("<br>");

  let inStock = isAvailable();
  availability.innerHTML = inStock;
  let colorCode = stoplight(inStock);
  availability.style.color = colorCode;
  needAlternatives(colorCode);

})
