import React from 'react'
import SearchIcon from '../../assets/icons/SearchIcon'

export default function SearchBar({value, onChange, placeholder}) {
  return (
    <div>
        <div className="form-inline h-[40px]   px-2 w-full flex gap-2 items-center rounded-xl bg-white shadow-sm">
        <SearchIcon className=" text-[#E31F1F] text-2xl " />
        <input
          style={{ border: "none" }}
          className=" rounded-2xl text-base font-normal text-placeholder_text placeholder:text-[14px] pl-1 w-full outline-none border-2 border-gray-800 placeholder:text-[#849098]  text-[#849098]"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
