var express = require('express');
var cors = require('cors');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


var app = express();
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const f = require('fs');
const path = require('path');

app.use(bodyParser.json());
app.use(cors());

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Express app',
    },
};

// Options for the swagger-jsdoc
const swaggerOptions = {
    swaggerDefinition,
    // Paths to files containing OpenAPI comments
    apis: [path.join(__dirname, 'api.js')],
  };
  
  // Initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Save the Swagger definition to a file
const swaggerFilePath = path.join(__dirname, 'swagger-definition.json');
f.writeFileSync(swaggerFilePath, JSON.stringify(swaggerSpec, null, 2), 'utf-8');
  
  // Serve Swagger documentation at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @swagger
 * /monday:
 *   get:
 *     summary: Gets the menu for monday.
 *     responses:
 *       200:
 *         description: sucessful Menu for monday.
 *       500:
 *         description: Internal Server Error.
 */
app.get('/monday', cors(), function (req, res, next) {
    res.json([
        { name: 'Cheeseburger', category: 'Main Course', price: 5.99, description: 'Juicy beef patty with melted cheese on a sesame seed bun.' },
        { name: 'Salad', category: 'Salad', price: 2.99, description: 'Caprese salad with fresh vegetables' },
        { name: 'Muffins', category: 'Dessert', price: 1.99, description: 'Freshly baked muffins.' },
        { name: 'Soda of choice', category: 'Drinks', price: 0.99, description: 'Coke, Ginger Ale, Fruitopia, Canada Dry' }
    ]);
})


/**
 * @swagger
 * /tuesday:
 *   get:
 *     summary: Gets the menu for Tuesday.
 *     responses:
 *       200:
 *         description: sucessful Menu for tuesday.
 *       500:
 *         description: Internal Server Error.
 */
app.get('/tuesday', cors(), function (req, res, next) {
    res.json([
        { name: 'Pepporoni', category: 'Main Course', price: 6.99, description: 'Pepporoni pizz from the oven.' },
        { name: 'Coleslaw', category: 'Main Course', price: 2.99, description: 'Greek coleslaw with carrots, cauliflower and Ranch.' },
        { name: 'Danish pudding', category: 'Dessert', price: 4.99, description: 'Danish pudding with caramel syrup' },
        { name: 'Soda of choice', category: 'Drinks', price: 0.99, description: 'Coke, Ginger Ale, Fruitopia, Canada Dry' }
    ]);
})

/**
 * @swagger
 * /wednesday:
 *   get:
 *     summary: Gets the menu for Wednesday.
 *     responses:
 *       200:
 *         description: sucessful Menu for Wednesday.
 *       500:
 *         description: Internal Server Error.
 */
app.get('/wednesday', cors(), function (req, res, next) {
    res.json([
        { name: 'Chinese Noodles', category: 'Main Course', price: 4.99, description: 'Cantonese noodles with soy sauce '},
        { name: 'Salad', category: 'Salad', price: 2.99, description: 'Caprese salad with fresh vegetables'} ,
        { name: 'Blueberry Muffin', category: 'Dessert', price: 2.99, description: 'Blueberry Muffin from tim hortons' },
        { name: 'Soda of choice', category: 'Drinks', price: 0.99, description: 'Coke, Ginger Ale, Fruitopia, Canada Dry'}
    ]);
})

/**
 * @swagger
 * /Thursday:
 *   get:
 *     summary: Gets the menu for thursday.
 *     responses:
 *       200:
 *         description: sucessful Menu for thursday.
 *       500:
 *         description: Internal Server Error.
 */
app.get('/thursday', cors(), function (req, res, next) {
    res.json([
        { name: 'Butter Chicken', category: 'Main Course', price: 6.99, description: 'Indian curry with aromatic spices and butter'},
        { name: 'Coleslaw', category: 'Main Course', price: 2.99, description: 'Greek coleslaw with carrots, cauliflower and Ranch.' },
        { name: 'Danish pudding', category: 'Dessert', price: 4.99, description: 'Danish pudding with caramel syrup' },
        { name: 'Soda of choice', category: 'Drinks', price: 0.99, description: 'Coke, Ginger Ale, Fruitopia, Canada Dry' }
    ]);
})

/**
 * @swagger
 * /Friday:
 *   get:
 *     summary: Gets the menu for friday.
 *     responses:
 *       200:
 *         description: sucessful Menu for friday.
 *       500:
 *         description: Internal Server Error.
 */
app.get('/friday', cors(), function (req, res, next) {
    res.json([
        { name: 'Poutine', category: 'Main Course', price: 3.99, description: 'Crisp fries with cheese curds and gravy' },
        { name: 'Salad', category: 'Salad', price: 2.99, description: 'Caprese salad with fresh vegetables' },
        { name: 'Blueberry Muffin', category: 'Dessert', price: 2.99, description: 'Blueberry Muffin from tim hortons' },
        { name: 'Soda of choice', category: 'Drinks', price: 0.99, description: 'Coke, Ginger Ale, Fruitopia, Canada Dry' }
    ]);
})

/**
 * @swagger
 * /fetFeedbacks:
 *   get:
 *     summary: Gets all the feedbacks.
 *     responses:
 *       200:
 *         description: Gets all the feedbacks.
 *       500:
 *         description: Internal Server Error.
 */
app.get('/getFeedbacks', cors(), async (req, res, next) => {
    const filePath = path.join(__dirname, 'feedback.json');
    // read file
    var fileContent = await fs.readFile(filePath, 'utf-8');
    var contentArray = JSON.parse(fileContent);

    res.json(contentArray);
})

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Submit feedback.
 *     responses:
 *       200:
 *         description: Submit feedback and store in json.
 *       500:
 *         description: Internal Server Error.
 */
app.post('/feedback', cors(),  async (req, res, next) => {
    try {
        // Extract data from the request body
        const inputData = req.body;
        console.log(inputData);
    
        // Convert the data to a JSON string
        const jsonString = JSON.stringify(inputData, null, 2);
    
        // Specify the file path where you want to save the data
        const filePath = path.join(__dirname, 'feedback.json');
        console.log(filePath);
    

        // read file
        var fileContent = await fs.readFile(filePath, 'utf-8');
        var contentArray = JSON.parse(fileContent);
        console.log(contentArray);

        contentArray.push(inputData);

        console.log(contentArray);
        // Write the data to the file
        await fs.writeFile(filePath, JSON.stringify(contentArray, null, 2));
    
        // Respond with a success message
        res.status(200).json({ message: 'Data written to file successfully.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
      }

})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})