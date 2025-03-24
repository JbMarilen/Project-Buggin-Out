document.addEventListener('DOMContentLoaded', function() {
    // Make SVG objects grow on hover
    document.querySelectorAll('.data-card, .country-card').forEach(card => {
        const obj = card.querySelector('object');
        
        card.addEventListener('mouseenter', function() {
            if (obj) {
                obj.style.transform = 'scale(1.15)';
                obj.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (obj) {
                obj.style.transform = 'scale(1)';
            }
        });
        
        // Make cards clickable to open modal
        card.addEventListener('click', function() {
            const modal = document.getElementById('svgModal');
            const modalContent = document.querySelector('.modal-content');
            
            // Clone the object element and replace the modal content
            const clonedObj = obj.cloneNode(true);
            clonedObj.classList.add('enlarged-img');
            clonedObj.style.width = '100%';
            clonedObj.style.height = 'auto';
            const existingObj = modalContent.querySelector('object');
            if (existingObj) {
                modalContent.replaceChild(clonedObj, existingObj);
            } else {
                modalContent.insertBefore(clonedObj, modalContent.firstChild);
            }
            
            // Display modal
            modal.style.display = 'block';
        });
    });
    
    // Close modal when clicking the X
    document.querySelector('.close-btn').addEventListener('click', function() {
        document.getElementById('svgModal').style.display = 'none';
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('svgModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});