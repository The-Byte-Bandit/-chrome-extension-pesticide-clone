document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: toggleOutline
            });
        });
    });
});

function toggleOutline() {
    const styleId = 'outline-style';
    let styleElement = document.getElementById(styleId);

    if (styleElement) {
        // If the style element exists, remove it (turning off the outline)
        styleElement.remove();
    } else {
        // If the style element doesn't exist, create it (turning on the outline)
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.innerHTML = `
            * {
                outline: 1px solid red !important;
            }
        `;
        document.head.appendChild(styleElement);
    }
}
