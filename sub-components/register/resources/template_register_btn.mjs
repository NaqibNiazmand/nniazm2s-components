import {html, render} from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';
export {render};
/**
 * HTML template for register
 * @returns {TemplateResult}
 */
export function register_button(app, events) {
    return html`
        <header>
            <style>
                .button {
                    background-color: #4CAF50; /* Green */
                    border: none;
                    color: white;
                    padding: 16px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    transition-duration: 0.4s;
                    cursor: pointer;
                }

                .button1 {
                    background-color: white;
                    color: black;
                    border: 2px solid #4CAF50;
                }

                .button1:hover {
                    background-color: #4CAF50;
                    color: white;
                }
            </style>
            <section class="d-flex align-items-center">
                <div id="id_for_reg_btn" ></div>
            </section>
            <section class="d-flex align-items-center">
                <button type="button" class="button button1" @click=${events.register_button}
                        data-lang="btn_register">${app.text.btn_register}</button>
            </section>
        </header>
        <main>
        </main>
    `;
}


