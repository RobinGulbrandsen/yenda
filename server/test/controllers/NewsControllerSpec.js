var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;

var app = require('../../src/server.js');

describe('NewsController', function() {

  //it('request to unkown url should return 404', function(done) {
  //  request(app).get('/somethingfunny').expect(404).end(done);
  //});

  var article;

  beforeEach(function(done) {
    article = {
      'id': 1,
      'title': 'First News Article',
      'content': 'The first news article\'s content, this is nice',
      'createdAt': new Date(),
      'createdBy': 'Batman'
    };

    done();
  });

  it('create should return 400 if title is blank', function(done) {
    delete article.title;
    request(app).post('/news')
                .send(article)
                .expect(400)
                .end(done);
  });

  it('create should return 400 if the content is blank', function(done) {
    delete article.content;
    request(app).post('/news')
                .send(article)
                .expect(400)
                .end(done);
  });

  it('create should return 400 if there are no body', function(done) {
    request(app).post('/news')
                .send({})
                .expect(400)
                .end(done);
  });

  it('create should return 200 if the object validates', function(done) {
    request(app).post('/news')
                .send(article)
                .expect(200)
                .end(done);
  });
/*
  it('read with id should return correct obj and status 200', function(done) {
    
  });

  it('read with no id should return 400', function(done) {

  });

  it('readAll should return all articles and status 200', function(done) {

  });

  it('udate an object that does not exists should return 400', function(done) {

  });

  it('udate an object with no title should return 400', function(done) {

  });

  it('update and object with no content should return 400', function(done) {

  });

  it('destroy with an id that does not exists should return 204', function(done) {

  });

  it('destroy with an id that does exists should return 200', function(done) {

  });
*/
});
