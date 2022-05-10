/**
 * @overview HTML templates of ccmjs-based web component for ...
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 */
import {html, render} from "https://ccmjs.github.io/tkless-components/libs/lit/lit.js";
export {render};
/**
 * returns the main HTML template
 * @param {Object} app - ccmjs-based app instance for commentary
 * @returns {TemplateResult} main HTML template
 */
export function mainContent(app, events, front, back) {
    return html`
        <div id="body-form">
            <div id="left_menu_topic_and_next_button">
                <label data-lang="header_stack">${app.text.header_topic}</label>
                <select id="select-topics"></select>
                <label id="space_top"></label>
                <button @click=${events.next_button} id="next">
                    ${app.text.footer_form_button_next}
                </button>
            </div>
            <label id="space_right"></label>
            <div id="start_training_stack"></div>
        </div
    `;
}