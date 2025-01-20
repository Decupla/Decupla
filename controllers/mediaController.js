const Media = require('../models/media');
const sanitizeFilename = require('../helpers/sanitizeFilename');

const index = (req, res) => {
    res.status(200).render('media', {
        title: 'Media'
    })
}

const create = (req, res) => {
    res.status(200).render('editMedia', {
        title: 'Add Media',
        messages: {}
    })
}

const saveNew = async (req, res) => {
    if (!req.files) {
        return res.status(400).render('editMedia', {
            title: 'Add Media',
            messages: { error: 'No file selected' }
        });
    }

    const file = req.files.file;
    // to do: sanitize file name
    const filename = sanitizeFilename(file.name);

    try {
        await new Promise((resolve, reject) => {
            file.mv(`${process.cwd()}/uploads/${filename}`, err => {
                if (err) return reject(err);
                resolve();
            });
        });

        const data = {
            file: filename,
            alt: req.body.alt
        };

        const newID = await Media.add(data);
        if(newID===null){
            return res.status(500).render('editMedia', {
                title: 'Add Media',
                messages: { error: 'There was an saving the media. Please check the console for more informations' }
            });
        }

        res.redirect(`/media/edit/${newID}`);

    } catch (error) {
        console.log(error);
        return res.status(500).render('editMedia', {
            title: 'Add Media',
            messages: { error: 'There was an error uploading the file. Please check the console for more informations' }
        });
    }
};



module.exports = {
    index,
    create,
    saveNew
}