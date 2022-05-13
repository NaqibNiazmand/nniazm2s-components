/**
 * @overview A new sub component. For the editing of the training stack.
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 * @license The MIT License (MIT)
 */
(() => {
    const component = {
        name: 'edit_training_stack',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.js',
        config: {
            "css": ["ccm.load",
                "https://naqibniazmand.github.io/nniazm2s-components/sub-components/edit_training_stack/styles.css"
                // "./styles.css"
            ],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.js", {
                "translations": {
                    // "de": ["ccm.load", "./resources.mjs#de"],
                    "de": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/edit_training_stack/resources.mjs#de"],
                    // "en": ["ccm.load", "./resources.mjs#en"],
                    "en": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/edit_training_stack/resources.mjs#en"],
                }
            }],
            // "text": ["ccm.load", "./resources.mjs#de"],
            "text": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/edit_training_stack/resources.mjs#de"],
            "helper": ["ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs"],
            "template": ["ccm.load", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/edit_training_stack/tamplates_show_flashcards.mjs"],
            // "template": ["ccm.load", "./tamplates_show_flashcards.mjs"],
            "flashcard": ["ccm.component", "https://naqibniazmand.github.io/nniazm2s-components/sub-components/flashcard/ccm.flashcard-1.0.0.js"],
            "user": ["ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js"],

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
             * @type {Function}
             */
            const render = () => {
                this.template.render(this.template.mainContent(this), this.element);
                this.lang.translate();
                this.lang && $.append(this.element.querySelector('section:last-child'), this.lang.root);
            }
            this.start = async () => {
                // Render content
                render()
                //get stacks
                var username = this.user.getUsername()
                const training_stack_name = 'nniazm2s_flashcards_training_stack_'+username

                const stack_training = await ccm.store({
                    "url": 'https://ccm2.inf.h-brs.de', "name": training_stack_name
                });

                //get data
                const data_stack_training = await stack_training.get();

                // remove last_id element from data, because is not a flashcard
                data_stack_training.shift()

                var instance_data_stack_training = [];

                //clear body
                this.element.querySelector('#body-form').innerHTML = '';
                // show data
                data_stack_training.forEach(async flashcard => {
                    const instance = await this.flashcard.start({
                        flashcardObject: flashcard.value,
                        user: this.user,
                        button: "flashcard_remove_button",
                    });
                    instance_data_stack_training.push(instance)
                    this.element.querySelector('#body-form').appendChild(instance.root);
                });
                //Only if a stack is selected, then filtering by theme, name or ID is allowed.
                let ele = this.element
                this.element.querySelector('#select_stack_id').addEventListener('change', function () {
                    if (this.value !== '') {
                        ele.querySelector('#input_topic_id').disabled = false;
                        ele.querySelector('#input_name_id').disabled = false;
                        ele.querySelector('#input_id').disabled = false;
                        if (this.value === "Training stack" || this.value === "Trainings Stapel") {
                            //remove cards: stack_collaboration and stack_private
                            ele.querySelector('#body-form').innerHTML = '';
                            //add cards: stack_training
                            for (let i = 0; i < instance_data_stack_training.length; i++) {
                                ele.querySelector('#body-form').appendChild(instance_data_stack_training[i].root);
                            }
                            // filter by topic
                            ele.querySelector('#input_topic_id').addEventListener('change', function () {
                                if (ele.querySelector('#select_stack_id').value === "Training stack" || ele.querySelector('#select_stack_id').value === "Trainings Stapel") {
                                    const results = instance_data_stack_training.filter(obj => {
                                        return obj.flashcardObject.topic === this.value;
                                    });
                                    if (results.length > 0) {
                                        // remove alls cards stack_training
                                        ele.querySelector('#body-form').innerHTML = '';
                                        // add filtered result to shadowDom
                                        for (let i = 0; i < results.length; i++) {
                                            ele.querySelector('#body-form').appendChild(results[i].root);
                                        }
                                    } else {
                                        // remove filter: add all cards
                                        ele.querySelector('#body-form').innerHTML = '';
                                        for (let i = 0; i < instance_data_stack_training.length; i++) {
                                            ele.querySelector('#body-form').appendChild(instance_data_stack_training[i].root);
                                        }
                                    }
                                }
                            });
                            // filter by name
                            ele.querySelector('#input_name_id').addEventListener('change', function () {
                                if (ele.querySelector('#select_stack_id').value === "Training stack" || ele.querySelector('#select_stack_id').value === "Trainings Stapel") {
                                    const results = instance_data_stack_training.filter(obj => {
                                        return obj.flashcardObject.name === this.value;
                                    });
                                    if (results.length > 0) {
                                        // remove alls cards stack_training
                                        ele.querySelector('#body-form').innerHTML = '';
                                        // add filtered result to shadowDom
                                        for (let i = 0; i < results.length; i++) {
                                            ele.querySelector('#body-form').appendChild(results[i].root);
                                        }
                                    } else {
                                        // remove filter: add all cards
                                        ele.querySelector('#body-form').innerHTML = '';
                                        for (let i = 0; i < instance_data_stack_training.length; i++) {
                                            ele.querySelector('#body-form').appendChild(instance_data_stack_training[i].root);
                                        }
                                    }
                                }
                            });
                            // filter by ID
                            ele.querySelector('#input_id').addEventListener('change', function () {
                                if (ele.querySelector('#select_stack_id').value === "Training stack" || ele.querySelector('#select_stack_id').value === "Trainings Stapel") {
                                    const results = instance_data_stack_training.filter(obj => {
                                        return obj.flashcardObject.id.toString() === this.value.toString();
                                    });
                                    if (results.length > 0) {
                                        // remove alls cards stack_training
                                        ele.querySelector('#body-form').innerHTML = '';
                                        // add filtered result to shadowDom
                                        for (let i = 0; i < results.length; i++) {
                                            ele.querySelector('#body-form').appendChild(results[i].root);
                                        }
                                    } else {
                                        // remove filter: add all cards
                                        ele.querySelector('#body-form').innerHTML = '';
                                        for (let i = 0; i < instance_data_stack_training.length; i++) {
                                            ele.querySelector('#body-form').appendChild(instance_data_stack_training[i].root);
                                        }
                                    }
                                }
                            });
                        }
                    } else {
                        ele.querySelector('#input_topic_id').disabled = true;
                        ele.querySelector('#input_name_id').disabled = true;
                        ele.querySelector('#input_id').disabled = true;
                        //remove cards: stack_collaboration , stack_private and stack_training
                        var checkCardsCollaborationSt = ele.querySelector('#' + instance_data_stack_collaboration[0].index)
                        if (checkCardsCollaborationSt != null) {
                            for (let i = 0; i < instance_data_stack_collaboration.length; i++) {
                                ele.querySelector('#body-form').removeChild(instance_data_stack_collaboration[i].root);
                            }
                        }
                        var checkCardsStackPrivateD = ele.querySelector('#' + instance_data_stack_private[0].index)
                        if (checkCardsStackPrivateD != null) {
                            for (let i = 0; i < instance_data_stack_private.length; i++) {
                                ele.querySelector('#body-form').removeChild(instance_data_stack_private[i].root);
                            }
                        }
                        var checkCardsStackTrainingR = ele.querySelector('#' + instance_data_stack_training[0].index)
                        if (checkCardsStackTrainingR != null) {
                            for (let i = 0; i < instance_data_stack_training.length; i++) {
                                ele.querySelector('#body-form').removeChild(instance_data_stack_training[i].root);
                            }
                        }
                        //add cards: stack_training
                        for (let i = 0; i < instance_data_stack_training.length; i++) {
                            ele.querySelector('#body-form').appendChild(instance_data_stack_training[i].root);
                        }
                        //add cards: stack_private
                        for (let i = 0; i < instance_data_stack_private.length; i++) {
                            ele.querySelector('#body-form').appendChild(instance_data_stack_private[i].root);
                        }
                        //add cards: stack_collaboration
                        for (let i = 0; i < instance_data_stack_collaboration.length; i++) {
                            ele.querySelector('#body-form').appendChild(instance_data_stack_collaboration[i].root);
                        }
                    }
                });
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