const pdfFile = document.querySelector('.pdf-view');
const generateBtn = document.querySelector('.generate-btn');

function getPDF() {
    html2canvas(pdfFile).then(function(canvas) {
        var img = canvas.toDataURL('image/png');
        var doc = new jsPDF();
        doc.addImage(img, 'JPEG', 10, 10);
        doc.save('warscrolls.pdf');
    });
}

generateBtn.addEventListener('click', getPDF);