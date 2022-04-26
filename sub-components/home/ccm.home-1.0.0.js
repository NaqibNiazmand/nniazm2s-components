/**
 * @overview example for a simple ccmjs-based web component that just renders "Hello, World!"
 * @author André Kless <andre.kless@web.de> 2017-2018, 2021
 * @license The MIT License (MIT)
 */
(() => {
    const component = {
        name: 'home',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        config: {
            "helper": ["ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs"],
            "html": ["ccm.load", "./resources/templates_home.mjs"],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
                "translations": {
                    "de": ["ccm.load", "./resources/resources.mjs#de"],
                    "en": ["ccm.load", "./resources/resources.mjs#en"],
                }
            }],
            "text": ["ccm.load", "./resources/resources.mjs#de"],
        },
        Instance: function () {
            /**
             * renders/updates app content in webpage area user is logged in
             * @type {Function}
             */
            const render = () => {
                this.html.render(this.html.mainContent(this), this.element);
            }

            this.start = async () => {
                render()
            };
        }
    };
    let b = "ccm." + component.name + (component.version ? "-" + component.version.join(".") : "") + ".js";
    if (window.ccm && null === window.ccm.files[b]) return window.ccm.files[b] = component;
    (b = window.ccm && window.ccm.components[component.name]) && b.ccm && (component.ccm = b.ccm);
    "string" === typeof component.ccm && (component.ccm = {url: component.ccm});
    let c = (component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/) || [""])[0];
    if (window.ccm && window.ccm[c]) window.ccm[c].component(component); else {
        var a = document.createElement("script");
        document.head.appendChild(a);
        component.ccm.integrity && a.setAttribute("integrity", component.ccm.integrity);
        component.ccm.crossorigin && a.setAttribute("crossorigin", component.ccm.crossorigin);
        a.onload = function () {
            (c = "latest" ? window.ccm : window.ccm[c]).component(component);
            document.head.removeChild(a)
        };
        a.src = component.ccm.url
    }
})();