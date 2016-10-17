var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;

var app = require('../src/server.js');

describe('routes', function() {

  it('request to unkown url should return 404', function(done) {
    request(app).get('/somethingfunny').expect(404).end(done);
  });

});