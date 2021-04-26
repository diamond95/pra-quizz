module.exports = {


    stringToNumber(objects) {
        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
                    obj[prop] = +obj[prop];
                }
            }
        }

        return objects;
    },
    toFixed(json) {
        return JSON.parse(JSON.stringify(json), (key, value) =>
            typeof value === "number" ? Math.round(value * 100) / 100 : value
        );
    }

}