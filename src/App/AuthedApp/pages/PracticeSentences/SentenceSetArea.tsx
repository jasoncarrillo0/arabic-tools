import { Sentence } from 'src/redux/sentence/interfaces';
import s from './SentenceSetArea.module.scss';
import SentenceSet from './SentenceSetArea/SentenceSet';

type Props = {
    sentences: Sentence[]
}


function createSetsOfEight(sentences: Sentence[]) {
    const sets: Sentence[][] = [];
    const sortedCopy = [...sentences].sort((a,b) => a.english.localeCompare(b.english));
    let counter = 0;
    let currentSet: Sentence[] = [];
    for (const sentence of sortedCopy) {
        if (counter < 8) {
            currentSet.push(sentence);
            counter++;
        } else {
            sets.push(currentSet);
            currentSet = [];
            counter = 0;
        }
    }
    if (counter !== 0) sets.push(currentSet)
    return sets;
}

const SentenceSetArea = ({ sentences }: Props) => {
    const sentenceSets = createSetsOfEight(sentences);
    
    return (
        <div className={s.wrap}>
        {
            sentenceSets.map((sentences, idx) => (
                <SentenceSet 
                    key={idx} 
                    startIdx={idx} 
                    sentences={sentences}
                />
            ))
        }
        
        </div>
    )
}

export default SentenceSetArea;