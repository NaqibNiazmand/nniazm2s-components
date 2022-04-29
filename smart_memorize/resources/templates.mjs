/**
 * @overview HTML templates of ccmjs-based web component for ...
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 */

import {html, render, repeat} from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';

export {render};

/**
 * returns the main HTML template
 * @param {Object} app - ccmjs-based app instance for commentary
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main() {
    return html`
        ${header_main()}
        ${footer()}
    `;
}

/**
 * HTML template for register
 * @returns {TemplateResult}
 */
export function header_main() {
    return html`
        <header>
            <section>
                <!-- logo -->
                <img src="./resources/Logo.PNG" alt="Logo Picture" height="100px" width="200px"></img>
            </section>
            <section class="d-flex align-items-center">
            </section>
        </header>
        <main>
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
 * HTML template for register
 * @returns {TemplateResult}
 */
export function header_v_1_0_0() {
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
}

export function mainContent_V_1_0_0(app) {
    console.log("app", app)
    return html`
        <main>
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
            <p data-lang="smart_memorize_services_user_profil">${app.text.smart_memorize_services_user_profil}</p>
            <p data-lang="user_registration_click">${app.text.user_registration_click}</p>
            <div id ="user_registration" >
                
            </div>
            </body>
        </main>
    `;
}

/**
 * returns the main HTML template
 * @param {Object} app - ccmjs-based app instance for commentary
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main_V_1_0_0(app) {
    return html`
        ${header_v_1_0_0()}
        ${mainContent_V_1_0_0(app)}
        ${footer()}
    `;
}

