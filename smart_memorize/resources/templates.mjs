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
 * HTML template for header
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

