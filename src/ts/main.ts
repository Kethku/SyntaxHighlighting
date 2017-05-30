import * as _ from 'underscore';
import * as $ from 'jquery';
import * as m from 'mithril';
import * as chroma from 'chroma-js';

let percentage = 0.5;

function inputChanged(value: number) {
  percentage = value / 100;
}

function luminance(time: number) {
  
}

let colors: { [index: string]: (percentage: number) => string } = {
  darkbackground: (percentage) => chroma.scale([
    chroma('orange').desaturate(4).luminance(0.04).hex(),
    chroma('orange').desaturate(3).luminance(0.06).hex(),
    chroma('008ae5').desaturate(2.5).luminance(0.07).hex(),
    chroma('orange').desaturate(3).luminance(0.06).hex(),
    chroma('orange').desaturate(4).luminance(0.04).hex(),
  ]).mode('lab')(percentage),
  lightforeground: (percentage) => chroma.scale([
    chroma('008ae5').desaturate(5).luminance(0.35).hex(),
    chroma('008ae5').desaturate(3).luminance(0.4).hex(),
    chroma('yellow').desaturate(3).luminance(0.45).hex(),
    chroma('008ae5').desaturate(3).luminance(0.4).hex(),
    chroma('008ae5').desaturate(5).luminance(0.35).hex()
  ])(percentage),
  yellow: (percentage) => "yellow",
  orange: (percentage) => "orange",
  red: (percentage) => `red`,
  magenta: (percentage) => "magenta",
  violet: (percentage) => "violet",
  blue: (percentage) => "blue",
  cyan: (percentage) => "cyan",
  green: (percentage) => "green"
}

function calcContrast(color: string) {
  return chroma.contrast(colors.darkbackground(percentage), colors[color](percentage)).toString().substr(0, 5);
}

function createColorDemo(color: string) {
  return m("p", {style: {color: colors[color](percentage)}}, color + ": " + calcContrast(color));
}

var InputSlider = {
  view: () => {
    return m("input", {
      type: "range",
      onchange: m.withAttr("value", inputChanged),
      onmousemove: m.withAttr("value", inputChanged)
    });
  }
}

var DemoText = {
  view: () => {
    document.body.style.background = colors.darkbackground(percentage);
    document.body.style["font-family"] = "monospace";
    return m("div", [
      createColorDemo("lightforeground"),
      createColorDemo("red"),
      createColorDemo("orange"),
      createColorDemo("yellow"),
      createColorDemo("green"),
      createColorDemo("blue"),
      createColorDemo("cyan"),
      createColorDemo("magenta"),
      createColorDemo("violet")
    ]);
  }
}

let count = 28;
var Counter = {
  view: () => {
    return m("p", {onclick: () => count++}, count)
  }
}

var Demo = {
  view: () => {
    return m("div", [
      m(InputSlider),
      m(DemoText)
    ]);
  }
}

$(document).ready(() => {
  m.mount(document.body, Demo);
});
