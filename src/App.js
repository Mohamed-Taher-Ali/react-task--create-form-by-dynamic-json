import './App.css';
import { useEffect, useState } from 'react';
import formJson from './form.json';
import DynamicForm from './DynamicForm';
import { addUser, getCheckUserName, getLang } from './services';

function App() {
  const [lang, setLang] = useState("en");
  const [title, setTitle] = useState("");
  const [logged, setLogged] = useState(false);
  const [newPerson, setNewPerson] = useState("");
  const [langData, setLangData] = useState(formJson);

  useEffect(() => {
    (async () => {
      const langObj = await getLang(lang);
      const data = langObj.data;

      setTitle(data.title);
      setLangData(
        langData.map(d => ({
          ...d,
          label: data.fields[d.key]
        }))
      );
    })();
  }, [lang]);

  const onChangeValue = (e) => setLang(
    e.target.value
  );

  const onLogin = async (e) => {
    const name = e.target.value;
    const ret = await getCheckUserName(name);
    if (ret.data.error) {
      setLogged(true);
    }
  }

  const onSubmit = async (model) => {

    let newP = await addUser(model);
    if (newP.error) {
      alert(newP.error || 'this name actually exist')
      return;
    }

    newP = newP.data;
    const stringifiedModel = JSON.stringify(newP);

    setNewPerson(stringifiedModel);
    alert(stringifiedModel);
  }

  return !logged
    ? (
      <div className='login-cont'>
        <input
          type='text'
          onChange={onLogin}
          className='login-inp'
          placeholder="Enter Your Login Name"
        />
      </div>
    )
    : !title
      ? <></>
      : (
        <div className="App">
          <div onChange={onChangeValue}>
            <input checked={lang === 'ar'} type="radio" value="ar" name="lang" /> عربى
            <input checked={lang === 'en'} type="radio" value="en" name="lang" /> English
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
