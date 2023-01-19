import {HiMenuAlt4} from "react-icons/hi"
import {AiOutlineClose} from "react-icons/ai"
import { useState } from "react"
import logo from "../../images/logo.png"


const NavbarItem = ({title,classProps}) => {
  return (
    <div className={`mx-4 cursor-pointer ${classProps}`}>
          {title}
    </div>
  )
}

const Navbar = () => {
  const [ToggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="w-full flex md:justify-center justify-between p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
            <img src={logo} alt="Logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row 
                      justify-between items-center flex-initial">
           {
            ["Market","Exchange","Tutorials","Wallets"].map((item,index)=>(
              <NavbarItem key={"item"+index} title={item}  />
            ))
           }   
           <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
              Login
          </li> 
      </ul>
      {/* 
              mobile devices menu
      */}
          <div className="flex relative">
                {
                 ToggleMenu ? 
                 <AiOutlineClose fontSize={28}  className="text-white md:hidden cursor-pointer" 
                 onClick={()=> setToggleMenu(!ToggleMenu)} /> 
                 : 
                 <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" 
                 onClick={()=> setToggleMenu(!ToggleMenu)} />
                 }
                {
                  ToggleMenu && (
                    <ul className="z-10 fixed top-0 right-2 p-3 w-[70vw] h-screen 
                    shadow-2xl list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism 
                    text-white  animate-slide-in
                    ">
                        <li className="text-xl w-full my-2">
                          <AiOutlineClose className="text-white" onClick={() => setToggleMenu(false)} />
                          {
                              ["Market","Exchange","Tutorials","Wallets"].map((item,index)=>(
                                  <NavbarItem key={"item"+index} title={item} className="my-2 text-lg" />
                              )) 
                          }         
                        </li>
                    </ul>
                  )
                }
          </div>
    </nav>
  )
}

export default Navbar