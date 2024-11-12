install:
	npm install

build:
	docker compose build

up:
	docker compose up --watch

run: install build up

down:
	docker compose down
