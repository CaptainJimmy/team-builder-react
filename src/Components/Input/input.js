import React from 'react';

const input = props => {
  return (
    <div>
      <label>
        Name:
        <input type="text" onChange={props.nameHandler} />
      </label>
      <label>
        Program:
        <input type="text" onChange={props.programHandler} />
      </label>
    </div>
  );
};

export default input;
