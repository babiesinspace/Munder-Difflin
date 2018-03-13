var demoColorPicker = new iro.ColorPicker("#color-picker-container", {
  width: 400,
  height: 400,
  color: {r: 163, g: 223, b: 255},
  borderWidth: 1,
  borderColor: "#fff",
  css: {
    "#swatch-box": {
      "background-color": "$color"
    }
  }
});