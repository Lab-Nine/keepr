import React, { useState } from 'react';

const UploadModal = (props) => {
  // const showHideClassName = props.show ? "show" : "hide";
  // console.log(showHideClassName)
  // return <div>Hi</div>
  const [itemName, setName] = useState('');
  const [desc, setDesc] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
  }

  const onDescChange = (event) => {
    setDesc(event.target.value);
  }

  if(props.show){
    return (
      <div className='modal'>
        <div className = 'modalContainer'>
          <input id='itemName' onChange={onNameChange} placeholder='Enter Name of Item' className='form username' />
          <input id='itemDesc' onChange={onDescChange} placeholder='Enter Description of Item' className='form password' />
          <div id='modalButtons'>
            <button id='uploadItem' onClick={() => {props.addItem(itemName, desc); props.cancel()}}>Submit Item</button>
            <button id='cancelButton' onClick={() => props.cancel()}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
  else {
    return null;
  }

}

export default UploadModal;