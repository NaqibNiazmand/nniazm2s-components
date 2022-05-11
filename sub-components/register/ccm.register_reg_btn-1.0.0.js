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
            "html": ["ccm.load", "./../sub-components/register/resources/templates_register.mjs"],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
                "translations": {
                    "de": ["ccm.load", "./../sub-components/register/resources/resources.mjs#de"],
                    "en": ["ccm.load", "./../sub-components/register/resources/resources.mjs#en"],
                }
            }],
            "text": ["ccm.load", "./../sub-components/register/resources/resources.mjs#de"],
            "user": ["ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js"],
            "hash": ["ccm.load", "https://kaul.inf.h-brs.de/ccmjs/akless-components/modules/md5.mjs"],
            "smart_memorize" : ["ccm.component", "./../smart_memorize/versions/ccm.smart_memorize-1.0.1.js"],
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
                    document.body.innerHTML = ''
                    const divEle = document.createElement('div');
                    divEle.setAttribute('id', 'divForRegistration')
                    this.html.render(this.html.registieren(this, events), divEle);
                    document.body.appendChild(divEle)
                },
                /**
                 * register confirm button control
                 * @type {Function}
                 */
                confirm_button: async () => {
                    const username = document.getElementById('username').value
                    const password = document.getElementById("password").value;
                    const confirm_password = document.getElementById("repeat_password").value;
                    const md5Password = this.hash.md5(confirm_password);
                    let resultMsg;
                    const store = await ccm.store({url: 'https://ccm2.inf.h-brs.de', name: 'nniazm2s_users_db'});
                    const check_user_already_exists = await store.get(username);
                    if (username.charAt(username.length - 2) === '2') {
                        resultMsg = this.lang.getValue() === "de" ? "Bitte an der vor letzten position keine 2 in Benutzernamen verwenden." : "Please do not use 2 in user names at the before last position.";
                        alert(resultMsg)
                    } else if (username === '' || password === null || password === '' || confirm_password === '' || confirm_password === null) {
                        resultMsg = this.lang.getValue() === "de" ? "Bitte alle Felder befüllen." : "Please fill in all fields.";
                        alert(resultMsg)
                    } else if (check_user_already_exists !== null ){
                        resultMsg = this.lang.getValue() === "de" ? "Der Benutzer "+username +" existiert bereits. Bitte wählen Sie einen anderen Benutzernamen!" : "The user "+username +" already exists. Please choose another username!";
                        alert(resultMsg)
                    } else if (password === confirm_password && (password !== null || password !== '' || confirm_password !== '' || confirm_password !== null)) {
                        create_user(username, md5Password);
                    } else {
                        resultMsg = this.lang.getValue() === "de" ? "Passwörter stimmen nicht überein. Bitte versuchen Sie es noch einmal!" : "Passwords do not match. Please try again!";
                        alert(resultMsg)
                    }
                },
                /**
                 * register confirm button control
                 * @type {Function}
                 */
                showPassword: () => {
                    const input_password = document.getElementById("password");
                    const input_confirm_password = document.getElementById("repeat_password");
                    if (input_password.type === "password" || input_confirm_password.type === "password") {
                        input_password.type = "text";
                        input_confirm_password.type = "text";
                    } else {
                        input_password.type = "password";
                        input_confirm_password.type = "password";
                    }
                },
            }
            /**
             * create user in https://ccm2.inf.h-brs.de with name nniazm2s_users_db
             * @type {Function}
             */
            const create_user = async (username, password) => {
                /* sonder fall mit 2 am ende von Benutzernamen vermeiden,
                da Benutzernamen mit 2 am ende echte Hochschulseitige Account sein muss.
                Nicht erlaubet Benutzernamen sind z.B. username2s oder username2m usw.
                */
                const store = await ccm.store({url: 'https://ccm2.inf.h-brs.de', name: 'nniazm2s_users_db'});
                await store.set({
                    key: username,
                    user: username,
                    name: username,
                    realm: 'cloud',
                    token: password, // passwort muss als md5 wert abgespeichert werden!
                    _: {
                        realm: 'cloud',
                        creator: username,
                        access: {
                            get: 'all',
                            set: 'creator',
                            del: 'creator'
                        }
                    }
                });

                const private_stack_name = 'nniazm2s_flashcards_private_stack_'+username
                const create_private_stack_for_user = await ccm.store({url: 'https://ccm2.inf.h-brs.de', name: private_stack_name});
                await create_private_stack_for_user.set({ "key": "last_id", "value": 0 });

                const training_stack_name = 'nniazm2s_flashcards_training_stack_'+username
                const create_training_stack_for_user = await ccm.store({url: 'https://ccm2.inf.h-brs.de', name: training_stack_name});
                await create_training_stack_for_user.set({ "key": "last_id", "value":0});

                const resultMsg = this.lang.getValue() === "de" ? "Benutzer : " + username + " wurde erfolgreich erstellt." : "User : " + username + " was created successfully.";
                alert(resultMsg)
                this.ccm.start(this.smart_memorize, {root: document.body});
            }

            /**
             * renders/updates app content in webpage area
             * @type {Function}
             */
            const render = async () => {
                this.html.render(this.html.headerout(this, events), this.element);
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