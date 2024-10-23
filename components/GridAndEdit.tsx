import React, { useEffect, useRef, useState } from "react";
import Grid from "./Grid";
import SSTileEditComponent from "./SSTileEditComponent";
import useTileStore, {
  EditedTile,
  irregularTile,
  useHistoryStore,
} from "@/store";
import { collectionTiles } from "@/data/tileCatgories";

function GridAndEdit() {
  const [focusedTileIndex, setFocusedTileIndex] = useState<string>("");
  const [focusedTilePath, setFocusedTilePath] = useState<string>("");
  const gridAndEditRef = useRef<any>(null);

  const activeTileName = useTileStore((state) => state.tileName);
  const activeTilePath = useTileStore((state) => state.activeTilePath);
  const editedTiles = useTileStore((state) => state.editedTiles);
  const { setState, state, currentIndex, setCurrentIndex } = useHistoryStore();

  const activeTile = editedTiles.find(
    (tile) => tile.tileIndex === focusedTileIndex
  );
  const [showColorPanel, setShowColorPanel] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [updatedTilePath, setUpdatedTilePath] = useState<string | null>(null);
  const [rotationDegree, setRotationDegree] = useState<number>(
    activeTile?.rotationDegree || 0
  );
  const [rotateStyle, setRotateStyle] = useState<
    EditedTile["rotateStyle"] | undefined
  >(activeTile?.rotateStyle);

  const [tileColor, setTileColor] = useState<string>("");

  const storeUserAction = (
    action: "rotate" | "flipX" | "flipY" | "color",
    from: any,
    to: any
  ) => {
    setState([...state, { tileIndex: focusedTileIndex, from, to, action }]);
    setCurrentIndex(currentIndex + 1);
  };

  const rotateDiv = (direction: "reset" | "flipX" | "flipY" | "rotate") => {
    if (irregularTile.includes(activeTileName)) return;
    let newDegree = 0;
    switch (direction) {
      case "reset":
        newDegree = 0;
        setEditedTiles(
          editedTiles.filter((tile) => tile.tileIndex !== focusedTileIndex)
        );

        setFocusedTilePath(activeTilePath);
      case "flipX":
        newDegree = rotationDegree > 0 ? 0 : 180;
        break;
      case "flipY":
        newDegree = rotationDegree > 0 ? 0 : 180;
        break;
      default:
        const editedTileIndex = editedTiles.findIndex(
          (tile) => tile.tileIndex === focusedTileIndex
        );
        if (editedTileIndex === -1) {
          const editedTile = {
            tileIndex: focusedTileIndex,
            rotationDegree: 90,
            rotateStyle: undefined,
            tilePath: focusedTilePath,
          };
          console.log("here3");

          setEditedTiles([...editedTiles, editedTile]);
        } else {
          const newArr = [...editedTiles];
          newArr[editedTileIndex].rotationDegree += 90;
          setEditedTiles(newArr);
        }
    }
    direction !== "reset" &&
      storeUserAction(direction, rotationDegree, newDegree);

    direction === "flipX" || direction === "flipY"
      ? setRotateStyle(direction)
      : setRotateStyle(undefined);

    setRotationDegree(newDegree);
  };

  const updateTileData = () => {
    const tileEditData = {
      tileIndex: focusedTileIndex,
      rotationDegree,
      rotateStyle,
      tilePath: focusedTilePath,
    };

    const index = editedTiles.findIndex(
      (tile) => tile.tileIndex === focusedTileIndex
    );

    if (index !== -1) {
      editedTiles[index] = tileEditData;
      setEditedTiles([...editedTiles]);
    } else {
      setEditedTiles([...editedTiles, tileEditData]);
    }
  };

  const handleColorPick = () => {
    setShowColorPanel(!showColorPanel);
  };

  const setEditedTilePath = (colorValue: string) => {
    setTileColor(colorValue);
    const specificTile = collectionTiles.find((item) => {
      return item.tileName === activeTileName;
    });
    let specificColorData = null;

    if (specificTile) {
      for (const subCategory of specificTile.subCategories) {
        const matchingTile = subCategory.tileVariation.find(
          (tile) =>
            tile.tileColor === colorValue &&
            focusedTilePath.includes(tile.tilePath.split("-")[0])
        );
        if (matchingTile) {
          specificColorData = matchingTile;
          break;
        }
      }

      if (specificColorData) {
        storeUserAction("color", focusedTilePath, specificColorData.tilePath);
        setFocusedTilePath(specificColorData.tilePath);
        setUpdatedTilePath(specificColorData.tilePath);
      }
    }
  };

  const setEditedTiles = useTileStore((state) => state.setEditedTiles);

  const handleTileEdit = (
    editType: "reset" | "flipX" | "flipY" | "colorEdit" | "rotate"
  ) => {
    editType === "reset" && rotateDiv("reset");
    editType === "flipX" && rotateDiv("flipX");
    editType === "flipY" && rotateDiv("flipY");
    editType === "rotate" && rotateDiv("rotate");
    editType === "colorEdit" && handleColorPick();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        gridAndEditRef.current &&
        !gridAndEditRef.current.contains(event.target)
      ) {
        setFocusedTileIndex("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (updatedTilePath !== null && !isFirstLoad) {
      updateTileData();
      console.log("here1");
      setFocusedTilePath(updatedTilePath);
    }
    isFirstLoad && setIsFirstLoad(false);
  }, [updatedTilePath]);

  useEffect(() => {
    !isFirstLoad && updateTileData();
  }, [showColorPanel, rotationDegree, focusedTilePath]);

  // useEffect(() => {
  //   setFocusedTilePath(
  //     pathCache[focusedTileIndex] ??
  //       activeTile?.tilePath ??
  //       activeTilePath
  //   );
  // }, [activeTilePath, pathCache])
  return (
    <div ref={gridAndEditRef}>
      <div className="overflow-auto my-6 lg:h-[500px] md:h-[300px] h-[200px]">
        <Grid
          {...{
            focusedTileIndex,
            setFocusedTileIndex,
            setFocusedTilePath,
          }}
        />
      </div>
      <SSTileEditComponent
        {...{
          focusedTileIndex,
          handleTileEdit,
          showColorPanel,
          tileColor,
          setEditedTilePath
        }}
      />
    </div>
  );
}

export default GridAndEdit;
