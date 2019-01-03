# Pomodoro TODO bot

## Description

## How to use existing bot

Find @pomodoroTodo_bot on Telegram or follow this [link](t.me/pomodoroTodo_bot).

## For local develop
* Install [ngrock](https://ngrok.com/) and get https address on port (I used `ngrock https port`).
* Create a new bot at [@BotFather](https://t.me/BotFather).
* Copy .env.default to .env (`cp .env.default .env`) and set `WEBHOOK_DOMAIN` from ngrock and `BOT_TOKEN` from @BotFather in that.
* For the run, you need installed Docker, Docker-compose.
* After installing both uses `make start-dev` to start docker-compose.
