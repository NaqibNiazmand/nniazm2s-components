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
                "https://naqibniazmand.github.io/nniazm2s-components/sub-components/flashcard/styles.css"
                // "./styles.css"
            ],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.js", {
                "translations": {
                    // "de": ["ccm.load", "./resources.mjs#de"],
                    "de": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/flashcard/resources.mjs#de"],
                    // "en": ["ccm.load", "./resources.mjs#en"],
                    "en": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/flashcard/resources.mjs#en"],
                }
            }],
            // "text": ["ccm.load", "./resources.mjs#de"],
            "text": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/flashcard/resources.mjs#de"],
            "helper": ["ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs"],
            "template": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/flashcard/tamplates_flashcard.mjs"],
            // "template": ["ccm.load", "./../flashcard/tamplates_flashcard.mjs"],
            // "template": ["ccm.load", "./tamplates_flashcard.mjs"],
            "flashcardObject": {
                "id": "stack_private_0",
                "topic": "topic",
                "name": "Name",
                "stack": "stack_private",
                "description": "default  description",
                "translation": "default translation"
            },
            "user": ["ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js"],
            "button": "flashcard_add_button",
            // "button": "flashcard_remove_button",
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
                    var username = this.user.getUsername()
                    const training_stack_name = 'nniazm2s_flashcards_training_stack_' + username
                    const private_stack_name = 'nniazm2s_flashcards_private_stack_' + username
                    const stack_training = await ccm.store({
                        "url": 'https://ccm2.inf.h-brs.de', "name": training_stack_name
                    });
                    const stack_private = await ccm.store({
                        "url": 'https://ccm2.inf.h-brs.de', "name": private_stack_name
                    });
                    const stack_collaboration = await ccm.store({
                        url: 'https://ccm2.inf.h-brs.de', name: 'nniazm2s_stack_collaboration_store'
                    });
                    var select_stack_value = this.element.querySelector("#select_stack_id").value
                    if (select_stack_value !== '' || select_stack_value !== undefined) {
                        let alertMsg;
                        switch (select_stack_value) {
                            case "Trainings Stapel":
                                if (this.flashcardObject.stack === "Trainings Stapel") {
                                    alertMsg = this.lang.getValue() === "de" ? "Diese Lernkarte befindet sich bereits im gewählten Stapel." : "This flashcard is already in the selected stack.";
                                    alert(alertMsg)
                                } else {
                                    const lastIdObjGer = await stack_training.get("last_id");
                                    const lastIdValueGer = lastIdObjGer.value
                                    await stack_training.set({"key": "last_id", "value": (lastIdValueGer + 1)}); // update lastID value
                                    this.flashcardObject.id = lastIdValueGer;
                                    this.flashcardObject.stack = "Trainings Stapel";
                                    await stack_training.set({
                                        "key": '' + lastIdValueGer,
                                        "value": this.flashcardObject
                                    });
                                    alertMsg = this.lang.getValue() === "de" ? "Eine Lernkarte mit der ID: " + lastIdValueGer + " wurde erstellt." : "A flashcard with the ID: " + lastIdValueGer + " was created.";
                                    alert(alertMsg)
                                    const instance = await this.component.start({
                                        flashcardObject: this.flashcardObject,
                                        user: this.user,
                                    });
                                    this.root.parentElement.appendChild(instance.root);
                                }
                                break;
                            case "Training stack":
                                if (this.flashcardObject.stack === "Training stack") {
                                    alertMsg = this.lang.getValue() === "de" ? "Diese Lernkarte befindet sich bereits im gewählten Stapel." : "This flashcard is already in the selected stack.";
                                    alert(alertMsg)
                                } else {
                                    const lastIdObjEn = await stack_training.get("last_id");
                                    const lastIdValueEn = lastIdObjEn.value
                                    await stack_training.set({"key": "last_id", "value": (lastIdValueEn + 1)}); // update lastID value
                                    this.flashcardObject.id = lastIdValueEn;
                                    this.flashcardObject.stack = "Training stack";
                                    await stack_training.set({
                                        "key": '' + lastIdValueEn,
                                        "value": this.flashcardObject
                                    });
                                    alertMsg = this.lang.getValue() === "de" ? "Eine Lernkarte mit der ID: " + lastIdValueEn + " wurde erstellt." : "A flashcard with the ID: " + lastIdValueEn + " was created.";
                                    alert(alertMsg)
                                    const instance = await this.component.start({
                                        flashcardObject: this.flashcardObject,
                                        user: this.user,
                                    });
                                    this.root.parentElement.appendChild(instance.root);
                                }
                                break;
                            case "Privates Stapel":
                                if (this.flashcardObject.stack === "Privates Stapel") {
                                    alertMsg = this.lang.getValue() === "de" ? "Diese Lernkarte befindet sich bereits im gewählten Stapel." : "This flashcard is already in the selected stack.";
                                    alert(alertMsg)
                                } else {
                                    const lastIdObjGerPri = await stack_private.get("last_id");
                                    const lastIdValueGerPri = lastIdObjGerPri.value
                                    await stack_private.set({"key": "last_id", "value": (lastIdValueGerPri + 1)}); // update lastID value
                                    this.flashcardObject.id = lastIdValueGerPri;
                                    this.flashcardObject.stack = "Privates Stapel";
                                    await stack_private.set({
                                        "key": '' + lastIdValueGerPri,
                                        "value": this.flashcardObject
                                    });
                                    alertMsg = this.lang.getValue() === "de" ? "Eine Lernkarte mit der ID: " + lastIdValueGerPri + " wurde erstellt." : "A flashcard with the ID: " + lastIdValueGerPri + " was created.";
                                    alert(alertMsg)
                                    const instance = await this.component.start({
                                        flashcardObject: this.flashcardObject,
                                        user: this.user,
                                    });
                                    this.root.parentElement.appendChild(instance.root);
                                }
                                break;
                            case "Private stack":
                                if (this.flashcardObject.stack === "Private stack") {
                                    alertMsg = this.lang.getValue() === "de" ? "Diese Lernkarte befindet sich bereits im gewählten Stapel." : "This flashcard is already in the selected stack.";
                                    alert(alertMsg)
                                } else {
                                    const lastIdObjEnPri = await stack_private.get("last_id");
                                    const lastIdValueEnPri = lastIdObjEnPri.value
                                    await stack_private.set({"key": "last_id", "value": (lastIdValueEnPri + 1)}); // update lastID value
                                    this.flashcardObject.id = lastIdValueEnPri;
                                    this.flashcardObject.stack = "Private stack";
                                    await stack_private.set({
                                        "key": '' + lastIdValueEnPri,
                                        "value": this.flashcardObject
                                    });
                                    alertMsg = this.lang.getValue() === "de" ? "Eine Lernkarte mit der ID: " + lastIdValueEnPri + " wurde erstellt." : "A flashcard with the ID: " + lastIdValueEnPri + " was created.";
                                    alert(alertMsg)
                                    const instance = await this.component.start({
                                        flashcardObject: this.flashcardObject,
                                        user: this.user,
                                    });
                                    this.root.parentElement.appendChild(instance.root);
                                }
                                break;
                            case "Kollaborationsstapel":
                                if (this.flashcardObject.stack === "Kollaborationsstapel") {
                                    alertMsg = this.lang.getValue() === "de" ? "Diese Lernkarte befindet sich bereits im gewählten Stapel." : "This flashcard is already in the selected stack.";
                                    alert(alertMsg)
                                } else {
                                    const lastIdObjGerKol = await stack_collaboration.get("last_id");
                                    const lastIdValueGerKol = lastIdObjGerKol.value
                                    await stack_collaboration.set({
                                        "key": "last_id",
                                        "value": (lastIdValueGerKol + 1)
                                    }); // update lastID value
                                    this.flashcardObject.id = lastIdValueGerKol;
                                    this.flashcardObject.stack = "Kollaborationsstapel";
                                    await stack_collaboration.set({
                                        "key": '' + lastIdValueGerKol, "value": this.flashcardObject
                                    });
                                    alertMsg = this.lang.getValue() === "de" ? "Eine Lernkarte mit der ID: " + lastIdValueGerKol + " wurde erstellt." : "A flashcard with the ID: " + lastIdValueGerKol + " was created.";
                                    alert(alertMsg)
                                    const instance = await this.component.start({
                                        flashcardObject: this.flashcardObject,
                                        user: this.user,
                                    });
                                    this.root.parentElement.appendChild(instance.root);
                                }
                                break;
                            case "Collaboration stack":
                                if (this.flashcardObject.stack === "Collaboration stack") {
                                    alertMsg = this.lang.getValue() === "de" ? "Diese Lernkarte befindet sich bereits im gewählten Stapel." : "This flashcard is already in the selected stack.";
                                    alert(alertMsg)
                                } else {
                                    const lastIdObjEnKol = await stack_collaboration.get("last_id");
                                    const lastIdValueEnKol = lastIdObjEnKol.value
                                    await stack_collaboration.set({
                                        "key": "last_id",
                                        "value": (lastIdValueEnKol + 1)
                                    }); // update lastID value
                                    this.flashcardObject.id = lastIdValueEnKol;
                                    this.flashcardObject.stack = "Kollaborationsstapel";
                                    await stack_collaboration.set({
                                        "key": '' + lastIdValueEnKol,
                                        "value": this.flashcardObject
                                    });
                                    alertMsg = this.lang.getValue() === "de" ? "Eine Lernkarte mit der ID: " + lastIdValueEnKol + " wurde erstellt." : "A flashcard with the ID: " + lastIdValueEnKol + " was created.";
                                    alert(alertMsg)
                                    const instance = await this.component.start({
                                        flashcardObject: this.flashcardObject,
                                        user: this.user,
                                    });
                                    this.root.parentElement.appendChild(instance.root);
                                }
                                break;
                            default:
                                alertMsg = this.lang.getValue() === "de" ? "Etwas ist beim Stapel Auswahl schiefgelaufen." : "Something went wrong with the stack selection.";
                                console.log(alertMsg);
                                alert(alertMsg)
                        }
                    }
                },

                /**
                 * flashcard remove button control
                 *
                 * @type {Function}
                 */
                flashcard_remove_button: async () => {
                    var username = this.user.getUsername()
                    const training_stack_name = 'nniazm2s_flashcards_training_stack_' + username
                    const stack_training = await ccm.store({
                        "url": 'https://ccm2.inf.h-brs.de', "name": training_stack_name
                    });
                    await stack_training.del(this.flashcardObject.id + "")
                    let alertMsg;
                    alertMsg = this.lang.getValue() === "de" ? "Die Lernkarte mit der ID: " + this.flashcardObject.id + " wurde Erfolgreich gelöscht." : "The flashcard with the ID: " + this.flashcardObject.id + " was successfully deleted.";
                    alert(alertMsg)
                    this.element.innerHTML = ''
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