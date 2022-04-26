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
        name: 'smart_memorize',
        version: [1, 0, 1],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.js',
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
            "hash": [ "ccm.load", "https://kaul.inf.h-brs.de/ccmjs/akless-components/modules/md5.mjs" ],
            "helper": ["ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.0.0.mjs"],
            "html": ["ccm.load","../sub-components/home/resources/templates_home.mjs"],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.js", {
                "translations": {
                    "de": ["ccm.load", "./resources/resources.mjs#de"],
                    "en": ["ccm.load", "./resources/resources.mjs#en"],
                }
            }],
            "text": ["ccm.load", "./resources/resources.mjs#de"],
            "user": ["ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js"],
            "home" : ["ccm.component", "./../sub-components/home/ccm.home-1.0.0.js"],
            "menu": ["ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.11.0.js", {
                "data": {
                    "entries": [
                        {
                            "title": "Menu Item A",
                            "content": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-8.0.2.js" ]
                        },
                        {
                            "title": "Menu Item B",
                            "content": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/image_map/versions/ccm.image_map-4.0.0.js", ["ccm.load","https://ccmjs.github.io/akless-components/image_map/resources/resources.mjs#demo"] ]
                        },
                        {
                            "title": "Menu Item C",
                            "content": [ "ccm.proxy", "https://ccmjs.github.io/akless-components/guess_picture/versions/ccm.guess_picture-2.0.0.js" ]
                        }
                    ]
                }
            }],
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
                    const result = await store.get('Zartielah');
                    console.log('result ', result);
                },

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
                confirm_button: () => {
                    const username = document.getElementById('username').value
                    const password = document.getElementById("password").value;
                    const confirm_password = document.getElementById("repeat_password").value;
                    const md5Password = this.hash.md5(confirm_password);
                    let resultMsg;
                    if (username.charAt(username.length - 2) === '2') {
                        resultMsg = this.lang.getValue() === "de" ? "Bitte an der vor letzten position keine 2 in Benutzernamen verwenden." : "Please do not use 2 in user names at the before last position.";
                        alert(resultMsg)
                    } else if (username === '' || password === null || password === '' || confirm_password === '' || confirm_password === null) {
                        resultMsg = this.lang.getValue() === "de" ? "Bitte alle Felder befüllen." : "Please fill in all fields.";
                        alert(resultMsg)
                    } else if (password === confirm_password && (password !== null || password !== '' || confirm_password !== '' || confirm_password !== null)) {
                        create_user(username, md5Password);
                        document.body.innerHTML = ''
                        const divEle = document.createElement('div');
                        divEle.setAttribute('id', 'divForRegistration2')
                        this.html.render(this.html.registieren(this, events), divEle);
                        document.body.appendChild(divEle)
                        this.ccm.start(this.component, { root: divEle });

                    } else {
                        resultMsg = this.lang.getValue() === "de" ? "Passwörter stimmen nicht überein. Bitte versuchen Sie es noch einmal!" : "Passwords do not match. Please try again!";
                        alert(resultMsg)                    }
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
                const resultMsg = this.lang.getValue() === "de" ? "Benutzer : " + username + " wurde erfolgreich erstellt." :  "User : " + username + " was created successfully.";
                alert(resultMsg)
            }

            /**
             * renders/updates app content in webpage area is logged out
             * @type {Function}
             */
            const render_home = async () => {
                // this.html.render(this.html.main(this, events), this.element);
                // this.lang.translate();
                // // render user login/logout button
                // const user = await this.user.component.instance({
                //     realm: 'guest',
                //     hash: ["ccm.load", "https://kaul.inf.h-brs.de/ccmjs/akless-components/modules/md5.mjs"],
                //     url: 'https://ccm2.inf.h-brs.de',
                //     store: 'nniazm2s_users_store',
                //     onchange: event => event ? render_logged_in() : render_logged_out(),
                // });
                // await user.start();
                // // render user login/logout button
                // user && $.append(this.element.querySelector('header'), user.root);
                // // render language selection
                // this.lang && $.append(this.element.querySelector('header'), this.lang.root);
                this.home.start()

                console.log(this.home)
                this.home && this.home.start( { root: this.element.querySelector('main') } );
            }

            /**
             * renders/updates app content in webpage area is logged out
             * @type {Function}
             */
            const render_logged_out = () => {



               render_home()
                // this.home.start()
                // this.home && this.home.start( { root: this.element.querySelector('main') } );
            }

            /**
             * renders/updates app content in webpage area user is logged in
             * @type {Function}
             */
            const render_logged_in = () => {
                console.log('render_logged_in called')
                this.menu && this.menu.start( { root: this.element.querySelector('main') } );
            }

            this.start = async () => {
                // render_logged_out content
                render_home();
            };

        }
    };
    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();