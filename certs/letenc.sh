# https://habrahabr.ru/post/317636/
# https://certbot.eff.org/#ubuntuxenial-other

letsencrypt certonly -n -d pomodoro-todo-bot.4nmv.ru --email batbondik0@gmail.com --standalone --noninteractive --agree-tos
cp privkey.pem cert0.pem
cat fullchain.pem >> cert0.pem