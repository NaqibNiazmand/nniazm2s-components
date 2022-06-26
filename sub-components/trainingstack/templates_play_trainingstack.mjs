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
export function mainContent(app, events) {
    if(app.is_vocabulary_sets === true){
        return html`
        <div id="body-form">
            <div id="left_menu_topic_and_next_button">
                <label data-lang="menu_left_check_translation">${app.text.menu_left_enter_translation}:</label>
                <input type="text" name="menu_left_enter_translation_name" id="menu_left_enter_translation_input"/>
                <button  class="glow-on-hover" @click=${events.menu_left_check_translation_button} id="menu_left_check_translation_button" data-lang="menu_left_enter_translation">
                    ${app.text.menu_left_check_translation}
                </button>
                <label id="space_top"></label>
                <label data-lang="menu_left_next_flashcard_label_part_1">${app.text.menu_left_next_flashcard_label_part_1}</label>
                <label data-lang="menu_left_next_flashcard_label_part_2">${app.text.menu_left_next_flashcard_label_part_2}</label>
                <button  class="glow-on-hover" @click=${events.next_button} id="next" data-lang="menu_left_button_next">
                    ${app.text.menu_left_button_next}
                </button>
            </div>
            <label id="space_right"></label>
            <div id="start_training_stack"></div>
        </div
    `;
    }else {
        return html`
        <div id="body-form">
            <div id="left_menu_topic_and_next_button">
                <label data-lang="menu_left_topic">${app.text.menu_left_topic}:</label>
                <select id="select-topics"></select>
                <label id="space_top"></label>
                <label data-lang="menu_left_check_translation">${app.text.menu_left_enter_translation}:</label>
                <input type="text" name="menu_left_enter_translation_name" id="menu_left_enter_translation_input"/>
                <button  class="glow-on-hover" @click=${events.menu_left_check_translation_button} id="menu_left_check_translation_button" data-lang="menu_left_enter_translation">
                    ${app.text.menu_left_check_translation}
                </button>
                <label id="space_top"></label>
                <label data-lang="menu_left_next_flashcard_label_part_1">${app.text.menu_left_next_flashcard_label_part_1}</label>
                <label data-lang="menu_left_next_flashcard_label_part_2">${app.text.menu_left_next_flashcard_label_part_2}</label>
                <button  class="glow-on-hover" @click=${events.next_button} id="next" data-lang="menu_left_button_next">
                    ${app.text.menu_left_button_next}
                </button>
            </div>
            <label id="space_right"></label>
            <div id="start_training_stack"></div>
        </div
    `;
    }
}