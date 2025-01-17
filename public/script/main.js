'use strict';

(() => {

    // === DOM & VARS ===
    const DOM = {};
    DOM.mobileSidebarToggle = document.querySelector('#mobile-sidebar-toggle');
    DOM.sidebar = document.querySelector('#main-sidebar');
    DOM.generateKeyButton = document.querySelector('button#generate-key');
    DOM.generateKeyInput = document.querySelector('input#api-key');
    DOM.keyFields = document.querySelectorAll('.key-field');
    DOM.toggleVisibilityWrappers = document.querySelectorAll('.toggle-visibility-wrapper');

    // === INIT =========
    const init = () => {
        if (DOM.mobileSidebarToggle && DOM.sidebar) {
            DOM.mobileSidebarToggle.addEventListener('click', toggleSidebar);
        }

        if (DOM.generateKeyButton && DOM.generateKeyInput) {
            DOM.generateKeyButton.addEventListener('click', generateKey);
        }

        DOM.toggleVisibilityWrappers.forEach((wrapper) => {
            setupVisibilityToggle(wrapper);
        })

        DOM.keyFields.forEach((field) => {
            field.addEventListener('click', () => {
                if (field.classList.contains('key-hidden')) {
                    field.classList.remove('key-hidden');
                }
            })
        })
    }

    // === FUNCTIONS ====
    const toggleSidebar = () => {
        DOM.sidebar.classList.toggle('visible');
    }

    const setupVisibilityToggle = (wrapper) => {
        const toggle = wrapper.querySelector('.toggle-password-visibility');
        const input = wrapper.querySelector('input[type="password"]');

        if (!toggle || !input) return;

        toggle.addEventListener('mousedown', () => {
            input.type = "text";
        })
        toggle.addEventListener('mouseup', () => {
            input.type = "password";
        })
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