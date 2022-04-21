
const express = require('express');
const path = require('path');

const checkListRouter = require('./src/routes/checklist');
const rootRouter = require('./src/routes/index');

require('./config/database');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklist', checkListRouter);


app.listen(3000, () => {
    console.log('Servidor foi iniciado');
})

/* const log = (req, res, next) => {
    console.log(req.body);
    console.log('\n'+ Date.now());
    next();
};

app.use(log);

app.get('/', (req, res) => {
    res.send("<h1>Minha lista de tarefas</h1>");
})

app.get('/json', (req, res) => {
    console.log(req.body);
    res.json({title: 'Tarefa X', done:true});
})


app.listen(3000, () => {
    console.log('Servidor foi iniciado:>');
}) */