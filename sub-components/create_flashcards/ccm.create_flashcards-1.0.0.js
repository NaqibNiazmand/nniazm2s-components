/**
 * @overview A new sub component. For the creation of new flashcards.
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 * @license The MIT License (MIT)
 */
(() => {
    const component = {
        name: 'create_flashcards',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.js',
        config: {
            "css": ["ccm.load",
                "./../sub-components/create_flashcards/style.css"
                // "./style.css"
            ],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.js", {
                "translations": {
                    // "de": ["ccm.load", "./resources.mjs#de"],
                    "de": ["ccm.load", "./../sub-components/create_flashcards/resources.mjs#de"],
                    // "en": ["ccm.load", "./resources.mjs#en"],
                    "en": ["ccm.load", "./../sub-components/create_flashcards/resources.mjs#en"],
                }
            }],
            // "text": ["ccm.load", "./resources.mjs#de"],
            "text": ["ccm.load", "./../sub-components/create_flashcards/resources.mjs#de"],
            "helper": ["ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs"],
            "template": ["ccm.load", "./../sub-components/create_flashcards/tamplates_create_flashcards.mjs"],
            // "template": ["ccm.load", "./tamplates_create_flashcards.mjs"],
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
                 * save button control
                 * @type {Function}
                 */
                save_button: async () => {
                    // Get values
                    var input_topic_value = this.element.querySelector("#input_topic_id").value
                    var input_name_value = this.element.querySelector("#input_name_id").value
                    var select_stack_value = this.element.querySelector("#select_stack_id").value
                    var card_description_value = this.element.querySelector("#card_description_id").value
                    var card_translation_value = this.element.querySelector("#card_translation_id").value

                    //Check values for undefined or empty
                    if (input_topic_value === '' || input_topic_value === undefined) {
                        var alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Thema aus!" : "Please fill in the field Topic!";
                        alert(alertMsg)
                    } else if (input_name_value === '' || input_name_value === undefined) {
                        var alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Name aus!" : "Please fill in the field Name!";
                        alert(alertMsg)
                    } else if (select_stack_value === '' || select_stack_value === undefined) {
                        var alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Stapel aus!" : "Please fill in the field Stack!";
                        alert(alertMsg)
                    } else if (card_description_value === '' || card_description_value === undefined || card_description_value.length === 1) {
                        var alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Beschreibung aus!" : "Please fill in the field Description!";
                        alert(alertMsg)
                    } else if (card_translation_value === '' || card_translation_value === undefined || card_translation_value.length === 1) {
                        var alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Übersetzung aus!" : "Please fill in the field Translation!";
                        alert(alertMsg)
                    } else {
                        //Save values
                        const stack_training = await ccm.store({
                            url: 'https://ccm2.inf.h-brs.de',
                            name: 'nniazm2s_stack_training_store'
                        });
                        const stack_private = await ccm.store({
                            url: 'https://ccm2.inf.h-brs.de',
                            name: 'nniazm2s_stack_private_store'
                        });
                        const stack_collaboration = await ccm.store({
                            url: 'https://ccm2.inf.h-brs.de',
                            name: 'nniazm2s_stack_collaboration_store'
                        });

                        var flashcardObject = new Object();
                        flashcardObject.topic = input_topic_value;
                        flashcardObject.name = input_name_value;
                        flashcardObject.stack = select_stack_value;
                        flashcardObject.description = card_description_value;
                        flashcardObject.translation = card_translation_value;

                        switch (select_stack_value) {
                            case "Trainings Stapel":
                                const lastIdObjGer = await stack_training.get("last_id");
                                const lastIdValueGer = lastIdObjGer.value
                                await stack_training.set({"key": "last_id", "value": (lastIdValueGer + 1)}); // update lastID value
                                flashcardObject.id = lastIdValueGer;
                                await stack_training.set({"key": ''+lastIdValueGer, "value": flashcardObject});
                                break;
                            case "Training stack":
                                const lastIdObjEn = await stack_training.get("last_id");
                                const lastIdValueEn = lastIdObjEn.value
                                await stack_training.set({"key": "last_id", "value": (lastIdValueEn + 1)}); // update lastID value
                                flashcardObject.id = lastIdValueEn;
                                await stack_training.set({"key": ''+lastIdValueEn, "value": flashcardObject});
                                break;
                            case "Privates Stapel":
                                const lastIdObjGerPri = await stack_private.get("last_id");
                                const lastIdValueGerPri = lastIdObjGerPri.value
                                await stack_private.set({"key": "last_id", "value": (lastIdValueGerPri + 1)}); // update lastID value
                                flashcardObject.id = lastIdValueGerPri;
                                await stack_private.set({"key": ''+lastIdValueGerPri, "value": flashcardObject});
                                break;
                            case "Private stack":
                                const lastIdObjEnPri = await stack_private.get("last_id");
                                const lastIdValueEnPri = lastIdObjEnPri.value
                                await stack_private.set({"key": "last_id", "value": (lastIdValueEnPri + 1)}); // update lastID value
                                flashcardObject.id = lastIdValueEnPri;
                                await stack_private.set({"key": ''+lastIdValueEnPri, "value": flashcardObject});
                                break;
                            case "Kollaborationsstapel":
                                const lastIdObjGerKol = await stack_collaboration.get("last_id");
                                const lastIdValueGerKol = lastIdObjGerKol.value
                                await stack_collaboration.set({"key": "last_id", "value": (lastIdValueGerKol + 1)}); // update lastID value
                                flashcardObject.id = lastIdValueGerKol;
                                await stack_collaboration.set({"key": ''+lastIdValueGerKol, "value": flashcardObject});
                                break;
                            case "Collaboration stack":
                                const lastIdObjEnKol = await stack_collaboration.get("last_id");
                                const lastIdValueEnKol = lastIdObjEnKol.value
                                await stack_collaboration.set({"key": "last_id", "value": (lastIdValueEnKol + 1)}); // update lastID value
                                flashcardObject.id = lastIdValueEnKol;
                                await stack_collaboration.set({"key": ''+lastIdValueEnKol, "value": flashcardObject});
                                break;
                            default:
                                console.log("switch default");
                        }
                        //Clear form
                        this.element.querySelector("#input_topic_id").value = ''
                        this.element.querySelector("#input_name_id").value = ''
                        this.element.querySelector("#select_stack_id").value = ''
                        this.element.querySelector("#card_description_id").value = ''
                        this.element.querySelector("#card_translation_id").value = ''
                    }
                },
                /**
                 * cancel button control
                 * @type {Function}
                 */
                cancel_button: async () => {
                    //Clear form
                    this.element.querySelector("#input_topic_id").value = ''
                    this.element.querySelector("#input_name_id").value = ''
                    this.element.querySelector("#select_stack_id").value = ''
                    this.element.querySelector("#card_description_id").value = ''
                    this.element.querySelector("#card_translation_id").value = ''
                },
            }

            /**
             * renders/updates app content in webpage area
             * @type {Function}
             */
            const render = () => {
                this.template.render(this.template.mainContent(this, events), this.element);
            }

            this.start = async () => {
                render()
                this.lang.translate();
                this.lang && $.append(this.element.querySelector('section:last-child'), this.lang.root);
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