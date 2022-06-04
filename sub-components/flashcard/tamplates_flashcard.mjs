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
export function mainContent(app, events, flashcardObject) {
    if(app.button === "flashcard_add_button" && app.user.isLoggedIn() === true) {
        return html`
        <div id="represent_flashcard_id">
<!--             render flashcard in frontend-->
            <section class="d-flex align-items-center">
            </section>
            <main>
                <table>
                    <tr>
                        <th data-lang="flashcard_stack">${app.text.flashcard_stack} </th>
                        <th data-lang="flashcard_topic">${app.text.flashcard_topic} </th>
                        <th data-lang="flashcard_name">${app.text.flashcard_name} </th>
                        <th data-lang="flashcard_id">${app.text.flashcard_id} </th>
                    </tr>
                    <tr>
                        <td>${flashcardObject.stack}</td>
                        <td>${flashcardObject.topic}</td>
                        <td>${flashcardObject.name}</td>
                        <td>${flashcardObject.id}</td>
                    </tr>
                </table>
                <div class="card flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <p id="flashcard_data_front">${flashcardObject.description}</p>
                        </div>
                        <div class="flip-card-back">
                            <p id="flashcard_data_back">${flashcardObject.translation}</p>
                        </div>
                    </div>
                </div>
                <div id="input">
                    <label data-lang="flashcard_stack">${app.text.flashcard_stack} </label>
                    <select id="select_stack_id">
                        <option data-lang="flashcard_stack_training"> ${app.text.flashcard_stack_training}</option>
                        <option data-lang="flashcard_stack_private"> ${app.text.flashcard_stack_private}</option>
                        <option data-lang="flashcard_stack_collaboration"> ${app.text.flashcard_stack_collaboration}
                        </option>
                    </select>
                    <button id="flashcard_add_btn"  data-lang="flashcard_add_btn" @click="${events.flashcard_add_button}" >${app.text.flashcard_add_btn}</button>
                    <span id="flashcard_lang"></span>
                </div>
            </main>
        </div>
    `;
    }else if(app.user.isLoggedIn() === false && app.button !== "flashcard_remove_button"){
        return html`
        <div id="represent_flashcard_id">
            <section class="d-flex align-items-center">
            </section>
            <main>
                <table>
                    <tr>
                        <th data-lang="flashcard_stack">${app.text.flashcard_stack} </th>
                        <th data-lang="flashcard_topic">${app.text.flashcard_topic} </th>
                        <th data-lang="flashcard_name">${app.text.flashcard_name} </th>
                        <th data-lang="flashcard_id">${app.text.flashcard_id} </th>
                    </tr>
                    <tr>
                        <td>${flashcardObject.stack}</td>
                        <td>${flashcardObject.topic}</td>
                        <td>${flashcardObject.name}</td>
                        <td>${flashcardObject.id}</td>
                    </tr>
                </table>
                <div class="card flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <p id="flashcard_data_front">${flashcardObject.description}</p>
                        </div>
                        <div class="flip-card-back">
                            <p id="flashcard_data_back">${flashcardObject.translation}</p>
                        </div>
                    </div>
                </div>
                <div id="input">
                    <span id="flashcard_lang"></span>
                </div>
            </main>
        </div>
    `;
    }else{
        return html`
        <div id="represent_flashcard_id">
            <section class="d-flex align-items-center">
            </section>
            <main>
                <table>
                    <tr>
                        <th data-lang="flashcard_stack">${app.text.flashcard_stack} </th>
                        <th data-lang="flashcard_topic">${app.text.flashcard_topic} </th>
                        <th data-lang="flashcard_name">${app.text.flashcard_name} </th>
                        <th data-lang="flashcard_id">${app.text.flashcard_id} </th>
                    </tr>
                    <tr>
                        <td>${flashcardObject.stack}</td>
                        <td>${flashcardObject.topic}</td>
                        <td>${flashcardObject.name}</td>
                        <td>${flashcardObject.id}</td>
                    </tr>
                </table>
                <div class="card flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <p id="flashcard_data_front">${flashcardObject.description}</p>
                        </div>
                        <div class="flip-card-back">
                            <p id="flashcard_data_back">${flashcardObject.translation}</p>
                        </div>
                    </div>
                </div>
                <div id="input">
                    <button id="flashcard_remove_btn"  data-lang="flashcard_remove_btn" class="glow-on-hover" @click="${events.flashcard_remove_button}" >${app.text.flashcard_remove_btn}</button>
                    <span id="flashcard_lang"></span>
                </div>
            </main>
        </div>
    `;
    }
}
