import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"; // icons from font awesomw website
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // link to other route without refresh the page

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  // we wanted to keep the search query url updated on changing input valu and vice versa
  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  // and we want to change the input value if we chnage the query and keep other query params 
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  return (
    <header className="bg-green-100 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold lg:text-2xl sm:text-xl flex flex-wrap">
            <span className="text-green-500">Dream</span>
            <span className="text-green-700">State</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-green-50 p-3 rounded-full flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-green-600" />
          </button>
        </form>
        <ul className="sm:flex gap-8 items-center">
          <Link to="/">
            <li className="hidden font-bold sm:inline text-green-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden font-bold sm:inline text-green-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-9 w-9 object-cover"
                src={currentUser.avatar}
                alt="profile_image"
              />
            ) : (
              <li className="text-green-700 hover:underline">SignIn</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
