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
		Todo.create(req.body)
			.then((todo) => {
				res.status(200).json(todo);
			})
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		Todo.destroy({
			truncate: true
		})
			.then(() => res.status(200).end("All Deleted"))
			.catch((err) => next(err))
	})

todoRouter.get('/completed', (req, res, next) => {
	Todo.findAll({ where: { iscomplete: true } })
		.then((todos) => res.status(200).json(todos))
		.catch((err) => next(err))
})

todoRouter.get('/deleted', (req, res, next) => {
	Todo.findAll({ where: { isdelete: true } })
		.then((todos) => res.status(200).json(todos))
		.catch((err) => next(err))
})

todoRouter.route('/:id')
	.get((req, res, next) => {
		Todo.findOne({ where: { uid: req.params.id } })
			.then((todo) => res.status(200).json(todo))
			.catch((err) => next(err))
	})
	.post((req, res, next) => {
		Todo.findOne({ where: { uid: req.params.id } })
			.then((todo) => {
				if (todo.iscomplete) {
					Todo.update({ iscomplete: false }, {
						where: {
							uid: req.params.id
						}
					})
						.then(() => res.status(200).end('Completed task undo'))
						.catch((err) => next(err))
				} else {
					Todo.update({ iscomplete: true }, {
						where: {
							uid: req.params.id
						}
					})
						.then(() => res.status(200).end('Task Completed'))
						.catch((err) => next(err))
				}
			})
			.catch((err) => next(err))
	})
	.put((req, res, next) => {
		Todo.update(req.body, {
			where: {
				uid: req.params.id
			}
		})
			.then(() => res.status(200).end('Task Updated'))
			.catch((err) => next(err))
	})
	.delete((req, res, next) => {
		Todo.findOne({
			where: {
				uid: req.params.id
			}
		})
			.then((todo) => {
				if (todo.isdelete) {
					Todo.destroy({
						where: {
							uid: req.params.id
						}
					})
						.then(() => res.status(200).end('Task Deleted permanantly'))
				}
				else {
					Todo.update({ isdelete: true }, {
						where: {
							uid: req.params.id
						}
					})
						.then(() => res.status(200).end('Task Deleted'))
						.catch((err) => next(err))
				}
			})
	})

todoRouter.post('/:id/recycle', (req, res, next) => {
	Todo.update({ isdelete: false }, {
		where: {
			uid: req.params.id
		}
	})
		.then(() => res.status(200).end('Task Restored'))
		.catch((err) => next(err))
})

module.exports = todoRouter;
