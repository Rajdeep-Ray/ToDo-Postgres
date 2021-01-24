const express = require('express');
const todoRouter = express.Router();
const Todo = require('../models/todo');

todoRouter.route('/')
	.get((req, res, next) => {
		Todo.findAll()
			.then((todos) => {
				res.status(200).json(todos);
			})
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		Todo.create({
			title: req.body.title,
			desc: req.body.desc
		})
			.then((todo) => {
				res.status(200).json(todo);
			})
			.catch((err) => next(err));
	})

module.exports = todoRouter;
