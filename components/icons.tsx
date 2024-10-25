import { animated, config, useSpring } from "@react-spring/web";
import { useHover } from "@use-gesture/react";
import React from "react";

const icons = {
  Delete() {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="1">
          <path
            d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.08301 4.14169L7.26634 3.05002C7.39967 2.25835 7.49967 1.66669 8.90801 1.66669H11.0913C12.4997 1.66669 12.608 2.29169 12.733 3.05835L12.9163 4.14169"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.6748 18.3334H7.32484C4.99984 18.3334 4.92484 17.3167 4.83317 16.0083L4.2915 7.61668"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M15.7084 7.61668L15.1667 16.0083" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.6084 13.75H11.3834" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.6833 10.4167H12.0833" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.91699 10.4167H8.60866" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  },
  Refresh() {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="1">
          <path
            d="M15.0087 16.6584C13.617 17.7084 11.8753 18.3334 10.0003 18.3334C5.40032 18.3334 2.59199 13.7 2.59199 13.7M2.59199 13.7H6.35866M2.59199 13.7V17.8667M18.3337 10C18.3337 11.5167 17.9253 12.9417 17.217 14.1667M5.02533 3.30835C6.40866 2.27502 8.12532 1.66669 10.0003 1.66669C15.5587 1.66669 18.3337 6.30002 18.3337 6.30002M18.3337 6.30002V2.13335M18.3337 6.30002H14.6337M1.66699 10C1.66699 8.48335 2.06699 7.05835 2.77533 5.83335"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    );
  },
  Cart() {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.16661 9.31332C3.07327 10.4 3.93327 11.3333 5.0266 11.3333H12.1266C13.0866 11.3333 13.9266 10.5467 13.9999 9.59333L14.3599 4.59333C14.4399 3.48666 13.5999 2.58665 12.4866 2.58665H3.87995"
          stroke="#CC9C53"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.33374 1.3333H2.49374C3.21374 1.3333 3.78041 1.9533 3.72041 2.66663L3.38708 6.69995"
          stroke="#CC9C53"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.8333 14.6667C11.2936 14.6667 11.6667 14.2936 11.6667 13.8333C11.6667 13.3731 11.2936 13 10.8333 13C10.3731 13 10 13.3731 10 13.8333C10 14.2936 10.3731 14.6667 10.8333 14.6667Z"
          stroke="#CC9C53"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.49959 14.6667C5.95983 14.6667 6.33293 14.2936 6.33293 13.8333C6.33293 13.3731 5.95983 13 5.49959 13C5.03936 13 4.66626 13.3731 4.66626 13.8333C4.66626 14.2936 5.03936 14.6667 5.49959 14.6667Z"
          stroke="#CC9C53"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6 5.3333H14" stroke="#CC9C53" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  },
  Rotate() {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.22021 8.88663C2.22021 12.08 4.80688 14.6666 8.00022 14.6666C11.1935 14.6666 13.7802 12.08 13.7802 8.88663C13.7802 7.69996 13.4202 6.59329 12.8069 5.67329M9.92688 3.38663C9.34688 3.21329 8.70688 3.09996 8.00022 3.09996C5.86021 3.09996 3.98688 4.26663 2.99355 5.99329"
          stroke="#CC9C53"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10.0866 3.54669L8.15991 1.33336" stroke="#CC9C53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.0868 3.54668L7.84009 5.18668" stroke="#CC9C53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  },
  Save() {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.6671 3.40665V10.98C14.6671 11.9467 13.9737 12.3533 13.1271 11.8867L10.6671 10.5133V5.99332C10.6671 4.85332 9.73375 3.92 8.59375 3.92H5.33374V3.40665C5.33374 2.26665 6.26706 1.33333 7.40706 1.33333H12.5938C13.7338 1.33333 14.6671 2.26665 14.6671 3.40665Z"
          stroke="#CC9C53"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.33374 13.5667C1.33374 14.5334 2.02707 14.9401 2.87374 14.4734L5.49373 13.0134C5.77373 12.8601 6.22708 12.8601 6.50708 13.0134L9.12708 14.4734C9.97374 14.9401 10.6671 14.5334 10.6671 13.5667V5.99338C10.6671 4.85338 9.73375 3.92006 8.59375 3.92006H3.40706C2.26706 3.92006 1.33374 4.85338 1.33374 5.99338V10.3401"
          stroke="#CC9C53"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  Random() {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.4466 12.4467L13.9266 11.7067V9.85336M9.47991 6.52002L7.99991 7.26003L9.47991 6.52002ZM7.99991 7.26003L6.51991 6.52002L7.99991 7.26003ZM7.99991 7.26003V9.11336V7.26003ZM13.9266 4.29336L12.4466 5.03336L13.9266 4.29336ZM13.9266 4.29336L12.4466 3.55336L13.9266 4.29336ZM13.9266 4.29336V6.14669V4.29336ZM9.47991 2.07336L7.99991 1.33336L6.51991 2.07336H9.47991ZM2.07324 4.29336L3.55324 3.55336L2.07324 4.29336ZM2.07324 4.29336L3.55324 5.03336L2.07324 4.29336ZM2.07324 4.29336V6.14669V4.29336ZM7.99991 14.6667L6.51991 13.9267L7.99991 14.6667ZM7.99991 14.6667L9.47991 13.9267L7.99991 14.6667ZM7.99991 14.6667V12.8134V14.6667ZM3.55324 12.4467L2.07324 11.7067V9.85336L3.55324 12.4467Z"
          stroke="#CC9C53"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  ZoomOut({ zoom }: { zoom: number }) {
    return (
      <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="1">
          <circle cx="17.8684" cy="17" r="17" fill={zoom <= 0.1 ? "#FDECD1" : "#FFE3B7"} />
          <path d="M16.2036 16.936H19.1677" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M17.686 11.1856C20.7983 11.1856 23.3178 13.7051 23.3178 16.8174C23.3178 19.9297 20.7983 22.4492 17.686 22.4492C14.5737 22.4492 12.0542 19.9297 12.0542 16.8174C12.0542 14.624 13.3051 12.727 15.1369 11.7962"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M23.9115 23.042L22.7258 21.8564" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  },
  ZoomIn({ zoom }: { zoom: number }) {
    return (
      <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="1">
          <ellipse cx="16.9342" cy="16.5" rx="16.9342" ry="16.5" fill={zoom >= 3 ? "#FDECD1" : "#FFE3B7"} />
          <path d="M15.4333 15.9092H18.386" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.9099 17.3855V14.4329" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M16.7929 10.1811C19.8931 10.1811 22.4029 12.6909 22.4029 15.7911C22.4029 18.8914 19.8931 21.4011 16.7929 21.4011C13.6926 21.4011 11.1829 18.8914 11.1829 15.7911C11.1829 13.6062 12.4289 11.7165 14.2536 10.7894"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M22.9918 21.9916L21.8108 20.8105" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  },

  Undo() {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="1">
          <path d="M9.14986 6.92499H3.44153" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M5.94153 15.2583H12.6082C14.9082 15.2583 16.7749 13.3917 16.7749 11.0917C16.7749 8.79165 14.9082 6.92499 12.6082 6.92499"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M5.35831 9.00834L3.22498 6.875L5.35831 4.74167" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  },
  Redo() {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="1">
          <path d="M10.8501 6.92499H16.5584" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M14.0584 15.2583H7.39176C5.09176 15.2583 3.2251 13.3917 3.2251 11.0917C3.2251 8.79165 5.09176 6.92499 7.39176 6.92499"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M14.6414 9.00834L16.7747 6.875L14.6414 4.74167" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  },

  DownPointer({ showSeeAllTile }: { showSeeAllTile: boolean }) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-0.5 transition-all"
        style={showSeeAllTile ? { rotate: "-180deg" } : { rotate: "0deg" }}
      >
        <path
          d="M12.0078 9.63749L10.0428 11.6025C9.4653 12.18 8.5203 12.18 7.9428 11.6025L3.0603 6.71249"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.9402 6.71249L14.1602 7.49249"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },

  SmallDownPointer({ tilt }: { tilt: boolean }) {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-0.5 transition-all"
        style={tilt ? { rotate: "90deg" } : { rotate: "0deg" }}
      >
        <path
          opacity="0.4"
          d="M7.7175 4.96997L4.77167 7.1808V10.4533C4.77167 11.0133 5.44833 11.2933 5.845 10.8966L8.86667 7.87497C9.35083 7.3908 9.35083 6.6033 8.86667 6.11914L7.7175 4.96997Z"
          fill="#292D32"
        />
        <path d="M4.77167 3.54662V7.18079L7.7175 4.96996L5.845 3.09746C5.44833 2.70662 4.77167 2.98662 4.77167 3.54662Z" fill="#292D32" />
      </svg>
    );
  },

  Flip({ deg }: any) {
    const [styles, api] = useSpring(() => ({
      transform: `translateY(0px) scale(1) rotate(${deg}deg)`,
      config: config.molasses,
    }));

    const bind = useHover(({ hovering }) => {
      hovering
        ? api.start({ transform: `translateY(1px) scale(1.08) rotate(${deg}deg)` })
        : api.start({ transform: `translateY(0px) scale(1) rotate(${deg}deg)` });
    });
    return (
      <animated.svg
        {...bind()}
        style={styles}
        className="shadow-[0_-3px_14px_rgba(0,0,0,0.3)] rounded-full h-9 w-9"
        viewBox="-20.64 -20.64 89.28 89.28"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        transform={``}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0">
          <rect x="-20.64" y="-20.64" width="89.28" height="89.28" rx="44.64" fill="#ffffff" strokeWidth="0"></rect>
        </g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <title>flip-solid</title>{" "}
          <g id="Layer_2" data-name="Layer 2">
            {" "}
            <g id="invisible_box" data-name="invisible box">
              {" "}
              <rect width="48" height="48" fill="none"></rect>{" "}
            </g>{" "}
            <g id="icons_Q2" data-name="icons Q2">
              {" "}
              <g>
                {" "}
                <path d="M24,4a2,2,0,0,0-2,2V42a2,2,0,0,0,4,0V6A2,2,0,0,0,24,4Z"></path>{" "}
                <path d="M5.8,9.3A1.3,1.3,0,0,0,5,9a1,1,0,0,0-1,1V38a1,1,0,0,0,1,1,1.3,1.3,0,0,0,.8-.3l13.9-14a1,1,0,0,0,0-1.4ZM8,30.8V17.2L14.8,24Z"></path>{" "}
                <path d="M42.2,9.3l-13.9,14a1,1,0,0,0,0,1.4l13.9,14A1.1,1.1,0,0,0,44,38V10A1.1,1.1,0,0,0,42.2,9.3Z"></path>{" "}
              </g>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </animated.svg>
    );
  },
  ColorPallet() {
    const [styles, api] = useSpring(() => ({
      transform: `translateY(0px) scale(1)`,
      config: config.molasses,
    }));

    const bind = useHover(({ hovering }) => {
      hovering ? api.start({ transform: `translateY(1px) scale(1.08)` }) : api.start({ transform: `translateY(0px) scale(1)` });
    });
    return (
      <animated.svg
        {...bind()}
        style={styles}
        className="w-9 h-9 shadow-[0_-3px_14px_rgba(0,0,0,0.3)] rounded-full"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <circle cx="12" cy="31" r="15" fill="white" />
          <circle cx="26" cy="22" r="14.75" stroke="#898989" strokeWidth="0.5" />
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
      </animated.svg>
    );
  },

  CancelButton() {
    const [styles, api] = useSpring(() => ({
      transform: `translateY(0px) scale(1)`,
      config: config.molasses,
    }));

    const bind = useHover(({ hovering }) => {
      hovering ? api.start({ transform: `translateY(1px) scale(1.08)` }) : api.start({ transform: `translateY(0px) scale(1)` });
    });
    return (
      <animated.svg
        {...bind()}
        style={styles}
        fill="#000000"
        className="shadow-[0_-3px_14px_rgba(0,0,0,0.3)] rounded-full h-9 w-9"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="-230.4 -230.4 972.80 972.80"
        xmlSpace="preserve"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0">
          <rect x="-230.4" y="-230.4" width="972.80" height="972.80" rx="486.4" fill="#ffffff" strokeWidth="0"></rect>
        </g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <g>
              {" "}
              <path d="M436.994,74.943c-99.834-99.833-262.285-99.833-362.119,0c-99.834,99.834-99.834,262.275,0,362.109 c49.917,49.917,115.493,74.881,181.059,74.881c65.566,0,131.142-24.964,181.059-74.881C485.359,388.692,512,324.393,512,255.997 C512,187.603,485.359,123.302,436.994,74.943z M421.908,421.966c-91.52,91.513-240.426,91.524-331.946,0 c-91.509-91.516-91.509-240.422,0-331.935c45.76-45.761,105.866-68.64,165.973-68.64c60.106,0,120.213,22.879,165.973,68.64 c44.332,44.331,68.754,103.271,68.754,165.966C490.662,318.693,466.24,377.632,421.908,421.966z"></path>{" "}
            </g>{" "}
          </g>{" "}
          <g>
            {" "}
            <g>
              {" "}
              <polygon points="271.024,255.996 376.648,150.375 361.561,135.289 255.937,240.908 150.318,135.289 135.232,150.375 240.851,255.994 142.775,354.065 157.862,369.153 255.937,271.081 361.686,376.83 376.773,361.743 "></polygon>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </animated.svg>
    );
  },

  Rotate2() {
    const [styles, api] = useSpring(() => ({
      transform: "translateY(0px) scale(1) rotate(130deg)",
      config: config.molasses,
    }));

    const bind = useHover(({ hovering }) => {
      hovering
        ? api.start({ transform: "translateY(1px) scale(1.08) rotate(140deg)" })
        : api.start({ transform: "translateY(0px) scale(1) rotate(130deg)" });
    });
    return (
      <animated.svg
        {...bind()}
        style={styles}
        fill="#000000"
        height="36px"
        width="36px"
        className="shadow-[0_-3px_14px_rgba(0,0,0,0.3)] rounded-full"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="-215.44 -215.44 920.52 920.52"
        xmlSpace="preserve"
        // transform="matrix(-1, 0, 0, -1, 0, 0)"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)">
          <rect x="-156.69" y="-156.69" width="803.02" height="803.02" rx="401.51" fill="#ffffff" strokeWidth="0"></rect>
        </g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <path d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3 c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5 c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8 c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2 C414.856,432.511,548.256,314.811,460.656,132.911z"></path>{" "}
          </g>{" "}
        </g>
      </animated.svg>
    );
  },
};

export default icons;
