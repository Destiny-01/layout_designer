import Image from 'next/image';
import Logo from '@/public/assets/logo.png';
import LogoFull from '@/public/assets/logoFull.png';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="py-4 px-7 fixed top-0 z-50 flex items-center justify-between w-full h-[10vh] bg-white">
      <Image src={Logo} className="flex md:hidden" priority alt="Logo" />
      <Image src={LogoFull} className="md:flex hidden" priority alt="Logo" />

      <div className="border border-primary rounded-full w-1/4 h-full hidden md:flex">
        <div className="w-1/2 h-full rounded-full p-1 shadow-inner bg-gradient-to-br from-[#3C5F58] to-[#97AF7A]">
          <div className="w-full h-full rounded-full bg-[#303825] flex items-center justify-center">
            <p className="text-xs font-semibold text-white">cm</p>
          </div>
        </div>
        <div className="w-1/2 h-full rounded-full p-1">
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <p className="text-xs font-semibold text-black">in</p>
          </div>
        </div>
      </div>

      <h2 className="font-mermaid font-bold text-xl">
        <span className="text-black">Layout</span>{' '}
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

