module.exports = (app)=> {
    app.use('/api', require('./user/user.routes'));
    app.use('/api', require('./use_cases/use_cases.routes'));
    app.use('/api', require('./recommendations/recommendations.routes'));
}