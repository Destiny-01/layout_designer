import { collectionTiles, colorVariation } from "@/data/tileCatgories";
import useTileStore, { EditedTile } from "@/store";
import { useEffect, useState } from "react";

type Props = {
  tileIndex: string;
  boxSize: number;
};

const TileEditComponent = ({ tileIndex, boxSize }: Props) => {
  const activeTileName = useTileStore((state) => state.tileName);
  const activeTilePath = useTileStore((state) => state.activeTilePath);
  const setActiveTilePath = useTileStore((state) => state.setActiveTilePath);

  const [showColorPanel, setShowColorPanel] = useState(false);
  const [updatedTilePath, setUpdatedTilePath] = useState<string | null>(null);
  const [rotationDegree, setRotationDegree] = useState<number>(0);
  const [rotateStyle, setRotateStyle] =
    useState<EditedTile["rotateStyle"]>("rotate");
  const [tilePath, setTilePath] = useState<string>(activeTilePath);
  const [tileColor, setTileColor] = useState<string>("");

  const rotateDiv = (
    direction: "clockwise" | "anticlockwise" | "flipX" | "flipY"
  ) => {
    let newDegree = 0;
    switch (direction) {
      case "clockwise":
        // newDegree = rotationDegree + 90;
        // if (newDegree >= 360) {
        newDegree = 0;
      // }
      case "anticlockwise":
        newDegree = rotationDegree - 90;
        if (newDegree < 0) {
          newDegree = 270;
        }
      case "flipX":
        newDegree = rotationDegree > 0 ? 0 : 180;
        break;
      case "flipY":
        newDegree = rotationDegree > 0 ? 0 : 180;
        break;
    }
    console.log(direction);
    direction === "flipX" || direction === "flipY"
      ? setRotateStyle(direction)
      : setRotateStyle("rotate");

    setRotationDegree(newDegree);
  };
  console.log(rotationDegree, rotateStyle);

  const updateTileData = () => {
    const tileEditData = {
      tileIndex,
      rotationDegree,
      rotateStyle,
      tilePath,
    };
    console.log(tileEditData, "lll");

    const index = editedTiles.findIndex((tile) => tile.tileIndex === tileIndex);

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

  console.log("actibe", activeTileName, activeTilePath, tilePath);
  const setEditedTilePath = (colorValue: string) => {
    setTileColor(colorValue);
    const specificTile = collectionTiles.find((item) => {
      return item.tileName === activeTileName;
    });

    if (specificTile) {
      const tileVariation = specificTile.tileVariation;

      const specificColorData = tileVariation.find((item) => {
        return item.tileColor === colorValue;
      });

      if (specificColorData) {
        console.log("reached", specificTile, activeTileName);
        setTilePath(specificColorData.tilePath);
        setUpdatedTilePath(specificColorData.tilePath);
      }
    }
  };

  const setEditedTiles = useTileStore((state) => state.setEditedTiles);

  const editedTiles = useTileStore((state) => state.editedTiles);

  const handleTileEdit = (
    editType: "rotate" | "flipX" | "flipY" | "colorEdit"
  ) => {
    editType === "rotate" && rotateDiv("clockwise");
    editType === "flipX" && rotateDiv("flipX");
    editType === "flipY" && rotateDiv("flipY");
    editType === "colorEdit" && handleColorPick();
  };

  useEffect(() => {
    if (updatedTilePath !== null) {
      updateTileData();
      setTilePath(updatedTilePath);
    }
  }, [updatedTilePath]);

  useEffect(() => {
    updateTileData();
  }, [showColorPanel, rotationDegree, tilePath]);

  useEffect(() => setTilePath(activeTilePath), [activeTilePath]);

  return (
    <div className="absolute z-50 top-0">
      {/* Rotate Button */}
      <div className="absolute -top-20">
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            handleTileEdit("rotate");
          }}
        >
          <g filter="url(#filter0_d_11_9249)">
            <circle cx="26" cy="22" r="15" fill="white" />
            <circle
              cx="26"
              cy="22"
              r="14.75"
              stroke="#898989"
              strokeWidth="0.5"
            />
          </g>
          <path
            d="M18.775 23.1083C18.775 27.1 22.0084 30.3333 26 30.3333C29.9917 30.3333 33.225 27.1 33.225 23.1083C33.225 21.625 32.775 20.2417 32.0084 19.0917M28.4084 16.2333C27.6834 16.0167 26.8834 15.875 26 15.875C23.325 15.875 20.9834 17.3333 19.7417 19.4917"
            stroke="#191919"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28.6083 16.4333L26.2 13.6667"
            stroke="#191919"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28.6084 16.4333L25.8 18.4833"
            stroke="#191919"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <filter
              id="filter0_d_11_9249"
              x="0.6"
              y="0.6"
              width="50.8"
              height="50.8"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="5.2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_11_9249"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_11_9249"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" />
      </div>

      {/* Color Button */}
      <div className="absolute left-[4.5rem] rotate-90">
        {showColorPanel && (
          <div className="flex bottom-24 -left-10 rotate-[270deg] w-32 overflow-x-scroll gap-3 py-3 absolute">
            {colorVariation.map((color) => {
              return (
                <button
                  key={color.colorName}
                  onClick={() => {
                    setEditedTilePath(color.colorName);
                  }}
                >
                  <div
                    className={`w-7 h-7 rounded-full border ${
                      tileColor === color.colorName
                        ? "border-2 border-yellow-950"
                        : "border border-black"
                    } `}
                    style={{
                      backgroundColor: color.colorHEX,
                    }}
                  />
                </button>
              );
            })}
          </div>
        )}

        {showColorPanel ? (
          // Cancel button
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-[270deg]"
            onClick={() => {
              handleTileEdit("colorEdit");
            }}
          >
            <g filter="url(#filter0_d_84_88528)">
              <circle cx="26" cy="22" r="15" fill="white" />
              <circle
                cx="26"
                cy="22"
                r="14.75"
                stroke="#898989"
                strokeWidth="0.5"
              />
            </g>
            <path
              d="M26.0001 30.3333C30.5834 30.3333 34.3334 26.5833 34.3334 22C34.3334 17.4167 30.5834 13.6667 26.0001 13.6667C21.4167 13.6667 17.6667 17.4167 17.6667 22C17.6667 26.5833 21.4167 30.3333 26.0001 30.3333Z"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M23.6416 24.3583L28.3583 19.6416"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28.3583 24.3583L23.6416 19.6416"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <filter
                id="filter0_d_84_88528"
                x="0.6"
                y="0.6"
                width="50.8"
                height="50.8"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="5.2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_84_88528"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_84_88528"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        ) : (
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-[270deg]"
            onClick={() => {
              handleTileEdit("colorEdit");
            }}
          >
            <g filter="url(#filter0_d_11_9248)">
              <circle cx="26" cy="22" r="15" fill="white" />
              <circle
                cx="26"
                cy="22"
                r="14.75"
                stroke="#898989"
                strokeWidth="0.5"
              />
            </g>
            <path
              opacity="0.6"
              d="M27.6666 25.3333C27.6666 26.8083 27.025 28.1416 26 29.05C25.1166 29.85 23.95 30.3333 22.6666 30.3333C19.9083 30.3333 17.6666 28.0916 17.6666 25.3333C17.6666 23.0333 19.2333 21.0833 21.35 20.5083C21.925 21.9583 23.1583 23.075 24.6833 23.4916C25.1 23.6083 25.5416 23.6666 26 23.6666C26.4583 23.6666 26.9 23.6083 27.3166 23.4916C27.5416 24.0583 27.6666 24.6833 27.6666 25.3333Z"
              fill="#191919"
            />
            <path
              d="M31 18.6667C31 19.3167 30.875 19.9417 30.65 20.5083C30.075 21.9583 28.8417 23.075 27.3167 23.4917C26.9 23.6083 26.4583 23.6667 26 23.6667C25.5417 23.6667 25.1 23.6083 24.6833 23.4917C23.1583 23.075 21.925 21.9583 21.35 20.5083C21.125 19.9417 21 19.3167 21 18.6667C21 15.9083 23.2417 13.6667 26 13.6667C28.7583 13.6667 31 15.9083 31 18.6667Z"
              fill="#191919"
            />
            <path
              opacity="0.4"
              d="M34.3333 25.3333C34.3333 28.0916 32.0917 30.3333 29.3333 30.3333C28.05 30.3333 26.8833 29.85 26 29.05C27.025 28.1416 27.6667 26.8083 27.6667 25.3333C27.6667 24.6833 27.5417 24.0583 27.3167 23.4916C28.8417 23.075 30.075 21.9583 30.65 20.5083C32.7667 21.0833 34.3333 23.0333 34.3333 25.3333Z"
              fill="#191919"
            />
            <defs>
              <filter
                id="filter0_d_11_9248"
                x="0.6"
                y="0.6"
                width="50.8"
                height="50.8"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="5.2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_11_9248"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_11_9248"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        )}
        <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" />
      </div>

      {/* Delete Button */}
      {/* <div className="absolute -left-20 rotate-[270deg]">
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-[90deg]"
        >
          <g filter="url(#filter0_d_11_9250)">
            <circle cx="26" cy="22" r="15" fill="white" />
            <circle
              cx="26"
              cy="22"
              r="14.75"
              stroke="#898989"
              strokeWidth="0.5"
            />
          </g>
          <path
            d="M33.5 16.9833C30.725 16.7083 27.9333 16.5667 25.15 16.5667C23.5 16.5667 21.85 16.65 20.2 16.8167L18.5 16.9833"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.0834 16.1417L23.2667 15.05C23.4 14.2583 23.5 13.6667 24.9084 13.6667H27.0917C28.5 13.6667 28.6084 14.2917 28.7334 15.0583L28.9167 16.1417"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28.675 30.3333H23.325C21 30.3333 20.925 29.3167 20.8333 28.0083L20.2916 19.6167"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M31.7083 19.6167L31.1666 28.0083"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.6083 25.75H27.3833"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.6833 22.4167H28.0833"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.9166 22.4167H24.6083"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <filter
              id="filter0_d_11_9250"
              x="0.6"
              y="0.6"
              width="50.8"
              height="50.8"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="5.2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_11_9250"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_11_9250"
                result="shape"
              />
            </filter>
          </defs>
        </svg>

        <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" />
      </div> */}

      {/* Rotate Right Button */}
      <div className="absolute -bottom-20 left14 rotate-[180deg]">
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-[180deg]"
          onClick={() => {
            handleTileEdit("flipX");
          }}
        >
          <g filter="url(#filter0_d_11_9247)">
            <circle cx="26" cy="22" r="15" fill="white" />
            <circle
              cx="26"
              cy="22"
              r="14.75"
              stroke="#898989"
              strokeWidth="0.5"
            />
          </g>
          <path
            d="M17 28.8075C17 29.2314 17.4944 29.463 17.8201 29.1916L23.2844 24.638C23.5258 24.4368 23.524 24.0654 23.2806 23.8666L17.8163 19.4041C17.4897 19.1374 17 19.3698 17 19.7914V28.8075Z"
            fill="#191919"
          />
          <path
            d="M27.5822 23.9738C27.3443 24.1761 27.3479 24.5446 27.5898 24.7421L33.0587 29.2084C33.3853 29.4751 33.875 29.2427 33.875 28.8211V19.7062C33.875 19.28 33.3759 19.0492 33.0512 19.3253L27.5822 23.9738ZM32.75 26.453C32.75 26.8756 32.2583 27.1076 31.9321 26.839L29.3777 24.7353C29.1402 24.5397 29.1341 24.178 29.3648 23.9745L31.9192 21.7206C32.242 21.4357 32.75 21.6649 32.75 22.0955V26.453Z"
            fill="#191919"
          />
          <path d="M24.875 18.625H26V19.75H24.875V18.625Z" fill="#191919" />
          <path d="M24.875 16.375H26V17.5H24.875V16.375Z" fill="#191919" />
          <path d="M24.875 20.875H26V22H24.875V20.875Z" fill="#191919" />
          <path d="M24.875 23.125H26V24.25H24.875V23.125Z" fill="#191919" />
          <path d="M24.875 25.375H26V26.5H24.875V25.375Z" fill="#191919" />
          <path d="M24.875 27.625H26V28.75H24.875V27.625Z" fill="#191919" />
          <path d="M24.875 29.875H26V31H24.875V29.875Z" fill="#191919" />
          <path
            d="M25.4375 14.125C26.9 14.125 28.3625 14.9125 29.4875 16.2625L28.25 17.5H31.625V14.125L30.2751 15.475C28.9251 13.9 27.2375 13 25.4375 13C23.3 13 21.3875 14.125 19.925 16.2625L20.825 16.9375C22.0625 15.1375 23.6375 14.125 25.4375 14.125Z"
            fill="#191919"
          />
          <defs>
            <filter
              id="filter0_d_11_9247"
              x="0.6"
              y="0.6"
              width="50.8"
              height="50.8"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="5.2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_11_9247"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_11_9247"
                result="shape"
              />
            </filter>
          </defs>
        </svg>

        <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" />
      </div>

      {/* Rotate Left Button */}
      <div className="absolute -left-[5rem] rotate-[270deg]">
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-[180deg]"
          onClick={() => {
            handleTileEdit("flipY");
          }}
        >
          <g filter="url(#filter0_d_11_9247)">
            <circle cx="26" cy="22" r="15" fill="white" />
            <circle
              cx="26"
              cy="22"
              r="14.75"
              stroke="#898989"
              strokeWidth="0.5"
            />
          </g>
          <path
            d="M17 28.8075C17 29.2314 17.4944 29.463 17.8201 29.1916L23.2844 24.638C23.5258 24.4368 23.524 24.0654 23.2806 23.8666L17.8163 19.4041C17.4897 19.1374 17 19.3698 17 19.7914V28.8075Z"
            fill="#191919"
          />
          <path
            d="M27.5822 23.9738C27.3443 24.1761 27.3479 24.5446 27.5898 24.7421L33.0587 29.2084C33.3853 29.4751 33.875 29.2427 33.875 28.8211V19.7062C33.875 19.28 33.3759 19.0492 33.0512 19.3253L27.5822 23.9738ZM32.75 26.453C32.75 26.8756 32.2583 27.1076 31.9321 26.839L29.3777 24.7353C29.1402 24.5397 29.1341 24.178 29.3648 23.9745L31.9192 21.7206C32.242 21.4357 32.75 21.6649 32.75 22.0955V26.453Z"
            fill="#191919"
          />
          <path d="M24.875 18.625H26V19.75H24.875V18.625Z" fill="#191919" />
          <path d="M24.875 16.375H26V17.5H24.875V16.375Z" fill="#191919" />
          <path d="M24.875 20.875H26V22H24.875V20.875Z" fill="#191919" />
          <path d="M24.875 23.125H26V24.25H24.875V23.125Z" fill="#191919" />
          <path d="M24.875 25.375H26V26.5H24.875V25.375Z" fill="#191919" />
          <path d="M24.875 27.625H26V28.75H24.875V27.625Z" fill="#191919" />
          <path d="M24.875 29.875H26V31H24.875V29.875Z" fill="#191919" />
          <path
            d="M25.4375 14.125C26.9 14.125 28.3625 14.9125 29.4875 16.2625L28.25 17.5H31.625V14.125L30.2751 15.475C28.9251 13.9 27.2375 13 25.4375 13C23.3 13 21.3875 14.125 19.925 16.2625L20.825 16.9375C22.0625 15.1375 23.6375 14.125 25.4375 14.125Z"
            fill="#191919"
          />
          <defs>
            <filter
              id="filter0_d_11_9247"
              x="0.6"
              y="0.6"
              width="50.8"
              height="50.8"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="5.2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_11_9247"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_11_9247"
                result="shape"
              />
            </filter>
          </defs>
        </svg>

        <div className="w-1 h-10 top-10 border-l-2 border-[#7a7a7a] border-dashed absolute left-1/2" />
      </div>
      <div
        className={`w-[${boxSize}px] h-[${boxSize}px] border-2 border-black`}
        style={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
        }}
      ></div>
    </div>
  );
};

export default TileEditComponent;
