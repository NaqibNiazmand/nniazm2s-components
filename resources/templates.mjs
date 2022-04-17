/**
 * @overview HTML templates of ccmjs-based web component for ...
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 */

import { html, render, repeat } from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} app - ccmjs-based app instance for commentary
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main(app, events) {
    return html`
        ${header(app, events)}
        ${mainContent(app)}
        ${footer()}
    `;
}

/**
 * HTML template for header
 * @returns {TemplateResult}
 */
export function header(app, events) {
    if (app.user.isLoggedIn()) {
        return html`
            <header>
                <section>
                    <!-- logo -->
                    <img src="./resources/Logo.PNG" alt="Logo Picture" height="100px" width="200px"></img>
                </section>
                <section class="d-flex align-items-center">
                </section>
            </header>
        `;
    } else {
        return html`
            <header>
                <section>
                    <!-- logo -->
                    <img src="./resources/Logo.PNG" alt="Logo Picture" height="100px" width="200px"></img>
                </section>
                <section class="d-flex align-items-center">
                    <button type="button" class="btn btn-sm btn-light" @click=${events.register_button}
                        data-lang="btn_register">${app.text.btn_register}</button>
                </section>
            </header>
        `;
    }

    app.start()
}

export function mainContent(app) {
    return html`
        <main>
            <div>
        
                <body>
                    <p data-lang="welcome_text">${app.text.welcome_text}</p>
                    <p data-lang="options_text">${app.text.options_text}</p>
                    <ul>
                        <li data-lang="create_free_user_profile">${app.text.create_free_user_profile}</li>
                        <li data-lang="create_flashcards">${app.text.create_flashcards}</li>
                        <li data-lang="select_flashcard_pool">${app.text.select_flashcard_pool}</li>
                        <li data-lang="sort_flashcard_by_name_and_topic">${app.text.sort_flashcard_by_name_and_topic}</li>
                        <li data-lang="create_individual_training_pool">${app.text.create_individual_training_pool}</li>
                    </ul>
                </body>
            </div>
        </main>
    `;
}

/**
 * HTML template for footer
 * @returns {TemplateResult}
 */
export function footer() {
    return html`
        <footer>
            <p>Made by Naqib Niazmand</p>
        </footer>
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
            #registration{
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
            <input type="text" data-lang="enter_username" placeholder=${app.text.enter_username} name="username" id="username" required>
            <br>
            <br>
            <label for="password" data-lang="password" >${app.text.password}</label>
            <br>
            <input type="password" data-lang="enter_password" placeholder=${app.text.enter_password} name="password" id="password" required>
            <br>
            <br>
            <label for="repeat_password" data-lang="repeat_password" >${app.text.repeat_password}</label>
            <br>
            <input type="password" data-lang="enter_password" placeholder=${app.text.enter_password} name="repeat_password" id="repeat_password" required>
            <br>
            <br>
            <input type="checkbox" @click=${events.showPassword} data-lang="show_password" >${app.text.show_password}
            <br><br>
            <button type="button" @click=${events.confirm_button} class="button button1" data-lang="confirm_button_text"> ${app.text.confirm_button_text} </button>
        </form>
    </div>
    `;
}