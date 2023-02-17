# Temporary work place for testing things with the spacy library

## Environment setup
inside the spacy directory, 
run `python3 -m venv env`

then to activate the virtual environment
  linux   - `source env/bin/activate`
  windows - `./env/Scripts/activate

then to install dependencies
`pip install -r requirements.txt`

once the necessary dependencies are installed, run 
`python test.py file.txt True` 
where "file.txt" is a journal entry in the current directory you want to analyze
The `True` or `False` flag is for whether or not you want "watered down" results or not
see test.py for more details on watered down results

to quit the virtual environment, simply put `deactivate`

### Current Research Topics:
* Training Pipelines:

* [GoEmotions Dataset](https://github.com/google-research/google-research/tree/master/goemotions)

* [en_textcat_goemotions](https://huggingface.co/explosion/en_textcat_goemotions?text=I+like+you.+I+love+you) NOTE: This package requires around 6GB of space!

