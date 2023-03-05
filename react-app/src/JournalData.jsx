/*
    JournalData.jsx contains test data to simulate an api response 
*/

/* nanoid is a library that generates random unique ids */
import { nanoid } from 'nanoid'

const data = [
    {
        id: nanoid(),
        title: "Progress on Sentimento",
        mood: "Fearful",
        color: "purple",
        text: "Progress is happening, but i'm hoping we'll have enough to get everything working in timevhlvbhjvhjvhjvhjvhjkvhjkvhjvkhjvhjkvvhhjvjhvhjvhjkvhjkvhjvhjkvhjkvkhjvnjkdafnvkjbdjkfbvjklabdfjklvbajkldbfvjklbajkldfbvjklabdlkjsfvbadfv",
        dateAndTime: "1/31/23"
    },
    {
        id: nanoid(),
        title: "Progress",
        mood: "Astounded",
        color: "yellow",
        text: "Progress is happening",
        dateAndTime: "1/31/23"
    },
    {
        id: nanoid(),
        title: "Progress",
        mood: "Fearful",
        color: "brown",
        text: "Progress is happening",
        dateAndTime: "1/31/29"
    },
    {
        id: nanoid(),
        title: "Progress",
        mood: "Fearful",
        color: "pink",
        text: "Progress is happening",
        dateAndTime: "1/31/23"
    }
]

export default data;
