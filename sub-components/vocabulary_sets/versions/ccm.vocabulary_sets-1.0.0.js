/**
 * @overview A welcome component that includes language component, login component, registration component and a welcome text.
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 * @license The MIT License (MIT)
 * @changes
 * version 1.0.1 (18.04.2022)
 * - Add Menu component
 * version 1.0.0 (11.04.2022)
 * - Registration and login components implemented
 * */
(() => {
    const component = {
        name: 'vocabulary_sets',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.js',
        config: {
            "css": ["ccm.load",
                [  // serial
                    "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap.min.css",
                    "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-dark.min.css",
                    "https://naqibniazmand.github.io/nniazm2s-components/sub-components/vocabulary_sets/style.css",
                    //"./style.css",
                ],
                "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
                { "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" },
            ],
            "helper": ["ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.mjs"],
            "html": ["ccm.load","https://naqibniazmand.github.io/nniazm2s-components/sub-components/vocabulary_sets/template_vocabulary_sets.mjs"],
            // "html": ["ccm.load","./template_vocabulary_sets.mjs"],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.js", {
                "translations": {
                    "de": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/vocabulary_sets/resources.mjs#de"],
                    "en": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/vocabulary_sets/resources.mjs#en"],
                }
            }],
            "text": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/vocabulary_sets/resources.mjs#de"],
            // "text": ["ccm.load", "./resources.mjs#de"],
            "flashcard": ["ccm.component", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/flashcard/ccm.flashcard-1.0.0.js"],
            "create_flashcard": ["ccm.component", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/create_flashcards/ccm.create_flashcards-1.0.0.js"],
            "play_trainingstack": ["ccm.component", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/trainingstack/ccm.play_trainingstack-1.0.0.js"],
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
             * contains all event handlers
             * @type {Object.<string,Function>}
             */
            const events = {
                /**
                 * create vocabulary sets button control
                 * @type {Function}
                 */
                create_vocabulary_sets_button: async () => {
                    const vocabulary_sets_input_value = this.element.querySelector('#new_vocabulary_sets_input_id').value.replace(/\s/g,'')
                    const vocabulary_sets_id = await ccm.store({
                        "url": 'https://ccm2.inf.h-brs.de', "name": "nniazm2s_vocabulary_sets_id"
                    });
                    var last_id = await vocabulary_sets_id.get("last_id");
                    // get existing themes
                    var existing_themes = []
                    for (let i = 0; i < last_id.value; i++) {
                        const vocabulary_sets_name_i = "nniazm2s_create_vocabulary_sets_" + i;
                        const create_vocabulary_sets_i = await ccm.store({
                            "url": 'https://ccm2.inf.h-brs.de', "name": vocabulary_sets_name_i
                        });
                        var topic = await create_vocabulary_sets_i.get(i+'')
                        if(topic !== null){
                            existing_themes.push(topic.value)
                        }
                    }
                    if(vocabulary_sets_input_value.length !== 0){
                        if(existing_themes.includes(vocabulary_sets_input_value)){
                            alert("Vokabelsets bereits vorhanden! Bitte eine andere Bezeichnung angeben.");
                        }else {
                            var last_id_value_update = last_id.value + 1;
                            await vocabulary_sets_id.set({"key": "last_id", "value": last_id_value_update});

                            const vocabulary_sets_name = "nniazm2s_create_vocabulary_sets_" + last_id.value;
                            const create_vocabulary_sets = await ccm.store({
                                "url": 'https://ccm2.inf.h-brs.de', "name": vocabulary_sets_name
                            });
                            await create_vocabulary_sets.set({"key": last_id.value+"", "value": vocabulary_sets_input_value});
                            await create_vocabulary_sets.set({"key": "last_id_v", "value": 0});

                            var option = document.createElement("option");
                            option.value = vocabulary_sets_input_value;
                            option.innerText = vocabulary_sets_input_value;
                            this.element.querySelector("#select_vocabulary_sets").appendChild(option);
                            alert("Vokabelset wurde erfolgreich angelegt.")
                        }
                    } else {
                        alert("Bitte eine Beschreibung des Vokabelsets eingeben");
                    }
                    this.element.querySelector('#new_vocabulary_sets_input_id').value = ""
                },
                /**
                 * create vocabulary button control
                 * @type {Function}
                 */
                create_vocabulary_button: async () => {
                    this.element.querySelector('#show_vocabulary_sets').innerHTML = ''
                    this.element.querySelector('#create_vocabulary_id').innerHTML = ''
                    this.create_flashcard.start({
                        root: this.element.querySelector('#create_vocabulary_id'),
                        "is_vocabulary_sets": true,
                    })
                },
                /**
                 * learn vocabulary button control
                 * @type {Function}
                 */
                learn_vocabulary_button: async () => {
                    this.element.querySelector('#show_vocabulary_sets').innerHTML = ''
                    this.element.querySelector('#create_vocabulary_id').innerHTML = ''
                    this.play_trainingstack.start({
                        root: this.element.querySelector('#create_vocabulary_id'),
                        "is_vocabulary_sets": true,
                    })
                },
                /**
                 * show vocabulary set button control
                 * @type {Function}
                 */
                vocabulary_sets_show_button: async () => {
                    const vocabulary_sets_id = await ccm.store({
                        "url": 'https://ccm2.inf.h-brs.de', "name": "nniazm2s_vocabulary_sets_id"
                    });
                    var last_id = await vocabulary_sets_id.get("last_id");
                    for (let i = 0; i <= last_id.value; i++) {
                        const vocabulary_sets_name = "nniazm2s_create_vocabulary_sets_" + i;
                        const create_vocabulary_sets = await ccm.store({
                            "url": 'https://ccm2.inf.h-brs.de', "name": vocabulary_sets_name
                        });
                        var topic = await create_vocabulary_sets.get(i+'')
                        var selected_topic = this.element.querySelector('#select_vocabulary_sets').value
                        if(topic !== null  && topic.value === selected_topic){
                            update_view_show_vocabulary_sets(create_vocabulary_sets)
                        }
                    }
                }
            };
            /**
             * render content
             * @type {Function}
             */
            const render = async () => {
                this.html.render(this.html.header_main(this, events), this.element);
                // render language selection
                // this.lang.translate();
            }

            /**
             * render content
             * @type {Function}
             */
            const update_view_show_vocabulary_sets = async (vocabulary_sets) => {
                this.element.querySelector('#show_vocabulary_sets').innerHTML = ''
                this.element.querySelector('#create_vocabulary_id').innerHTML = ''
                var v_id = await vocabulary_sets.get('last_id_v')
                for (let i = 0; i <= v_id.value; i++) {
                    var flashcardObj = await vocabulary_sets.get('V_' + i)
                    if(flashcardObj !== null){
                        const instance = await this.flashcard.start({
                            flashcardObject: flashcardObj.value,
                            is_vocabulary_sets: true,
                        });
                        this.element.querySelector('#show_vocabulary_sets').appendChild(instance.root);
                    }
                }
            }
            this.start = async () => {

                render();
                this.element.querySelector('#show_vocabulary_sets').innerHTML = ''
                this.element.querySelector('#create_vocabulary_id').innerHTML = ''
                const vocabulary_sets_id = await ccm.store({
                    "url": 'https://ccm2.inf.h-brs.de', "name": "nniazm2s_vocabulary_sets_id"
                });
                var last_id = await vocabulary_sets_id.get("last_id");

                for (let i = 0; i < last_id.value; i++) {
                    const vocabulary_sets_name = "nniazm2s_create_vocabulary_sets_" + i;
                    const create_vocabulary_sets = await ccm.store({
                        "url": 'https://ccm2.inf.h-brs.de', "name": vocabulary_sets_name
                    });
                    var option = document.createElement("option");
                    var topic = await create_vocabulary_sets.get(i+'')
                    option.value = topic.value
                    option.innerText = topic.value;
                    this.element.querySelector("#select_vocabulary_sets").appendChild(option);
                }
                for (let i = 0; i <= last_id.value; i++) {
                    const vocabulary_sets_name = "nniazm2s_create_vocabulary_sets_" + i;
                    const create_vocabulary_sets = await ccm.store({
                        "url": 'https://ccm2.inf.h-brs.de', "name": vocabulary_sets_name
                    });
                    var topic = await create_vocabulary_sets.get(i+'')
                    var selected_topic = this.element.querySelector('#select_vocabulary_sets').value
                    if(topic !== null  && topic.value === selected_topic){
                        update_view_show_vocabulary_sets(create_vocabulary_sets)
                    }
                }
                this.element.querySelector('#select_vocabulary_sets').addEventListener("change", async function () {
                    for (let i = 0; i <= last_id.value; i++) {
                        const vocabulary_sets_name = "nniazm2s_create_vocabulary_sets_" + i;
                        const create_vocabulary_sets = await ccm.store({
                            "url": 'https://ccm2.inf.h-brs.de', "name": vocabulary_sets_name
                        });
                        var topic = await create_vocabulary_sets.get(i+'')
                        if(topic !== null && topic.value === this.value){
                            update_view_show_vocabulary_sets(create_vocabulary_sets)
                        }
                    }
                });
            };
        }
    };
    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();
