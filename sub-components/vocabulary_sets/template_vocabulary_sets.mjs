/**
 * @overview HTML templates of ccmjs-based web component for ...
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 */
import {html, render} from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';

export {render};

/**
 * HTML template for register
 * @returns {TemplateResult}
 */
export function header_main(app, events) {
    return html`
        <body>
        <header>
            <h1 data-lang="vocabulary_sets">${app.text.vocabulary_sets}</h1>
        </header>
        <main>
            <div id="new_vocabulary_sets">
                <label>vocabulary_sets anlegen</label>
                <input type="text" name="new_vocabulary_sets_input_name" id="new_vocabulary_sets_input_id"/>
                <button class="glow-on-hover" @click=${events.create_vocabulary_sets_button}
                        data-lang="vocabulary_sets_save_button">${app.text.vocabulary_sets_save_button}
                </button>
            </div>
            <br>
            <div id="content">
                <label>Vorhandene vocabulary_sets</label>
                <select id="select_vocabulary_sets"></select>
                <button class="glow-on-hover" @click=${events.create_vocabulary_button}
                        data-lang="create_vocabulary_button">${app.text.create_vocabulary_button}
                </button>
                <button class="glow-on-hover" @click=${events.learn_vocabulary_button}
                        data-lang="learn_vocabulary_button">${app.text.learn_vocabulary_button}</button>
            </div>
            <div id="show_vocabulary_sets"></div>
            <div id="create_vocabulary_id"></div>
        </main>
        </body>
    `;
}