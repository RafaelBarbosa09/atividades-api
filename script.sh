echo "buildando imagem docker"
docker build -t atividades-api .  

echo "executando rabbitmq"
docker run -d --hostname my-rabbit  --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

echo "subindo container"
docker run -p 3000:3000 atividades-api