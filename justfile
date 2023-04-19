default:
    @just --list

build:
    @docker compose build

up: build
    @docker compose up -d

logs:
    @docker compose logs -f

down:
    @docker compose down