export const selectAllWords = (rootState) => {
    const currDict = rootState.dictionary;

    const extractedDictionary = { 
        adjectives: currDict.adjectives.allAdjectives,
        verbs: currDict.verbs.allVerbs,
        connectors: currDict.connectors.allConnectors,
        nouns: currDict.nouns.allNouns,
        particles: currDict.particles.allParticles,
        prepositions: currDict.prepositions.allPrepositions
    }
    return { extractedDictionary }
}