// set default language
var defaultLangCode = 'en';
// set language used to the default one
var langCode = defaultLangCode;

module.exports = {
    defaultLangCode: defaultLangCode,
    getLang: () => {return langCode},
    setLang: (code) => {
        langCode = code;
        console.log(langCode);
    }
}