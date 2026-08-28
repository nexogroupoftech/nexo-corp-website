(function () {
  "use strict";

  var defaults = {
    enabled: true,
    client: "ca-pub-672038811150334",
    slots: {}
  };
  var config = window.NEXOCORP_ADSENSE_CONFIG =
    Object.assign({}, defaults, window.NEXOCORP_ADSENSE_CONFIG || {});
  config.slots = Object.assign({}, config.slots || {});

  var placements = [
    { name: "after-products", selector: "#products", position: "afterend" },
    { name: "after-founder", selector: "#founder", position: "afterend" }
  ];

  function addStyles() {
    if (document.getElementById("nexo-adsense-styles")) return;
    var style = document.createElement("style");
    style.id = "nexo-adsense-styles";
    style.textContent =
      ".nexo-adsense{width:100%;max-width:100%;min-width:0;overflow:hidden;margin:32px 0}" +
      ".nexo-adsense ins{display:block;max-width:100%}";
    document.head.appendChild(style);
  }

  function create(placementName, slotId) {
    if (!config.enabled || !slotId) return null;

    var container = document.createElement("div");
    container.className = "nexo-adsense";
    container.dataset.adsensePlacement = placementName;

    var ad = document.createElement("ins");
    ad.className = "adsbygoogle";
    ad.style.display = "block";
    ad.setAttribute("data-ad-client", config.client);
    ad.setAttribute("data-ad-slot", slotId);
    ad.setAttribute("data-ad-format", "auto");
    ad.setAttribute("data-full-width-responsive", "true");
    container.appendChild(ad);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      // Ad blockers and unapproved slots may prevent a fill; leave the layout intact.
    }

    return container;
  }

  function mount(placement) {
    var slotId = config.slots[placement.name];
    var anchor = document.querySelector(placement.selector);
    if (!slotId || !anchor || document.querySelector('[data-adsense-placement="' + placement.name + '"]')) {
      return;
    }

    var ad = create(placement.name, slotId);
    if (ad) anchor.insertAdjacentElement(placement.position, ad);
  }

  function mountAll() {
    if (!config.enabled) return;
    addStyles();
    placements.forEach(mount);
  }

  window.NexoCorpAdSense = {
    config: config,
    create: create,
    mount: mount,
    mountAll: mountAll
  };

  window.addEventListener("load", mountAll);
}());
