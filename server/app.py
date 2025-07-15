#!/usr/bin/env python3
from flask import Flask, render_template, make_response, request, jsonify

from flask_restful import Api, Resource
from config import app, api, db, jwt, bcrypt




# @app.errorhandler(404)
# def not_found(e):
#     if request.path.startswith('/api'):
#         return jsonify({'error': 'Not found'}), 404
#     return render_template("index.html")


class Home(Resource):
    def get(self):
        return make_response({"message": "Welcome to the Late Show API"}, 200)