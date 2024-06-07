const travelForm = document.getElementById('travelForm');
const travelList = document.getElementById('travelList');
const searchInput = document.getElementById('searchInput');

travelForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    
    const travelData = {
        destination,
        date,
        description
    };
    
    localStorage.setItem(Date.now(), JSON.stringify(travelData));
    
    travelForm.reset();
    displayTravelList();
});

searchInput.addEventListener('input', function() {
    displayTravelList();
});

function displayTravelList() {
    travelList.innerHTML = '';
    
    const searchTerm = searchInput.value.toLowerCase();
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const travelData = JSON.parse(localStorage.getItem(key));
        
        if (travelData && travelData.destination.toLowerCase().includes(searchTerm)) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${travelData.destination}</strong> - ${travelData.date}<br>${travelData.description} <button onclick="deleteTravel('${key}')">Excluir</button>`;
            travelList.appendChild(li);
        }
    }
    
    displayReport();
}

function displayReport() {
    const totalTrips = localStorage.length;
    
    let reportHTML = `<h2>Total de Viagens Cadastradas: ${totalTrips}</h2>`;
    document.getElementById('report').innerHTML = reportHTML;
}

function deleteTravel(key) {
    localStorage.removeItem(key);
    displayTravelList();
}

displayTravelList();
