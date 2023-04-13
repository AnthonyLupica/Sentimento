# Base for backend
FROM python:3.9-bullseye as base
COPY Pipfile Pipfile.lock /backend/
WORKDIR /backend
RUN pip install pipenv
RUN pipenv install --system --deploy
COPY . .

# development version run command
FROM base as dev
CMD if $RESET_DB = true; then python startup.py True; else python startup.py False; fi
