import React, { dispatch } from 'react';

const Student = ({ name, dispatch, id, isHere }) => {
  return (
    <div>
      <span
        style={{
          textDecoration: isHere ? 'line-through' : 'none',
          color: isHere ? 'grey' : 'black',
        }}
        onClick={() => {
          dispatch({ type: 'mark-student', payload: { id } });
        }}
      >
        {name}
      </span>
      <button
        onClick={() => {
          dispatch({ type: 'delete-student', payload: { id } });
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Student;
