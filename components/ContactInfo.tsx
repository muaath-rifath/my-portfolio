import { FaAddressCard, FaPhoneAlt } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="relative flex flex-col justify-center p-6 lg:items-center lg:mt-0 rounded-xl lg:rounded-r-none lg:border-r-0 pt-10 lg:py-24 border dark:border-gray-700 border-gray-200 lg:w-1/2 group/contact-item group-hover:border-[#006b42] dark:group-hover:border-[#8fffaa]/50 transition-all duration-300 dark:bg-black/40 bg-white/70 backdrop-blur-sm">
      {/* Circuit trace decorations */}
      <div className="absolute top-0 right-0 w-[40%] h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover/contact-item:opacity-100 transition-all duration-500"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[1px] dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover/contact-item:opacity-100 transition-all duration-500"></div>
      <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full dark:bg-[#8fffaa]/30 bg-[#006b42]/30 opacity-0 group-hover/contact-item:opacity-100 transition-all duration-500"></div>
      
      <span className="p-4 inline-block w-full">
        <h2 className="text-3xl text-center font-mono dark:text-white text-[#006b42] font-bold relative">
          Contact
          <span className="absolute left-0 right-0 bottom-0 mx-auto w-16 h-[2px] dark:bg-[#8fffaa]/50 bg-[#006b42]/50"></span>
        </h2>
      </span>
      
      <div className="flex flex-col justify-center space-y-6 p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center flex-wrap gap-4 group/item relative">
          <span className="flex items-center gap-2 font-mono">
            <div className="flex items-center justify-center h-8 w-8 rounded-full dark:bg-[#8fffaa]/10 bg-[#006b42]/10">
              <MdAttachEmail className="text-lg dark:text-[#8fffaa] text-[#006b42]" />
            </div>
            <span className="dark:text-[#8fffaa] text-[#006b42] font-medium">
              Email:
            </span>
          </span>
          <Link 
            href="mailto:contact@muaathrifath.tech" 
            target="_blank" 
            type="email" 
            className="flex items-center gap-2 flex-nowrap dark:hover:text-[#8fffaa] hover:text-[#006b42] transition-colors duration-300"
          >
            contact@muaathrifath.tech
            <FaExternalLinkAlt className="w-3 h-3" />
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center flex-wrap gap-4 group/item relative">
          <span className="flex items-center gap-2 font-mono">
            <div className="flex items-center justify-center h-8 w-8 rounded-full dark:bg-[#8fffaa]/10 bg-[#006b42]/10">
              <FaPhoneAlt className="text-lg dark:text-[#8fffaa] text-[#006b42]" />
            </div>
            <span className="dark:text-[#8fffaa] text-[#006b42] font-medium">
              Phone:
            </span>
          </span>
          <Link 
            href="tel:+918883735079" 
            target="_blank" 
            type="tel" 
            className="flex items-center gap-2 flex-nowrap dark:hover:text-[#8fffaa] hover:text-[#006b42] transition-colors duration-300"
          >
            +91 88837 35079
            <FaExternalLinkAlt className="w-3 h-3" />
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center flex-wrap gap-4 group/item relative">
          <span className="flex items-center gap-2 font-mono">
            <div className="flex items-center justify-center h-8 w-8 rounded-full dark:bg-[#8fffaa]/10 bg-[#006b42]/10">
              <FaAddressCard className="text-lg dark:text-[#8fffaa] text-[#006b42]" />
            </div>
            <span className="dark:text-[#8fffaa] text-[#006b42] font-medium">
              Address:
            </span>
          </span>
          <Link 
            href="" 
            target="_blank" 
            className="flex items-center gap-2 flex-nowrap dark:hover:text-[#8fffaa] hover:text-[#006b42] transition-colors duration-300"
          >
            Avadi, Chennai, 600-055.
            <FaExternalLinkAlt className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
