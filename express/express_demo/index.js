//-- Load the express module
const Joi = require('joi'); //-- Since this returns a class, constant Joi will have a J as upper case
const express = require('express'); //-- This returns a function
const app = express(); //--the function returns an object

//-- This object, app, has some useful methods that correspond to the HTTP methods

//-- In order for req.body.name to work, we need to enable parsing of JSON objects in the body of the request
//-- express.json() is adding a piece of middleware. So, when we call express.json(), it returns a piece of middleware. 
//-- app.use() uses that middleware in the request processing pipeline
app.use(express.json());

//-- Building end points -----------------

const courses = [
    {id: 1, name: 'Course 1'},
    {id: 2, name: 'Course 2'},
    {id: 3, name: 'Course 3'},
];

//-- Building end points for GET HTTP method -----------------

app.get('/', (req, res) => { //-- Get method has the URL & the callback function which is called the Route Handler
    res.send("Hello World");
    res.end();
});

app.get("/api/courses", (req, res) => { //-- Define another route
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        //-- 404
        //-- Client asks for a resource but that resource does not exist in the server. So, we send a status code of 404
        //-- We return as we do not want the rest of the function to be executed
        return res.status(404).send("The course with the given id does not exist");
    }
    else {
        res.send(course);
    }
});

app.get('/api/posts/:year/:month', (req, res) => {
   res.send(`${req.params.year} year and ${req.params.month}`);
});

//-- Building end points for POST HTTP method -----------------

app.post('/api/courses', (req, res) => {

   //-- If it is a bad request, then return 400
    //-- Telling Joi the validation for the course object
    //-- Defines that the name value is required and a string and must be a minimum of 3 characters
    //const result = validateCourse(req.body);

    //-- Instead of calling result.error in a few places, we use object destructuring property
    const { error } = validateCourse(req.body); //-- This {error} refers to result.error

    //-- As a security best practice, we must never trust what the client sends us. You should always validate the input.
    if (error) {
        //-- HTTP status code for bad request is 400
        //-- We return here as we do not want the rest of the function to be executed.
        return res.status(400).send(error.details[0].message);
    }

    //-- Read the course object that is in the body of the request & add it to the courses array
    //-- We manually assign an ID as we are not working with a database. In real world, ID will be assigned by the database
    //-- In order for req.body.name to work, we need to enable parsing of JSON objects in the body of the request
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course); //-- Since we assign the ID on the server, chances are the client needs to know the ID of the newly created resource
});

//-- Building end points for PUT HTTP method -----------------

app.put('api/course/:id', (req,res) => {
    //-- Look up the course
    //-- If course does not exist, then return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        //-- 404
        //-- Client asks for a resource but that resource does not exist in the server. So, we send a status code of 404
        //-- We return as we do not want the rest of the function to be executed
        return res.status(404).send("The course with the given id does not exist");
    }

    //-- If it is a bad request, then return 400
    //-- Telling Joi the validation for the course object
    //-- Defines that the name value is required and a string and must be a minimum of 3 characters
    //const result = validateCourse(req.body);

    //-- Instead of calling result.error in a few places, we use object destructuring property
    const { error } = validateCourse(req.body); //-- This {error} refers to result.error

    //-- As a security best practice, we must never trust what the client sends us. You should always validate the input.
    if (error) {
        //-- HTTP status code for bad request is 400
        //-- We return here as we do not want the rest of the function to be executed.
        return res.status(400).send(error.details[0].message);
    }

    //-- If it is a good request, then update the course
    course.name = req.body.name;

    //-- Return the updated course
    res.send(course);

});

//-- Building end points for DELETE HTTP method -----------------

app.delete("/api/course/:id", (req,res) => {
    //-- Look up the course
    //-- If course does not exist, then return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        //-- 404
        //-- Client asks for a resource but that resource does not exist in the server. So, we send a status code of 404
        //-- We return as we do not want the rest of the function to be executed
        return res.status(404).send("The course with the given id does not exist");
    }

    //-- Delete the course
    const index = courses.indexOf(course); //-- We get the index that is stored in the constant
    courses.splice(index, 1); //-- Go to this index & remove one object

    //-- Return the same course
    res.send(course);
});

//-- If it is a bad request, then return 400
//-- Telling Joi the validation for the course object
//-- Defines that the name value is required and a string and must be a minimum of 3 characters
function validateCourse(course) {
    //-- If it is a bad request, then return 400
    //-- Telling Joi the validation for the course object
    //-- Defines that the name value is required and a string and must be a minimum of 3 characters
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});