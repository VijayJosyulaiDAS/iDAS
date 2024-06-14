module.exports = (app)=> {
    app.use('/api', require('./user/user.routes'));
    app.use('/api', require('./use_cases/use_cases.routes'));
    app.use('/api', require('./recommendations/recommendations.routes'));
    app.use('/api', require('./alternative_recommendations/alternative_recommendations.routes'));
    app.use('/api', require('./master_data/sources.routes'));
}