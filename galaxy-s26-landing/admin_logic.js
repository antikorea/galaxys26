// 1. Initial State & Render
const leadsTableBody = document.getElementById('leadsTableBody');
const totalLeadsEl = document.getElementById('totalLeads');
const emptyState = document.getElementById('emptyState');

let globalLeads = [];

// Listen to Firebase real-time updates!
db.collection("leads").orderBy("id", "desc").onSnapshot((snapshot) => {
    globalLeads = [];
    snapshot.forEach((doc) => {
        globalLeads.push(doc.data());
    });
    renderLeads();
}, (error) => {
    console.error("Firebase Snapshot Error:", error);
});

function renderLeads() {
    const sortedLeads = globalLeads;
    
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
        leadsTableBody.appendChild(row);
    });
}

// 2. Custom Confirmation Logic
const confirmModal = document.getElementById('confirmModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');

let pendingAction = null;

function showConfirm(title, message, action) {
    modalTitle.innerText = title;
    modalMessage.innerText = message;
    pendingAction = action;
    confirmModal.classList.add('active');
}

function closeModal() {
    confirmModal.classList.remove('active');
    pendingAction = null;
}

modalConfirmBtn.addEventListener('click', () => {
    if (pendingAction) {
        pendingAction();
    }
    closeModal();
});

// 3. Delete Single Lead
function deleteLead(id) {
    showConfirm(
        '신청 내역 삭제',
        '이 상담 신청 내역을 정말 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.',
        () => {
            db.collection("leads").doc(id.toString()).delete()
                .then(() => console.log('Lead successfully deleted from Firebase'))
                .catch((error) => console.error('Error removing document: ', error));
        }
    );
}

// 4. Clear All Leads
function clearAllLeads() {
    showConfirm(
        '데이터 초기화',
        '모든 신청 내역을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
        () => {
            globalLeads.forEach(lead => {
                db.collection("leads").doc(lead.id.toString()).delete();
            });
        }
    );
}

// 5. Logout Logic
function logout() {
    sessionStorage.removeItem('isAdmin');
    window.location.href = 'admin_login.html';
}

// 5. Manual Refresh
function refreshLeads() {
    console.log('Manual refresh triggered');
    renderLeads();
}

