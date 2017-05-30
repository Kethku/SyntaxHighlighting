import * as _ from 'underscore';
import * as $ from 'jquery';
import * as m from 'mithril';
import * as chroma from 'chroma-js';

let percentage = 0.5;

function inputChanged(value: number) {
  percentage = value / 100;
}

let colors: { [index: string]: (percentage: number) => string } = {
  background1: (percentage) => chroma.scale(
    ['black', 'orange', 'yellow', 'cyan', 'cyan', 'yellow', 'orange', 'black']
      .map((c) => chroma(c).desaturate(4).luminance(0.5).hex())
  )(percentage),
  background2: (percentage) => "#073642",
  foreground1: (percentage) => "#EEE8D5",
  foreground2: (percentage) => "#FDF6E3",
  yellow: (percentage) => "#B58900",
  orange: (percentage) => "#CB4B16",
  red: (percentage) => `rgb(0, 0, ${percentage * 255})`,
  magenta: (percentage) => "#D33682",
  violet: (percentage) => "#6C71C4",
  blue: (percentage) => "#268bd2",
  cyan: (percentage) => "2AA198",
  green: (percentage) => "859900"
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
      m("p", [
        m("span", {style: {color: colors.red(percentage)}}, "red"), " ",
        m("span", {style: {color: colors.orange(percentage)}}, "orange"), " ",
        m("span", {style: {color: colors.yellow(percentage)}}, "yellow"), " ",
        m("span", {style: {color: colors.green(percentage)}}, "green"), " ",
        m("span", {style: {color: colors.blue(percentage)}}, "blue"), " ",
        m("span", {style: {color: colors.cyan(percentage)}}, "cyan"), " ",
        m("span", {style: {color: colors.magenta(percentage)}}, "magenta"), " ",
        m("span", {style: {color: colors.violet(percentage)}}, "violet")
      ]),
      m("p", {style: {color: colors.foreground1(percentage)}},
        "This is demo text for the forground color.")
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
