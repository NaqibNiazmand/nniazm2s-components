import {html, render} from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';
export {render};
/**
 * HTML template for register
 * @returns {TemplateResult}
 */
export function headerout(app, events) {
    return html`
        <header>
            <style>
                .button {
                    background-color: #4CAF50; /* Green */
                    border: none;
                    color: white;
                    padding: 16px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    transition-duration: 0.4s;
                    cursor: pointer;
                }

                .button1 {
                    background-color: white;
                    color: black;
                    border: 2px solid #4CAF50;
                }

                .button1:hover {
                    background-color: #4CAF50;
                    color: white;
                }
            </style>
            <section class="d-flex align-items-center">
                <div id="id_for_reg_btn" ></div>
            </section>
            <section class="d-flex align-items-center">
                <button type="button" class="button button1" @click=${events.register_button}
                        data-lang="btn_register">${app.text.btn_register}</button>
            </section>
        </header>
        <main>
        </main>
    `;
}

/**
 * HTML template for Registerform
 * @returns {TemplateResult}
 */
export function registieren(app, events) {
    return html`
        <div id="registration">
            <style>
                #registration {
                    border: 5px solid #4CAF50;
                    z-index: 1;
                    background: white;
                    max-width: 360px;
                    margin: 0 auto 100px;
                    padding: 45px;
                    text-align: center;
                }

                .button {
                    background-color: #4CAF50; /* Green */
                    border: none;
                    color: white;
                    padding: 16px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    transition-duration: 0.4s;
                    cursor: pointer;
                }

                .button1 {
                    background-color: white;
                    color: black;
                    border: 2px solid #4CAF50;
                }

                .button1:hover {
                    background-color: #4CAF50;
                    color: white;
                }
            </style>
            <form id="regForm">
                <label data-lang="registration_form">${app.text.registration_form}</label>
                <br>
                <br>
                <br>
                <label for="username" data-lang="username">${app.text.username}</label>
                <br>
                <input type="text" data-lang="enter_username" placeholder=${app.text.enter_username} name="username"
                       id="username" required>
                <br>
                <br>
                <label for="password" data-lang="password">${app.text.password}</label>
                <br>
                <input type="password" data-lang="enter_password" placeholder=${app.text.enter_password} name="password"
                       id="password" required>
                <br>
                <br>
                <label for="repeat_password" data-lang="repeat_password">${app.text.repeat_password}</label>
                <br>
                <input type="password" data-lang="enter_password" placeholder=${app.text.enter_password}
                       name="repeat_password" id="repeat_password" required>
                <br>
                <br>
                <input type="checkbox" @click=${events.showPassword} data-lang="show_password">${app.text.show_password}
                <br><br>
                <button type="button" @click=${events.confirm_button} class="button button1"
                        data-lang="confirm_button_text"> ${app.text.confirm_button_text}
                </button>
                <button type="button" @click=${events.back_to_smart_memorize} class="button button1"
                        data-lang="button_back_to_smart_memorize"> ${app.text.button_back_to_smart_memorize}
                </button>
            </form>
        </div>
    `;
}

