# Base for backend
FROM python:3.10-bullseye as base
COPY Pipfile Pipfile.lock /backend/
WORKDIR /backend
RUN pip install pipenv
RUN pipenv install --system --deploy
COPY ./backend /backend

# development version run command
FROM base as dev
ENTRYPOINT [ "python" ]
CMD [ "app.py" ]
