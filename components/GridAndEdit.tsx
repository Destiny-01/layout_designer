"use client";

import React, { useEffect, useRef, useState } from "react";
import Grid from "./Grid";
import TileEditComponent from "./TileEditComponent";
import { animated, config, useTransition } from "@react-spring/web";
import { useRootLayoutContext } from "@/contexts/RootLayoutContext";

function GridAndEdit() {
  const [focusedTileSpec, setFocusedTileSpec] = useState({
    index: "",
    path: "",
    editorTabCoor: [NaN, NaN] as [number, number],
  });
  const [floatEditor, setFloatEditor] = useState(false);
  const editorTabRef = useRef<HTMLDivElement | null>(null);
  const gridAndEditRef = useRef<HTMLDivElement | null>(null);
  const { gridRef } = useRootLayoutContext();


  useEffect(() => {
    const handleClickOutSide = (e: Event) =>
      !editorTabRef.current?.contains(e.target as Node) &&
      !gridRef.current?.contains(e.target as Node) &&
      setFocusedTileSpec({ editorTabCoor: [NaN, NaN], index: "", path: "" });

    const handleResize = () => (window.outerWidth < 500 ? setFloatEditor(false) : setFloatEditor(true));

    handleResize();

    window.addEventListener("mousedown", handleClickOutSide);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousedown", handleClickOutSide);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const setFocusedTile = (index: string, path: string, initailCoor: [number, number]) => {
    if (gridAndEditRef.current) {
      const rect = gridAndEditRef.current.getBoundingClientRect();
      const coor = [initailCoor[0] - rect.left, initailCoor[1] - rect.top] as [number, number];
      setFocusedTileSpec({ index: index, path:path, editorTabCoor: coor });
    }
  };

  const [transitions, api] = useTransition(focusedTileSpec.index.length ? [0] : [], () => ({
    from: { transform: "translate(-50%, -10%)", opacity: 0 },
    enter: { transform: "translate(-50%, 30%)", opacity: 1 },
    config: config.stiff,
    reset: true,
    exitBeforeEnter: true,
    // immediate: true
  }));

  useEffect(() => {
    setTimeout(() => api.start(), 0);
  }, [focusedTileSpec.index, api]);

  return (
    <div ref={gridAndEditRef} className=" relative">
      <div className="overflow-auto my-6 lg:h-[500px] md:h-[300px] h-[200px]">
        <Grid
          {...{
            focusedTileSpec,
            setFocusedTile,
            gridRef,
          }}
        />
      </div>

      {transitions((style, i) => (
        <animated.div
          key={i}
          className={''}
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
