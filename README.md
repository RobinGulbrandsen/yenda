# Intro

Online community site for special interrest groups. An example of this could be an online gaming community like a guild in World of Warcraft or any other MMORPG. The application is used to organize this community.

The application is created with the MEAN stack, and Socket.io for live Chat

# Functionality

- News feed created where members can comment
- Live Chat for all users of the site, unregistered as well as members
- Application page for registration and rooster to see all members
- Calendar to see upcoming events
- Forum

# Use Cases

## As an administrator..

- [x].. I would like to publish news articles to the community that are visible by all visitors to the site
- .. I would like to promote members to administrators
- .. I would like to approve new member applications
- .. I would like to see a list of all registred user to easy maintain the community

## As a member..

- .. I would like to comment on the articles published by the administrators
- .. I would like to sign up for events in the calendar and choose to get email notification for the event

## As a visitor to the site..

- [x].. I would like to log in
- .. I would like to engage in the live chat
- .. I would like to register to become a member
- .. I would like to choose a nickname for the live chat that is not registrerd to a user to start chatting
- .. I would like to see how many people are currently connected to the chat

# API

| Method | Uri                | Authroization         | Comment |
|--------|--------------------|-----------------------|---------|
| POST   | /login             | Anonymous             |         |
| POST   | /signup            | Anonymous             |         |
| GET    | /news              | Anonymous             | Gets all news artichles with paging |
| GET    | /news/:id          | Administrator, Member |         |
| POST   | /news              | Administrator         |         |
| PUT    | /news              | Adminstrator          |         |
| DELETE | /news/:id          | Administrator         |         |
| POST   | /news/:id/comments | Administrator, Member |         |
| PUT    | /news/:id/comments | Administrator, Member | Users can only update own comments |
| DELETE | /news/:id/comments | Administrator, Member | Members can delete own comments, Administrators can delete all comment |


# Setup Developer Enviroment

```sh
> git clone [repository.git]
> cd [repository]
> npm install
> npm install -g grunt-cli
```

Grunt supports the following tasks

```sh
> grunt watch:client
> grunt watch:server
> grunt build
> grunt test
```

# Project Structure

```
|- server/
  |- src/
    |- controllers/           //Controllers handles I/O
      |- HttpStatus.js        //Helper to set statuses
      |- NewsController.js
      |- UserController.js
    |- models/                //Models for entities in the system
      |- Comment.js
      |- News.js
      |- Role.js
      |- User.js
    |- repositories/          //Repositories handles persistence
      |- BaseRepository.js    //Generic repository with full CRUD 
      |- UserRepository.js    //Special repo functions for user
    |- services/              //Services binds the system togheter
      |- NewsService.js
      |- UserService.js
    |- routes.js              //FrontController for routes
    |- server.js              //Starts the server and handles middleware
  |- test/                    //Tests for the server - mirrors layout above
|- client/
  |- src/
    |- app/                   //Holds the sub parts of the application
      |- home/                //Each package in app contains..
        |- home.js            //.. a controller,
        |- home.tmpl.html     // a view template
        |- home.less          // and specialized less
    |- assets/                //Images and other static assets
      |- styles.less          //Shared styles for the client
      |- variables.less       //Variables for colors and other shared values
    |- common/                //Common services for the client
      |- auth-service/
        |- auth-service.js    //Factory for handling user sessions
      |- httpService/
        |- http-service.js    //Factory for handling CRUD requests
      |- modal-service/
        |- confirm-dialog.tpl.html  //template
        |- form-dialog.tpl.html     //template
        |- message-dialog.tpl.html  //template
        |- modal-service.js   //Factory to create popup windows
        |- styles.less        //Styles for popups
      |- userSevice.js        //Handles user authentication and tokens
    |- app.js                 //Client kickstarter
    |- index.html             //Main layout
  |- test/                    //Tests for hte client 
|- bower.js                   //Dependancies for the client
|- Gruntfile.js               //Builds the system
|- package.json               //Dependancies for the server
|- .gitignore
```