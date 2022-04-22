/**
 * @overview A welcome component that includes language component, login component, registration component and a welcome text.
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 * @license The MIT License (MIT)
 * @changes
 * version 1.0.0 Registration and login components implemented
 * */

(() => {
    const component = {
        name: 'smart_memorize',
        version: [1, 0, 0],
        ccm: {
            url: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.min.js',
            crossorigin: 'anonymous'
        },
        config: {
            "css": ["ccm.load",
                [  // serial
                    "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap.min.css",
                    "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-dark.min.css",
                    "./resources/styles.css"
                ],
                "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-icons.min.css",
                { "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" },
            ],
            "md5": ["ccm.load", "http://www.myersdaily.org/joseph/javascript/md5.js"],
            "helper": ["ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.min.mjs"],
            "html": ["ccm.load", "./resources/templates.mjs"],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
                "translations": {
                    "de": ["ccm.load", "./resources/resources.mjs#de"],
                    "en": ["ccm.load", "./resources/resources.mjs#en"],
                }
            }],
            "text": ["ccm.load", "./resources/resources.mjs#de"],
            "user": ["ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js",
                {
                    realm: 'cloud',
                    hash: ["ccm.load", "https://ccmjs.github.io/akless-components/modules/md5.mjs"],
                    url: 'https://ccm2.inf.h-brs.de',
                    store: 'nniazm2s_users_store'
                }],
            "menu": ["ccm.load", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.11.0.js#bootstrap",],
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
                 * login control
                 * @type {Function}
                 */
                login: async () => {
                    const store = await ccm.store({ url: 'https://ccm2.inf.h-brs.de', name: 'nniazm2s_users_store' });
                    const result = await store.get('Test');
                    console.log('result ', result);
                },

                /**
                 * register button control
                 * @type {Function}
                 */
                register_button: async () => {
                    document.body.innerHTML = ''
                     var divEle = document.createElement('div');
                     divEle.setAttribute('id', 'divForRegistration')
                     this.html.render(this.html.registieren(this, events), divEle);
                     document.body.appendChild(divEle)
                },

                /**
                 * register confirm button control
                 * @type {Function}
                 */
                confirm_button: () => {
                    var username = document.getElementById('username').value
                    var password = document.getElementById("password").value;
                    var confirm_password = document.getElementById("repeat_password").value;
                    var md5Password = md5(confirm_password);
                    if (username.charAt(username.length - 2) === '2') {
                        var resultMsg = this.lang.getValue() === "de" ? "Bitte an der vor letzten position keine 2 in Benutzernamen verwenden." : "Please do not use 2 in user names at the before last position.";
                        alert(resultMsg)
                    } else if (username === null || username === '' || password === null || password === '' || confirm_password === '' || confirm_password === null) {
                        var resultMsg = this.lang.getValue() === "de" ? "Bitte alle Felder befüllen." : "Please fill in all fields.";
                        alert(resultMsg)
                    } else if (password === confirm_password && (password !== null || password !== '' || confirm_password !== '' || confirm_password !== null)) {
                        create_user(username, md5Password);
                        document.body.innerHTML = ''
                        var divEle = document.createElement('div');
                        divEle.setAttribute('id', 'divForRegistration2')
                        this.html.render(this.html.registieren(this, events), divEle);
                        document.body.appendChild(divEle)
                        this.ccm.start(this.component, { root: divEle });

                    } else {
                        var resultMsg = this.lang.getValue() === "de" ? "Passwörter stimmen nicht überein. Bitte versuchen Sie es noch einmal!" : "Passwords do not match. Please try again!";
                        alert(resultMsg)                    }
                },

                /**
                 * register confirm button control
                 * @type {Function}
                 */
                showPassword: () => {
                    var input_password = document.getElementById("password");
                    var input_confirm_password = document.getElementById("repeat_password");
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
             * create user in https://ccm2.inf.h-brs.de with name nniazm2s_users_store
             * @type {Function}
             */
            const create_user = async (username, password) => {
                /* sonder fall mit 2 am ende von Benutzernamen vermeiden,
                da Benutzernamen mit 2 am ende echte Hochschulseitige Account sein muss.
                Nicht erlaubet Benutzernamen sind z.B. username2s oder username2m usw.
                */
                const store = await ccm.store({ url: 'https://ccm2.inf.h-brs.de', name: 'nniazm2s_users_store' });
                await store.set({
                    key: username,
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
                var resultMsg = this.lang.getValue() === "de" ? "Benutzer : " + username + " wurde erfolgreich erstellt." :  "User : " + username + " was created successfully.";
                alert(resultMsg)
            }

            /**
             * renders/updates app content in webpage area
             * @type {Function}
             */
            const render = () => {
                this.html.render(this.html.main(this, events), this.element);
                this.lang.translate();
            }

            this.start = async () => {
                // render content
                render();
                // render user login/logout button
                this.user && $.append(this.element.querySelector('header section:last-child'), this.user.root);
                // render language selection
                this.lang && $.append(this.element.querySelector('header section:last-child'), this.lang.root);

            };

        }
    };
    let b = "ccm." + component.name + (component.version ? "-" + component.version.join(".") : "") + ".js"; if (window.ccm && null === window.ccm.files[b]) return window.ccm.files[b] = component; (b = window.ccm && window.ccm.components[component.name]) && b.ccm && (component.ccm = b.ccm); "string" === typeof component.ccm && (component.ccm = { url: component.ccm }); let c = (component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/) || [""])[0]; if (window.ccm && window.ccm[c]) window.ccm[c].component(component); else { var a = document.createElement("script"); document.head.appendChild(a); component.ccm.integrity && a.setAttribute("integrity", component.ccm.integrity); component.ccm.crossorigin && a.setAttribute("crossorigin", component.ccm.crossorigin); a.onload = function () { (c = "latest" ? window.ccm : window.ccm[c]).component(component); document.head.removeChild(a) }; a.src = component.ccm.url }
})();