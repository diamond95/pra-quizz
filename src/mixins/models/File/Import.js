import XLSX from "xlsx";
import File from "./File.js"

/**
 * @author ivan.miljanic
 * @description Module for Import Excel file
 */

export default class Import extends File {

    constructor() {

        /**
         * @type {Array<Import>}
         */


        super();
       
        this.importDataObject = {}
        this._fileToggleEvent = null

        this.file = undefined

    }

    /**
     * 
     * @param {String} param 
     * @description Function for check if the given param is instance of this class
     * @type static
     * @returns Boolean
     */
    static checkInstance = param => (param instanceof Import)
 

    /**
     * 
     * @param {File} event 
     */
    async uploadFile(event) {

        
        try {
            this._fileToggleEvent = event.target
            this.file = event.target.files;
            

            File.prototype.setFileName(this.file[0].name)

            super.setFileSize(this.file[0].size);

            File.prototype.setWebkitRelativePath(this.file[0].webkitRelativePath)
            
        } catch (error) {

            throw new Error("Can not upload a file. Try refresh the page.");
        }
    }

    /**
     * 
     * @param {Object<File>} files 
     * @returns Promise -> object with parsed data from (in this case) first sheet => `Hardcoded to Sheet called TO`
     */
    async readExcelSheets() {

        var i, f;
        //var sheetCounter = 0;
        var data = {};
        try {
          return new Promise((resolve, reject) => {
            for (i = 0; i != this.file.length; ++i) {
              f = this.file[i];
              var reader = new FileReader();
  
              reader.onload = function(e) {
                var databinary = e.target.result;
  
                var workbook;
  
                workbook = XLSX.read(databinary, { type: "binary" });
  
                workbook.SheetNames.forEach(function(name) {
                  //sheetCounter++;
                  if(name == "TO") { // read only first sheet 
                    data = XLSX.utils.sheet_to_json(workbook.Sheets[name]);
                  }
                });
  
                //resolve({ sheetCounter, data }); -- use this if you need number of sheets also
                resolve(data);
              };
              reader.onerror = reject;
              this.importDataObject = data;
              reader.readAsBinaryString(f);
            }
          });

        } catch (error) {

          throw new Error("Can't parse Excel File. Error code: 0011");

        }
      }

    /**
     * @description Resets last selected file
     */
     resetSelectedFile() {
        
        super.resetFileName();
        this._fileToggleEvent.value = ''
    }

    /**
     * @description Checks if imported file is too big 
     * @returns Boolean
     */
     isAppropriateSize = () => super.fileSizeValidation()

    /**
     * @description Removes all saved data from Prototype Import
     */
    removeAll() {

        this.importDataObject = {};
    }

    /**
     * @returns Imported data from Excel sheet
     */
    get allImportedData() {

        return this.importDataObject;
    }


}