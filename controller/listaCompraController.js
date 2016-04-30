var _und = require("../node_modules/underscore/underscore-min.js");

var db = require('../db_config.js');


exports.list = function(callback){
	db.ListaCompra.find({},function(error,listaCompras){
		if(error){
			callback({error: 'Não foi possivel retornar as listas de compras.'});
		}else{
			callback(listaCompras);
		}
	});
};

exports.listaCompraById = function(id,callback){
	db.ListaCompra.findById(id, function(error, listaCompra){
		
		if(error){
			callback({error: 'Não foi possivel retornar a lista de compra'});
			return;
		} 
		
		if(!listaCompra){
			callback({error: 'Não existe o lista de compra com esse id.'});	
		} else{
			callback(listaCompra);
		}
		
	});
};

exports.save = function(descricao,itens,callback){
	var _listaCompra = new db.ListaCompra ({
		'descricao': descricao,
		'itens':itens
	});
	
	_listaCompra.save(function(error,listaCompra){
		if(error){
			callback({error: 'Não foi possivel salvar a lista de Compra.'});
		}else{
			callback(listaCompra);
		}
	});
};

exports.update = function(id,descricao,itens,callback){
	db.ListaCompra.findById(id,function(error,listaCompra){
	
	if(descricao){
		listaCompra.descricao = descricao;
	}
    
    if(itens){
        listaCompra.itens = itens;
    }
    	
	listaCompra.save(function(error,listaCompra){
		if(error){
			callback({error: 'Não foi possivel atualizar a lista de compras'});
		}else{
			callback(listaCompra);
		}
	});  
	
		
	});
};

exports.delete = function(id,callback){
	db.ListaCompra.findById(id,function(error, listaCompra){
		if(error){
			callback({error: 'Não foi possivel excluir a lista de compra.'});
		} else if(listaCompra == null) {
			callback({error: 'Não existe lista de compra com esse id.'});	
		} else {
			listaCompra.remove(function(error,listaCompra){
				if(!error){
					callback({response:'Lista de compra excluído com sucesso.'});
				}
			});
		}
	});
};