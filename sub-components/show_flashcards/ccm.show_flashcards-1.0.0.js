/**
 * @overview A new sub component. For displaying the flashcards.
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 * @license The MIT License (MIT)
 */
(() => {
    const component = {
        name: 'show_flashcards',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.js',
        config: {
            "css": ["ccm.load",
                // "./../sub-components/show_flashcards/styles.css"
                "./styles.css"
            ],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.js", {
                "translations": {
                    "de": ["ccm.load", "./resources.mjs#de"],
                    // "de": ["ccm.load", "./../sub-components/show_flashcards/resources.mjs#de"],
                    "en": ["ccm.load", "./resources.mjs#en"],
                    // "en": ["ccm.load", "./../sub-components/show_flashcards/resources.mjs#en"],
                }
            }],
            "text": ["ccm.load", "./resources.mjs#de"],
            // "text": ["ccm.load", "./../sub-components/show_flashcards/resources.mjs#de"],
            "helper": ["ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs"],
            // "template": ["ccm.load", "./../sub-components/show_flashcards/tamplates_show_flashcards.mjs"],
            "template": ["ccm.load", "./tamplates_show_flashcards.mjs"],
            "flashcard": ["ccm.component", "./../flashcard/ccm.flashcard-1.0.0.js"],
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
                const stack_training = await ccm.store({
                    url: 'https://ccm2.inf.h-brs.de', name: 'nniazm2s_stack_training_store'
                });
                const stack_private = await ccm.store({
                    url: 'https://ccm2.inf.h-brs.de', name: 'nniazm2s_stack_private_store'
                });
                const stack_collaboration = await ccm.store({
                    url: 'https://ccm2.inf.h-brs.de', name: 'nniazm2s_stack_collaboration_store'
                });
                //get data
                const data_stack_training = await stack_training.get();
                const data_stack_private = await stack_private.get();
                const data_stack_collaboration = await stack_collaboration.get();
                // remove last_id element from data, because is not a flashcard
                data_stack_training.shift()
                data_stack_private.shift()
                data_stack_collaboration.shift()
                /* instance data for filtering*/
                var instance_data_stack_private = [];
                var instance_data_stack_training = [];
                var instance_data_stack_collaboration = [];
                // show data
                data_stack_private.forEach(async flashcard => {
                    const instance = await this.flashcard.start({flashcardObject: flashcard.value});
                    instance_data_stack_private.push(instance)
                    this.element.querySelector('#body-form').appendChild(instance.root);
                });
                data_stack_training.forEach(async flashcard => {
                    const instance = await this.flashcard.start({flashcardObject: flashcard.value});
                    instance_data_stack_training.push(instance)
                    this.element.querySelector('#body-form').appendChild(instance.root);
                });
                data_stack_collaboration.forEach(async flashcard => {
                    const instance = await this.flashcard.start({flashcardObject: flashcard.value});
                    instance_data_stack_collaboration.push(instance)
                    this.element.querySelector('#body-form').appendChild(instance.root);
                });
                //Only if a stack is selected, then filtering by theme, name or ID is allowed.
                let ele = this.element
                this.element.querySelector('#select_stack_id').addEventListener('change', function () {
                    if (this.value !== '') {
                        ele.querySelector('#input_topic_id').disabled = false;
                        ele.querySelector('#input_name_id').disabled = false;
                        ele.querySelector('#input_id').disabled = false;
                        if (this.value === "Collaboration stack" || this.value === "Kollaborationsstapel") {
                            //remove cards: stack_training and stack_private
                            var checkCardsPrivate = ele.querySelector('#' + instance_data_stack_private[0].index)
                            if (checkCardsPrivate != null) {
                                for (let i = 0; i < instance_data_stack_private.length; i++) {
                                    ele.querySelector('#body-form').removeChild(instance_data_stack_private[i].root);
                                }
                            }
                            var checkCardsTraining = ele.querySelector('#' + instance_data_stack_training[0].index)
                            if (checkCardsTraining != null) {
                                for (let i = 0; i < instance_data_stack_training.length; i++) {
                                    ele.querySelector('#body-form').removeChild(instance_data_stack_training[i].root);
                                }
                            }
                            //add cards: stack_collaboration
                            for (let i = 0; i < instance_data_stack_collaboration.length; i++) {
                                ele.querySelector('#body-form').appendChild(instance_data_stack_collaboration[i].root);
                            }
                            // filter by topic
                            ele.querySelector('#input_topic_id').addEventListener('change', function () {
                                if (ele.querySelector('#select_stack_id').value === "Collaboration stack" || ele.querySelector('#select_stack_id').value === "Kollaborationsstapel") {
                                    const results = instance_data_stack_collaboration.filter(obj => {
                                        return obj.flashcardObject.topic === this.value;
                                    });
                                    if (results.length > 0) {
                                        // remove alls cards stack_collaboration
                                        for (let i = 0; i < instance_data_stack_collaboration.length; i++) {
                                            ele.querySelector('#body-form').removeChild(instance_data_stack_collaboration[i].root);
                                        }
                                        // add filtered result to shadowDom
                                        for (let i = 0; i < results.length; i++) {
                                            ele.querySelector('#body-form').appendChild(results[i].root);
                                        }
                                    } else {
                                        // remove filter: add all cards
                                        for (let i = 0; i < instance_data_stack_collaboration.length; i++) {
                                            ele.querySelector('#body-form').appendChild(instance_data_stack_collaboration[i].root);
                                        }
                                    }
                                }
                            });
                            // filter by name
                            ele.querySelector('#input_name_id').addEventListener('change', function () {
                                if (ele.querySelector('#select_stack_id').value === "Collaboration stack" || ele.querySelector('#select_stack_id').value === "Kollaborationsstapel") {
                                    const results = instance_data_stack_collaboration.filter(obj => {
                                        return obj.flashcardObject.name === this.value;
                                    });
                                    if (results.length > 0) {
                                        // remove alls cards stack_collaboration
                                        for (let i = 0; i < instance_data_stack_collaboration.length; i++) {
                                            ele.querySelector('#body-form').removeChild(instance_data_stack_collaboration[i].root);
                                        }
                                        // add filtered result to shadowDom
                                        for (let i = 0; i < results.length; i++) {
                                            ele.querySelector('#body-form').appendChild(results[i].root);
                                        }
                                    } else {
                                        // remove filter: add all cards
                                        for (let i = 0; i < instance_data_stack_collaboration.length; i++) {
                                            ele.querySelector('#body-form').appendChild(instance_data_stack_collaboration[i].root);
                                        }
                                    }
                                }
                            });
                            // filter by ID
                            ele.querySelector('#input_id').addEventListener('change', function () {
                                if (ele.querySelector('#select_stack_id').value === "Collaboration stack" || ele.querySelector('#select_stack_id').value === "Kollaborationsstapel") {
                                    const results = instance_data_stack_collaboration.filter(obj => {
                                        return obj.flashcardObject.id.toString() === this.value.toString();
                                    });
                                    if (results.length > 0) {
                                        // remove alls cards stack_collaboration
                                        for (let i = 0; i < instance_data_stack_collaboration.length; i++) {
                                            ele.querySelector('#body-form').removeChild(instance_data_stack_collaboration[i].root);
                                        }
                                        // add filtered result to shadowDom
                                        for (let i = 0; i < results.length; i++) {
                                            ele.querySelector('#body-form').appendChild(results[i].root);
                                        }
                                    } else {
                                        // remove filter: add all cards
                                        for (let i = 0; i < instance_data_stack_collaboration.length; i++) {
                                            ele.querySelector('#body-form').appendChild(instance_data_stack_collaboration[i].root);
                                        }
                                    }
                                }
                            });
                        }
                        if (this.value === "Private stack" || this.value === "Privates Stapel") {
                            //remove cards: stack_collaboration and stack_training
                            var checkCardsCollaboration = ele.querySelector('#' + instance_data_stack_collaboration[0].index)
                            if (checkCardsCollaboration != null) {
                                for (let i = 0; i < instance_data_stack_collaboration.length; i++) {
                                    ele.querySelector('#body-form').removeChild(instance_data_stack_collaboration[i].root);
                                }
                            }
                            var checkCardsTrainingS = ele.querySelector('#' + instance_data_stack_training[0].index)
                            if (checkCardsTrainingS != null) {
                                for (let i = 0; i < instance_data_stack_training.length; i++) {
                                    ele.querySelector('#body-form').removeChild(instance_data_stack_training[i].root);
                                }
                            }
                            //add cards: stack_private
                            for (let i = 0; i < instance_data_stack_private.length; i++) {
                                ele.querySelector('#body-form').appendChild(instance_data_stack_private[i].root);
                            }
                            // filter by topic
                            ele.querySelector('#input_topic_id').addEventListener('change', function () {
                                if (ele.querySelector('#select_stack_id').value === "Private stack" || ele.querySelector('#select_stack_id').value === "Privates Stapel") {
                                    const results = instance_data_stack_private.filter(obj => {
                                        return obj.flashcardObject.topic === this.value;
                                    });
                                    if (results.length > 0) {
                                        // remove alls cards stack_private
                                        for (let i = 0; i < instance_data_stack_private.length; i++) {
                                            ele.querySelector('#body-form').removeChild(instance_data_stack_private[i].root);
                                        }
                                        // add filtered result to shadowDom
                                        for (let i = 0; i < results.length; i++) {
                                            ele.querySelector('#body-form').appendChild(results[i].root);
                                        }
                                    } else {
                                        // remove filter: add all cards
                                        for (let i = 0; i < instance_data_stack_private.length; i++) {
                                            ele.querySelector('#body-form').appendChild(instance_data_stack_private[i].root);
                                        }
                                    }
                                }
                            });
                            // filter by name
                            ele.querySelector('#input_name_id').addEventListener('change', function () {
                                if (ele.querySelector('#select_stack_id').value === "Private stack" || ele.querySelector('#select_stack_id').value === "Privates Stapel") {
                                    const results = instance_data_stack_private.filter(obj => {
                                        return obj.flashcardObject.name === this.value;
                                    });
                                    if (results.length > 0) {
                                        // remove alls cards stack_private
                                        for (let i = 0; i < instance_data_stack_private.length; i++) {
                                            ele.querySelector('#body-form').removeChild(instance_data_stack_private[i].root);
                                        }
                                        // add filtered result to shadowDom
                                        for (let i = 0; i < results.length; i++) {
                                            ele.querySelector('#body-form').appendChild(results[i].root);
                                        }
                                    } else {
                                        // remove filter: add all cards
                                        for (let i = 0; i < instance_data_stack_private.length; i++) {
                                            ele.querySelector('#body-form').appendChild(instance_data_stack_private[i].root);
                                        }
                                    }
                                }
                            });
                            // filter by ID
                            ele.querySelector('#input_id').addEventListener('change', function () {
                                if (ele.querySelector('#select_stack_id').value === "Private stack" || ele.querySelector('#select_stack_id').value === "Privates Stapel") {
                                    const results = instance_data_stack_private.filter(obj => {
                                        return obj.flashcardObject.id.toString() === this.value.toString();
                                    });
                                    if (results.length > 0) {
                                        // remove alls cards stack_private
                                        for (let i = 0; i < instance_data_stack_private.length; i++) {
                                            ele.querySelector('#body-form').removeChild(instance_data_stack_private[i].root);
                                        }
                                        // add filtered result to shadowDom
                                        for (let i = 0; i < results.length; i++) {
                                            ele.querySelector('#body-form').appendChild(results[i].root);
                                        }
                                    } else {
                                        // remove filter: add all cards
                                        for (let i = 0; i < instance_data_stack_private.length; i++) {
                                            ele.querySelector('#body-form').appendChild(instance_data_stack_private[i].root);
                                        }
                                    }
                                }
                            });
                        }
                        if (this.value === "Training stack" || this.value === "Trainings Stapel") {
                            //remove cards: stack_collaboration and stack_private
                            var checkCardsCollaborationS = ele.querySelector('#' + instance_data_stack_collaboration[0].index)
                            if (checkCardsCollaborationS != null) {
                                for (let i = 0; i < instance_data_stack_collaboration.length; i++) {
                                    ele.querySelector('#body-form').removeChild(instance_data_stack_collaboration[i].root);
                                }
                            }
                            var checkCardsStackPrivate = ele.querySelector('#' + instance_data_stack_private[0].index)
                            if (checkCardsStackPrivate != null) {
                                for (let i = 0; i < instance_data_stack_private.length; i++) {
                                    ele.querySelector('#body-form').removeChild(instance_data_stack_private[i].root);
                                }
                            }
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
                                        for (let i = 0; i < instance_data_stack_training.length; i++) {
                                            ele.querySelector('#body-form').removeChild(instance_data_stack_training[i].root);
                                        }
                                        // add filtered result to shadowDom
                                        for (let i = 0; i < results.length; i++) {
                                            ele.querySelector('#body-form').appendChild(results[i].root);
                                        }
                                    } else {
                                        // remove filter: add all cards
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
                                        for (let i = 0; i < instance_data_stack_training.length; i++) {
                                            ele.querySelector('#body-form').removeChild(instance_data_stack_training[i].root);
                                        }
                                        // add filtered result to shadowDom
                                        for (let i = 0; i < results.length; i++) {
                                            ele.querySelector('#body-form').appendChild(results[i].root);
                                        }
                                    } else {
                                        // remove filter: add all cards
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
                                        for (let i = 0; i < instance_data_stack_training.length; i++) {
                                            ele.querySelector('#body-form').removeChild(instance_data_stack_training[i].root);
                                        }
                                        // add filtered result to shadowDom
                                        for (let i = 0; i < results.length; i++) {
                                            ele.querySelector('#body-form').appendChild(results[i].root);
                                        }
                                    } else {
                                        // remove filter: add all cards
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