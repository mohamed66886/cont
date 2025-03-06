const newsList = [
    "نائب رئيس مجلس الوزراء ووزير الصحة يرأس الاجتماع الأول للجنة التنفيذية الخاصة باستقبال المصاب.",
    "وزارة الصحة تعلن عن خطة جديدة لمواجهة الأمراض المزمنة.",
    "افتتاح أكبر مستشفى في الشرق الأوسط لخدمة مرضى السكري.",
    "الحكومة تدرس خفض أسعار الأدوية لمساعدة المرضى."
];

let currentIndex = 0;
const newsText = document.getElementById("news-text");

function changeNews() {
    newsText.style.transform = "translateY(-100%)";
    setTimeout(() => {
        
        currentIndex = (currentIndex + 1) % newsList.length;
        newsText.innerText = newsList[currentIndex];
        
        newsText.style.transform = "translateY(0)";
    }, 500); 
}

setInterval(changeNews, 4000); 
// =============================================
// =============================================
function loadReadings() {
    const readings = JSON.parse(localStorage.getItem('sugarReadings')) || [];
    const tableBody = document.getElementById('sugarTableBody');
    tableBody.innerHTML = '';
    readings.forEach((reading, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${reading.time}</td>
            <td>${reading.level}</td>
            <td>${reading.type}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">تعديل</button>
                <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">حذف</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });
}

document.getElementById('sugarForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const sugarLevel = document.getElementById('sugarLevel').value;
    const measurementTime = document.getElementById('measurementTime').value;
    const measurementType = document.getElementById('measurementType').value;
    const editIndex = document.getElementById('editIndex').value;
    
    let readings = JSON.parse(localStorage.getItem('sugarReadings')) || [];
    if (editIndex === "-1") {
        readings.push({ level: sugarLevel, time: measurementTime, type: measurementType });
    } else {
        readings[editIndex] = { level: sugarLevel, time: measurementTime, type: measurementType };
    }
    
    localStorage.setItem('sugarReadings', JSON.stringify(readings));
    loadReadings();
    document.getElementById('sugarForm').reset();
    document.getElementById('editIndex').value = "-1";
    bootstrap.Modal.getInstance(document.getElementById('sugarModal')).hide();
});

document.getElementById('sugarTableBody').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.getAttribute('data-index');
        const readings = JSON.parse(localStorage.getItem('sugarReadings')) || [];
        readings.splice(index, 1);
        localStorage.setItem('sugarReadings', JSON.stringify(readings));
        loadReadings();
    }
    
    if (event.target.classList.contains('edit-btn')) {
        const index = event.target.getAttribute('data-index');
        const readings = JSON.parse(localStorage.getItem('sugarReadings')) || [];
        const reading = readings[index];
        document.getElementById('sugarLevel').value = reading.level;
        document.getElementById('measurementTime').value = reading.time;
        document.getElementById('measurementType').value = reading.type;
        document.getElementById('editIndex').value = index;
        new bootstrap.Modal(document.getElementById('sugarModal')).show();
    }
});

document.addEventListener('DOMContentLoaded', loadReadings);
//  ==============================================
//  ==============================================