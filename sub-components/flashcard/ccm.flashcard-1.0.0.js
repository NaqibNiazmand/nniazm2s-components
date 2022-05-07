/**
 * @overview A new sub component. To represent the flashcard.
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 * @license The MIT License (MIT)
 */
(() => {
    const component = {
        name: 'flashcard',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.js',
        config: {
            "css": ["ccm.load",
                "./../sub-components/flashcard/styles.css"
                // "./styles.css"
            ],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.js", {
                "translations": {
                    // "de": ["ccm.load", "./resources.mjs#de"],
                    "de": ["ccm.load", "./../sub-components/flashcard/resources.mjs#de"],
                    // "en": ["ccm.load", "./resources.mjs#en"],
                    "en": ["ccm.load", "./../sub-components/flashcard/resources.mjs#en"],
                }
            }],
            // "text": ["ccm.load", "./resources.mjs#de"],
            "text": ["ccm.load", "./../sub-components/flashcard/resources.mjs#de"],
            "helper": ["ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs"],
            "template": ["ccm.load", "./../sub-components/flashcard/tamplates_flashcard.mjs"],
            // "template": ["ccm.load", "./tamplates_flashcard.mjs"],
            "flashcardObject" : {"id" : "stack_private_0", "topic" : "topic", "name": "Name", "stack": "stack_private" ,"description":"default  description", "translation": "default translation"},
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
                 * flashcard add button control
                 *
                 * @type {Function}
                 */
                flashcard_add_button: async () => {
                    console.log("flashcard_add_button clicked, but not implanted yet")
                    console.log("flashcardObject", this.flashcardObject)
                },
            }

            /**
             * renders/updates app content in webpage area
             * @param {Object} flashcardObject - flashcardObject parameter
             * @type {Function}
             */
            const render = () => {
                this.template.render(this.template.mainContent(this, events, this.flashcardObject), this.element);
            }

            this.start = async () => {
                // var flashcardObject = new Object();
                // flashcardObject.id = 'stack_private_0';
                // flashcardObject.topic = 'Deutsch';
                // flashcardObject.name = 'Schule';
                // flashcardObject.stack = 'stack_private';
                // flashcardObject.description = 'Schule';
                // flashcardObject.translation = 'School';
                // this.flashcardObject = flashcardObject
                 render()
                this.lang.translate();
                this.lang && $.append(this.element.querySelector('#flashcard_lang'), this.lang.root);
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