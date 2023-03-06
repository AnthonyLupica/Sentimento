/*
    JournalData.jsx contains test data to simulate an api response 
*/

/* nanoid is a library that generates random unique ids */
import { nanoid } from 'nanoid'

const data = [
    {
        id: nanoid(),
        title: "Progress on Sentimento",
        mood: "Happy",
        color: "orange",
        text: "I've made so much progress today!",
        dateAndTime: "1/31/23"
    },
    {
        id: nanoid(),
        title: "A Title",
        mood: "Astounded",
        color: "purple",
        text: "This is a journal entry",
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
