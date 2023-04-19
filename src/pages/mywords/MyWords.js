import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/navgation/Navigation';
import './mywords.css'
import { fetchUserDict, toggleGroup } from '../../components/other/slices/userDicts';
import { useEffect, useState } from 'react';
import axios from '../../components/other/axios.js'
import { Card } from 'react-bootstrap';

export default function MyWords() {
  const groups = useSelector(state => state.UserDictionaries.usersDict.groups)
  const loadingStatus = useSelector(state => state.UserDictionaries.usersDict.status)
  const dicts = useSelector(state => state.UserDictionaries.usersDict.dicts)
  const [formData, setFormData] = useState([]);
  const [inputData, setInputData] = useState({
    word: '',
    translate: '',
    editKey: '',
    editValue: '',
    editIndex: '',
    group: '',
    translateReq: ''
  });
  const [toggleState, setToggleState] = useState({
    showForm: false,
    showDicts: true,
  });


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserDict())

  }, [dispatch])



  const handleInputChange = (event) => {
    setInputData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormData([...formData, { [inputData.word]: inputData.translate, id: formData.length, level:1 }])

    setInputData({
      word: '',
      translate: '',
      editKey: '',
      editValue: '',
      editIndex: '',
      group: ''
    })

  };

  const handleEditClick = (item) => {

    setInputData(prevState => ({
      ...prevState,
      editKey: Object.keys(item)[0],
      editValue: Object.values(item)[0],
      editIndex: item.id
    }));
  };

  const handleSaveClick = (item) => {
    const newArr = formData.filter(elem => {
      return item.id !== elem.id
    })
    if ((inputData.editKey.length && inputData.editValue.length) <= 1) {
      return setFormData(newArr)
    }
    setFormData(() => ([
      ...newArr,
      {
        [inputData.editKey]: inputData.editValue,
        id: item.id
      }
    ]));

    setInputData(prevState => ({
      ...prevState,
      editKey: null,
      editValue: null,
      editIndex: null
    }));
  };

  const handleCancelClick = () => {
    setInputData(prevState => ({
      ...prevState,
      editKey: '',
      editValue: '',
      editIndex: ''
    }));
  };

  const saveUserDict = async () => {
    const savedData = formData.map(item => ({[Object.keys(item)[0]]: Object.values(item)[0],
      level: 1}));

    const savedItem = {
      Dictionary: savedData,
      groups: [inputData.group]
    }
    const test = await axios.post('/dictionary', savedItem)
    if(test) {
      console.log('словарь успешно создан')
    }
    dispatch(fetchUserDict())
    setInputData({
      word: '',
      translate: '',
      editKey: '',
      editValue: '',
      editIndex: '',
      group: ''
    })
    setFormData([])
  };



  const cancelAdding = () => {
    setInputData({
      word: '',
      translate: '',
      editKey: '',
      editValue: '',
      editIndex: '',
      group: ''
    });
    setFormData([])

  };

  const handleShowHide = (value) => {
    if (value === 'form') {
      return setToggleState(prevState => ({
        ...prevState,
        showForm: !prevState.showForm
      }))
    };

    if (value === 'dicts') {
      return setToggleState(prevState => ({
        ...prevState,
        showDicts: !prevState.showDicts
      }))
    }
  };


  const toggleWords = (index) => {
  dispatch(toggleGroup({index}))
  };

  const showWords = (group, index) => {
    const showedDicts = dicts.find(elem => String(elem.groups) === String(group));
 
    if (showedDicts) {
      
      return (
      <div>
        {
                  showedDicts.Dictionary.map((elem, index) => {
                    return (
                      <div key={index+32}>
                        {Object.keys(elem)[0]} : {Object.values(elem)[0]}
                      </div>
                    );
                  })
        }
        <div className='hide-button' onClick={() => {toggleWords(index)}} >свернуть</div>
        <div onClick={() => {delDict(showedDicts._id)}} className='del-button'>x</div>
      </div>);
    }
  };
  
  
