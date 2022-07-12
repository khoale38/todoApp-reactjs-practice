import TodoList from './component/TodoList'
import Textfield from '@atlaskit/textfield'
import Button from '@atlaskit/button'
import { v4 } from 'uuid'
import { useCallback, useEffect, useState } from 'react'

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App () {
  const [todoList, setTodoList] = useState([])
  const [textInput, setTextInput] = useState('')
  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value)
  }, [])
  
  const onAddBtnClick = useCallback((e) => {

    setTodoList([...todoList, {id: v4(),name: textInput,isCompleted: false}])
    setTextInput('')
  }, [textInput, todoList])
  

  //Local Storage not working dont know why ?
  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  
    return (
    <div>
      <h3>Todo List</h3>
      <Textfield
        css={{padding: '2px 4px 2px'}}
        onChange={onTextInputChange}
        value={textInput}
        name='add-todo'
        placeholder='Thêm việc cần làm'
        elemAfterInput={<Button onClick={onAddBtnClick} isDisabled={!textInput} appearance={'primary'}>
                          Add
                        </Button>}>
      </Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </div>
  )
}

export default App
