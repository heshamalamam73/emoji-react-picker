import { useCallback, useState } from "react";
import "./styles.css";
import Picker from "./components/Picker";
import React from "react";
export default function App() {
  const [emojiModel, setEmojiModel] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const inputContainer = {
    border: "1px solid #eee",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 400,
    margin: "auto",
    display: "flex",
    padding: 10,
    borderRadius: 5
  };
  const emojiButton = {
    outline: "none",
    border: "none",
    backgroundColor: "transparent"
  };
  const inputStyle = {
    border: "none",
    outline: "none",
    flex: 1
  };

  const handleToggleEmojiBox = useCallback(() => {
    setEmojiModel((prev) => !prev);
  }, [setEmojiModel]);

  const pickerRef = React.createRef<HTMLDivElement>();
  const handleSelectEmoji = (emogi: string) => {
    setInputValue((prev) => prev.concat(emogi));
  };
  const handleChangeInputValue = (e: any) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="App">
      <h1>React Emoji Picker </h1>
      <h2>just react js without any libraries </h2>
      <p>{inputValue}</p>
      <div style={inputContainer}>
        <input
          value={inputValue}
          onChange={handleChangeInputValue}
          placeholder="placeholder"
          type="text"
          style={inputStyle}
        />
        <button onClick={handleToggleEmojiBox} style={emojiButton}>
          <span role="img" aria-label="emogi">
            😀
          </span>
        </button>
      </div>
      <Picker
        onSelectEmoji={handleSelectEmoji}
        ref={pickerRef}
        open={emojiModel}
        setOpen={setEmojiModel}
      />
    </div>
  );
}
