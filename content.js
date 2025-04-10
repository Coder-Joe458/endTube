function hideRecommendations() {
    const recommendationSelectors = [
        '.ytp-ce-element.ytp-ce-video',
        '.ytp-ce-element.ytp-ce-playlist'
    ];
    
    recommendationSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // Hide the entire recommendation element
            element.style.display = 'none';
            
            // Remove tabindex to prevent keyboard focus
            element.removeAttribute('tabindex');
            
            // Find and disable the inner link
            const link = element.querySelector('a.ytp-ce-covering-overlay');
            if (link) {
                link.style.pointerEvents = 'none';
                link.removeAttribute('href');
                link.removeAttribute('tabindex');
            }
        });
    });
}

// Run the function initially
hideRecommendations();

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            hideRecommendations();
        }
    });
});

// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });
