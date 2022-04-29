/**
 * @overview Web component for multilingualism
 * @author Naqib Niazmand <naqib.niazmand@smail.inf.h-brs.de>
 * @license The MIT License (MIT)
 * */

/**
 * german texts and labels
 * @type {Object}
 */
export const de = {
    "welcome_text" : "Willkommen auf Lernkarten-App. Hier haben Sie die Möglichkeiten: Lernkarten zu erstellen oder aus Webseiten wie Wikipedia generieren zu lassen.",
    "options_text" : "Smart Memorize bittet Ihnen folgende Möglichkeiten an:",
    "create_free_user_profile" : "Kostenlosen Benutzer Profil zu erstellen.",
    "create_flashcards" : "Lernkarten zum einem bestimmten Thema zu erstellen.",
    "select_flashcard_pool" : "Vorhandene Lernkarten aus dem Kateikarten Pool auszuwählen.",
    "sort_flashcard_by_name_and_topic" : "Lernkarten gezielt nach Thema und Namen zu sortieren.",
    "create_individual_training_pool" : "Individuelle Trainingspool zu erstellen.",
    "btn_register" : "Registrieren",
    "registration_form" : "Registrierungsformular",
    "username" : "Benutzernamen",
    "enter_username" : "Benutzernamen eingeben",
    "password" : "Passwort",
    "enter_password" : "Passwort eingeben",
    "repeat_password" : "Passwort wiederholen",
    "show_password" : "Passwort anzeigen",
    "confirm_button_text" : "Bestätigen",
    "smart_memorize_services_user_profil" : "Um die Möglichkeiten des Smart Memorize nutzen zu können, benötigen sie einen Kostenlosen Benutzerprofil.",
    "user_registration_click" : "Zur Registrierung klicken sie auf den Registierungsbutton:",
};

/**
 * english texts and labels
 * @type {Object}
 */
export const en = {
    "welcome_text" : "Welcome to flashcards app. Here you have the options: Create flashcards or have them generated from websites like Wikipedia.",
    "options_text" : "Smart Memorize offers you the following options:",
    "create_free_user_profile" : "Create free user profile.",
    "create_flashcards" : "Create flashcards on a specific topic.",
    "select_flashcard_pool" : "Select existing flashcards from the flashcard pool.",
    "sort_flashcard_by_name_and_topic" : "Sort flashcards specifically by topic and name.",
    "create_individual_training_pool" : "Create individual training pool.",
    "btn_register" : "Register",
    "registration_form" : "Registration form",
    "username" : "Username",
    "enter_username" : "Enter Username",
    "password" : "Password",
    "enter_password" : "Enter Password",
    "repeat_password" : "Repeat Password",
    "show_password" : "Show Password",
    "confirm_button_text" : "Confirm",
    "smart_memorize_services_user_profil" : "To be able to use the features of Smart Memorize, you need a free user profile.",
    "user_registration_click" : "Click on the registration button to register:",
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
        "translations": { "de": de, "en": en }
    } ],
    "text": de,
    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js" ]
};
