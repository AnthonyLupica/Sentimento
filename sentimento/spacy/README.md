# Temporary work place for testing things with the spacy library

## Environment setup

Install pipenv with pip `pip install pipenv`  
(I successfully did this with sudo apt-get install, but pipenv's website doesn't recommend it)   
you may need to add pipenv to path with a command like `echo 'export PATH="/path/from/error/message:$PATH"' >> ~/.profile
source ~/.profile`

Go to the root of our sentimento repository, run `pipenv install --skip-lock`  
This will install all of our dependencies in one fell swoop!
the "--skip-lock" option will save some time for testing purposes. when you do not --skip-lock, pipenv "locks" the pipfile, it's basically making aversion of our requirements list that will be used for release.

Once dependencies are successfully installed, run `pipenv shell`  
This is the equivalent of "source env/bin/activate"

change into this spacy directory, and run
`python test.py file.txt True`  
where "file.txt" is a journal entry in the current directory you want to analyze
The "True" or "False" flag is for whether or not you want "watered down" results or not see test.py for more details on watered down results. This is our demo so far!

to quit the pipenv shell, simply put `exit`

### Resources
* [GoEmotions Dataset](https://github.com/google-research/google-research/tree/master/goemotions)

* [en_textcat_goemotions](https://huggingface.co/explosion/en_textcat_goemotions?text=I+like+you.+I+love+you) NOTE: This package requires around 6GB of space!

* SQLite (currently studying)
