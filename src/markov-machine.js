import { useEffect, useState, useRef } from 'react';
import NewMarkovForm from './new-markov-form';
// import {v4 as uuid} from 'uuid';

const MarkovMachine = () => {

    const [formData, setFormData] = useState({name: 'hi I am luke'});
    const [markyMark, setMarky] = useState([]);
    const chains = useRef();

    const makeChains = (words) => {
        chains.current = new Map();

        words.map((n, i) => {
            let word = n;
            let nextWord; 
            
            nextWord = i === n.length - 1 ? n[0] : n[i + 1];
            return (
            chains.current.has(word) ? chains.current.get(word).push(nextWord) : chains.current.set(word, [nextWord])
            )
        })
    }

    const randomIdx = (arr) => (
        arr[Math.floor(Math.random() * arr.length)]
    );

    const makeMarkov = (e, num = 100) => {
        e.preventDefault();
        let keys = [...chains.current.keys()].filter(k => k !== null);
        const key = () => randomIdx(keys);
        let out = [];

        while (out.length <= num) { 
            out.push(keys.filter(n => n === key())) 
        };

        setMarky(out);
    }

    useEffect(() => {
        let words = formData.name.split(/[ \r\n]+/);
        words = words.filter(c => c !== "");
        makeChains(words);
    }, [formData]);
    
    return (
        <div className='container'>
            <NewMarkovForm makeMarkov={makeMarkov} formData={formData} setFormData={setFormData} />
            {markyMark.map(n => <p>{chains.current.get(n)}</p>)}
        </div>
    )
}

export default MarkovMachine;