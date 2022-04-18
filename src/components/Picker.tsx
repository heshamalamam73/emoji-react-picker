import React, { HTMLInputTypeAttribute, useCallback } from "react";
import { forwardRef, useEffect, useState } from "react";
import emojisDb, { Emoji } from "./emojisDb";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  //
};

const Picker = forwardRef<HTMLDivElement, Props>(
  ({ open, setOpen, ...props }, ref) => {
    const [openPicker, setOpenPicker] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [filterdEmojis, setFilterEmojis] = useState<Emoji[]>([]);
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
    return open ? (
      <div
        ref={ref}
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
            flex: 1,
            overflow: "auto"
          }}
        >
          <input
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
              paddingTop: 10,
              margin: "auto",
              overflow: "scroll",
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "100%",
              maxHeight: "100%",
              justifyContent: "center",
              flex: 1
            }}
          >
            {filterdEmojis?.map((emoji) => {
              return <span style={{ paddingRight: 5 }}>{emoji.emoji}</span>;
            })}
          </div>
        </div>
      </div>
    ) : null;
  }
);

export default Picker;
