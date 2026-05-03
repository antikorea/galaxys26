// 1. Initial State & Render
const leadsTableBody = document.getElementById('leadsTableBody');
const totalLeadsEl = document.getElementById('totalLeads');
const emptyState = document.getElementById('emptyState');

let globalLeads = [];

// Fetch leads from NeonDB via Netlify Functions
function fetchLeads() {
    fetch('/.netlify/functions/getLeads')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                globalLeads = data.leads || [];
                renderLeads();
            } else {
                console.error("Error fetching leads:", data.error);
            }
        })
        .catch(error => {
            console.error("Network Error:", error);
        });
}

// Initial fetch
fetchLeads();

function renderLeads() {
    const sortedLeads = globalLeads;
    
    // Update Total Counter
    if(totalLeadsEl) totalLeadsEl.innerText = sortedLeads.length;

    // Clear Previous Rows
    if(leadsTableBody) leadsTableBody.innerHTML = '';

    if (sortedLeads.length === 0) {
        if(emptyState) emptyState.style.display = 'flex'; // our new UI uses flex
        return;
    } else {
        if(emptyState) emptyState.style.display = 'none';
    }

    sortedLeads.forEach(lead => {
        const row = document.createElement('tr');
        
        // Format Phone Number
        const phoneFormatted = `${lead.phone_prefix || '010'}-${lead.phone_middle || '0000'}-${lead.phone_last || '0000'}`;
        
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
        if(leadsTableBody) leadsTableBody.appendChild(row);
    });
}

// 2. Custom Confirmation Logic
const confirmModal = document.getElementById('confirmModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');

let pendingAction = null;

function showConfirm(title, message, action) {
    if(modalTitle) modalTitle.innerText = title;
    if(modalMessage) modalMessage.innerText = message;
    pendingAction = action;
    if(confirmModal) confirmModal.classList.add('active');
}

function closeModal() {
    if(confirmModal) confirmModal.classList.remove('active');
    pendingAction = null;
}

if(modalConfirmBtn) {
    modalConfirmBtn.addEventListener('click', () => {
        if (pendingAction) {
            pendingAction();
        }
        closeModal();
    });
}

// 3. Delete Single Lead
function deleteLead(id) {
    showConfirm(
        '신청 내역 삭제',
        '이 상담 신청 내역을 정말 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.',
        () => {
            fetch('/.netlify/functions/deleteLead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    console.log('Lead successfully deleted from DB');
                    fetchLeads(); // refresh the list
                } else {
                    console.error('Error removing document: ', data.error);
                }
            })
            .catch(error => console.error('Network Error: ', error));
        }
    );
}

// 4. Clear All Leads
function clearAllLeads() {
    showConfirm(
        '데이터 초기화',
        '모든 신청 내역을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
        () => {
            fetch('/.netlify/functions/clearLeads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    console.log('All leads successfully deleted from DB');
                    fetchLeads(); // refresh the list
                } else {
                    console.error('Error clearing documents: ', data.error);
                }
            })
            .catch(error => console.error('Network Error: ', error));
        }
    );
}

// 5. Logout Logic
function logout() {
    sessionStorage.removeItem('isAdmin');
    window.location.href = 'admin_login.html';
}

// 6. Manual Refresh
function refreshLeads() {
    console.log('Manual refresh triggered');
    fetchLeads();
}
