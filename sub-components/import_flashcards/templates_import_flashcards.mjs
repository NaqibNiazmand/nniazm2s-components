/**
 * @overview HTML templates of ccmjs-based web component for ...
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 */
import {html, render} from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';

export {render};

/**
 * returns the main HTML template
 * @param {Object} app - ccmjs-based app instance for commentary
 * @returns {TemplateResult} main HTML template
 */
export function mainContent(app) {
    if (app.user.isLoggedIn() === true) {
        return html`
            <div id="import_flashcard_body_id">
                <form id="import_flashcards_upload_form">
                    <label data-lang="select_stack"> ${app.text.select_stack}</label>
                    <br>
                    <select id="select_stack_id" required="required">
                        <option></option>
                        <option data-lang="flashcard_stack_training"> ${app.text.flashcard_stack_training}</option>
                        <option data-lang="flashcard_stack_private"> ${app.text.flashcard_stack_private}</option>
                        <option data-lang="flashcard_stack_collaboration"> ${app.text.flashcard_stack_collaboration}
                        </option>
                    </select>
                    <br>
                    <br>
                    <label for="import_flashcards_upload" data-lang="select_file">${app.text.select_file}</label>
                    <br>
                    <input type="file" id="import_csv_file" accept=".csv" name="import_flashcards_upload"
                           required="required"/>
                    <br>
                    <br>
                    <button type="submit" id="import_csv_file_btn" data-lang="import_csv_file_btn"
                            class="glow-on-hover">
                        ${app.text.import_csv_file_btn}
                    </button>
                    <br>
                    <br>
                    <div id="infoBox">
                        <label data-lang="please_construct_the_file_as_follows">${app.text.please_construct_the_file_as_follows}</label>
                        <br>
                        <label data-lang="description_translation">${app.text.description_translation}</label>
                        <br>
                        <br>
                        <label data-lang="or_as_follows">${app.text.or_as_follows}</label>
                        <br>
                        <label data-lang="topic_name_description_translation">${app.text.topic_name_description_translation}</label>
                        <br>
                        <br>
                        <label data-lang="flashcards_can_be_downloaded_from_the_website">${app.text.flashcards_can_be_downloaded_from_the_website}</label>
                        <a href="https://www.limbiks.com/">www.limbiks.com</a>
                        <br>
                        <label data-lang="generated_exported_and_imported_here">${app.text.generated_exported_and_imported_here}</label>
                    </div>
                </form>
            </div>
        `;
    } else {
        return html`
            <div id="import_flashcard_body_id">
                <form id="import_flashcards_upload_form">
                    <label data-lang="select_stack"> ${app.text.select_stack}</label>
                    <br>
                    <select id="select_stack_id" required="required">
                        <option data-lang="flashcard_stack_collaboration"> ${app.text.flashcard_stack_collaboration}
                        </option>
                    </select>
                    <br>
                    <br>
                    <label for="import_flashcards_upload" data-lang="select_file">${app.text.select_file}</label>
                    <br>
                    <input type="file" id="import_csv_file" accept=".csv" name="import_flashcards_upload"
                           required="required"/>
                    <br>
                    <br>
                    <button type="submit" id="import_csv_file_btn" data-lang="import_csv_file_btn"
                            class="glow-on-hover">
                        ${app.text.import_csv_file_btn}
                    </button>
                    <br>
                    <br>
                    <div id="infoBox">
                        <label data-lang="please_construct_the_file_as_follows">${app.text.please_construct_the_file_as_follows}</label>
                        <br>
                        <label data-lang="description_translation">${app.text.description_translation}</label>
                        <br>
                        <br>
                        <label data-lang="or_as_follows">${app.text.or_as_follows}</label>
                        <br>
                        <label data-lang="topic_name_description_translation">${app.text.topic_name_description_translation}</label>
                        <br>
                        <br>
                        <label data-lang="flashcards_can_be_downloaded_from_the_website">${app.text.flashcards_can_be_downloaded_from_the_website}</label>
                        <a href="https://www.limbiks.com/">www.limbiks.com</a>
                        <br>
                        <label data-lang="generated_exported_and_imported_here">${app.text.generated_exported_and_imported_here}</label>
                    </div>
                </form>
            </div>
        `;
    }
}
