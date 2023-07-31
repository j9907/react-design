import { createSlice,createAction } from "@reduxjs/toolkit";


const TodoReducer = createSlice({
    name : 'TodoReducer',
    initialState:{
        Todos:[
            {
                Todoid : 1,
                Tododate : '2023-07-31',
                Todocontent : '테스트'
            }
        ],
        lastId : 1,
    },
    reducers:{
        TodoSave : (state, {payload: saveData}) => {
            console.log(state,saveData)
            if(saveData.Todoid === ''){
                return { lastId : state.lastId + 1, 
                    Todos : state.Todos.concat({...saveData, Todoid : state.lastId + 1})
                };
            }return {...state, Todos:state.Todos.map(data => data.Todoid === saveData.Todoid ? {...saveData}:data)}
       

    },
    TodoRemove : (state, {payload : Todoid}) => {
        return {...state, Todos:state.Todos.filter(row => row.Todoid !== Todoid)}
    }

    }
})
export const {TodoSave,TodoRemove} = TodoReducer.actions;

export default TodoReducer.reducer;