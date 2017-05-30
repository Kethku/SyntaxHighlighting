import * as _ from 'underscore';
import * as $ from 'jquery';
import * as m from 'mithril';
import * as chroma from 'chroma-js';

let percentage = 0.5;

function inputChanged(value: number) {
  percentage = value / 100;
}

let colors: { [index: string]: (percentage: number) => string } = {
  background1: (percentage) => chroma.scale([
    chroma('orange').desaturate(5).darken(4).hex(),
    chroma('orange').desaturate(3).darken(3.5).hex(),
    chroma('008ae5').desaturate(2.5).darken(1).hex(),
    chroma('008ae5').desaturate(2.5).darken(1).hex(),
    chroma('orange').desaturate(3).darken(3.5).hex(),
    chroma('orange').desaturate(5).darken(4).hex(),
  ]).mode('lab')(percentage),
  background2: (percentage) => chroma(colors.background1(percentage)).darken(0.1).hex(),
  foreground1: (percentage) => chroma.scale([
    chroma('008ae5').desaturate(5).brighten().hex(),
    chroma('008ae5').desaturate(3).brighten().hex(),
    chroma('orange').desaturate(2.5).brighten().hex(),
    chroma('008ae5').desaturate(3).brighten().hex(),
    chroma('008ae5').desaturate(5).brighten().hex()
  ])(percentage),
  foreground2: (percentage) => "#FDF6E3",
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
  return chroma.contrast(colors.background1(percentage), colors[color](percentage)).toString().substr(0, 5);
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
    document.body.style.background = colors.background1(percentage);
    document.body.style["font-family"] = "monospace";
    return m("div", [
      createColorDemo("foreground1"),
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
