import { useState } from "react";

const GitHub = () => {
  // State to store the GitHub username and user data
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch GitHub user data
  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (err) {
      setUserData(null);
      setError(err.message);
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData();
  };

  return (
    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          GitHub User Finder
        </h1>

        {/* Search form */}
        <form onSubmit={handleSubmit} className="flex items-center mb-4 space-x-3">
          <input
            className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub Username"
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg"
            type="submit"
          >
            Search
          </button>
        </form>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}

        {/* Displaying the user data */}
        {userData && (
          <div className="mt-6 flex flex-col items-center">
            <img
              src={userData.avatar_url}
              alt={userData.login}
              className="w-24 h-24 rounded-full shadow-md mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {userData.login}
            </h2>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 font-medium mb-4"
            >
              View GitHub Profile
            </a>

            {/* User Statistics */}
            <div className="grid grid-cols-3 gap-3 w-full">
              <div className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center">
                <h3 className="text-sm font-bold text-gray-700">Followers</h3>
                <p className="text-lg font-semibold text-yellow-500">
                  {userData.followers}
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center">
                <h3 className="text-sm font-bold text-gray-700">Following</h3>
                <p className="text-lg font-semibold text-yellow-500">
                  {userData.following}
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center">
                <h3 className="text-sm font-bold text-gray-700">Repos</h3>
                <p className="text-lg font-semibold text-yellow-500">
                  {userData.public_repos}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHub;
