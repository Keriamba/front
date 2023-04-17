import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './getwords.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../components/other/axios.js';
import { fetchGlobalDict } from '../../components/other/slices/dicts';
import { fetchCreateUserDict } from '../../components/other/slices/userDicts';
export default function GetWords() {
    const [groupsState, setGroupsState] = useState([]);
    const [statusState, setStatusState] = useState(false);
    const dispatch = useDispatch();

    const { dicts, status } = useSelector(state => state.Dictionaries.globalDict)


    useEffect(() => {
        async function fetchData() {
            try {
                const { data, status } = await axios.get('/dictionary/groups');
                setStatusState(status);
                const transArr = data.map((item) => {
                    return { item, isOpen: false };
                });     
                setGroupsState(transArr);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [dispatch]);

    const toggleSection = (index, groups) => {
        const newSections = [...groupsState];
        newSections[index].isOpen = !newSections[index].isOpen;
        setGroupsState(newSections);

        if (newSections[index].isOpen) {
            const searchResult = dicts.find(item => String(item.groups) === String(newSections[index].item))
            if (!Boolean(searchResult)) {
                dispatch(fetchGlobalDict(groups));
            }

        }

    };

    const showWords = (index, groups) => {
        const showedDicts = dicts.find(elem => String(elem.groups) === String(groups));

        if (showedDicts && groupsState[index].isOpen) {

            return  (showedDicts.Dictionary.map((elem, number) => {
                
                return (
                    
                    <div key={number+'nads'}>
                        {Object.keys(elem)[0]} : {Object.values(elem)[0]}
                    </div>
                )
            }));
        }
    };
    
    const addDictToUserDicts = (index, group) => {
        const showedDicts = dicts.find(elem => String(elem.groups) === String(group));
        let { Dictionary, groups } = showedDicts;
        Dictionary = Dictionary.map(item => ({ ...item, level: 1 }));
        console.log(Dictionary);
        dispatch(fetchCreateUserDict({ Dictionary, groups }));
      };
      



    return (
        <div>
            <div className="get-words-header">Hanki sanat</div>
            {!Boolean(statusState === 200) ? (
                <div className="get-word-wrap">loading</div>
            ) : (
                groupsState.map((section, index) => (  
                    <div className="get-word-wrap" key={index+'blablabla'}>
                        <button
                            className="get-words-button"
                            onClick={() => toggleSection(index, section.item)}
                        >
                            {section.item}
                        </button>
                        <div key={index+11}
                            className={`get-words-text ${section.isOpen ? 'open' : ''}`}
                        >   <button onClick={() => {addDictToUserDicts(undefined, section.item)}}>Lisää koko ryhmä</button>
                            <Card  body style={{ width: 'auto', padding: '10px' }}> 
                                {Boolean(status === 'loading') ? <div>loading</div> : <div >{showWords(index, section.item)}</div> }
                            </Card>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
