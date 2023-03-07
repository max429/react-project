import axios from "axios";
import randomWords from 'random-words';

export const fetchWordsForTask = ({count}: {count: number}) => {
    return new Promise<{ wordRu: string; wordEn: string }[]>((resolve, reject) => {
        const words = randomWords(count);
        translateWords({targetLanguageCode: 'ru', texts: words}).then((translatedWords) => {
            console.log('translatedWords');
            resolve( words.map((item, index) => {
                return {
                    wordRu: translatedWords[index],
                    wordEn: item
                }
            }))
        })

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
