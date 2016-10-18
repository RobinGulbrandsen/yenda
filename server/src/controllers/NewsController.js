var HttpStatus = require('./HttpStatus');
var NewsService = require('../services/NewsService');

module.exports = {
  create: function (req, res) {
    // Authenticate user - admin

    var article = req.body;

     // Validate object
    if (!article ||
      !article.title || article.title === '' ||
      !article.content || article.content === '') {
      return HttpStatus.BAD_REQUEST(res);
    }

    // Pas request to service and return
    new NewsService().create(article).then(function(newArticle) {
      return res.status(201).send(newArticle);
    }).catch(function(error) {
      return HttpStatus.INTERNAL_SERVER_ERROR(res, error);
    });
  },

  read: function (req, res) {
    var id = req.params.id;
    console.log(id);
    if (id === undefined) {
      return HttpStatus.BAD_REQUEST(res, 'Id must be provided');
    }

    new NewsService().read(id).then(function(news) {
      if (news[0]) {
        return res.status(200).send(news);
      } else {
        return HttpStatus.NOT_FOUND(res);
      }
    }).catch(function(error) {
      if (error.name === 'CastError') {
        return HttpStatus.NOT_FOUND(res);
      }
      return HttpStatus.INTERNAL_SERVER_ERROR(res, error);
    });
  },

  readAll: function (req, res) {
    new NewsService().readAll().then(function(newsArticles) {
      return res.status(200).send(newsArticles);
    }).catch(function(error) {
      return HttpStatus.INTERNAL_SERVER_ERROR(res, error);
    });
  },

  update: function (req, res) {
    //Authenticate user - admin

    var article = req.body;

    // Validate object
    if (!article ||
      !article.title || article.title === '' ||
      !article.content || article.content === '') {
      return HttpStatus.BAD_REQUEST(res);
    }

    new NewsService().update(article).then(function(updatedArticle) {
      return res.status(200).send(updatedArticle);
    }).catch(function(error) {
      return HttpStatus.INTERNAL_SERVER_ERROR(res, error);
    });
  },

  destroy: function (req, res) {
    //Authenticate user - admin

    var id = req.params.id;

    new NewsService().destroy(id).then(function() {
      return res.status(200).send();
    }).catch(function(error) {
      return HttpStatus.INTERNAL_SERVER_ERROR(res, error);
    });
  }
};