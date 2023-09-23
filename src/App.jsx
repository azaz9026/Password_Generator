import { useState , useCallback , useEffect , useRef } from 'react'

import './App.css'

function App() {

  // UseState hook--------------------

    const [length , setLength] = useState(8);
    const [numberAllowed , setNumberAllowed] = useState(false);
    const [charAllowed , setCharAllowed] = useState(false);
    const [password , setPassword] = useState("")

  // UseRef hook-------------------------


    const passwordRef = useRef(null)

  
  // UseCallback hook--------------------


        const copyPasswordToClipBoard = useCallback(() => { passwordRef.current?.select() ; passwordRef.current?.setSelectionRange(0,101) ; window.navigator.clipboard.writeText(password)} , [password])


        const passwordGenerator = useCallback( () => {
          let pass = "";
          let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
          if(numberAllowed) str += "0123456789"
          if(charAllowed) str += "!@#$%^&*()_+[]{}~`"

          for(let i = 1 ; i<=length ; i++){
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
          }

        setPassword(pass)

      } , [length , numberAllowed , charAllowed , setPassword])


  // UseEffect hook--------------------


  useEffect(() => {passwordGenerator()} , [length , numberAllowed , charAllowed , passwordGenerator])


  return (
    <>

      <h1 className='text-4xl text-center text-white'>Password Generator</h1>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 flex items-center justify-between gap-5' >

            <input type="text" value={password} className='outline-none w-full py-1 px-3 rounded mb-5 mt-5' placeholder='Password' readOnly ref={passwordRef} />

            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded hover:bg-blue-900 hover:border-white ' onClick={copyPasswordToClipBoard}> Copy </button>

      </div>


      <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 flex items-center justify-between gap-5'>

        <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
            <label htmlFor="">Length : {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' className='cursor-pointer' onChange={()=>{setNumberAllowed((prev) => !prev)}}/>
            <label htmlFor="numberInput">Number</label>
        </div>

        <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id='characterInput' className='cursor-pointer' onChange={()=>{setCharAllowed((prev) => !prev)}}/>
            <label htmlFor="characterInput">Characters</label>
        </div>

      </div>

    </>
     
  )
}

export default App
