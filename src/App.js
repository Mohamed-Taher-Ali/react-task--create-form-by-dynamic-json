import './App.css';
import { useEffect, useState } from 'react';
import dataJson from './data.json';
import formJson from './form.json';
import DynamicForm from './DynamicForm';
import { addUser, getLang } from './services';

function App() {
  const [lang, setLang] = useState("en");
  const [title, setTitle] = useState("");
  const [newPerson, setNewPerson] = useState("");
  const [langData, setLangData] = useState(formJson);

  useEffect(()=>{
    (async ()=> {
      const langObj = await getLang(lang);
      const data = langObj.data;

      setTitle(data.title);
      setLangData(
        langData.map(d=>({
          ...d,
          label: data.fields[d.key]
        }))
      );
    })();
  }, [lang]);

  const onChangeValue = (e) => setLang(
    e.target.value
  );

  const onSubmit = async(model) => {

    let newP = await addUser(model);
    if(newP.error){
      alert(newP.error || 'this name actually exist')
      return;
    }

    newP = newP.data;
    const stringifiedModel = JSON.stringify(newP);
    
    setNewPerson(stringifiedModel);
    alert(stringifiedModel);
  }

  return !title ? <></> : (
    <div className="App">
      <div onChange={onChangeValue}>
        <input checked={lang==='ar'} type="radio" value="ar" name="lang" /> عربى
        <input checked={lang==='en'} type="radio" value="en" name="lang" /> English
      </div>
      <DynamicForm
        form={langData}
        onSubmit={onSubmit}
        title={title}
        lang={lang}
      />
      <div className='new-person'>{newPerson}</div>
    </div>
  );
}

export default App;
