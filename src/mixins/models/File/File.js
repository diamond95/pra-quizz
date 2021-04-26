/**
 * @author ivan.miljanic
 * @description Super Abstract Class File.
 * @class File
 */

export default class File {

    constructor() {

        if(this.constructor === File) {

            throw new Error("Abstract classes can't be instantiated.");

        }

        this.fileName = "";

        this.webkitRelativePath = "";

        this.fileSize = null;

        this.maxFileSize = 3145728; // 3 MiB
        //this.maxFileSize = 1545700; // 1,5 MiB
    }

    setFileName(name) {
        
        //throw new Error("Method setFileName must be implemented.");

        this.fileName = name;

    }

    resetFileName() {

        this.fileName = undefined;
    }

    setWebkitRelativePath(path) {

        this.webkitRelativePath = path;
    }

    setFileSize(n) {

        this.fileSize = n;
    }

    get maxSize() {

        return this.maxFileSize;
    }

    fileSizeValidation() {

        return this.fileSize < this.maxFileSize
    }


}