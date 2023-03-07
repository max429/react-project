import axios from "axios";
import randomWords from 'random-words';

export const fetchWordsForTask = ({count}: {count: number}) => {
    return new Promise<{ wordRu: string; wordEn: string }[]>((resolve, reject) => {
        const words = randomWords(count);
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
