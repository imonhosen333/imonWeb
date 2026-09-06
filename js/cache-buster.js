// Cache busting utility
const cacheBuster = {
    version: new Date().getTime(), // Use timestamp as version
    
    // Add version to URL
    addVersion: function(url) {
        return `${url}?v=${this.version}`;
    },
    
    // Update all asset URLs with version
    updateAssetUrls: function() {
        // Update CSS links
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (!link.href.includes('?v=')) {
                link.href = this.addVersion(link.href);
            }
        });

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