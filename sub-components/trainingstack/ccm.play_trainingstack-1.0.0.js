/**
 * @overview A new sub component. For the creation of new flashcards.
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 * @license The MIT License (MIT)
 */
(() => {
    const component = {
        name: "play_trainingstack",
        version: [1, 0, 0],
        ccm: "https://ccmjs.github.io/ccm/versions/ccm-27.3.1.js",
        config: {
            css: [
                "ccm.load",
                "https://naqibniazmand.github.io/nniazm2s-components/sub-components/trainingstack/style.css",
                // "./../sub-components/trainingstack/style.css",
                // "./style.css"
            ],
            helper: [
                "ccm.load",
                "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs",
            ],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.js", {
                "translations": {
                    // "de": ["ccm.load", "./resources.mjs#de"],
                    "de": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/trainingstack/resources.mjs#de"],
                    // "en": ["ccm.load", "./resources.mjs#en"],
                    "en": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/trainingstack/resources.mjs#en"],
                }
            }],
            // "text": ["ccm.load", "./resources.mjs#de"],
            "text": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/trainingstack/resources.mjs#de"],
            template: [
                "ccm.load",
                "https://naqibniazmand.github.io/nniazm2s-components/sub-components/trainingstack/templates_play_trainingstack.mjs",
            ],
            blank_flashcard: [
                "ccm.component",
                "https://naqibniazmand.github.io/nniazm2s-components/sub-components/blank_flashcard/ccm.blank_flashcard-1.0.0.js",
                // "./../sub-components/blank_flashcard/ccm.blank_flashcard-1.0.0.js",
                // "./../blank_flashcard/ccm.blank_flashcard-1.0.0.js",
            ],
            "user": [ 'ccm.start', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js'],
            "training_stack_cards": [{
                "id": "0",
                "topic": "topic1",
                "name": "Name1",
                "stack": "Training stack",
                "description": "default  description1",
                "translation": "default translation1"
            }, {
                "id": "1",
                "topic": "topic2",
                "name": "Name2",
                "stack": "Training stack",
                "description": "default  description2",
                "translation": "default translation2"
            }],
        },
        Instance: function () {
            /**
             * shortcut to help functions
             * @type {Object.<string,Function>}
             */
            let $;
            const self = this;
            let current_card = {};
            let blank_flashcard_instance;
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
                next_button: async () => {
                    nextCard();
                },
                menu_left_check_translation_button: async () => {
                    const to_check_translation_value = this.element.querySelector('#menu_left_enter_translation_input').value;
                    var correct = (current_card.translation === to_check_translation_value);
                    blank_flashcard_instance.element.querySelector( '.flip-card-front' ).style.backgroundColor = correct ? 'lime' : 'red';
                },
            };
            /**
             * renders/updates app content in webpage area
             * @type {Function}
             */
            const render = () => {
                this.template.render(
                    this.template.mainContent(
                        this,
                        events,
                        "Wähle Thema aus",
                        "select topic"
                    ),
                    this.element
                );
                this.element.index = 0;
            };
            const nextCard = async () => {
                var index = this.element.index;
                const data = this.mystore;
                if (index >= data.length - 1) {
                    this.element.index = 0;
                } else {
                    this.element.index = this.element.index + 1;
                }
                console.log(
                    data[index].then(async (card) => {
                        console.log("card",card);
                        current_card = card;
                        const instance = await this.blank_flashcard.start({
                            flashcardObject: card,
                        });
                        blank_flashcard_instance = instance
                        this.element.querySelector(
                            "#start_training_stack"
                        ).innerHTML = ``;
                        this.element
                            .querySelector("#start_training_stack")
                            .appendChild(instance.root);
                    })
                );
            };

            this.start = async () => {
                render();
                this.lang.translate();
                this.element.querySelector("#start_training_stack").innerHTML = ``;
                let stack_training;
                if(this.user.isLoggedIn() === true) {
                    var username = this.user.getUsername()
                    const training_stack_name = 'nniazm2s_flashcards_training_stack_' + username
                    stack_training = await ccm.store({
                        "url": 'https://ccm2.inf.h-brs.de', "name": training_stack_name
                    });
                }

                let data_stack_training = [];
                let topics = [];
                if(this.user.isLoggedIn() === true) {
                    data_stack_training = await stack_training.get();
                    data_stack_training.shift();
                    topics = Array.from(
                        new Set(data_stack_training.map((item) => item.value.topic))
                    );
                }else {
                    data_stack_training = this.training_stack_cards;
                    topics = Array.from(
                        new Set(data_stack_training.map((item) => item.topic))
                    );
                }
                topics.forEach(async (topic) => {
                    var option = document.createElement("option");
                    option.value = topic;
                    option.innerText = topic;
                    this.element.querySelector("#select-topics").appendChild(option);
                });

                let ele = this.element;
                let $ = this;
                let user = this.user;
                // When starting training stack
                var selectedTopic = this.element.querySelector("#select-topics").value
                if (selectedTopic !== "") {
                    this.element.querySelector("#start_training_stack").innerHTML = ``;
                    this.element.index = 0;

                    if(user.isLoggedIn() === true) {
                        const stack_data = await data_stack_training
                            .filter((stack) => stack.value.topic === selectedTopic)
                            .map(async (flashcard) => {
                                const value = await flashcard.value;
                                return value;
                            });
                        console.log(stack_data);
                        $.mystore = stack_data;
                    }else {
                        const stack_data = await data_stack_training
                            .filter((stack) => stack.topic === selectedTopic)
                            .map(async (flashcard) => {
                                const value = await flashcard;
                                return value;
                            });
                        console.log(stack_data);
                        $.mystore = stack_data;
                    }

                    await nextCard();
                }
                // When the topic is changed
                this.element
                    .querySelector("#select-topics")
                    .addEventListener("change", async function () {
                        if (this.value !== "") {
                            ele.querySelector("#start_training_stack").innerHTML = ``;
                            ele.index = 0;
                            if(user.isLoggedIn() === true) {
                                const stack_data = await data_stack_training
                                    .filter((stack) => stack.value.topic === this.value)
                                    .map(async (flashcard) => {
                                        const value = await flashcard.value;
                                        return value;
                                    });
                                console.log(stack_data);
                                $.mystore = stack_data;
                            }else{
                                const stack_data = await data_stack_training
                                    .filter((stack) => stack.topic === this.value)
                                    .map(async (flashcard) => {
                                        const value = await flashcard;
                                        return value;
                                    });
                                console.log(stack_data);
                                $.mystore = stack_data;
                            }
                            await nextCard();
                        }
                    });
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
