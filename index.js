import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import homeRouter from './routes/home';
import contactsRouter from './routes/contacts';

const app = express();
// DB setting
mongoose.set('useNewUrlParser', true);

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
const db = mongoose.connection;
db.once('open', () => { console.log('DB connected'); });
db.on('error', (err) => { console.log('DB ERROR : ', err); });

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
// app.use('/', require('./routes/home'));
// app.use('/contacts', require('./routes/contacts'));
app.use('/', homeRouter);
app.use('/contacts', contactsRouter);

// Port setting
const port = 3000;
app.listen(port, () => {
    console.log(`server on! http://localhost:${port}`);
});
