"""
    test.py

    testing file for lots of spaCy-related things
"""

import spacy
import pandas as pd
nlp = spacy.load("en_textcat_goemotions")

# analysis = nlp.analyze_pipes(pretty=True)

doc = nlp("Today was a pretty good day. I slept well, woke up and painted which was fulfilling. I cleaned up the apartment, freaked out about spending my time well for a little while, got over it and went to class. I was sure to get some good food in my body first. It was two taco bell quesadillas. I am kind of upset that I eat so much taco bell, but I'm doing the best I can. Classes were good. I got a lot of work done. That made me feel pretty good and productive. I was upset with my group members after class because they took forever to get our meeting started and I wanted to go to yoga. But once we got the ball rolling, we got a decent bit done and I still made it to yoga. Meanwhile, Brian invited me on a date only to be wishy washy about it once I agreed. That is frustrating because he's probably afraid of disappointing me and doesn't want to take me on a lame date, but inevitably, any date is less lame than no date. But I got over it, picked up some groceries, made us a nice meal, we watched his favorite movie and it did feel very special. I didn't make a move on him or anything either. I am proud of myself for that.")
table = pd.DataFrame.from_dict(doc.cats, orient='index')
print(table)