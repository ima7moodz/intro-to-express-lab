const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(morgan("dev"))

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
]

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
]

//route
app.get("/greetings/:name", (req, res) => {
  res.send(
    `<h1> What a delight it is to see you once more, ${req.params.name}. </h1>`
  )
})

app.get("/roll/:number", (req, res) => {
  const isNumber = req.params.number

  if (isNaN(isNumber)) {
    res.send(`<h1> You must specify a number. </h1>`)
  } else {
    const randomNumber = Math.floor(Math.random() * (isNumber + 1))
    res.send(`<h1>You rolled a ${randomNumber}.</h1>`)
  }
})

app.get("/collectibles/:index", (req, res) => {
  const index = parseInt(req.params.index)
  const item = collectibles[index]

  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    res.send("<h1>This item is not yet in stock. Check back soon!</h1>.")
  } else {
    res.send(
      `<h1>So, you want the ${item.name}? For ${item.price}, it can be yours!</h1>`
    )
  }
})

app.get("/shoes", (req, res) => {
  const minPrice = req.query.minPrice
  const maxPrice = req.query.maxPrice
  const type = req.query.type

  const filteredShoes = shoes
    .filter((shoes) => isNaN(minPrice) || shoes.price >= minPrice)
    .filter((shoes) => isNaN(maxPrice) || shoes.price <= maxPrice)
    .filter((shoes) => !type || shoes.type === type)

  res.send(filteredShoes)
})
app.listen(3001, () => {
  console.log("port 3001")
})
