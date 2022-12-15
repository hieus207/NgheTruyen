import { useState } from 'react';

const useInputObject = (obj) => {
  const [data, setData] = useState({...obj});

  const onChangeInput = (field) => (e) =>{   
    setData({...data, [field]: e.target.value})
  }

  return [
    data,
    onChangeInput,
    setData
  ]
};

export default useInputObject;