import React from "react";
import { Link } from "react-router-dom";

export default function Info() {
  return (
    <div className="text-center text-gray-500 p-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div className="flex flex-col gap-2 font-medium text-sm">
        <h3 className="text-base uppercase font-bold">Please read this advice</h3>
        <p>This is an experimental app project and is <strong>not</strong> intended for <strong>safe public use</strong>.</p>
        <p>Do not provide sensitive personal information as there are <strong>no guarantees</strong> in this regard.</p>
        <p>Participants make conscious use of this service generally for <strong>testing purposes</strong>, assuming the risks that it entails.</p>
        <p>This is basically like a fair project, a challenge, completely <strong>personal</strong> for the mere fact of <strong>learning</strong> while enjoying the process.</p>
        <p>If you want to know more information about this little mess, its development and developer, curiosities among other details, I encourage you to visit <Link to="/about" className="text-blue-400 hover:underline focus:underline hover:text-blue-500 focus:text-blue-500 transition">About</Link>.</p>
      </div>
    </div>
  );
}
