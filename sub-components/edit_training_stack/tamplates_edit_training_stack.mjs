/**
 * @overview HTML templates of ccmjs-based web component for ...
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 */

import {html, render, repeat} from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';

export {render};

/**
 * returns the main HTML template
 * @param {Object} app - ccmjs-based app instance for commentary
 * @returns {TemplateResult} main HTML template
 */
export function mainContent(app) {
    return html`
        <div id="show_flashcards_id">
            <form id="show_flashcards-form">
                <div id="header-form-id">
                    <label data-lang="header_stack">${app.text.header_stack} </label>
                    <select id="select_stack_id">
                        <option data-lang="header_stack_training" value="${app.text.header_stack_training}"> ${app.text.header_stack_training}</option>
                    </select>
                    <label class="space_class"></label>
                    <label data-lang="header_topic">${app.text.header_topic}</label>
                    <input type="text" name="input_topic" id="input_topic_id" >
                    <label class="space_class"></label>
                    <label data-lang="header_name">${app.text.header_name}</label>
                    <input type="text" name="input_name" id="input_name_id"/>
                    <label class="space_class"></label>
                    <label data-lang="header_id">${app.text.header_id}</label>
                    <input type="text" name="input_id" id="input_id"/>
                    <section class="d-flex align-items-center">
                    </section>
                </div>
                <div id="body-form"></div>
            </form>
        </div>
    `;
}
