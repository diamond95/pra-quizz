
module.exports = {


    queryValidation(error) {
        var msg = '';
        switch (error.errno) {
            case 1064:
                msg = 'QUERY ERROR'
                break;
            case 1045:
                msg = 'ACCESS DENIED'
                break;
            case 2013:
                msg = 'CONNECTION LOST'
                break;
            case 1040:
                msg = 'TOO MANY CONNECTIONS'
                break;
            case 2008:
                msg = 'OUT OF MEMORY'
                break;
            case 1114:
                msg = 'THE TABLE IS FULL'
                break;
            case 1146:
                msg = 'TABLE DOES NOT EXIST'
                break;
            case 1062:
                msg = 'DUPLICATE KEY ENTRY'
                break;
            case 10060:
                msg = 'DB CONNECTION ERROR'
                break;
            case 1054:
                msg = 'BAD FIELD ERROR'
                break;
            case 1318:
                msg = 'INCORRECT NUMBER OF ARGS'
                break;
            default:
                msg = ''
                break;
        }

        return msg

    },

    error_handler(error) {
        var error_handler = ''
        const catcher = this.queryValidation(error)

        catcher != '' ? error_handler = catcher : error_handler = error
        return error_handler
    },

    status500(res, error) {
        res.status(500).send({
            error: `Dogodila se neočekivana pogreška. ${this.error_handler(error)}`
        })
    }
}