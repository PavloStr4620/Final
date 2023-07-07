const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const app = express();



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

mongoose.connect('mongodb+srv://pavlokiller2005:admin@cluster0.kfbqyxl.mongodb.net/info?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
    },)
    .then(() => console.log('MongoDb connected'))
    .catch(err => console.log(err));

const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});



const Users = mongoose.model('Users', UsersSchema);

app.post('/register-user', (req, res) => {
    const { email, password } = req.body;
    Users.create({
        email: email,
        password: password,
    })
        .then(user => res.send(user))
        .catch(err => res.send(err));
});

app.post('/sing-in', (req, res) => {
    const { email } = req.body;

    Users.findOne({ email })
        .exec()
        .then((Users) => {
            if (Users) {
                console.log('Успішний вхід користувача:', Users);
                res.send(Users);
            } else {
                console.log('Користувача з такими даними не знайдено');
                res.status(404).send('Користувача з такими даними не знайдено');
            }
        })
        .catch((err) => {
            console.log('Помилка при вході користувача:', err);
            res.status(500).send(err);
        });
});

app.post('/sing-in', (req, res) => {
    const { password } = req.body;

    Users.findOne({ password })
        .exec()
        .then((Users) => {
            if (Users) {
                console.log('Успішний вхід користувача:', Users);
                res.send(Users);
            } else {
                console.log('Пароль правильний');
                res.status(404).send('Пароль не правильний');
            }
        })
        .catch((err) => {
            console.log('Помилка при вході користувача:', err);
            res.status(500).send(err);
        });
});

// Схема карточок товару 
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    megapixels: {
        type: String,
        require: true
    },
    zoom: {
        type: String,
        require: true
    },
    fps: {
        type: String,
        require: true
    },
    sum: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    }
});

const Product = mongoose.model('Product', ProductSchema);


app.post('/addModal', (req, res) => {
    const { name, model, megapixels, zoom, fps, sum } = req.body;

    Product.create({
        name: name,
        model: model,
        megapixels: megapixels,
        zoom: zoom,
        fps: fps,
        sum: sum
    })
        .then((product) => { res.send(product) })
        .catch((error) => {
            res.send(error)
        });
})

app.get('/addModal', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const searchQuery = req.query.query;

    try {
        let query = {};
        if (searchQuery) {
            query = { model: { $regex: searchQuery, $options: 'i' } };
        }

        const totalCount = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            products,
            totalPages,
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/js/product', async (req, res) => {
    const searchQuery = req.query.query;

    try {
        const products = await Product.find({ model: { $regex: searchQuery, $options: 'i' } });
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Видалення 


app.delete('/deleteProduct/:id', (req, res) => {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .then((deletedProduct) => {
            if (deletedProduct) {
                console.log('Карточку товару успішно видалено');
                res.sendStatus(200);
            } else {
                console.log('Карточка товару не знайдена');
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            console.error('Помилка видалення карточки товару:', err);
            res.sendStatus(500);
        });
});

app.put('/editProduct/:id', (req, res) => {
    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body)
        .then((updatedProduct) => {
            if (updatedProduct) {
                console.log('Карточку товару успішно оновлено');
                res.sendStatus(200);
            } else {
                console.log('Карточка товару не знайдена');
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            console.error('Помилка оновлення карточки товару:', err);
            res.sendStatus(500);
        });
});


app.get('/cart/:id', (req, res) => {
    const id = req.params.id;

    Product.findByIdAndUpdate(id)
        .then((Product) => {
            if (Product) {
                console.log('Карточку товару успішно додано в корзину');
                res.sendStatus(200);
            } else {
                console.log('Карточка товару не знайдена');
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            console.error('Помилка оновлення карточки товару:', err);
            res.sendStatus(500);
        });
});



const server = createServer(app);
server.listen(port, () => console.log(`server is up. port ${port}`));