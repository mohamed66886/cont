const newsList = [
    "نائب رئيس مجلس الوزراء ووزير الصحة يرأس الاجتماع الأول للجنة التنفيذية الخاصة باستقبال المصاب.",
    "وزارة الصحة تعلن عن خطة جديدة لمواجهة الأمراض المزمنة.",
    "افتتاح أكبر مستشفى في الشرق الأوسط لخدمة مرضى السكري.",
    "الحكومة تدرس خفض أسعار الأدوية لمساعدة المرضى."
];

let currentIndex = 0;
const newsText = document.getElementById("news-text");

function changeNews() {
    // تحريك النص لأعلى مع تأثير سلس
    newsText.style.transform = "translateY(-100%)";
    setTimeout(() => {
        // تغيير النص بعد انتهاء الحركة
        currentIndex = (currentIndex + 1) % newsList.length;
        newsText.innerText = newsList[currentIndex];
        // إعادة النص لمكانه الأصلي بدون تأثير
        newsText.style.transform = "translateY(0)";
    }, 500); // نصف ثانية لتأثير الحركة
}

setInterval(changeNews, 4000); // تغيير الخبر كل 4 ثواني