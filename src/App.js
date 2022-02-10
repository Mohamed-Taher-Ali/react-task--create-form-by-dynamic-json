import './App.css';
import { useState } from 'react';
import dataJson from './data.json';
import formJson from './form.json';
import DynamicForm from './DynamicForm';

function App() {
  const [data, setData] = useState(dataJson);
  const [newPerson, setNewPerson] = useState("");

  const onSubmit = (model) => {
    model.id = Math.max(...data.map(d => d.id)) + 1;
    setData([...data, model]);

    const stringifiedModel = JSON.stringify(model);
    setNewPerson(stringifiedModel);
    alert(stringifiedModel);
  }

  return (
    <div className="App">
      <DynamicForm
        form={formJson}
        onSubmit={onSubmit}
        title='Register-Form'
      />
      <div className='new-person'>{newPerson}</div>
    </div>
  );
}

export default App;
