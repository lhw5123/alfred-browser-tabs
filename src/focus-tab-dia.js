#!/usr/bin/env osascript -l JavaScript

function run(args) {
  ObjC.import("stdlib");

  let browser = $.getenv("browser") || "Dia";
  let dia = Application(browser);
  let query = args[0];
  let [windowIndex, profileIndex, tabIndex] = query
    .split(",")
    .map((x) => parseInt(x));

  let win = dia.windows[windowIndex];
  let tab = win.profiles[profileIndex].tabs[tabIndex];
  tab.focus();
  dia.activate();
}
