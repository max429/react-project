import React, {useEffect} from 'react';
import './TrainingCardsPage.css';

export const TrainingCardsPage = () => {
    const help = async () => {
        const res = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: "Hello!",
                source: "en",
                target: "es"
            }),
            headers: { "Content-Type": "application/json" }
        });

        console.log(await res.json());
    }

    useEffect(  () => {
        help().then(() => {});
    }, [])

    return (<div>
        TrainingCards
    </div>)
}
