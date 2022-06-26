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
            "css": [
                "ccm.load",
                "https://naqibniazmand.github.io/nniazm2s-components/sub-components/create_flashcards/style.css"
                // "./../sub-components/create_flashcards/style.css"
                // "./../create_flashcards/style.css"
                // "./style.css"
            ],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.js", {
                "translations": {
                    // "de": ["ccm.load", "./resources.mjs#de"],
                    "de": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/create_flashcards/resources.mjs#de"], // "en": ["ccm.load", "./resources.mjs#en"],
                    "en": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/create_flashcards/resources.mjs#en"],
                }
            }], // "text": ["ccm.load", "./resources.mjs#de"],
            "text": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/create_flashcards/resources.mjs#de"],
            "helper": ["ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs"],
            "template": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/create_flashcards/tamplates_create_flashcards.mjs"],
            // "template": ["ccm.load", "./../sub-components/create_flashcards/tamplates_create_flashcards.mjs"],
            // "template": ["ccm.load", "./../create_flashcards/tamplates_create_flashcards.mjs"],
            // "template": ["ccm.load", "./tamplates_create_flashcards.mjs"],
            "user": ["ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js"],
            "is_vocabulary_sets": false,
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
                    if (this.is_vocabulary_sets) {
                        let alertMsg;
                        // Get values
                        var input_name_value_v = this.element.querySelector("#input_name_id").value
                        var select_topic_value_v = this.element.querySelector("#select_topic_id").value
                        var card_description_value_v = this.element.querySelector("#card_description_id").value
                        var card_translation_value_V = this.element.querySelector("#card_translation_id").value
                        //Check values for undefined or empty
                        if (input_name_value_v === '' || input_name_value_v === undefined) {
                            alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Name aus!" : "Please fill in the field Name!";
                            alert(alertMsg)
                        } else if (select_topic_value_v === '' || select_topic_value_v === undefined) {
                            alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld *Thema aus!" : "Please fill in the field Topic!";
                            alert(alertMsg)
                        } else if (card_description_value_v === '' || card_description_value_v === undefined || card_description_value_v.length === 1) {
                            alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Beschreibung aus!" : "Please fill in the field Description!";
                            alert(alertMsg)
                        } else if (card_translation_value_V === '' || card_translation_value_V === undefined || card_translation_value_V.length === 1) {
                            alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Übersetzung aus!" : "Please fill in the field Translation!";
                            alert(alertMsg)
                        } else {
                            const vocabulary_sets_id = await ccm.store({
                                "url": 'https://ccm2.inf.h-brs.de', "name": "nniazm2s_vocabulary_sets_id"
                            });
                            var last_id = await vocabulary_sets_id.get("last_id");
                            for (let i = 0; i <= last_id.value; i++) {
                                const vocabulary_sets_name = "nniazm2s_create_vocabulary_sets_" + i;
                                const create_vocabulary_sets = await ccm.store({
                                    "url": 'https://ccm2.inf.h-brs.de', "name": vocabulary_sets_name
                                });
                                var topic = await create_vocabulary_sets.get(i + '')
                                if (topic !== null && topic.value === select_topic_value_v) {
                                    var v_id = await create_vocabulary_sets.get("last_id_v")
                                    var flashcardObject = new Object();
                                    flashcardObject.topic = select_topic_value_v;
                                    flashcardObject.name = input_name_value_v;
                                    flashcardObject.stack = 'dd';
                                    flashcardObject.description = card_description_value_v;
                                    flashcardObject.translation = card_translation_value_V;
                                    flashcardObject.id = v_id.value;
                                    create_vocabulary_sets.set({"key": 'V_' + v_id.value, "value": flashcardObject});
                                    var update_v_id = v_id.value + 1
                                    await create_vocabulary_sets.set({"key": "last_id_v", "value": update_v_id});
                                    console.log("Vocabulary was added: ",flashcardObject)
                                    alert("Vocabulary was added: Name "+ flashcardObject.name+ ", Thema: " + flashcardObject.topic +", Beschreibung " +flashcardObject.description +", Übersetzung " +flashcardObject.translation)
                                }
                            }
                            events.cancel_button()
                        }
                    } else {
                        let alertMsg;
                        // Get values
                        var input_topic_value = this.element.querySelector("#input_topic_id").value
                        var input_name_value = this.element.querySelector("#input_name_id").value
                        var select_stack_value = this.element.querySelector("#select_stack_id").value
                        var card_description_value = this.element.querySelector("#card_description_id").value
                        var card_translation_value = this.element.querySelector("#card_translation_id").value

                        //Check values for undefined or empty
                        if (input_topic_value === '' || input_topic_value === undefined) {
                            alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Thema aus!" : "Please fill in the field Topic!";
                            alert(alertMsg)
                        } else if (input_name_value === '' || input_name_value === undefined) {
                            alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Name aus!" : "Please fill in the field Name!";
                            alert(alertMsg)
                        } else if (select_stack_value === '' || select_stack_value === undefined) {
                            alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Stapel aus!" : "Please fill in the field Stack!";
                            alert(alertMsg)
                        } else if (card_description_value === '' || card_description_value === undefined || card_description_value.length === 1) {
                            alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Beschreibung aus!" : "Please fill in the field Description!";
                            alert(alertMsg)
                        } else if (card_translation_value === '' || card_translation_value === undefined || card_translation_value.length === 1) {
                            alertMsg = this.lang.getValue() === "de" ? "Bitte füllen Sie das Feld Übersetzung aus!" : "Please fill in the field Translation!";
                            alert(alertMsg)
                        } else {
                            //Save values
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
                                    await stack_training.set({"key": '' + lastIdValueGer, "value": flashcardObject});
                                    events.cancel_button()
                                    alertMsg = this.lang.getValue() === "de" ? "Eine Lernkarte mit der ID: " + lastIdValueGer + " wurde erstellt." : "A flashcard with the ID: " + lastIdValueGer + " was created.";
                                    alert(alertMsg)
                                    break;
                                case "Training stack":
                                    const lastIdObjEn = await stack_training.get("last_id");
                                    const lastIdValueEn = lastIdObjEn.value
                                    await stack_training.set({"key": "last_id", "value": (lastIdValueEn + 1)}); // update lastID value
                                    flashcardObject.id = lastIdValueEn;
                                    await stack_training.set({"key": '' + lastIdValueEn, "value": flashcardObject});
                                    events.cancel_button()
                                    alertMsg = this.lang.getValue() === "de" ? "Eine Lernkarte mit der ID: " + lastIdValueEn + " wurde erstellt." : "A flashcard with the ID: " + lastIdValueEn + " was created.";
                                    alert(alertMsg)
                                    break;
                                case "Privates Stapel":
                                    const lastIdObjGerPri = await stack_private.get("last_id");
                                    const lastIdValueGerPri = lastIdObjGerPri.value
                                    await stack_private.set({"key": "last_id", "value": (lastIdValueGerPri + 1)}); // update lastID value
                                    flashcardObject.id = lastIdValueGerPri;
                                    await stack_private.set({"key": '' + lastIdValueGerPri, "value": flashcardObject});
                                    events.cancel_button()
                                    alertMsg = this.lang.getValue() === "de" ? "Eine Lernkarte mit der ID: " + lastIdValueGerPri + " wurde erstellt." : "A flashcard with the ID: " + lastIdValueGerPri + " was created.";
                                    alert(alertMsg)
                                    break;
                                case "Private stack":
                                    const lastIdObjEnPri = await stack_private.get("last_id");
                                    const lastIdValueEnPri = lastIdObjEnPri.value
                                    await stack_private.set({"key": "last_id", "value": (lastIdValueEnPri + 1)}); // update lastID value
                                    flashcardObject.id = lastIdValueEnPri;
                                    await stack_private.set({"key": '' + lastIdValueEnPri, "value": flashcardObject});
                                    events.cancel_button()
                                    alertMsg = this.lang.getValue() === "de" ? "Eine Lernkarte mit der ID: " + lastIdValueEnPri + " wurde erstellt." : "A flashcard with the ID: " + lastIdValueEnPri + " was created.";
                                    alert(alertMsg)
                                    break;
                                case "Kollaborationsstapel":
                                    const lastIdObjGerKol = await stack_collaboration.get("last_id");
                                    const lastIdValueGerKol = lastIdObjGerKol.value
                                    await stack_collaboration.set({"key": "last_id", "value": (lastIdValueGerKol + 1)}); // update lastID value
                                    flashcardObject.id = lastIdValueGerKol;
                                    await stack_collaboration.set({
                                        "key": '' + lastIdValueGerKol, "value": flashcardObject
                                    });
                                    events.cancel_button()
                                    alertMsg = this.lang.getValue() === "de" ? "Eine Lernkarte mit der ID: " + lastIdValueGerKol + " wurde erstellt." : "A flashcard with the ID: " + lastIdValueGerKol + " was created.";
                                    alert(alertMsg)
                                    break;
                                case "Collaboration stack":
                                    const lastIdObjEnKol = await stack_collaboration.get("last_id");
                                    const lastIdValueEnKol = lastIdObjEnKol.value
                                    await stack_collaboration.set({"key": "last_id", "value": (lastIdValueEnKol + 1)}); // update lastID value
                                    flashcardObject.id = lastIdValueEnKol;
                                    await stack_collaboration.set({
                                        "key": '' + lastIdValueEnKol,
                                        "value": flashcardObject
                                    });
                                    events.cancel_button()
                                    alertMsg = this.lang.getValue() === "de" ? "Eine Lernkarte mit der ID: " + lastIdValueEnKol + " wurde erstellt." : "A flashcard with the ID: " + lastIdValueEnKol + " was created.";
                                    alert(alertMsg)
                                    break;
                                default:
                                    alertMsg = this.lang.getValue() === "de" ? "Etwas ist beim Stapel Auswahl schiefgelaufen." : "Something went wrong with the stack selection.";
                                    console.log(alertMsg);
                                    alert(alertMsg)
                            }
                        }
                    }
                }, /**
                 * cancel button control
                 * @type {Function}
                 */
                cancel_button: async () => {
                    //Clear form
                    this.element.querySelector("#input_topic_id") !== null ? this.element.querySelector("#input_topic_id").value = '' : ''
                    this.element.querySelector("#input_name_id") !== null ? this.element.querySelector("#input_name_id").value = '' : ''
                    this.element.querySelector("#select_stack_id") !== null ? this.element.querySelector("#select_stack_id").value = '' : ''
                    this.element.querySelector("#card_description_id") !== null ? this.element.querySelector("#card_description_id").value = '' : ''
                    this.element.querySelector("#card_translation_id") !== null ? this.element.querySelector("#card_translation_id").value = '' : ''
                    this.element.querySelector("#select_topic_id") !== null ? this.element.querySelector("#select_topic_id").value = '' : ''
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
                if (this.is_vocabulary_sets) {
                    const vocabulary_sets_id = await ccm.store({
                        "url": 'https://ccm2.inf.h-brs.de', "name": "nniazm2s_vocabulary_sets_id"
                    });
                    var last_id = await vocabulary_sets_id.get("last_id");
                    for (let i = 0; i < last_id.value; i++) {
                        const vocabulary_sets_name = "nniazm2s_create_vocabulary_sets_" + i;
                        const create_vocabulary_sets = await ccm.store({
                            "url": 'https://ccm2.inf.h-brs.de', "name": vocabulary_sets_name
                        });
                        var topic = await create_vocabulary_sets.get(i + '')
                        console.log("topic", topic)
                        var option = document.createElement("option");
                        option.value = topic.value
                        option.innerText = topic.value;
                        this.element.querySelector("#select_topic_id").appendChild(option);
                    }
                }
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