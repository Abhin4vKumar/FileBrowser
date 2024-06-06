import {useState , useMemo, useEffect} from 'react';
import './App.css';
import { FilesViewer } from './FilesViewer.js';

const formatSize = size => {
  var i=Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size/Math.pow(1024,i)).toFixed(2) * i + ' ' + ['B','kB' , 'MB' , 'GB' , 'TB'][i]
  )
}


function App() {
  // const appPath = await window.v1.appPath();
  const [path , setPath ] = useState('F:\\node\\electronReact\\react-electron');
  const setupFiles = async ()=>{
    console.log("running");
    const rs = await window.v1.getFiles(path);
    console.log(rs);
    return rs;
  };
  const [files,setFiles] = useState([]);
  // const files = useMemo(setupFiles,[path]);

  useEffect(() => {
    let active = true
    load()
    return () => { active = false }
  
    async function load() {
      const res = await setupFiles();
      if (!active) { return }
      setFiles(res)
    }
  }, [path])

  const onBack = async () => {
    const backPath = await window.v1.dirname(path);
    setPath(backPath);
  };
  const onOpen = async (folder) => {
    const openPath = await window.v1.join(path,folder);
    setPath(openPath);
  }
  
  const [searchString , setSearchString] = useState('');
  const filteredFiles = files.filter(s => s.name.startsWith(searchString));

  return (
    <div className="flex w-screen h-screen flex-col items-center font-sans gap-[20px] overflow-x-hidden">
      <div className='mt-[50px] mb-2 justify-self-start w-[70%] text-4xl flex flex-col gap-[20px]'>
        <h4>Viewing : {path}</h4>
        <input
          value={searchString}
          onChange={(e)=>{setSearchString(e.target.value)}}
          className="border-b-2 outline-none text-center pb-2"
          placeholder='File Search'
        />
      </div>
      <FilesViewer files={filteredFiles} onBack={onBack} onOpen={onOpen}/>
      <div className='h-[20px] w-[10px] block bg-white select-none text-white'>''</div>
    </div>
  );
}

export default App;
