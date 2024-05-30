module.exports = (app)=> {
    app.use('/api', require('./user/user.routes'));
}