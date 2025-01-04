'use strict';

(() => {

// === DOM & VARS ===
const DOM = {};
DOM.mobileSidebarToggle = document.querySelector('#mobile-sidebar-toggle');
DOM.sidebar = document.querySelector('#main-sidebar');

// === INIT =========
const init = () => {
    if(DOM.mobileSidebarToggle&&DOM.sidebar){
        DOM.mobileSidebarToggle.addEventListener('click',toggleSidebar);
    }
}

// === FUNCTIONS ====
const toggleSidebar = () => {
    DOM.sidebar.classList.toggle('visible');
}

init();

})();