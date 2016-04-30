"use strict";

var app = require('./app_config.js');

var listaCompraController = require('./controller/listaCompraController.js')

var validator = require('validator');

app.get('/',function(req,res){
	res.end('Servidor On');
	console.log('Entrou');
});

app.post('/listaCompra',function(req,res){
	console.log('incluindo ListaCompra via post.');
	
	var descricao = validator.trim(validator.escape(req.body.descricao));
	
	var itens = [
		{'descricao':'Item 1',jaComprou:true},
		{'descricao':'Item 2',jaComprou:false}];
	
	listaCompraController.save(descricao,itens, function(resp){
		res.json(resp);
	});
});

app.delete('/listaCompra/:id',function(req,res){
	console.log('delete listaCompra.' + req.params.id);
	
	var id = validator.trim(validator.escape(req.params.id));
		
	listaCompraController.delete(id,function (resp){
		res.json(resp);
	});
});

app.put('/listaCompra/:id',function(req,res){
	console.log('update listaCompra via update .' + req.params.id);
	
	var id = validator.trim(validator.escape(req.params.id));
	var descricao = validator.trim(validator.escape(req.body.fullname));
	
	var itens = [
		{'descricao':'Item 11',jaComprou:false},
		{'descricao':'Item 22',jaComprou:true}];
	
	listaCompraController.update(id,descricao,itens, function(resp){
		res.json(resp);
	});
});

app.get('/listaCompra/:id',function(req,res){
	console.log('get listaCompra by id ' + req.params.id);

	var id = validator.trim(validator.escape(req.params.id));
	
	listaCompraController.listaCompraById(id,function (resp){
		res.json(resp);
	});
});

app.get('/listaCompra',function(req,res){
	console.log('get listaCompra');
	
	listaCompraController.list(function (resp){
		res.json(resp);
	});
});