document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');
    const addDestinationButton = document.getElementById('add-destination');
    const destinationList = document.getElementById('destination-list');
    const addTripButton = document.getElementById('add-trip');
    const submitButton = document.getElementById('submit-data'); // Submit button ID
    const addFlightButton = document.getElementById('add-flight');

    const countryCityData = [
        { country: "Malaysia", cities: ["Kuala Lumpur", "Penang", "Langkawi", "George Town (Penang)", "Johor Bahru", "Kuching", "Kota Kinabalu"] },
        { country: "Thailand", cities: ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi", "Hua Hin"] },
        { country: "Indonesia", cities: ["Jakarta", "Bali (Denpasar)", "Yogyakarta", "Bandung", "Surabaya", "Medan"] },
    ];

    const destinations = [];
    document.addEventListener('DOMContentLoaded', function() {
        let counter = 1; // Initialize a counter
        const elements = document.querySelectorAll('.auto-id'); // Select elements with the class 'auto-id'
        
        elements.forEach(element => {
            element.id = 'num-packge-' + counter; // Set the id attribute
            counter++; // Increment the counter
        });
    });
    function populateDropdown(dropdown, items, autocomplete) {
        dropdown.setAttribute('autocomplete', autocomplete);
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.text = item;
            dropdown.add(option);
        });
    }

    function clearDropdown(dropdown) {
        dropdown.innerHTML = '';
    }

    function createElement(tag, options = {}) {
        const element = document.createElement(tag);
        Object.keys(options).forEach(key => element[key] = options[key]);
        return element;
    }

    function createFormElement({ label, type, id, options = [], autocomplete = '' }) {
        const container = createElement('div');
        const labelElement = createElement('label', { htmlFor: id, textContent: label });
        container.appendChild(labelElement);

        let inputElement;
        if (type === 'select') {
            inputElement = createElement('select', { id, autocomplete });
            options.forEach(option => {
                const optionElement = createElement('option', { value: option, text: option });
                inputElement.add(optionElement);
            });
        } else if (type === 'textarea') {
            inputElement = createElement('textarea', { id, autocomplete });
        } else {
            inputElement = createElement('input', { type, id, autocomplete });
        }
        container.appendChild(inputElement);
        return container;
    }

    function createColumn(title, elements) {
        const columnDiv = createElement('div', { className: 'column' });
        const columnTitle = createElement('h5', { textContent: title });
        columnDiv.appendChild(columnTitle);

        elements.forEach(element => {
            columnDiv.appendChild(createFormElement(element));
        });

        return columnDiv;
    }

    function createSection(title, elements) {
        const section = createElement('div', { className: 'section' });
        const sectionTitle = createElement('h4', { textContent: title });
        section.appendChild(sectionTitle);

        const sectionContent = createElement('div', { className: 'section-content' });
        section.appendChild(sectionContent);

        elements.forEach(element => {
            sectionContent.appendChild(createFormElement(element));
        });

        return section;
    }

    function addDestination() {
        const country = countrySelect.value;
        const city = citySelect.value;

        if (country && city) {
            const newEntry = createElement('div', { className: 'package-entry' });
            const destinationTitle = createElement('h4', { textContent: `${city}, ${country}` });
            newEntry.appendChild(destinationTitle);

            const columnsContainer = createElement('div', { className: 'package-columns' });
            newEntry.appendChild(columnsContainer);

            const datesColumn = createColumn('Dates', [
                { label: 'Start Date:', type: 'date', id: `start-date-${city}-${country}`, autocomplete: 'off' },
                { label: 'End Date:', type: 'date', id: `end-date-${city}-${country}`, autocomplete: 'off' }
            ]);
            columnsContainer.appendChild(datesColumn);

            const accommodationColumn = createColumn('Accommodation', [
                { label: 'Hotel:', type: 'select', id: `hotel-${city}-${country}`, options: ['Hotel A', 'Hotel B', 'Hotel C'], autocomplete: 'off' },
                { label: 'Room Type:', type: 'select', id: `room-type-${city}-${country}`, options: ['Single', 'Double', 'Suite'], autocomplete: 'off' },
                // { label: 'Cost:', type: 'number', id: `accommodation-cost-${city}-${country}`, autocomplete: 'off' },
                // { label: 'Price:', type: 'number', id: `accommodation-price-${city}-${country}`, autocomplete: 'off' },
                // { label: 'Additional Details:', type: 'textarea', id: `accommodation-details-${city}-${country}`, autocomplete: 'off' }
            ]);
            columnsContainer.appendChild(accommodationColumn);

            const transportationColumn = createColumn('Transportation', [
                { label: 'Cost:', type: 'number', id: `accommodation-cost-${city}-${country}`, autocomplete: 'off' },
                { label: 'Price:', type: 'number', id: `accommodation-price-${city}-${country}`, autocomplete: 'off' },
            //     { label: 'Type:', type: 'select', id: `transport-type-${city}-${country}`, options: ['Small Car', 'Mid-Sized Car', 'Van', 'Bus 16', 'Bus 20'], autocomplete: 'off' },
            //     { label: 'Cost:', type: 'number', id: `transport-cost-${city}-${country}`, autocomplete: 'off' },
            //     { label: 'Price:', type: 'number', id: `transport-price-${city}-${country}`, autocomplete: 'off' },
            //     { label: 'Additional Details:', type: 'textarea', id: `transport-details-${city}-${country}`, autocomplete: 'off' }
            ]);
            columnsContainer.appendChild(transportationColumn);

            destinationList.appendChild(newEntry);
            destinationList.style.display = 'block';

            destinations.push({
                country,
                city,
                dates: {
                    startDate: `start-date-${city}-${country}`,
                    endDate: `end-date-${city}-${country}`
                },
                accommodation: {
                    hotel: `hotel-${city}-${country}`,
                    roomType: `room-type-${city}-${country}`,
                    cost: `accommodation-cost-${city}-${country}`,
                    price: `accommodation-price-${city}-${country}`,
                    details: `accommodation-details-${city}-${country}`
                },
                transportation: {
                    type: `transport-type-${city}-${country}`,
                    cost: `transport-cost-${city}-${country}`,
                    price: `transport-price-${city}-${country}`,
                    details: `transport-details-${city}-${country}`
                }
            });
        }
    }

    function addTrip() {
        const tripInformationSection = createSection('Trip Information', [
            { label: 'Date:', type: 'date', id: 'trip-date', autocomplete: 'off' },
            { label: 'Trip From:', type: 'select', id: 'trip-from', options: ['Airport', 'Hotel', 'tour1', 'tour2', 'tour3'], autocomplete: 'off' },
            { label: 'Trip To:', type: 'select', id: 'trip-to', options: ['Airport', 'Hotel', 'tour1', 'tour2', 'tour3'], autocomplete: 'off' },
            { label: 'Car Type:', type: 'select', id: 'car-type', options: ['Compact', 'Sedan', 'SUV', 'Van'], autocomplete: 'off' },
            { label: 'Cost:', type: 'number', id: 'trip-cost', autocomplete: 'off' },
            { label: 'Price:', type: 'number', id: 'trip-price', autocomplete: 'off' },
        ]);

        destinationList.appendChild(tripInformationSection);
    }

    function addFlight() {
        const tripInformationSection = createSection('Flight Information', [
            { label: 'Date:', type: 'date', id: 'trip-date', autocomplete: 'off' },
            { label: 'Trip From:', type: 'select', id: 'trip-from', options: ['KL', 'Lankawi', 'Penage', 'Jakarta', 'Bali'], autocomplete: 'off' },
            { label: 'Trip To:', type: 'select', id: 'trip-to', options: ['KL', 'Lankawi', 'Penage', 'Jakarta', 'Bali'], autocomplete: 'off' },
            { label: 'Trans Type:', type: 'select', id: 'car-type', options: ['Flight', 'Ferry'], autocomplete: 'off' },
            { label: 'adult:', type: 'number', id: 'trip-cost', autocomplete: 'off' },
            { label: 'baby:', type: 'number', id: 'trip-cost', autocomplete: 'off' },
            { label: 'Time:', type: 'time', id: 'trip-date', autocomplete: 'off' },
            { label: 'Cost:', type: 'number', id: 'trip-cost', autocomplete: 'off' },
            { label: 'Price:', type: 'number', id: 'trip-price', autocomplete: 'off' },
            { label: 'Weight:', type: 'number', id: 'trip-price', autocomplete: 'off' },
            { label: 'AirLines:', type: 'select', id: 'car-type', options: ['AirAisa', 'Ferry', 'القطرية'], autocomplete: 'off' },
          
          
        ]);

        destinationList.appendChild(tripInformationSection);
    }

    function submitData(event) {
        event.preventDefault();

        console.log('Submitted data:');
        destinations.forEach((dest, index) => {
            console.log(`Destination ${index + 1}: ${dest.city}, ${dest.country}`);
            console.log('Dates:');
            console.log(`  Start Date: ${document.getElementById(dest.dates.startDate).value}`);
            console.log(`  End Date: ${document.getElementById(dest.dates.endDate).value}`);
            console.log('Accommodation:');
            console.log(`  Hotel: ${document.getElementById(dest.accommodation.hotel).value}`);
            console.log(`  Room Type: ${document.getElementById(dest.accommodation.roomType).value}`);
            console.log(`  Cost: ${document.getElementById(dest.accommodation.cost).value}`);
            console.log(`  Price: ${document.getElementById(dest.accommodation.price).value}`);
            // console.log(`  Additional Details: ${document.getElementById(dest.accommodation.details).value}`);
            // console.log('Transportation:');
            // console.log(`  Type: ${document.getElementById(dest.transportation.type).value}`);
            // console.log(`  Cost: ${document.getElementById(dest.transportation.cost).value}`);
            // console.log(`  Price: ${document.getElementById(dest.transportation.price).value}`);
            // console.log(`  Additional Details: ${document.getElementById(dest.transportation.details).value}`);
            console.log('--------------------------------------------------');
        });
        
        // Optional: Alert with a summary of stored data
        const datesInfo = destinations.map(dest => `Destination: ${dest.city}, ${dest.country}, Start Date: ${document.getElementById(dest.dates.startDate).value}, End Date: ${document.getElementById(dest.dates.endDate).value}`).join('\n');
        alert(`Dates Stored:\n${datesInfo}`);
    }

    countryCityData.forEach(data => {
        const option = document.createElement('option');
        option.value = data.country;
        option.textContent = data.country;
        countrySelect.appendChild(option);
    });

    countrySelect.addEventListener('change', () => {
        const selectedCountry = countrySelect.value;
        const selectedCountryData = countryCityData.find(data => data.country === selectedCountry);

        if (selectedCountryData) {
            clearDropdown(citySelect);
            populateDropdown(citySelect, selectedCountryData.cities, 'off');
        }
    });

    addDestinationButton.addEventListener('click', addDestination);
    addTripButton.addEventListener('click', addTrip);
    addFlightButton.addEventListener('click', addFlight);
    submitButton.addEventListener('click', submitData);

});
