let colorBox = new iro.ColorPicker("#color-picker-container", {
  width: 400,
  height: 400,
  color: {r: 163, g: 223, b: 255},
  borderWidth: 1,
  borderColor: "#fff",
  css: {
    "#swatch-box": {
      "background-color": "$color"
    },
    ".default": {
      "background-color": "$color" 
    }
  }
});

let colorValues = document.getElementById('color-value')

colorBox.on('color:change', function(color, changes) {
//  console.log(color.hexString);
  //check the HSV (opacity scroll?) value too
  // if (changes.h) {
  //   console.log(color.hsv);
  // }
colorValues.innerHTML = [
    "hex: " + color.hexString,
    "rgb: " + color.rgbString,
    "hsl: " + color.hslString,
  ].join("<br>");
})
