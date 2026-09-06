// Cache busting utility
const cacheBuster = {
    version: new Date().getTime(), // Use timestamp as version
    
    // Add version to URL
    addVersion: function(url) {
        return `${url}?v=${this.version}`;
    },
    
    // Update all asset URLs with version
    updateAssetUrls: function() {
        // Stylesheets are intentionally NOT rewritten here: swapping a <link>
        // href after the page has already rendered forces the browser to
        // re-fetch the CSS mid-load, causing a visible flash of unstyled
        // content on every refresh. Stylesheets carry their own fixed
        // ?v= query string directly in the HTML instead.

        // Update JavaScript scripts
        document.querySelectorAll('script[src]').forEach(script => {
            if (!script.src.includes('?v=')) {
                script.src = this.addVersion(script.src);
            }
        });

        // Update images
        document.querySelectorAll('img[src]').forEach(img => {
            if (!img.src.includes('?v=')) {
                img.src = this.addVersion(img.src);
            }
        });
    }
};

// Apply cache busting when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    cacheBuster.updateAssetUrls();
}); 