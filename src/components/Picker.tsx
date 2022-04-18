import React, { HTMLInputTypeAttribute, useCallback } from "react";
import { forwardRef, useEffect, useState } from "react";
import emojisDb, { Emoji } from "./emojisDb";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectEmoji: (emoji: string) => void;
  //
};

const Picker = forwardRef<HTMLDivElement, Props>(
  ({ open, setOpen, onSelectEmoji, ...props }, ref) => {
    const [openPicker, setOpenPicker] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [filterdEmojis, setFilterEmojis] = useState<Emoji[]>([]);
    const pickerRef = React.createRef();
    const getFilterdEmoji = useCallback(
      (emojis: Emoji[], value: string) => {
        if (value === "") setFilterEmojis(emojis);
        setFilterEmojis(
          emojis.filter(({ tags }) =>
            tags.find((tag) => tag.includes(searchValue))
          )
        );
      },
      [searchValue]
    );

    useEffect(() => {
      getFilterdEmoji(emojisDb, searchValue);
    }, [searchValue, getFilterdEmoji]);
    const handleSearchEmoji = (e: any) => {
      setSearchValue(e.target.value);
    };
    const handleSelectEmoji = (emoji: string) => () => {
      if (emoji) onSelectEmoji(emoji);
    };
    return open ? (
      <div
        ref={pickerRef}
        style={{
          width: 250,
          height: 300,
          backgroundColor: "#eee",
          overflow: "hidden",
          position: "absolute",
          maxWidth: "100%",
          justifyContent: "flex-start",
          alignItems: "flex-start"
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            height: "100%"
          }}
        >
          <input
            value={searchValue}
            autoFocus
            onChange={handleSearchEmoji}
            placeholder="search emoji"
            style={{
              marginBottom: 10,
              border: "none",
              backgroundColor: "transparent",
              padding: 10,
              borderBottom: "1px solid #737373",
              outline: "none"
            }}
          />
          <div
            style={{
              height: "100%",
              // margin: "auto",
              overflow: "auto",
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "100%",
              maxHeight: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              alignContent: "flex-start"
            }}
          >
            {filterdEmojis?.map((emoji) => {
              return (
                <span
                  onClick={handleSelectEmoji(emoji.emoji)}
                  style={{ padding: 3 }}
                >
                  {emoji.emoji}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    ) : null;
  }
);

export default Picker;
