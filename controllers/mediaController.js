const fs = require('fs');
const path = require('path');

const Media = require('../models/media');
const sanitizeFilename = require('../helpers/sanitizeFilename');

const index = async (req, res) => {
    const media = await Media.getAll();

    res.status(200).render('media', {
        title: 'Media',
        media,
        query: req.query
    })
}

const create = (req, res) => {
    res.status(200).render('editMedia', {
        title: 'Add Media',
        messages: {},
        editingExisting: false,
        data: {},
        query: req.query
    })
}

const edit = async (req,res) => {
    const { id } = req.params;

    const data = await Media.get(id);
    if (data === null) {
        return res.redirect('/media');
    }

    res.status(200).render('editMedia', {
        title: 'Edit Media',
        messages: {},
        editingExisting: true,
        data,
        query: req.query
    })
}

const saveNew = async (req, res) => {
    if (!req.files) {
        return res.status(400).render('editMedia', {
            title: 'Add Media',
            messages: { error: 'No file selected' },
            editingExisting: false,
            data: req.body,
            query: req.query
        });
    }

    const file = req.files.file;
    const filename = sanitizeFilename(file.name);
    const filesize = (file.size / 1024).toFixed(2);
    const filetype = file.mimetype;

    try {
        await new Promise((resolve, reject) => {
            $newPath = path.join(process.cwd(), 'uploads', filename);
            file.mv(`${process.cwd()}/uploads/${filename}`, err => {
                if (err) return reject(err);
                resolve();
            });
        });

        const data = {
            file: filename,
            alt: req.body.alt,
            size: filesize,
            type: filetype
        };

        const newID = await Media.add(data);
        if(newID===null){
            return res.status(500).render('editMedia', {
                title: 'Add Media',
                messages: { error: 'There was an error saving the media. Please check the console for more informations' },
                editingExisting: false,
                data: req.body,
                query: req.query
            });
        }

        res.redirect(`/media/edit/${newID}?message=saved`);

    } catch (error) {
        console.log(error);
        return res.status(500).render('editMedia', {
            title: 'Add Media',
            messages: { error: 'There was an error uploading the file. Please check the console for more informations' },
            editingExisting: false,
            data: req.body,
            query: req.query
        });
    }
};

const save = async (req, res) => {
    const { id } = req.params;
    const data = {
        alt: req.body.alt
    };

    try {
        if (req.files && req.files.file) {
            const file = req.files.file;
            const filename = sanitizeFilename(file.name);
            const filesize = (file.size / 1024).toFixed(2);
            const filetype = file.mimetype;
            data.file = filename;
            data.size = filesize;
            data.type = filetype;

            const currentMedia = await Media.get(id);
            if (!currentMedia) {
                return res.status(500).render('editMedia', {
                    title: 'Edit Media',
                    messages: { error: 'Error retrieving current media. Please check the console for more information.' },
                    editingExisting: true,
                    data: req.body,
                    query: req.query
                });
            }

            const currentFilePath = path.join(process.cwd(), 'uploads', currentMedia.file);
            if (fs.existsSync(currentFilePath)) {
                fs.unlinkSync(currentFilePath);
            }

            const newFilePath = path.join(process.cwd(), 'uploads', filename);
            await new Promise((resolve, reject) => {
                file.mv(newFilePath, err => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        }

        const success = await Media.update(id, data);
        if (!success) {
            return res.status(500).render('editMedia', {
                title: 'Edit Media',
                messages: { error: 'Error updating media. Please check the console for more information.' },
                editingExisting: true,
                data: req.body,
                query: req.query
            });
        }

        res.redirect(`/media/edit/${id}?message=saved`);

    } catch (error) {
        console.error(error);
        return res.status(500).render('editMedia', {
            title: 'Edit Media',
            messages: { error: 'An error occurred while processing the request. Please check the console for more information.' },
            editingExisting: true,
            data: req.body,
            query: req.query
        });
    }
};

const remove = async (req,res) => {
    try {
        const { id } = req.params;
        const currentMedia = await Media.get(id);
        if(currentMedia===null){
            res.redirect('/media');
        }

        const currentFilePath = path.join(process.cwd(), 'uploads', currentMedia.file);
        if (fs.existsSync(currentFilePath)) {
            fs.unlinkSync(currentFilePath);
        }

        const success = Media.remove(id);
        if(success){
          return res.redirect('/media?message=deleted');
        }

        return res.status(500).render('error', {
            title: 'Error',
            messages: { error: 'An error occurred while delete the media. Please check the console for more information.' },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).render('error', {
            title: 'Error',
            messages: { error: 'An error occurred while delete the media. Please check the console for more information.' },
        });
    }
}


module.exports = {
    index,
    create,
    edit,
    saveNew,
    save,
    remove
}