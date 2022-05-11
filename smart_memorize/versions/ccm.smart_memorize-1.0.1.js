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
            "html": ["ccm.load","./../smart_memorize/resources/templates.mjs"],
            "lang": ["ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.js", {
                "translations": {
                    "de": ["ccm.load", "./../smart_memorize/resources/resources.mjs#de"],
                    "en": ["ccm.load", "./../smart_memorize/resources/resources.mjs#en"],
                }
            }],
            "text": ["ccm.load", "./../smart_memorize/resources/resources.mjs#de"],
            "user": [ 'ccm.component', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js'],
            "home" : ["ccm.start", "./../sub-components/home/ccm.home-1.0.0.js"],
            "register_reg_btn" : ["ccm.start", "./../sub-components/register/ccm.register_reg_btn-1.0.0.js"],
            "menu": ["ccm.component", "https://ccmjs.github.io/akless-components/menu/versions/ccm.menu-2.11.0.js"],
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
             * renders/updates app content in webpage area is logged out
             * @type {Function}
             */
            const render_home = async () => {
                this.html.render(this.html.main(), this.element);
                // render user login/logout button
                const user = await this.user.start( {
                    root: this.element.querySelector( 'header section:last-child' ),
                    realm: 'cloud',
                    hash: ["ccm.load", "https://kaul.inf.h-brs.de/ccmjs/akless-components/modules/md5.mjs"],
                    url: 'https://ccm2.inf.h-brs.de',
                    store: 'nniazm2s_users_db',
                    onchange: event => event ? render_logged_in() : render_logged_out(),
                    title: 'Please enter username and Password',
                });
                this.user = user
                if(!user.isLoggedIn()){
                    this.home && $.append(this.element.querySelector('main'), this.home.root);
                }else {
                    render_logged_in()
                }
                // render language selection
                this.lang.translate();
                this.lang && $.append(this.element.querySelector('header section:last-child'), this.lang.root);
            }

            /**
             * renders/updates app content in webpage area is logged out
             * @type {Function}
             */
            const render_logged_out = () => {
                this.ccm.start(this.component, {root: document.body});
            }

            /**
             * renders/updates app content in webpage area user is logged in
             * @type {Function}
             */
            const render_logged_in = () => {
                var title_crate_flashcards = this.lang.getValue() === "de" ? "Lernkarten erstellen" : "Create flashcards";
                var title_generate_flashcards = this.lang.getValue() === "de" ? "Lernkarten generieren" : "Generate flashcards";
                var title_show_flashcards = this.lang.getValue() === "de" ? "Lernkarten anzeigen" : "Show flashcards";
                var title_edit_training_stack = this.lang.getValue() === "de" ? "Trainingsstapel bearbeiten" : "Edit training stack";
                var title_start_training_stack = this.lang.getValue() === "de" ? "Trainingsstapel starten" : "Start training stack";
                this.menu && this.menu.start({
                    root: this.element.querySelector('main'),
                    "selected": 5,
                    "data": {
                        "entries": [
                            {
                                "title": title_crate_flashcards,
                                "content": [ "ccm.proxy", "./../sub-components/create_flashcards/ccm.create_flashcards-1.0.0.js", {"user": this.user}],
                                // "actions": [ [ "console.log", "Performed action of menu entry C." ] ]
                            },
                            {
                                "title": title_generate_flashcards,
                                //ToDo create sub component for the generation of flashcards from websites
                                // "content": [ "ccm.proxy", "./../sub-components/create_flashcards/ccm.create_flashcards-1.0.0.js", {"user": this.user}]
                                "content": "ToDo: Create sub component for the generation of flashcards from websites"
                            },
                            {
                                "title": title_show_flashcards,
                                "content": [ "ccm.proxy", "./../sub-components/show_flashcards/ccm.show_flashcards-1.0.0.js", {"user": this.user}]
                            },
                            {
                                "title": title_edit_training_stack,
                                "content": [ "ccm.proxy", "./../sub-components/edit_training_stack/ccm.edit_training_stack-1.0.0.js", {"user": this.user}]
                            },
                            {
                                "title": title_start_training_stack,
                                "content": [ "ccm.proxy", "./../sub-components/trainingstack/ccm.play_trainingstack-1.0.0.js", {"user": this.user}]
                            }
                        ]
                    },
                });
            }

            this.start = async () => {
                // render_logged_out content
                render_home();
            };

        }
    };
    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();
