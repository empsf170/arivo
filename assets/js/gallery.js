/**
 * Artivo Museum - Gallery Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
    const masonryItems = document.querySelectorAll('.masonry-item');
    const lightboxModal = document.getElementById('lightboxModal');
    
    if (masonryItems.length > 0 && lightboxModal) {
        const bsLightbox = new bootstrap.Modal(lightboxModal);
        const lbImage = document.getElementById('lightboxImage');
        const lbTitle = document.getElementById('lightboxTitle');
        const lbArtist = document.getElementById('lightboxArtist');
        const lbYear = document.getElementById('lightboxYear');
        const lbMedium = document.getElementById('lightboxMedium');
        
        let currentIndex = 0;
        const galleryData = Array.from(masonryItems).map((item, index) => {
            const img = item.querySelector('img');
            // Store original index for navigation
            item.setAttribute('data-index', index);
            
            return {
                src: img.getAttribute('src'),
                title: item.getAttribute('data-title'),
                artist: item.getAttribute('data-artist'),
                year: item.getAttribute('data-year'),
                medium: item.getAttribute('data-medium')
            };
        });

        const updateLightbox = (index) => {
            const data = galleryData[index];
            lbImage.style.opacity = '0';
            
            setTimeout(() => {
                lbImage.src = data.src;
                lbImage.alt = data.title;
                lbTitle.textContent = data.title;
                lbArtist.textContent = data.artist;
                lbYear.textContent = data.year;
                lbMedium.textContent = data.medium;
                
                lbImage.onload = () => {
                    lbImage.style.opacity = '1';
                };
            }, 200);
            
            currentIndex = index;
        };

        masonryItems.forEach((item) => {
            item.addEventListener('click', () => {
                const idx = parseInt(item.getAttribute('data-index'));
                updateLightbox(idx);
                bsLightbox.show();
            });
        });

        // Navigation Controls
        const btnPrev = document.getElementById('lightboxPrev');
        const btnNext = document.getElementById('lightboxNext');

        if (btnPrev && btnNext) {
            btnPrev.addEventListener('click', () => {
                let prevIdx = currentIndex - 1;
                if (prevIdx < 0) prevIdx = galleryData.length - 1;
                updateLightbox(prevIdx);
            });

            btnNext.addEventListener('click', () => {
                let nextIdx = currentIndex + 1;
                if (nextIdx >= galleryData.length) nextIdx = 0;
                updateLightbox(nextIdx);
            });
        }

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (lightboxModal.classList.contains('show')) {
                if (e.key === 'ArrowLeft') {
                    btnPrev.click();
                } else if (e.key === 'ArrowRight') {
                    btnNext.click();
                }
            }
        });
    }
});
