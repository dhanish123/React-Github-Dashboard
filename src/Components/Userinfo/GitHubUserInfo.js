// GitHubUserInfo.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsername,
  setUserData,
  setFollowers,
  setIsLoading,
  setLanguageData,
  setCurrentPage,
} from "../Redux Store/userSlice"; // Import actions
import { FaUser } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { GoProjectSymlink } from "react-icons/go";
import LanguagePieChart from "../Chart/LanguagePieChart";
import "../../Components/Userinfo/GitHubUserInfo.scss";

const GitHubUserInfo = () => {
  const dispatch = useDispatch();
  const {
    username,
    userData,
    followers,
    isLoading,
    currentPage,
    followersPerPage,
  } = useSelector((state) => state.user);

 
  // Step 1: Create a state variable for search for follower
  const [searchInput, setSearchInput] = useState("");
  // Step 2: Add an input field for searching followers
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

   // Step 3: Filter followers based on search input
   const filteredFollowers = Array.isArray(followers) ? followers.filter((follower) => {
    const followerUsername = follower.login.toLowerCase();
    return followerUsername.includes(searchInput.toLowerCase());
  }) : [];

  // using the dispatch function provided by Redux to dispatch an action.
  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value)); // Dispatch the action to update the username
  };

  // Add this function to fetch language data
  const fetchLanguageData = async () => {
    if (!username) return;

    // Set the authorization headers
    const headers = {
      Authorization: `token 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`,
    };

    try {
      const userDataResponse = await fetch(
        `https://api.github.com/users/${username}`,
        {
          headers,
        }
      );
      const userData = await userDataResponse.json();
      console.log("User Data:", userData); // Add this line

      dispatch(setUserData(userData));

      // Fetch user followers
      const followersResponse = await fetch(
        `https://api.github.com/users/${username}/followers`,
        {
          headers,
        }
      );
      const followersData = await followersResponse.json();
      dispatch(setFollowers(followersData));

      // Fetch user repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos`,
        {
          headers,
        }
      );
      const reposData = await reposResponse.json();

      // Extract languages from repositories
      const languages = {};          
      reposData.forEach((repo) => {
        if (repo.language) {
          if (languages[repo.language]) {
            languages[repo.language]++;
          } else {
            languages[repo.language] = 1;
          }
        }
      });

      // Convert languages object to FusionCharts data format
      const languageData = Object.keys(languages).map((language) => ({
        label: language,
        value: languages[language],
      }));

      // Dispatch action to update Redux store with language data
      dispatch(setLanguageData(languageData));
    } catch (error) {
      console.error("Error fetching language data:", error);
    }
  };

  useEffect(() => {
    fetchLanguageData();
  }, [username]);

  // Calculate the range of followers to display based on current page
  const startIndex = (currentPage - 1) * followersPerPage;
  const endIndex = startIndex + followersPerPage;

  // Check if there are more than 2 followers to show pagination
  const showPagination = followers.length > 4;

  return (
    <div className="git">
      {/* Searchbar */}

      <h1 className="git__head">GitHub User Search</h1>
      <input
        className="git__head-searchbox"
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={handleUsernameChange}
      />

      {/* Separate cards for followers, following, & repositories */}

      <div className="allcards">
        <div className="allcards__card">
          <FaUser />
          <h2 className="allcards__cardhead">Followers</h2>
          <p className="allcards__cardnum">{userData && userData.followers}</p>
        </div>
        <div className="allcards__card">
          <PiUsersThreeFill />
          <h2 className="allcards__cardhead">Following</h2>
          <p className="allcards__cardnum">{userData && userData.following}</p>
        </div>
        <div className="allcards__card">
          <GoProjectSymlink />
          <h2 className="allcards__cardhead">Repositories</h2>
          <p className="allcards__cardnum">
            {userData && userData.public_repos}
          </p>
        </div>
      </div>

      {/* user details & userfollower table */}

      <div className="section3">
        {userData && (
          <div className="section3__userinfo">
            <h2 className="section3__userhead">User</h2>
            <div className="section3__carduser">
              <img
                src={userData.avatar_url}
                alt={`${userData.login}'s avatar`}
              />
              <p className="section3__username">Name: {userData.name}</p>
              <p className="section3__userabout">
                About: {userData.bio || "Not Found"}
              </p>
              <p className="section3__userloc">
                Location: {userData.location || "Not Found"}
              </p>
            </div>
          </div>
        )}

        {isLoading && <p>Loading...</p>}

        <div className="section3__followertable">
          {filteredFollowers.length > 0 && (
            <div className="section3__userfollower">
              <div className="section3__userfollower__tablehead">
              <h2 className="section3__table">Followers</h2>
              <input
                className="section3__userfollower__tablehead-searchbox"
                type="text"
                placeholder="Search followers"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              </div>
              <div className="section3__table-container">
                <table>
                  <thead>
                    <tr className="section3__tablehead">
                      <th>Avatar</th>
                      <th>Username</th>
                      <th>Profile URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFollowers
                      .slice(startIndex, endIndex)
                      .map((follower) => (
                        <tr key={follower.id}>
                          <td>
                            <img
                              src={follower.avatar_url}
                              alt={`${follower.login}'s avatar`}
                              width="50"
                            />
                          </td>
                          <td>{follower.login}</td>
                          <td>
                            <a
                              href={follower.html_url}
                              target="_blank"
                              className="section3__tableurl"
                              rel="noopener noreferrer"
                            >
                              click here
                              {/* {follower.html_url} */}
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Pagination Controls */}
          {/* {showPagination && (
            <div className="pagination">
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    dispatch(setCurrentPage(currentPage - 1));
                  }
                }}
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (endIndex < followers.length) {
                    dispatch(setCurrentPage(currentPage + 1));
                  }
                }}
              >
                Next
              </button>
            </div>
          )} */}
                 {showPagination && (
                <div className="pagination">
                  <button
                    onClick={() => {
                      if (currentPage > 1) {
                        dispatch(setCurrentPage(currentPage - 1));
                      }
                    }}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>Page {currentPage}</span>
                  <button
                    onClick={() => {
                      if (endIndex < followers.length) {
                        dispatch(setCurrentPage(currentPage + 1));
                      }
                    }}
                    disabled={
                      currentPage === Math.ceil(followers.length / followersPerPage)
                    }
                  >
                    Next
                  </button>
                </div>
              )}
        </div>
      </div>
      <div className="chart">
        <LanguagePieChart />
      </div>
    </div>
  );
};

export default GitHubUserInfo;
