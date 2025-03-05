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
document.getElementById('sugarForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const sugarLevel = document.getElementById('sugarLevel').value;
    const measurementTime = document.getElementById('measurementTime').value;
    
    if (sugarLevel && measurementTime) {
        const tableBody = document.getElementById('sugarTableBody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${measurementTime}</td>
            <td>${sugarLevel}</td>
            <td><button class="btn btn-danger btn-sm delete-btn">حذف</button></td>
        `;
        tableBody.appendChild(newRow);
        document.getElementById('sugarForm').reset();
        bootstrap.Modal.getInstance(document.getElementById('sugarModal')).hide();
    }
});

document.getElementById('sugarTableBody').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.closest('tr').remove();
    }
});