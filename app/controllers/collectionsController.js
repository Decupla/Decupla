const index = (req,res) => {
       res.status(200).render('collections', {
        title: 'Content',
        query: req.query
    });
}

module.exports = {
    index
}