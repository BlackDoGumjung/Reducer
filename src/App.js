import React, { useState, useReducer } from 'react';
import './style.css';
import Student from './Student';

//reducer, dispatch, action
//철수의 은행방문 > 만원 출금(action) 은행으로 요청(dispatch), 은행(reducer)에서 거래내역(state)을 철수 대신 업데이트함
//action : 예금, 출금, 송금
//Dispatch(Action) ---> Reducer(State, Action) ---> state update!

//reducer -state 업데이트하는 역할
//dispatch - state 업데이트 요구
//action - 요구 내용

const ACTION_TYPES = {
  deposit: 'deposit',
  withdraw: 'withdraw',
  addStudent: 'addStudent',
  deleteStudent: 'deleteStudent',
  markStudent: 'markStudent',
};

var reducer = (state, action) => {
  console.log('reducer 일하는 중', state, action);
  //return state + action.payload;
  switch (action.type) {
    case ACTION_TYPES.deposit:
      return state + action.payload;
    case ACTION_TYPES.withdraw:
      return state - action.payload;
    default:
      return state;
  }
};

var reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.addStudent:
      let name = action.payload.name;
      const newStudent = {
        id: Date.now(),
        name,
        isHere: false,
      };
      return {
        count: state.count + 1,
        students: [...state.students, newStudent],
      };
    case ACTION_TYPES.deleteStudent:
      return {
        count: state.count - 1,
        students: state.students.filter(
          (student) => student.id !== action.payload.id
        ),
      };
    case ACTION_TYPES.markStudent:
      return {
        count: state.count,
        students: state.students.map((student) => {
          if (student.id === action.payload.id) {
            return { ...student, isHere: !student.isHere };
          }
          return student;
        }),
      };
    default:
      return state;
  }
};

const initialState = {
  count: 0,
  students: [
    {
      id: Date.now(),
      name: 'jessica',
      isHere: false,
    },
  ],
};

export default function App() {
  const [number, setNumber] = useState(0);
  var [money, dispatch] = useReducer(reducer, 0);

  const [name, setName] = useState('');
  var [studentsInfo, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h2>useReducer 은행</h2>
      <p>잔고: {money}원</p>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
        step="10000"
      />
      <button
        onClick={() => {
          dispatch({ type: ACTION_TYPES.deposit, payload: number });
        }}
      >
        예금
      </button>
      <button
        onClick={() => {
          dispatch({ type: ACTION_TYPES.withdraw, payload: number });
        }}
      >
        출금
      </button>
      <br />
      <h2>출석부</h2>
      <p>총 학생수 : {studentsInfo.count}명</p>
      <input
        type="text"
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button>추가</button>
      {studentsInfo.students.map((student) => {
        return (
          <Student
            key={student.id}
            name={student.name}
            dispatch={dispatch}
            id={student.id}
            isHere={student.isHere}
          />
        );
      })}
    </div>
  );
}
