var getCreditUnionsByState = function(req,res){
  console.log('hello');
};

var state = {
  method: 'GET',
  path: '/state',
  handler: getCreditUnionsByState
};

module.exports = state; 
