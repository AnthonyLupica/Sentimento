/*
    JournalData.jsx contains test data to simulate an api response 
*/

/* nanoid is a library that generates random unique ids */
import { nanoid } from 'nanoid'

const data = [
    {
        id: nanoid(),
        title: "Demo Day",
        mood: "Happy",
        color: "orange",
        text: "Today, the Sentimento team gets to demo our work thus far. We're super excited!",
        dateAndTime: "Date: TODO"
    },
    {
        id: nanoid(),
        title: "Learning on the Job",
        mood: "Curious",
        color: "mediumorchid",
        text: "As a newer member of the team, I've been learning a lot about software engineering on a team. I've been exposed to new tools, languages, and approaches that I've never encountered before. It's challenging at times, but it's also incredibly rewarding to be part of such an innovative project. I'm excited to see how my knowledge and skills continue to grow as I work with this talented team!",
        dateAndTime: "Date: TODO"
    },
    {
        id: nanoid(),
        title: "Collaboration is Key",
        mood: "Productive",
        color: "steelblue",
        text: "Working with my team on this software engineering project has been a great experience. We all have different skills and perspectives that we bring to the table, and it's been fascinating to see how our ideas can come together to create something amazing. We've been able to divide up the work effectively and support each other when needed. It's awesome to see how much progress we've made in such a short amount of time!",
        dateAndTime: "Date: TODO"
    },
    {
        id: nanoid(),
        title: "Doubts",
        mood: "Anxious",
        color: "DarkSlateGray",
        text: "As demo day gets closer, I'm starting to have doubts about the app. What if people don't like it? What if there are major issues that we haven't found yet? I'm feeling anxious and a bit overwhelmed, but I know that we've put a lot of work into the app and that we have a great team behind us. We'll do our best and learn from whatever happens.",
        dateAndTime: "Date: TODO"
    },
    {
        id: nanoid(),
        title: "Last-Minute Changes",
        mood: "Stressed",
        color: "brown",
        text: "With demo day fast approaching, we're making some last-minute changes to the app to address some feedback we've received. I'm feeling a bit stressed because we don't have much time, but I know that these changes will make the app better overall. We're testing everything thoroughly to make sure the changes don't cause any issues.",
        dateAndTime: "Date: TODO"
    },
    {
        id: nanoid(),
        title: "Feeling Accomplished",
        mood: "Proud",
        color: "green",
        text: "As we near the demo day, I can't help but feel proud of what we've accomplished as a team. We've overcome a lot of obstacles and have put in countless hours of hard work. It's rewarding to see our project come to life and I'm grateful to be a part of this journey.",
        dateAndTime: "Date: TODO"
    }
]

export default data;
