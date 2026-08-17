document.addEventListener('DOMContentLoaded', () => {
    
    // Sample Crop Data
    const crops = [
        {
            id: 'paddy',
            name: 'Paddy (Rice)',
            image: 'assets/images/crop_paddy.webp',
            seasons: ['kharif', 'rabi', 'summer'],
            soil: 'Clayey, Loamy',
            water: 'High (1200-1500mm)',
            advisory: 'Maintain 5cm water level during vegetative stage. Apply Nitrogen in 3 splits.'
        },
        {
            id: 'sugarcane',
            name: 'Sugarcane',
            image: 'assets/images/crop_sugarcane.webp',
            seasons: ['year-round'],
            soil: 'Deep, well-drained loam',
            water: 'Very High (1500-2500mm)',
            advisory: 'Adopt drip irrigation. Regular de-trashing and propping required.'
        },
        {
            id: 'banana',
            name: 'Banana',
            image: 'assets/images/crop_banana.webp',
            seasons: ['year-round'],
            soil: 'Rich, well-drained soil',
            water: 'High (1200-2000mm)',
            advisory: 'Windbreaks are essential. Apply frequent light irrigation.'
        },
        {
            id: 'cotton',
            name: 'Cotton',
            image: 'assets/images/crop_cotton.webp',
            seasons: ['kharif'],
            soil: 'Black cotton soil, clay loam',
            water: 'Medium (500-700mm)',
            advisory: 'Avoid waterlogging. Timely spraying for bollworms is critical.'
        },
        {
            id: 'groundnut',
            name: 'Groundnut',
            image: 'assets/images/crop_groundnut.webp',
            seasons: ['kharif', 'summer'],
            soil: 'Well-drained sandy loam',
            water: 'Medium (500-600mm)',
            advisory: 'Apply Gypsum at 400kg/ha at pegging stage for better pod formation.'
        },
        {
            id: 'maize',
            name: 'Maize',
            image: 'assets/images/crop_maize.webp',
            seasons: ['kharif', 'rabi', 'summer'],
            soil: 'Deep, fertile, well-drained',
            water: 'Medium (500-800mm)',
            advisory: 'Sensitive to waterlogging. Ensure proper drainage.'
        },
        {
            id: 'coconut',
            name: 'Coconut',
            image: 'assets/images/crop_coconut.webp',
            seasons: ['year-round'],
            soil: 'Red sandy loam, coastal sand',
            water: 'High (1000-2200mm)',
            advisory: 'Apply organic manure and husk burial for moisture conservation.'
        },
        {
            id: 'turmeric',
            name: 'Turmeric',
            image: 'assets/images/crop_turmeric.webp',
            seasons: ['kharif'],
            soil: 'Well-drained sandy or clay loam',
            water: 'High (1500mm)',
            advisory: 'Requires partial shade in early stages. Rhizome rot is a major threat.'
        }
    ];

    const cropGrid = document.getElementById('cropGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Function to render crops
    function renderCrops(filter = 'all') {
        if (!cropGrid) return;
        
        cropGrid.innerHTML = '';
        
        const filteredCrops = filter === 'all' 
            ? crops 
            : crops.filter(crop => crop.seasons.includes(filter));

        filteredCrops.forEach(crop => {
            const seasonLabels = crop.seasons.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
            
            const card = document.createElement('div');
            card.className = 'card crop-grid-item show';
            card.style.padding = '0';
            card.style.overflow = 'hidden';
            
            card.innerHTML = `
                <img src="${crop.image}" alt="${crop.name}" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                        <h3 style="margin: 0;">${crop.name}</h3>
                        <span style="background-color: var(--accent-light); color: var(--primary-green); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                            ${seasonLabels}
                        </span>
                    </div>
                    
                    <ul style="margin-bottom: 16px; font-size: 0.9rem;">
                        <li style="margin-bottom: 8px;"><strong>Soil:</strong> ${crop.soil}</li>
                        <li style="margin-bottom: 8px;"><strong>Water:</strong> ${crop.water}</li>
                        <li><strong>Advisory:</strong> <span style="color: var(--text-light);">${crop.advisory}</span></li>
                    </ul>
                    
                    <button class="btn btn-secondary" style="width: 100%; padding: 10px;">View Full Details</button>
                </div>
            `;
            cropGrid.appendChild(card);
        });
    }

    // Initial Render
    renderCrops();

    // Filter Logic
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class
                e.target.classList.add('active');
                // Filter
                const filter = e.target.getAttribute('data-filter');
                renderCrops(filter);
            });
        });
    }

    // Check URL parameters for direct linking
    const urlParams = new URLSearchParams(window.location.search);
    const cropParam = urlParams.get('crop');
    if (cropParam) {
        // Find crop and maybe open a modal or scroll to it.
        // For this frontend demo, we'll just log it.
        console.log("Direct link to crop: ", cropParam);
    }
});
