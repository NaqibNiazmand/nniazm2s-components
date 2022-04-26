/**
 * @overview HTML templates of ccmjs-based web component for ...
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 */

import { html, render, repeat } from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';
export { render };
/**
 * returns the main HTML template
 * @param {Object} app - ccmjs-based app instance for commentary
 * @returns {TemplateResult} main HTML template
 */
export function mainContent(app) {
    return html`
        <header>
            <section></section>
            <section class="d-flex align-items-center"> </section>
        </header>
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
