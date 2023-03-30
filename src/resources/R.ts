import ARROW_BACK from '../images/arrow_back.png';
import HELP from '../images/help.png';
import VISIBILITY from '../images/visibility.png';
import VISIBILITY_OFF from '../images/visibility_off.png';
export class R {
    static amuseWordsServer = 'https://api.datamuse.com/words';
    static urls = {
        amuseApi: ''
    }
   static images = {
       arrow_back: ARROW_BACK,
       help: HELP,
       visibility: VISIBILITY,
       visibility_off: VISIBILITY_OFF,
   };
    static constants = {
        russianAlphabet: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
        englishAlphabet: 'abcdefghijklmnopqrstuvwxyz',
    }
}
