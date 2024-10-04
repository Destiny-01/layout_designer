"use client";

import Image from "next/image";
import Logo from "@/public/assets/logo.png";
import LogoFull from "@/public/assets/logoFull.svg";
import Link from "next/link";
import useTileStore from "@/store";
import { useEffect } from "react";

type Props = {};

const Navbar = (props: Props) => {
  const activeSize = useTileStore((state) => state.activeSize);
  const setActiveSize = useTileStore((state) => state.setActiveSize);
  const measurement = useTileStore((state) => state.measurement);
  const setMeasurement = useTileStore((state) => state.setMeasurement);
  const activeDimension = useTileStore(
    (state) => state.measurement
  ).activeDimension;

  useEffect(() => {
    setActiveSize(9);
  }, []);

  // useEffect(() => {
  //   handleDimension("cm");
  // }, [activeSize]);
  return (
    <div className="pt-4 lg:pt-6 lg:pb-6 px-7 lg:px-20 flex items-center justify-between w-full bg-white">
      <Link href={"/"} className="flex md:hidden">
        <Image src={Logo} priority alt="Logo" />
      </Link>

      <Link href={"/"} className="md:flex hidden ">
        <Image src={LogoFull} priority alt="Logo" />
      </Link>

      <h2 className="font-mermaid font-bold text-xl">
        <span className="text-black">Layout</span>{" "}
        <span className="text-gold">Designer</span>
      </h2>

      <div className="md:hidden">
        <svg
          width="5"
          height="21"
          viewBox="0 0 5 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2.5" cy="2.5" r="2.5" fill="#191919" />
          <circle cx="2.5" cy="10.5" r="2.5" fill="#191919" />
          <circle cx="2.5" cy="18.5" r="2.5" fill="#191919" />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
