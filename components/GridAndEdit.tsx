"use client";

import React, { useEffect, useRef, useState } from "react";
import Grid from "./Grid";
import TileEditComponent from "./TileEditComponent";
import { animated, config, useTransition } from "@react-spring/web";

function GridAndEdit() {
  const [focusedTileSpec, setFocusedTileSpec] = useState({
    index: "",
    path: "",
    editorTabCoor: [NaN, NaN] as [number, number],
  });
  const [floatEditor, setFloatEditor] = useState(false);
  const editorTabRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const gridAndEditRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutSide = (e: Event) =>
      !editorTabRef.current?.contains(e.target as Node) &&
      !gridRef.current?.contains(e.target as Node) &&
      setFocusedTileSpec({ editorTabCoor: [NaN, NaN], index: "", path: "" });

    const handleResize = () => (window.outerWidth < 500 ? setFloatEditor(false) : setFloatEditor(true));

    handleResize()

    window.addEventListener("mousedown", handleClickOutSide);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousedown", handleClickOutSide);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (gridAndEditRef.current) {
      const rect = gridAndEditRef.current.getBoundingClientRect();
      const newArr = focusedTileSpec.editorTabCoor;
      const coor = [newArr[0] - rect.left, newArr[1] - rect.top] as [number, number];
      floatEditor && setFocusedTileSpec((obj) => ({ ...obj, editorTabCoor: coor }));
    }
  }, [floatEditor, focusedTileSpec.index]);

  const [transitions, api] = useTransition(focusedTileSpec.index.length ? [0] : [], () => ({
    from: { transform: "translateX(-40%)", opacity: 0 },
    enter: { transform: "translateX(-50%)", opacity: 1 },
    config: config.stiff,
    reset: true
  }));

  useEffect(() => {
    setTimeout(() => api.start(), 0)
  }, [focusedTileSpec.index, api]);

  return (
    <div ref={gridAndEditRef} className=" relative">
      <div className="overflow-auto my-6 lg:h-[500px] md:h-[300px] h-[200px]">
        <Grid
          {...{
            focusedTileSpec,
            setFocusedTileSpec,
            gridRef,
          }}
        />
      </div>

      {transitions((style, i) => (
        <animated.div
          key={i}
          style={
            floatEditor
              ? {
                  position: "absolute",
                  left: focusedTileSpec.editorTabCoor[0],
                  top: focusedTileSpec.editorTabCoor[1],
                  ...style,
                }
              : {}
          }
        >
          <TileEditComponent
            {...{
              focusedTileSpec,
              editorTabRef,
            }}
          />
        </animated.div>
      ))}
    </div>
  );
}

export default GridAndEdit;
