import DOM from "./dom";
import { fetchMedia } from "./api";
import { setSelectMultipleMedia, selectMultipleMedia, selectedMedia, clearSelectedMedia } from "./data";

export const setupMediaSelection = async () => {
    await getMedia();

    DOM.mediaSubmit.addEventListener('click',submitMediaSelection);
    DOM.mediaCancel.addEventListener('click',closeMediaSelection);
    DOM.mediaAddNew.addEventListener('click',toggleRefreshContainer);
    DOM.mediaRefreshButton.addEventListener('click',refreshMedia);
}

export const toggleMediaSelection = (wrapper) => {
    DOM.mediaFieldset = wrapper;

    DOM.mediaPopupWrapper.classList.add('visible');
}

export const closeMediaSelection = () => {
    DOM.mediaPopupWrapper.classList.remove('visible');

    const selectedMediaBoxes = document.querySelectorAll('.media-box.selected');
    selectedMediaBoxes.forEach((box)=>{
        box.classList.remove('selected');
    })

    clearSelectedMedia();
}

export const getMedia = async () => {
    try {
        const media = await fetchMedia();
        media.forEach(mediaEl => {
            createMediaBox(mediaEl);
        });
    } catch (error) {
        console.error('Something went wrong:', error);
    }
}

export const createMediaBox = async (media) => {
    const mediaBox = document.createElement('div');
    const mediaPreview = document.createElement('div');
    const previewImage = document.createElement('img');
    const mediaInfo = document.createElement('div');
    const mediaTitle = document.createElement('div');
    const mediaSize = document.createElement('div');

    mediaBox.classList.add('media-box');
    mediaPreview.classList.add('media-preview');
    mediaInfo.classList.add('media-info');
    mediaTitle.classList.add('title');
    mediaSize.classList.add('size');

    if(media.type.includes('image')){
        previewImage.classList.add('image-preview');   
        previewImage.src = "/uploads/" + media.file;
    } else {
        previewImage.classList.add('file-preview');   
        previewImage.src = "/images/icons/file.png";
    }

    mediaTitle.innerText = media.file;
    mediaSize.innerText = media.size;

    mediaPreview.appendChild(previewImage);
    mediaInfo.appendChild(mediaTitle);
    mediaInfo.appendChild(mediaSize);

    mediaBox.appendChild(mediaPreview);
    mediaBox.appendChild(mediaInfo);

    DOM.mediaRow.appendChild(mediaBox);

    mediaBox.addEventListener('click',()=>{
        setSelected(mediaBox,media);
        console.log(selectedMedia);
    })
}

export const setSelected = (box, data) => {
    const isSelected = box.classList.contains('selected');

    if (!selectMultipleMedia && !isSelected) {
        clearSelectedMedia();

        const currentSelected = document.querySelector('.media-box.selected');
        if (currentSelected) {
            currentSelected.classList.remove('selected');
        }

        box.classList.add('selected');
        addSelectedMedia(data);
        return;
    }

    if (!isSelected) {
        box.classList.add('selected');
        addSelectedMedia(data);
    } else {
        box.classList.remove('selected');
        removeSelectedMedia(data.id);
    }
};

export const addSelectedMedia = (data) => {
    if (!data.id || !data.file) {
        console.error('Incorrect data given');
        return;
    }

    selectedMedia.push({
        id: data.id,
        filename: data.file,
    });
};

export const removeSelectedMedia = (id) => {
    const index = selectedMedia.findIndex((media) => media.id === id);

    if (index !== -1) {
        selectedMedia.splice(index, 1);
    }
};

export const submitMediaSelection = () => {
    if(selectedMedia.length<1){
        return;
    }

    const mediaInput = DOM.mediaFieldset.querySelector('input.media');
    const mediaName = DOM.mediaFieldset.querySelector('.selected-media');

    let mediaValue = "";

    if(selectMultipleMedia){
        mediaValue = selectedMedia.map(item => item.filename).join(',');
    } else {
        mediaValue = selectedMedia[0].filename;
    }

    mediaInput.value = mediaValue;
    mediaName.innerText = mediaValue;

    closeMediaSelection();
}

export const toggleRefreshContainer = () => {
    if(!DOM.mediaRefreshContainer.classList.contains('visible')){
        DOM.mediaRefreshContainer.classList.add('visible');
    }
}

export const refreshMedia = () => {
    DOM.mediaRow.innerHTML = "";
    getMedia();
}