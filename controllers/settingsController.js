const index = (req,res) => {
    res.status(200).render('settings', {
        title: 'Settings'
    })
}

module.exports = {
    index
}