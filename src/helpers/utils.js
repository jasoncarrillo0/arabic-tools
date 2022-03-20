export function getVerbsObj(verbs) {
    let split = verbs.split(",");
    let cleanedSplit = split.map(verb => verb.replace(/\t/g, " "));
    let obj = {};
    for (let verb of cleanedSplit) {
        let splittedBySpace = verb.split(' ');
        let english, arabic;
        if (splittedBySpace.length === 3) {
            english         = splittedBySpace[0] + ' ' + splittedBySpace[1];
            arabic          = splittedBySpace[2];
        } else {
            arabic = splittedBySpace[splittedBySpace.length - 1];
            english = verb.split(arabic)[0];
        }

        obj[english.trim()] = arabic;
    }
    return obj;
}


export function hasExpectedCols(expectedCols, firstRow) {
    for (let i = 0; i < firstRow.length; i++) {
        if (expectedCols[i] !== firstRow[i]) {
            return false;
        }
    }
    return true;
}