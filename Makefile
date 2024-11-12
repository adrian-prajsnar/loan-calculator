# Install npm dependencies
install:
	npm install

# Build the Docker container
build:
	docker compose build

# Start the Docker container
up:
	docker compose up -d

# Run all necessary steps: install dependencies, build, and start the container
run: install build up

# Stop and remove the Docker container
down:
	docker compose down
