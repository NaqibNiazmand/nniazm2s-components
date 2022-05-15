/**
 * @overview A new sub component. For the rendering of the start or home page
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 * @license The MIT License (MIT)
 */
(() => {
    const component = {
        name: 'home',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        config: {
            "helper": ["ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs"],
            "template": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/home/resources/templates_home.mjs"],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
                "translations": {
                    "de": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/home/resources/resources.mjs#de"],
                    "en": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/home/resources/resources.mjs#en"],
                }
            }],
            "text": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/home/resources/resources.mjs#de"],
            "register_reg_btn" : ["ccm.component", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/register/ccm.register_reg_btn-1.0.0.js"],
            // "register_reg_btn" : ["ccm.component", "./../register/ccm.register_reg_btn-1.0.0.js"],

        },
        Instance: function () {
            /**
             * shortcut to help functions
             * @type {Object.<string,Function>}
             */
            let $;
            const self = this;

            /**
             * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
             * @returns {Promise<void>}
             */
            this.init = async () => {
                // set shortcut to help functions
                $ = Object.assign({}, this.ccm.helper, this.helper); $.use(this.ccm);
            };

            /**
             * renders/updates app content in webpage area
             * @type {Function}
             */
            const render = () => {
                this.template.render(this.template.mainContent(this), this.element);
            }

            this.start = async () => {
                render()
                this.register_reg_btn && this.register_reg_btn.start( { root: this.element.querySelector('#user_registration') } );

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