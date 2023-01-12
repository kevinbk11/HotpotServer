var createError = require('http-errors');
var express = require('express');
var execute = require('./execute')
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gameRouter = require('./routes/game');
var game1Router = require('./routes/game1')

var app = express();

var http = require('http');

const SocketServer = require('ws').Server
var port = "3000"

app.set('port', port);
var server = http.createServer(app);

server.on('listening', onListening);

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
}

server.listen(port)
wss = new SocketServer({ server })

wss.on('connection', ws => {
    ws.on('message', data => {
        execute(wss, ws, data)
    })
})
wss.on('disconnect',()=>[
  console.log("dis")
])

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))

app.use('/', indexRouter);

app.use('/users', usersRouter);

app.post('/game', gameRouter.router);

app.post('/game/game1',game1Router)

app.get('/game/game1',game1Router)

app.use('/test', (req, res) => {
    res.render('mainSystemLayout')
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;