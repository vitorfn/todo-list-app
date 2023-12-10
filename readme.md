# Trabalho Prático - DevOps
Membros do grupo: João Victor Veronezi Viana e Vítor Ferreira Nunes

## Passo a passo

1) Criação do aplicativo TodoList
Para criar o aplicativo TodoList, utilizamos o NodeJS com Express e como base o artigo do [Medium](https://medium.com/@atingenkay/creating-a-todo-app-with-node-js-express-8fa51f39b16f).

Assim, executamos os seguintes comandos:

```
npm install express --save
```

Para testar se o aplicativo criado estava funcionando, utilizamos o comando:

```
node index.js
```

Assim, a saída no terminal foi:
```
Server is running on port 3000
```

Ao acessar o server no endereço [http://localhost:3000/](http://localhost:3000/), obtivemos a resposta:

```
Hello, world!
```

O próximo passo foi testar as operações básicas de inserção, atualização e exclusão do aplicativo, utilizamos o Postman, para enviar as requisições. O arquivo base está disponível [aqui](UFLA.postman_collection.json).

2) Criação do Dockerfile

Para criar o Dockerfile, utilizamos como base o artigo do [Medium](https://medium.com/dockerbr/dockerizando-o-node-js-22fa3f5cfd3), mas, adaptando ao contexto do projeto. Para isso, os seguintes passos foram realizados:

a) Build da imagem
```
docker build -t vitorferreir/todo-list-app .
```

b) Verificação se a imagem foi construída corretamente
```
docker images
```

A saída foi:
```
REPOSITORY TAG IMAGE ID CREATED SIZE
vitorferreir/todo-list-app   latest    a72c90fdbc46   14 seconds ago   146MB
```

c) Para rodar a imagem, utilizamos o comando:

```
docker run -p 3000:3000 vitorferreir/todo-list-app
```

Ao abrir o navegador no endereço [http://localhost:3000/](http://localhost:3000/), pode-se observar que o volume inicializou corretamente.

3) Publicação do aplicativo no DockerHub

Para publicar o aplicativo no DockerHub, utilizamos os seguintes comandos:

```
docker push vitorferreir/todo-list-app
```

Assim, o aplicativo foi publicado no DockerHub, disponível [aqui](https://hub.docker.com/repository/docker/vitorferreir/todo-list-app).

4) Criação de Artefatos no Kubernetes com Helm

Para criar os artefatos no Kubernetes com Helm, primeiramente criamos um cluster com o Kind, utilizando o comando:

```
kind create cluster
```

Para verificar se o cluster foi criado corretamente, utilizamos o comando:

```
kind get clusters
```

A saída foi:
```
kind
```

Após isso, criamos os recursos no Kubernetes com o Helm, utilizando os seguintes comandos:

a) Criação do Helm Chart
```
helm create todo-list-app
```

b) Alteração do arquivo values.yaml para que a imagem utilizada fosse a que criamos no DockerHub

c) Instalação do Helm Chart
```
helm install todo-list-app ./todo-list-app
```

d) Para verificar se o helm foi instalado corretamente, utilizamos o port-forward para acessar a aplicação
```
kubectl port-forward service/todo-list-app 3000:3000
```

A saída do terminal foi:
```
Forwarding from 127.0.0.1:3000 -> 3000
Forwarding from [::1]:3000 -> 3000
Handling connection for 3000
Handling connection for 3000
```

Ao abrir o navegador no endereço [http://localhost:3000/](http://localhost:3000/), pode-se observar que o volume inicializou corretamente.