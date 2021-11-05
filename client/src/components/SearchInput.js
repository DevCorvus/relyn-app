import React, { useState } from "react";
import { capitalizeText } from "../utils/general";
import Label from "./Label";

export default function SearchInput({ search, setSearch, suffix, children }) {
  const [inputFocus, setInputFocus] = useState(false);
  return (
    <div>
      <Label htmlFor={`search${capitalizeText(suffix)}`}>
        Search
      </Label>
      <div className={`flex items-center border-2 ${inputFocus ? "border-blue-400" : "border-gray-200"} rounded-lg transition duration-200`}>
        <input
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          className="w-full text-lg p-2 rounded-lg outline-none"
          type="text"
          name={`search${capitalizeText(suffix)}`}
          id={`search${capitalizeText(suffix)}`}
          value={search}
          placeholder={children}
        />
        <label htmlFor={`search${capitalizeText(suffix)}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`mr-2 h-8 w-8 ${inputFocus ? "text-blue-400" : "text-gray-200"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </label>
      </div>
    </div>
  );
}
