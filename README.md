# populix-chatbot
## Clean Architecture With NestJS
## Description
It's been a while since my last article on [how to implement clean architecture on Node.js applications](https://betterprogramming.pub/node-clean-architecture-deep-dive-ab68e523554b), [git repo](https://github.com/royib/clean-architecture-node).
After working with NestJS and TypeScript I thought it was a good idea to come back and write a new article on the subject. This time we are going to take the super power of typescript and the methodologies and tools of NestJS and harness them to our benefits.

Coming from a background of object-oriented languages, it was natural that we
wanted to keep all our [SOLID](https://en.wikipedia.org/wiki/SOLID) principles
in our new and shiny node API.

Like any other architecture, we had to make different trade-offs in the
implementation.

We had to be careful not to over-engineer or over-abstract our layers, but
rather keep it as flexible as needed.

In recent years, we have implemented [clean
architecture](http://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
by Robert C. Martin (Uncle Bob) on our API projects. This architecture attempts
to integrate some of the leading modern architecture like [Hexagonal
Architecture](http://alistair.cockburn.us/Hexagonal+architecture), [Onion
Architecture](http://jeffreypalermo.com/blog/the-onion-architecture-part-1/),
[Screaming
Architecture](http://blog.cleancoders.com/2011-09-30-Screaming-Architecture)
into one main architecture. It aims to achieve good separation of concerns. Like
most architecture, it also aims to make the application more flexible to
inevitable changes in client requirements (which always happens).

![](https://fullstackroyhome.files.wordpress.com/2019/03/cleanarchitecture.jpg)

clean architecture diagram - dependencies direction are from outside in.
[source](http://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

This diagram is taken from the [official
article](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
by Robert C. Martin. I recommend reading his article before diving into the node
implementation. This is the best source knowledge about this architecture.

Few words about this diagram and how to read it:

-   Dependency - the dependency direction is from the outside in. meaning that
    the Entities layer is independent and the Frameworks layer depend on all the
    other layers.

-   Entities - contains all the business entities that construct our
    application.

-   Use Cases - This is where we centralize our logic. Each use case
    orchestrates all of the logic for a specific business use case.

-   Controllers and Presenters - Our controller, presenters, and gateways are
    intermediate layers. You can think of them as an entry and exit gates to the
    use cases .

-   Frameworks - This layer has all the specific implementations. The database,
    the web frameworks, error handling etc.  
    Robert C. Martin describes this layer :  
    *“This layer is where all the details go. The Web is a detail. The database
    is a detail. We keep these things on the outside where they can do little
    harm.”*

In this point you will probably say to yourself “database is in outer layer,
database is a detail ???” database is supposed to be my core layer.

I love this architecture because it has a smart motivation behind it. Instead of
focusing on frameworks and tools, it focuses on the business logic of the
application. This architecture is framework independent (or as much as it can
be). This means it doesn’t matter which database, frameworks, UI, external
services you are using, the entities and the business logic of the application
will always stay the same. We can change all of the above without changing our
logic. This is what makes it so easy to test applications built on this
architecture. Don’t worry if you don’t understand this yet, we will explore it
step-by-step.
## Getting Started
### System Requirement
- Nodejs 14.17.1
- Mysql 8.0.24
- ElasticSearch 7.0.1
- Docker
- Postman Desktop
- Ngrok : https://ngrok.com
- Telegram API Bot : https://core.telegram.org/bots/api
- NestJs
### How To Run This Project

```bash
#move to directory
# Clone into YOUR dir
git clone https://github.com/radyatamaa/populix-chatbot-technical-test.git

#move to project
cd populix-chatbot-technical-test

# install package
npm install

# create file .env can copy from .env.sample
cp .env.sample .env

# setup bot telegram
- create your bot and get the token from following this https://core.telegram.org/bots/features#botfather
- put your token bot on .env "TELEGRAM_TOKEN_BOT="

# run the app (1)
- make sure the .env are everything (MYSQL,ELASTIC_SEARCH_URL,TELEGRAM_TOKEN_BOT) correct , NOTED : for THE_MOVIE_DB_API_TOKEN and THE_MOVIE_DB_API_BASE_URL_IMAGE can using default from .env.sample
- run MYSQL SERVER and ELASTIC SEARCH 
- if you were'nt installed Elastic Search and Mysql , can install by docker-compose-local with command 'docker compose -f "docker-compose-local.yml" up -d --build'
- insert data seeders (Content,Card,Card Type) into Mysql with query , the query on dir file "db/data_content.sql"
- run "npm start"
- open "http://localhost:3000/swagger" in browser

# run the app by docker (2)
- can run docker-compose.yml with the command "docker compose -f "docker-compose.yml" up -d --build"
- insert data seeders (Content,Card,Card Type) into Mysql with query , the query on dir file "db/data_content.sql"
- open "http://localhost:3000/swagger" in browser

# connect the app into bot
- run ngrok with http 3000 and get the url expose
- set the webhook in telegram api 
  curl --request POST \
     --url https://api.telegram.org/bot<TELEGRAM_TOKEN_BOT>/setWebhook?url=<URL-FROM-NGROK-EXPOSED>/api/webhook \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
  noted : also you can set the webhook telegram api by postman can import the file collection "Telegram-Bot-api.postman_collection.json"
```  

### How To Run Test
npm run test
### Record Video Result Test
https://drive.google.com/file/d/1PqIX-JOWGs-6LOXILWurUzSttC4oOnFC/view?usp=sharing
## Authors
Moh. Radyatama Suryana
## Version History
* 1.0
