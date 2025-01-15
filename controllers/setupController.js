const index = (req, res) => {
    res.render('setup',{
        title: 'Setup',
        loggedIn: false,
        message: ""
    })
}

module.exports = {
    index
};