import { useState } from 'react';
import './App.css';

function DynamicForm({
  onSubmit = () => { },
  title = "form",
  form = [],
}) {
  const [current, setCurrent] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(current);
  }

  const onChange = (e, key) => setCurrent({
    ...current,
    [key]: e.target.value
  });

  const renderForm = () => form.map((inp, ind) => {
    const key = inp.key;
    const props = inp.props || {};
    const type = inp.type || 'text';

    return (
      <div key={key} className="form-group">
        <label
          key={ind + key + 'label'}
          className='form-label'
          htmlFor={ind + key + 'input'}>{inp.label}</label>

        <input
          {...props}
          type={type}
          id={ind + key + 'input'}
          key={ind + key + 'input'}
          className="form-input"
          onChange={(e) => onChange(e, key)}
        />
      </div>
    )

  });

  return (
    <div className="form-class" onSubmit={onSubmitHandler} >
      <div className='title'>{title}</div>
      <form>
        {renderForm()}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default DynamicForm;
