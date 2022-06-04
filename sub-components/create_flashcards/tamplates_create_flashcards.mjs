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
export function mainContent(app, events) {
    return html`
        <div id="create_flashcard_body_id">
            <div id="create_flashcards_id">
                <form id="create_flashcards-form">
                    <div id="header-form-id">
                        <section>
                            <label id="header-form-id_title"
                                   data-lang="header_form_title">${app.text.header_form_title}</label>
                        </section>
                        <section class="d-flex align-items-center">
                        </section>
                    </div>
                    <div id="body-form">
                        <label id="label_topic" data-lang="body_form_topic">${app.text.body_form_topic}</label>
                        <input type="text" name="input_topic" id="input_topic_id"/>
                        <label id="label_name" class="form-label" data-lang="body_form_name">${app.text.body_form_name}</label>
                        <input type="text" name="input_name" id="input_name_id"/>
                        <label id="label_stack" data-lang="body_form_stack">${app.text.body_form_stack} </label>
                        <select id="select_stack_id">
                            <option></option>
                            <option data-lang="body_form_stack_training"> ${app.text.body_form_stack_training}</option>
                            <option data-lang="body_form_stack_private"> ${app.text.body_form_stack_private}</option>
                            <option data-lang="body_form_stack_collaboration"> ${app.text.body_form_stack_collaboration}
                            </option>
                        </select>
                        <br>
                        <br>
                        <label id="label_description" class="form-label"
                               data-lang="body_form_description">${app.text.body_form_description}</label>
                        <br>
                        <textarea id="card_description_id" name="card_description" rows="4" cols="50"> </textarea>
                        <p id="info_text_description_id" class="info-text">
                            <mark data-lang="body_form_description_info_text">
                                ${app.text.body_form_description_info_text}
                            </mark>
                        </p>
                        <label id="label_translation" class="form-label"
                               data-lang="body_form_translation">${app.text.body_form_translation}</label>
                        <br>
                        <textarea id="card_translation_id" name="card_translation" rows="4" cols="50"> </textarea>
                        <p id="info_text_translation_id" class="info-text">
                            <mark data-lang="body_form_translation_info_text">
                                ${app.text.body_form_translation_info_text}
                            </mark>
                        </p>
                        <p id="info_text_required_fields_id" class="info-text">
                            <mark data-lang="body_form_info_text_required_fields">
                                ${app.text.body_form_info_text_required_fields}
                            </mark>
                        </p>
                    </div>
                    <div id="footer-form">
                        <button type="button" class="glow-on-hover" id="cancel_btn" @click=${events.cancel_button}
                                data-lang="footer_form_button_canel">
                            ${app.text.footer_form_button_canel}
                        </button>
                        <button type="button" class="glow-on-hover" id="save_btn" @click=${events.save_button}
                                data-lang="footer_form_button_save">${app.text.footer_form_button_save}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}
