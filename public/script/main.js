'use strict';

(() => {

    // === DOM & VARS ===
    const DOM = {};
    DOM.mobileSidebarToggle = document.querySelector('#mobile-sidebar-toggle');
    DOM.sidebar = document.querySelector('#main-sidebar');
    DOM.generateKeyButton = document.querySelector('button#generate-key');
    DOM.generateKeyInput = document.querySelector('input#api-key');
    DOM.keyFields = document.querySelectorAll('.key-field');

    // === INIT =========
    const init = () => {
        if (DOM.mobileSidebarToggle && DOM.sidebar) {
            DOM.mobileSidebarToggle.addEventListener('click', toggleSidebar);
        }

        if (DOM.generateKeyButton && DOM.generateKeyInput) {
            DOM.generateKeyButton.addEventListener('click', generateKey);
        }

        DOM.keyFields.forEach((field)=>{
            field.addEventListener('click',()=>{
                if(field.classList.contains('key-hidden')){
                    field.classList.remove('key-hidden');
                }
            })
        })
    }

    // === FUNCTIONS ====
    const toggleSidebar = () => {
        DOM.sidebar.classList.toggle('visible');
    }

    const generateKey = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = '';

        for (let i = 0; i < 32; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        DOM.generateKeyInput.value = result;
    }

    init();

})();