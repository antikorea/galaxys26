// 1. Initial State & Render
const leadsTableBody = document.getElementById('leadsTableBody');
const totalLeadsEl = document.getElementById('totalLeads');
const emptyState = document.getElementById('emptyState');

function renderLeads() {
    let leads = [];
    try {
        leads = JSON.parse(localStorage.getItem('galaxy_leads') || '[]');
    } catch (e) {
        console.error('Error parsing leads data:', e);
        leads = [];
    }
    
    // Sort leads by latest first
    const sortedLeads = leads.sort((a, b) => b.id - a.id);
    
    // Update Total Counter
    totalLeadsEl.innerText = sortedLeads.length;

    // Clear Previous Rows
    leadsTableBody.innerHTML = '';

    if (sortedLeads.length === 0) {
        emptyState.style.display = 'block';
        return;
    } else {
        emptyState.style.display = 'none';
    }

    sortedLeads.forEach(lead => {
        const row = document.createElement('tr');
        
        // Format Phone Number
        const phoneFormatted = `${lead.phone_prefix}-${lead.phone_middle}-${lead.phone_last}`;
        
        // Format Model Tag
        const modelDisplay = lead.model === 's26' ? 'S26' : (lead.model === 's26plus' ? 'S26+' : 'S26 ULTRA');
        
        // Format Carrier Tag
        const carrierDisplay = lead.carrier === 'skt' ? 'SKT' : 
                              (lead.carrier === 'kt' ? 'KT' : 
                              (lead.carrier === 'lgu' ? 'LGU+' : '알뜰폰'));

        row.innerHTML = `
            <td>${lead.timestamp}</td>
            <td><strong>${lead.name}</strong></td>
            <td>${phoneFormatted}</td>
            <td><span class="tag model">${modelDisplay}</span></td>
            <td><span class="tag carrier">${carrierDisplay}</span></td>
            <td>
                <div class="action-btns">
                    <button onclick="deleteLead(${lead.id})" class="btn-delete">DELETE</button>
                </div>
            </td>
        `;
        leadsTableBody.appendChild(row);
    });
}

// 2. Delete Single Lead
function deleteLead(id) {
    if (confirm('이 상담 신청 내역을 삭제하시겠습니까?')) {
        let leads = JSON.parse(localStorage.getItem('galaxy_leads') || '[]');
        leads = leads.filter(lead => lead.id !== id);
        localStorage.setItem('galaxy_leads', JSON.stringify(leads));
        renderLeads();
    }
}

// 3. Clear All Leads
function clearAllLeads() {
    if (confirm('모든 상담 신청 내역을 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        localStorage.removeItem('galaxy_leads');
        renderLeads();
    }
}

// 4. Logout Logic
function logout() {
    sessionStorage.removeItem('isAdmin');
    window.location.href = 'login.html';
}

// 5. Real-time Synchronization
window.addEventListener('storage', (e) => {
    if (e.key === 'galaxy_leads') {
        console.log('Detected external storage update, refreshing table...');
        renderLeads();
    }
});

// Manual Refresh
function refreshLeads() {
    renderLeads();
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderLeads();
});
