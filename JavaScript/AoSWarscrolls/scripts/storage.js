class Storage {
    getPrintSheets() {
        let printSheets;

        if(localStorage.getItem('printSheets') === null) {
            printSheets = [];
        } else {
            printSheets = JSON.parse(localStorage.getItem('printSheets'));
        }

        return printSheets;
    }

    savePrintSheet(printSheet) {
        const printSheets = this.getPrintSheets();
        
        printSheets.push(printSheet);
        
        localStorage.setItem('printSheets', JSON.stringify(printSheets));
    }
}

