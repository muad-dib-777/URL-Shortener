const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const ShortUrl = require('./models/ShortUrl')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/urlShortener', {

    
    useNewUrlParser: true,
    useUnifiedTopology: true
      
})

app.get("/", async (req,res) => {

    const shortUrls = await ShortUrl.find()
    res.status(200).render('index.ejs', {shortUrls: shortUrls})
    
})

app.post("/shorten", async (req,res) => {

    await ShortUrl.create({fullURL: req.body.fullURL})
    res.redirect('/')

})

app.get('/:shortUrl', async (req,res) => {

    
    const shortUrl = await ShortUrl.findOne({ shortURL: req.params.shortUrl })
    

    if (!shortUrl) return res.sendStatus(404)

    shortUrl.clicks++
    await shortUrl.save()

    res.redirect(shortUrl.fullURL)


})

app.listen(process.env.PORT || 7000)
