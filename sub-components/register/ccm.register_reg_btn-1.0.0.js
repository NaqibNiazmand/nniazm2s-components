/**
 * @overview A new sub component. For the registration of new users
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 * @license The MIT License (MIT)
 */
(() => {
    const component = {
        name: 'register_reg_btn',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        config: {
            "css": ["ccm.load",
                [  // serial
                    "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap.min.css",
                    "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-dark.min.css",
                ],
                "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
                {
                    "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css",
                    "context": "head"
                },
            ],
            "helper": ["ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs"],
            "html": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/register/resources/template_register_btn.mjs"],
            // "html": ["ccm.load", "./../register/resources/template_register_btn.mjs"],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
                "translations": {
                    "de": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/register/resources/resources.mjs#de"],
                    "en": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/register/resources/resources.mjs#en"],
                }
            }],
            "text": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/register/resources/resources.mjs#de"],
            // "text": ["ccm.load", "./../register/resources/resources.mjs#de"],
            "user": ["ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js"],
            "hash": ["ccm.load", "https://kaul.inf.h-brs.de/ccmjs/akless-components/modules/md5.mjs"],
            "register_form" : ["ccm.component", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/register/resources/ccm.register_form-1.0.0.js"],
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
                $ = Object.assign({}, this.ccm.helper, this.helper);
                $.use(this.ccm);
            };

            /**
             * contains all event handlers
             * @type {Object.<string,Function>}
             */
            const events = {
                /**
                 * register button control
                 * @type {Function}
                 */
                register_button: async () => {
                    this.ccm.start(this.register_form, {root: document.body});
                },
            }
            /**
             * renders/updates app content in webpage area
             * @type {Function}
             */
            const render = async () => {
                this.html.render(this.html.register_button(this, events), this.element);
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