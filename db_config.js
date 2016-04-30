var db_string = 'mongodb://127.0.0.1/listaCompra';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error',console.error.bind(console,'Erro ao conectar no banco'));

db.once('open',function(){
	
	var itemCompraSchema = mongoose.Schema({
		descricao: String,
		jaComprou: Boolean
	});
	
	var listaCompraSchema = mongoose.Schema({
		descricao: String,
		itens:[itemQuestaoSchema]
	});
	
	exports.ListaCompra = mongoose.model('ListaCompra',listaCompraSchema);
});