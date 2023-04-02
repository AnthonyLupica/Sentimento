# Base for backend
FROM python:3.10-bullseye as base
COPY Pipfile Pipfile.lock /backend/
WORKDIR /backend
RUN pip install pipenv
RUN pipenv install
COPY ./backend /backend
EXPOSE 5000

# development version run command
FROM base as dev
CMD pipenv run flask run