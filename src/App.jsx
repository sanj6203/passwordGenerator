import React, { useState, useCallback, useEffect ,useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [allowedNumber, setAllowedNumber] = useState(false);
  const [allowedCharacter, setAllowedCharacter] = useState(false);
  const [password, setPassword] = useState("");


  // useRef hook

  const passwordRef = useRef(null)

  useEffect(() => {
    passwordGenerator();
  }, [length, allowedCharacter, allowedNumber]);

  const copyPasswordToclipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelctionRange(0,100)
    window.navigator.clipboard.writeText(password); 
  } ,[password])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowedCharacter) {
      str += "!@#$%^&*()_+-={[/?><|]}";
    }
    if (allowedNumber) {
      str += "0123456789";
    }

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, allowedNumber, allowedCharacter]);

  const handleLengthChange = (e) => {
    setLength(parseInt(e.target.value));
  };

  const handleNumberChange = () => {
    setAllowedNumber((prev) => !prev);
  };

  const handleCharacterChange = () => {
    setAllowedCharacter((prev) => !prev);
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className="outline-none w-full py-1 px-3"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToclipboard}
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={handleLengthChange}
            className="cursor-pointer"

          />
          <label>Length:{length} </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="numberInput"
            checked={allowedNumber}
            onChange={handleNumberChange}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="characterInput"
            checked={allowedCharacter}
            onChange={handleCharacterChange}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
