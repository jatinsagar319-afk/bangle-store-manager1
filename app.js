"use strict";

/*
    Bangle Store Manager
    Version 1 Foundation

    Important:
    - No demo inventory
    - No fake stock
    - No fake AI results
    - No login
*/


const APP_VERSION = "1.0.0";


// --------------------------------------------------
// APPLICATION STATE
// --------------------------------------------------

const AppState = {

    currentPage: "home",

    products: [],

    sections: [],

    bills: [],

    designs: [],

    dailyEntries: [],

    settings: {

        shopName: "Bangle Store",

        lowStockLimit: 5

    }

};


// --------------------------------------------------
// STORAGE
// --------------------------------------------------

const STORAGE_KEYS = {

    products: "bsm_products",

    sections: "bsm_sections",

    bills: "bsm_bills",

    designs: "bsm_designs",

    dailyEntries: "bsm_daily_entries",

    settings: "bsm_settings"

};


function loadData() {

    try {

        AppState.products =
            JSON.parse(
                localStorage.getItem(
                    STORAGE_KEYS.products
                )
            ) || [];


        AppState.sections =
            JSON.parse(
                localStorage.getItem(
                    STORAGE_KEYS.sections
                )
            ) || [];


        AppState.bills =
            JSON.parse(
                localStorage.getItem(
                    STORAGE_KEYS.bills
                )
            ) || [];


        AppState.designs =
            JSON.parse(
                localStorage.getItem(
                    STORAGE_KEYS.designs
                )
            ) || [];


        AppState.dailyEntries =
            JSON.parse(
                localStorage.getItem(
                    STORAGE_KEYS.dailyEntries
                )
            ) || [];


        AppState.settings =
            JSON.parse(
                localStorage.getItem(
                    STORAGE_KEYS.settings
                )
            ) ||
            {

                shopName: "Bangle Store",

                lowStockLimit: 5

            };

    }

    catch (error) {

        console.error(
            "Failed to load application data:",
            error
        );

        showMessage(
            "App data could not be loaded."
        );

    }

}


function saveData() {

    try {

        localStorage.setItem(
            STORAGE_KEYS.products,
            JSON.stringify(
                AppState.products
            )
        );


        localStorage.setItem(
            STORAGE_KEYS.sections,
            JSON.stringify(
                AppState.sections
            )
        );


        localStorage.setItem(
            STORAGE_KEYS.bills,
            JSON.stringify(
                AppState.bills
            )
        );


        localStorage.setItem(
            STORAGE_KEYS.designs,
            JSON.stringify(
                AppState.designs
            )
        );


        localStorage.setItem(
            STORAGE_KEYS.dailyEntries,
            JSON.stringify(
                AppState.dailyEntries
            )
        );


        localStorage.setItem(
            STORAGE_KEYS.settings,
            JSON.stringify(
                AppState.settings
            )
        );

    }

    catch (error) {

        console.error(
            "Failed to save application data:",
            error
        );

        showMessage(
            "Could not save app data."
        );

    }

}


// --------------------------------------------------
// MESSAGE
// --------------------------------------------------

let messageTimer = null;


function showMessage(message) {

    const box =
        document.getElementById(
            "messageBox"
        );

    if (!box) return;

    box.textContent = message;

    box.classList.add("show");

    clearTimeout(messageTimer);

    messageTimer = setTimeout(() => {

        box.classList.remove("show");

    }, 2200);

}


// --------------------------------------------------
// PAGE NAVIGATION
// --------------------------------------------------

function openPage(page) {

    AppState.currentPage = page;

    /*
        For now the foundation keeps the dashboard visible.
        Real modules will replace this navigation behavior
        one by one without changing the storage architecture.
    */

    if (page === "home") {

        setActiveNavigation("home");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;

    }


    const pageNames = {

        inventory:
            "Inventory module is coming next.",

        "ai-set-maker":
            "AI Set Maker module is coming next.",

        "new-sale":
            "New Sale module is coming next.",

        bills:
            "Bills module is coming next.",

        reports:
            "Sale Reports module is coming next.",

        "daily-parcha":
            "Daily Parcha module is coming next.",

        settings:
            "Settings module is coming next."

    };


    showMessage(
        pageNames[page] ||
        "This module is not available yet."
    );


    setActiveNavigation(page);

}


function setActiveNavigation(page) {

    document
        .querySelectorAll(
            ".nav-item"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );

        });

}


// --------------------------------------------------
// BUTTON EVENTS
// --------------------------------------------------

function setupNavigation() {

    document
        .querySelectorAll(
            "[data-page]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openPage(
                        button.dataset.page
                    );

                }
            );

        });


    const settingsButton =
        document.getElementById(
            "settingsButton"
        );


    if (settingsButton) {

        settingsButton.addEventListener(
            "click",
            () => {

                openPage(
                    "settings"
                );

            }
        );

    }

}


// --------------------------------------------------
// PWA SERVICE WORKER
// --------------------------------------------------

function registerServiceWorker() {

    if (
        "serviceWorker" in navigator
    ) {

        window.addEventListener(
            "load",
            () => {

                navigator.serviceWorker
                    .register(
                        "service-worker.js"
                    )
                    .then(
                        registration => {

                            console.log(
                                "Service Worker registered:",
                                registration.scope
                            );

                        }
                    )
                    .catch(
                        error => {

                            console.error(
                                "Service Worker registration failed:",
                                error
                            );

                        }
                    );

            }
        );

    }

}


// --------------------------------------------------
// APP START
// --------------------------------------------------

function startApp() {

    console.log(
        `Bangle Store Manager v${APP_VERSION}`
    );

    loadData();

    saveData();

    setupNavigation();

    registerServiceWorker();

}


document.addEventListener(
    "DOMContentLoaded",
    startApp
);
