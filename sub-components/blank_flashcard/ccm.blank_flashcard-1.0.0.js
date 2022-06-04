/**
 * @overview A new sub component. To represent the flashcard for play training stack.
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 * @license The MIT License (MIT)
 */
(() => {
    const component = {
        name: "blank_flashcard",
        version: [1, 0, 0],
        ccm: "https://ccmjs.github.io/ccm/versions/ccm-27.3.1.js",
        config: {
            css: [
                "ccm.load",
                "https://naqibniazmand.github.io/nniazm2s-components/sub-components/blank_flashcard/styles.css",
                // "./../sub-components/blank_flashcard/styles.css"
                // "./../blank_flashcard/styles.css"
                // "./styles.css"
            ],
            lang: [
                "ccm.start",
                "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.js",
                {
                    translations: {
                        // "de": ["ccm.load", "./resources.mjs#de"],
                        de: ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/flashcard/resources.mjs#de"],
                        // "en": ["ccm.load", "./resources.mjs#en"],
                        en: ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/flashcard/resources.mjs#en"],
                    },
                },
            ],
            // "text": ["ccm.load", "./resources.mjs#de"],
            text: ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/flashcard/resources.mjs#de"],
            helper: [
                "ccm.load",
                "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs",
            ],
            template: [
                "ccm.load",
                "https://naqibniazmand.github.io/nniazm2s-components/sub-components/blank_flashcard/templates_blank_flashcard.mjs",
            ],
            // "template": ["ccm.load", "./../sub-components/blank_flashcard/templates_blank_flashcard.mjs"],
            // "template": ["ccm.load", "./templates_blank_flashcard.mjs"],
            flashcardObject: {
                id: "0",
                topic: "topic",
                name: "Name",
                stack: "stack private",
                description: "default description",
                translation: "default translation",
            },
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
             * renders/updates app content in webpage area
             * @param {Object} flashcardObject - flashcardObject parameter
             * @type {Function}
             */
            const render = () => {
                this.template.render(
                    this.template.mainContent(this, this.flashcardObject),
                    this.element
                );
            };

            this.start = async () => {
                render();
                this.lang.translate();
            };
        },
    };
    let b =
        "ccm." +
        component.name +
        (component.version ? "-" + component.version.join(".") : "") +
        ".js";
    if (window.ccm && null === window.ccm.files[b])
        return (window.ccm.files[b] = component);
    (b = window.ccm && window.ccm.components[component.name]) &&
    b.ccm &&
    (component.ccm = b.ccm);
    "string" === typeof component.ccm && (component.ccm = { url: component.ccm });
    let c = (component.ccm.url.match(
        /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/
    ) || [""])[0];
    if (window.ccm && window.ccm[c]) window.ccm[c].component(component);
    else {
        var a = document.createElement("script");
        document.head.appendChild(a);
        component.ccm.integrity &&
        a.setAttribute("integrity", component.ccm.integrity);
        component.ccm.crossorigin &&
        a.setAttribute("crossorigin", component.ccm.crossorigin);
        a.onload = function () {
            (c = "latest" ? window.ccm : window.ccm[c]).component(component);
            document.head.removeChild(a);
        };
        a.src = component.ccm.url;
    }
})();
