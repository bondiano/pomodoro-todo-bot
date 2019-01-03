start-dev:
	docker-compose -f docker-compose.dev.yaml up
up-dev:
	docker-compose -f docker-compose.dev.yaml up -d
down-dev:
	docker-compose -f docker-compose.dev.yaml down
up:
	docker-compose up -d
down:
	docker-compose down
start:
	docker-compose up
build:
	docker-compose build --no-cache
yarn:
	docker-compose exec pomodoro-todo-bot_node /bin/sh -c "yarn"
clear-volumes:
	sudo rm -rf ./data/*
yarn-upgrade:
	docker-compose exec pomodoro-todo-bot_node bash -c "yarn upgrade"
