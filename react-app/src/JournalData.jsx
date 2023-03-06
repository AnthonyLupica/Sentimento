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
        text: "I am robert lupica",
        dateAndTime: "1/31/23"
    },
    {
        id: nanoid(),
        title: "Progress",
        mood: "Astounded",
        color: "orange",
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
        color: "blue",
        text: "Progress is happening",
        dateAndTime: "1/31/23"
    }
]

export default data;
