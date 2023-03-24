const voices = window.speechSynthesis.getVoices();
const synth = window.speechSynthesis;
export const utterance = new SpeechSynthesisUtterance();

function findVoice(lang: string) {
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang === lang) {
            return voices[i];
        }
    }
    return null;
}
export function speak(phrase: string, language: 'ru-RU' | 'us-US' = 'us-US') {
    console.log('speak');
    utterance.text = phrase;
    utterance.lang = language;
    utterance.voice = findVoice(utterance.lang);
    synth.speak(utterance);
}

export function cancelSpeak() {
    synth.cancel();
}
