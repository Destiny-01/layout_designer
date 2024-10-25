import React, { useEffect, useRef, useState } from "react";
import Grid from "./Grid";
import TileEditComponent from "./TileEditComponent";

function GridAndEdit() {
  const [focusedTileIndex, setFocusedTileIndex] = useState<string>("");
  const [focusedTilePath, setFocusedTilePath] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutSide = (e: Event) => {
      if (!containerRef.current?.contains(e.target as Node) && !gridRef.current?.contains(e.target as Node)) {
        setFocusedTileIndex("");
        setFocusedTilePath("");
        console.log("israel");
      }
    };

    window.addEventListener("mousedown", handleClickOutSide);
    return () => window.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  return (
    <div>
      <div className="overflow-auto my-6 lg:h-[500px] md:h-[300px] h-[200px]">
        <Grid
          {...{
            focusedTileIndex,
            setFocusedTileIndex,
            setFocusedTilePath,
            gridRef,
          }}
        />
      </div>
      {focusedTileIndex.length && (
        <TileEditComponent
          {...{
            focusedTileIndex,
            focusedTilePath,
            containerRef,
          }}
        />
      )}
    </div>
  );
}

export default GridAndEdit;
