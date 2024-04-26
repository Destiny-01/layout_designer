import Tile from '@/public/assets/tile.svg';
import useTileStore from '@/store';
import Image from 'next/image';
import { useState } from 'react';

type Props = {};

const TileCategory = (props: Props) => {
  const category = [
    'Hanoi',
    'Cadaques',
    'Reykjavik',
    'Onda',
    'Amphora',
    'Penang',
    'Madera',
    'Malfa',
    'Posidonia',
    'Rio',
  ];
  const [showSubCategory, setShowSubCategory] = useState<boolean>(false);

  const setTileName = useTileStore((state) => state.setTileName);
  return (
    <div className="space-y-3 py-3">
      {category.map((item) => {
        return (
          <div key={item}>
            <button
              className="flex items-center space-x-3"
              onClick={() => {
                setShowSubCategory(!showSubCategory);
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M7.7175 4.96997L4.77167 7.1808V10.4533C4.77167 11.0133 5.44833 11.2933 5.845 10.8966L8.86667 7.87497C9.35083 7.3908 9.35083 6.6033 8.86667 6.11914L7.7175 4.96997Z"
                  fill="#292D32"
                />
                <path
                  d="M4.77167 3.54662V7.18079L7.7175 4.96996L5.845 3.09746C5.44833 2.70662 4.77167 2.98662 4.77167 3.54662Z"
                  fill="#292D32"
                />
              </svg>
              <p>{item}</p>
            </button>
            {showSubCategory && item === 'Hanoi' && (
              <div className="pl-7">
                <button
                  onClick={() => {
                    setTileName('Hanoi');
                  }}
                >
                  <Image src={Tile} className="w-10 h-10" alt="Tile" />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TileCategory;

