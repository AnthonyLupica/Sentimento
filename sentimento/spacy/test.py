"""
    test.py

    testing file for lots of spaCy-related things
"""

import spacy
import pandas as pd
nlp = spacy.load("en_textcat_goemotions")

"""
This function waterDown() serves the dubious purpose of watering down the information provided by GoEmotions
GoEmotions computes a distribution across 28 feeling words, but we want only 5.
"""
def waterDown(dict):

    # Our values
    joy = 0
    sadness = 0
    anger = 0
    fear = 0
    disgust = 0

    # For each of GoEmotion's words, we distribute its value amongst the appropriate members of the 5 cardinal emotions

    # admiration
    joy += dict["admiration"]

    # amusement
    disgust += 0.3 * dict["amusement"]
    joy += 0.7 * dict["amusement"]

    # anger
    anger += dict["anger"]

    # annoyance
    anger += dict["annoyance"]

    # approval
    joy += dict["approval"]

    # caring
    joy += dict["caring"]

    # confusion
    fear += 0.7 * dict["confusion"]
    anger += 0.3 * dict["confusion"]

    # curiosity
    fear += 0.3 * dict["curiosity"]
    joy += 0.7 * dict["curiosity"]

    # desire
    joy += dict["desire"]

    # disappointment
    sadness += dict["disappointment"]

    # disapproval
    sadness += 0.6 * dict["disapproval"]
    anger += 0.4 * dict["disapproval"]

    # disgust
    disgust += dict["disgust"]

    # embarrassment
    fear += 0.8 * dict["embarrassment"]
    sadness += 0.2 * dict["embarrassment"]

    # excitement
    joy += 0.8 * dict["excitement"]
    fear += 0.2 * dict["excitement"]

    # fear
    fear += dict["fear"]

    # gratitude
    joy += dict["gratitude"]

    # grief
    sadness += 0.8 * dict["grief"]
    anger += 0.2 * dict["grief"]

    # joy
    joy += dict["joy"]

    # love
    joy += dict["love"]

    # nervousness
    fear += dict["nervousness"]

    # optimism
    joy += dict["optimism"]

    # pride
    joy += dict["pride"]

    # realization
    joy += dict["realization"]

    # relief
    joy += dict["relief"]

    # remorse
    sadness += dict["remorse"]

    # sadness
    sadness += dict["sadness"]
    
    # surprise
    fear += dict["surprise"]

    # neutral
        # disregard the neutral score

    # Normalize the values
    sum = joy + sadness + anger + fear + disgust
    joy = joy / sum
    sadness = sadness / sum
    anger = anger / sum
    fear = fear / sum
    disgust = disgust / sum

    
    # Put values in a dictionary
    newDict = {
        "joy": joy,
        "sadness": sadness,
        "anger": anger,
        "fear": fear,
        "disgust": disgust
    }

    return newDict

# @CHANGE: put sample journal entries in a folder ignored by git, reference journals by accessing file from that folder
doc = nlp("")
table = pd.DataFrame.from_dict(waterDown(doc.cats), orient='index')
print(table)
