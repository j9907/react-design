import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TodoRemove, TodoSave } from '../modules/Tolist'
import { Badge, Calendar } from 'antd';
import dayjs from 'dayjs';
import './css/TodoList.css'


export default function TodoList() {

  let [payload, setpayload] = useState({
    Todoid: '',
    Tododate : '',
    Todocontent: '',
  });

    const dispatch = useDispatch();
  const onSave = (saveData) => {
    console.log("save",saveData)
    payload.Tododate = selectedValue?.format('YYYY-MM-DD')
    dispatch(TodoSave(saveData));

    console.log("payload",payload)
  }
  const onRemove = (Todoid) => dispatch(TodoRemove(Todoid));
  const onChanges = (e) => {
    
    setpayload({
      ...payload,[e.target.name]: e.target.value
    })
  }
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSave(payload)
    resetform()
    
  }

  const resetform = () => {
    setpayload ({
      Todoid : '',
      Tododate : '',
      Todocontent : ''
    })
  }

  const Todo = useSelector(state => state.TodoSave);
  console.log("TOdo",Todo)
  console.log(Todo.Todos.map((e) => e.Tododate === selectedValue?.format('YYYY-MM-DD')) )
  const dateCellRender = (value) => {
    const listData = Todo;
  
    // 선택한 날짜와 일치하는 Todo 항목만 필터링합니다.
    const filteredTodos = Todo.Todos.filter(
      (item) => item.Tododate === value.format('YYYY-MM-DD')
    );
  
    if (filteredTodos.length > 0) {
      return (
        <ul className="events">
          {filteredTodos.map((item) => (
            <li key={item.Todocontent}>
              <Badge status="success" text={item.Todocontent} />
            </li>
          ))}
        </ul>
      );
    }
  
    return null; // 선택한 날짜에 일치하는 Todo 항목이 없을 경우 null을 반환하여 뱃지가 표시되지 않도록 합니다.
  };
  
   return (
    <div className="App">
    <h3>TodoCalendar</h3>
    <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} style={{flexGrow:1}} cellRender={dateCellRender}/>
    <div className="container">
      <form onSubmit={onSubmit}>
        <span>{selectedValue?.format('YYYY-MM-DD')}</span>
        <input type="text" placeholder="작성" name="Todocontent" value={payload.Todocontent} onChange={onChanges} autoComplete='off'/>
        <input type="hidden" name="Todoid" onChange={onChanges} value={payload.Todoid}/>
        <button type="submit" className="savebtn">등록</button>
      </form>
      </div>
    </div>
  )
}