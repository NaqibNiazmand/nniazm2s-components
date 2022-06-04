/**
 * @overview HTML templates of ccmjs-based web component for ...
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 */
import {html, render} from "https://ccmjs.github.io/tkless-components/libs/lit/lit.js";
export { render };
/**
 * returns the main HTML template
 * @param {Object} app - ccmjs-based app instance for commentary
 * @returns {TemplateResult} main HTML template
 */
export function mainContent(app, flashcardObject) {
    return html`
    <div id="represent_flashcard_id">
      <section class="d-flex align-items-center"></section>
      <main>
        <table>
          <tr>
            <th data-lang="flashcard_name">${app.text.flashcard_name}</th>
            <th data-lang="flashcard_id">${app.text.flashcard_id}</th>
          </tr>
          <tr>
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
}
