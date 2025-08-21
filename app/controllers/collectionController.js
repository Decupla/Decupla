const index = (req,res) => {
       res.status(200).render('content', {
        title: 'Content',
        query: req.query
    });
}

module.exports = {
    index
}