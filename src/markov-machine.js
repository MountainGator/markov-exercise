import { useEffect, useState, useRef } from 'react';
import NewMarkovForm from './new-markov-form';
import {v4 as uuid} from 'uuid';
import MarkovText from './markov-text';

const MarkovMachine = () => {

    const [formData, setFormData] = useState({start: '', numb: ''});
    const [markyMark, setMarky] = useState();
    const chains = useRef();

    const makeChains = (words) => {
        chains.current = new Map();
        words.map((n, i) => {
            let word = n;
            let nextWord = i === words.length - 1 ? n[0] : n[i + 1];

            return (
            chains.current.has(word) ? chains.current.get(word).push(nextWord) : chains.current.set(word, [nextWord])
            )
        })
    }

    const randomIdx = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    const makeMarkov = (e) => {
        e.preventDefault();

        let words = formData.start.split(/[ \r\n]+/);
        words = words.filter(c => c !== "");

        let num = formData.numb ? formData.numb : 100;

        makeChains(words);
        console.log(chains.current)

        const keys = [...chains.current.keys()].filter(k => k !== null);
        console.log(keys);
        // const key = randomIdx(keys);
        // let out = Array.from({length: num});
        const out = [];
        

        // out.map(n => n = key());
        // console.log(out);

        while (out.length <= num) { 
            let item = randomIdx(keys);
            console.log(item); 
            out.push(item);
        };
        console.log(out);

        setMarky([...out]);
        console.log(markyMark);
    }

    // useEffect(() => {
    //     let words = formData.start.split(/[ \r\n]+/);
    //     words = words.filter(c => c !== "");

    //     const num = formData.numb;

    //     makeChains(words);
    // }, [formData]);
    
    return (
        <div className='container'>
            <NewMarkovForm makeMarkov={makeMarkov} formData={formData} setFormData={setFormData} />
            {markyMark && markyMark.map(n => <MarkovText key={uuid()} n={n} chains={chains.current} />)}
        </div>
    )
}

export default MarkovMachine;