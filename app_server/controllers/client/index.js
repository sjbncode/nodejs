/* GET Angular SPA page */
module.exports.home = function(req, res){
  res.render('layout', { title: 'Loc8r' });
};


module.exports.about=function(req,res) {
	res.render('index',{title:'Loc8r'})
}