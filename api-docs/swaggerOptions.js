const swaggerJsdoc = require('swagger-jsdoc');
const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger_output.json'
const endpointsFiles = ['./router/routes.js']
const options = {
    swaggerDefinition: {
        info: {
            title: 'Intelligent Decision Automation System',
            version: '1.0.0',
            description: 'Documentation of each and every API used in this portal',
        },
        basePath: "/",
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            {
                name: "User",
                description: "Endpoints"
            }
        ],
        definitions: {
            User: {
                name: "Jhon Doe",
                age: 29,
                parents: {
                    father: "Simon Doe",
                    mother: "Marie Doe"
                },
                diplomas: [
                    {
                        school: "XYZ University",
                        year: 2020,
                        completed: true,
                        internship: {
                            hours: 290,
                            location: "XYZ Company"
                        }
                    }
                ]
            }
        }
    },
    apis: ['./router/*.js'], // Path to the API route files
};

const specs = swaggerJsdoc(options);
swaggerAutogen(outputFile, endpointsFiles, options).then(() => {
    require('../server.js')
})

module.exports = specs;
