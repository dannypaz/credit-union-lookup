var getIndex = function(req,res){
  console.log('hello');
};

var index = {
  method: 'GET',
  path: '/',
  handler: getIndex
};

module.exports = index; 