const delDict = async (id) => {

  const res = window.confirm('Вы действительно хотите удалить словарь?');
  if (res) {
   const result = await axios.delete(`/user/dictionary/${id}`)
   console.log(result)
   if(result.status === 200) {
    dispatch(fetchUserDict())
   }
  }

}

const userSearch = async () => {
  try {
    const res = await axios.post("/user/search", inputData.translateReq);
  
    console.log(res)


    if (res.status === 200) {
      
      setFormData([...formData, { [Object.keys(res.payload)[0]]: Object.values(res.payload)[0], id: formData.length, level:1 }])
      
    }
  } catch (err) {
    console.warn(err)
  }
}

  return (
    <div>
      <Navigation />
      <div className='search-wrap'>
      <input onChange={handleInputChange} value={inputData.translateReq} name='translateReq' type='text' /> <button onClick={() => userSearch()} >find</button>
      </div>
      <button onClick={() => { handleShowHide('form') }} className='toogle-button'>Скрыть/показать форму</button>
      {!toggleState.showForm ? '' : <>
        <div key={'testkey'} className='form-wrap'>
          <form onSubmit={handleSubmit}>
            <label>
              слово:<input type="text" name="word" value={inputData.word} onChange={handleInputChange} required />
            </label>
            <label>
              перевод:<input type="text" name="translate" value={inputData.translate} onChange={handleInputChange} required />
            </label>
            <button type="submit">Отправить</button>
          </form>
        </div>
        <div>
          {
            formData.map((item, index) => {
              return (
                <div key={index+"text"}>
                  {(inputData.editIndex === item.id) ? (
                    <div key={"text"+index*2}>
                      <input
                        type="text"
                        name='editKey'
                        value={inputData.editKey}
                        onChange={(e) => setInputData(prevState => ({
                          ...prevState,
                          [e.target.name]: e.target.value
                        }))}
                      />
                      <input
                        type="text"
                        name='editValue'
                        value={inputData.editValue}
                        onChange={(e) => setInputData(prevState => ({
                          ...prevState,
                          [e.target.name]: e.target.value
                        }))}
                      />
                      <button onClick={() => handleSaveClick(item)}>Save</button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                  ) : (<div>
                    <div>{Object.keys(item)[0]} : {Object.values(item)[0]}</div><button onClick={() => handleEditClick(item)}>Edit</button>
                  </div>)}
                </div>
              )
            })
          }
          <div>
            <h5>Группа является обязательным атрибутом</h5>
            <>Группа</><input type='text' name='group' value={inputData.group} onChange={(event) => setInputData((prevState) => (
              {
                ...prevState,
                group: event.target.value
              }
            ))} required />
          </div>
          <div className='button-wrap'>
            <button disabled={!Boolean(inputData.group) || !Boolean(formData.length)} onClick={() => saveUserDict()}>Сохранить</button>
            <button onClick={() => cancelAdding()}>Отмена</button>
          </div>
        </div></>}
      <div>
      <button onClick={() => { handleShowHide('dicts') }} className='toogle-button'>Скрыть/показать словари</button>
        {!toggleState.showDicts ? '' : <div className='user-dict'>
              {groups.map((item, index) => {
                
               return (
               <div className="get-word-wrap" key={index+'rakanarj'}>
               <button   key={index+8} onClick={() =>{toggleWords(index)}}>{String(item.group)}</button>
               <div key={index+11}
                            className={`get-words-text ${item.isOpen ? 'open' : ''}`}
                        >
                            <Card key={index+91}  body style={{ minWidth: '150px', padding: '10px' }}> 
                                {Boolean(loadingStatus === 'loading') ? <div>loading</div> : <div >{showWords(item.group, index)}</div> }
                            </Card>
                        </div>
                        </div>)
              })}
        </div>}
      </div>
    </div>
  )
};