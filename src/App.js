import { useState } from 'react';
import { CSVReader } from 'react-papaparse';
import Table from './component/Table';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const handleOnDrop = (data) => {
    setData(data);
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log("this is ", err)
  }

  const handleOnRemoveFile = (data) => {
    setData(data);
  }

  return (
    <div className="App">
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        noDrag
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Click to upload.</span>
      </CSVReader>
      <Table data={data} />
    </div>
  );
}

export default App;
