build:
	docker compose build

up:
	docker compose up -d

run: build up

down:
	docker compose down