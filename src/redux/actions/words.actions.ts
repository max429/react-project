import axios from "axios";
import randomWords from 'random-words';
import {R} from "../../resources/R";
import {WordsAmuseResponse} from "../../interfaces/words.actions.interface";

export const fetchWordsForTask = ({count}: {count: number}): Promise<{wordEn: string; wordRu: string}[]> => {
    return new Promise<{ wordRu: string; wordEn: string }[]>((resolve, reject) => {
       /* const alphabet = "abcdefghijklmnopqrstuvwxyz"

        const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
        axios.get(R.amuseWordsServer + `?sp=${randomCharacter}*&md=d&max=20`).then((resp) => {
            console.log(resp);
            const words: string[] = resp.data.map((item: WordsAmuseResponse) => {
                return item.word
            })
             translateWords({targetLanguageCode: 'ru', texts: words}).then((translatedWords) => {
           console.log('translatedWords');
           resolve( words.map((item, index) => {
               return {
                   wordRu: translatedWords[index],
                   wordEn: item
               }
           }))
       })
        }).catch((error) => {
            console.log('error', error);
        })*/
        /*const words = randomWords(count);*/
        resolve( [
            {
                "wordRu": "солнце",
                "wordEn": "sun"
            },
            {
                "wordRu": "был",
                "wordEn": "was"
            },
            {
                "wordRu": "яйцо",
                "wordEn": "egg"
            },
            {
                "wordRu": "поздний",
                "wordEn": "late"
            },
            {
                "wordRu": "определенный",
                "wordEn": "particular"
            },
            {
                "wordRu": "доказывать",
                "wordEn": "prove"
            },
            {
                "wordRu": "короче",
                "wordEn": "shorter"
            },
            {
                "wordRu": "в любом случае",
                "wordEn": "anyway"
            },
            {
                "wordRu": "спутники",
                "wordEn": "satellites"
            },
            {
                "wordRu": "объяснение",
                "wordEn": "explanation"
            },
            {
                "wordRu": "такой же",
                "wordEn": "same"
            },
            {
                "wordRu": "интерес",
                "wordEn": "interest"
            },
            {
                "wordRu": "исследование",
                "wordEn": "research"
            },
            {
                "wordRu": "горло",
                "wordEn": "throat"
            },
            {
                "wordRu": "скучный",
                "wordEn": "dull"
            },
            {
                "wordRu": "дорожка",
                "wordEn": "track"
            },
            {
                "wordRu": "люди",
                "wordEn": "people"
            },
            {
                "wordRu": "полиция",
                "wordEn": "police"
            },
            {
                "wordRu": "следовать",
                "wordEn": "follow"
            },
            {
                "wordRu": "около",
                "wordEn": "by"
            }
        ])
       /* translateWords({targetLanguageCode: 'ru', texts: words}).then((translatedWords) => {
            console.log('translatedWords');
            resolve( words.map((item, index) => {
                return {
                    wordRu: translatedWords[index],
                    wordEn: item
                }
            }))
        })*/

    })
}

const translateWords =  (data: {targetLanguageCode: string; texts: string[]}) => {
    return new Promise<string[]>((resolve, reject) => {
        const url = 'https://verceltest-max429.vercel.app/api/translate';
        const {targetLanguageCode, texts} = data;
        axios.post(url, {targetLanguageCode, texts}).then((resp) => {
            resolve(resp.data.translations.map((item: {
                text: string,
                detectedLanguageCode: string}) => item.text))
        }).catch(() => {
                reject('Ошибка')
        })
    })
}
