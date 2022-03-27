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

/*

arabic: "كان"
english: "to be"
phonetic: "kein"
type: "IrregularVerb"
uniqueIverb: ""

*/
export function getVerbChoices(verbsArr) {
    const obj = {};
    for (const entry of verbsArr) {
        obj[entry.arabic] = {
            english: entry.english,
            type: entry.type,
            uniqueIverb: entry.uniqueIverb,
            timesUsed: 0
        }
    }
    return obj;
}


/*
arabic: "عَنْ"
english: "about"
*/
export function getPrepositionsChoices(prepArr) {
    const obj = {};
    for (const entry of prepArr) {
        obj[entry.arabic] = {
            english: entry.english,
            timesUsed: 0
        }
    }
    return obj;
}



/*
arabic: "عَنْ"
english: "about"
*/
export function getParticlesChoices(particlesArr) {
    const obj = {};
    for (const entry of particlesArr) {
        obj[entry.arabic] = {
            english: entry.english,
            timesUsed: 0
        }
    }
    return obj;
}





/*
arabic: "عَنْ"
english: "about"
*/
export function getNounsChoices(nounsArr) {
    const obj = {};
    for (const entry of nounsArr) {
        obj[entry.arabic] = {
            english: entry.english,
            timesUsed: 0
        }
    }
    return obj;
}



/*
arabic: "عَنْ"
english: "about"
*/
export function getConnectorsChoices(connArr) {
    const obj = {};
    for (const entry of connArr) {
        obj[entry.arabic] = {
            english: entry.english,
            timesUsed: 0
        }
    }
    return obj;
}




/*
arabic: "أكاديمي"
english: "academic"
uniqueFemale: ""
uniquePlural: ""
*/
export function getAdjectivesChoices(adjArr) {
    const obj = {};
    for (const entry of adjArr) {
        obj[entry.arabic] = {
            english: entry.english,
            timesUsed: 0
        }
        if (obj.uniqueFemale) {
            obj[entry.uniqueFemale] = {
                english: entry.english,
                isFemale: true,
                timesUsed: 0
            }
        }

        if (obj.uniquePlural) {
            obj[entry.uniquePlural] = {
                english: entry.english,
                isPlural: true,
                timesUsed: 0
            }
        }
    }
    return obj;
}


export function getOptionsFrom(wordObj) {
    return Object
    .keys(wordObj)
    .map(choice => `${choice} (${wordObj[choice].timesUsed})`)
    .sort((a,b) => a.localeCompare(b))
}