#!/usr/bin/env osascript -l JavaScript

function run() {
  let browser = "Dia";
  if (!Application(browser).running()) {
    return JSON.stringify({
      items: [
        {
          title: `${browser} is not running`,
          subtitle: `Press enter to launch ${browser}`,
        },
      ],
    });
  }

  let dia = Application(browser);
  dia.includeStandardAdditions = true;
  let windowCount = dia.windows.length;
  let items = [];

  for (let w = 0; w < windowCount; w++) {
    let win = dia.windows[w];
    let profiles = win.profiles;
    for (let p = 0; p < profiles.length; p++) {
      let profile = profiles[p];
      let profileName = profile.name();
      let titles = profile.tabs.title();
      let urls = profile.tabs.url();

      for (let t = 0; t < titles.length; t++) {
        let url = urls[t] || "";
        let matchUrl = url.replace(/(^\w+:|^)\/\//, "");
        let title = titles[t] || matchUrl;

        items.push({
          title,
          url,
          subtitle: `[${profileName}] ${url}`,
          windowIndex: w,
          profileIndex: p,
          tabIndex: t,
          quicklookurl: url,
          arg: `${w},${p},${t},${url}`,
          match: `${title} ${profileName} ${decodeURIComponent(matchUrl).replace(
            /[^\w]/g,
            " ",
          )}`,
        });
      }
    }
  }

  return JSON.stringify({ items });
}
