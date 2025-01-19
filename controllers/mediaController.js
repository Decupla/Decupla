const index = (req,res) => {
    res.status(200).render('media',{
        title: 'Media'
    })
}

const create = (req,res) => {
    res.status(200).render('editMedia',{
        title: 'Add Media',
        messages: {}
    })
}

const saveNew = (req,res) => {
    if (req.files) {
        const file = req.files.file
        const fileName = file.name
        file.mv(`${__dirname}/store/${fileName}`, err => {
            if (err) {
                console.log(err)
                res.status(500).render('editMedia',{
                    title: 'Add Media',
                    messages: {error: 'There was an error uploading the file. Please check the console for more informations'}
                    })
            } else {
                //hier speichern in datenbank
                res.send('uploaded successfully')
            }
        })
    } else {
        res.status(400).render('editMedia',{
        title: 'Add Media',
        messages: {error: 'No file selected'}
        })
    }
}

module.exports = {
    index,
    create
}