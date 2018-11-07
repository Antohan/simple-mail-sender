const app = require('./app');

app.listen(app.get('port'), () => {
  console.log('Server start at port %d', app.get('port'));
});
