// GitHubUserInfo.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsername,
  setUserData,
  setFollowers,
  setIsLoading,
  setLanguageData,
} from "../Redux Store/userSlice"; // Import actions
import { FaUser } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { GoProjectSymlink } from "react-icons/go";
import LanguagePieChart from "../Chart/LanguagePieChart";
import "./GitHubUserInfo.scss";

const GitHubUserInfo = () => {
  const dispatch = useDispatch();
  // useSelector എന്ന ഫങ്ക്‌ഷൻ Redux-നും React-നും അനുസരിച്ച് സ്റ്റേറ്റിൽ നിന്നുള്ള ഡേറ്റയെ എടുത്തുപയോഗിക്കുന്നു.
  const { username, userData, followers, isLoading, languageData } =
    useSelector((state) => state.user);

  // using the dispatch function provided by Redux to dispatch an action.
//   Redux സ്റ്റോർസിൽ ഉപയോക്താവിന്റെ യൂസർനെയിമുകൾ അപ്ഡേറ്റുചെയ്യുന്നു. യൂസർ ഇൻപുട്ടിൽ നിന്നും നൽകുന്ന നിനയാണ് അത്.
  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value)); // Dispatch the action to update the username
  };

  // Add this function to fetch language data
  const fetchLanguageData = async () => {
    if (!username) return;
    // ഉപയോക്താവിന്റെ പേര് ശൂന്യമായാൽ, ഫംഗ്ഷൻ അത് പരിശോധിക്കുന്നത് അസാധുവാകുകയുള്ളു, പേരില്ലെങ്കിൽ API അനുഭവപ്പെടാൻ അവശ്യമില്ല.


    // എല്ലാ പ്രവര്ത്തനങ്ങളും try ഇവിടെ നിർവ്വചിച്ച് എടുക്കും.
    try {
        // ഈ ഭാഗം, ഉപയോക്താവിന്റെ GitHub API ഡാറ്റയെ ലഭിക്കുന്നു. അത് userDataResponse എന്ന വേരിയബിൽ സ്ഥാനാർഥിക്കുകുന്നു.
      const userDataResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
    //   അത് API പ്രതികരണത്തെ JSON ഫോർമാറ്റിലേക്ക് മാറ്റുന്നു, ഉപയോക്താവിന്റെ ഡാറ്റ ആകെ വരുന്നു.
      const userData = await userDataResponse.json();
      console.log("User Data:", userData); // Add this line
    //   അത് Redux എക്ഷൻ അപ്ഡേറ്റുചെയ്യാൻ ഒരു Redux സ്റ്റോർ ഉപയോഗിച്ച് ഉപയോക്താവിന്റെ ഡാറ്റ അപ്ഡേറ്റുചെയ്യുന്നു.
      dispatch(setUserData(userData));

      // Fetch user followers
      const followersResponse = await fetch(
        `https://api.github.com/users/${username}/followers`
      );
      const followersData = await followersResponse.json();
      dispatch(setFollowers(followersData));

      // Fetch user repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
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
    //   എല്ലാ പ്രവര്ത്തനങ്ങൾക്കും ഒരു പരിശോധന പ്രതികരണമുണ്ടാകുന്നതിനാൽ, അവ അപ്പുറമ്പുള്ള പ്രവര്ത്തനങ്ങൾ ചെയ്യുന്നു.
    //   പരിശോധന പ്രതികരണത്തിൽ എറ്റെന്തുകൊണ്ട് പ്രശ്നം ഉണ്ടായിയാൽ, പിഴവുകൾ കുറയ്ക്കാൻ പിഴവുകൾ പ്രിന്റ് ചെയ്യുന്നു.
    } catch (error) {
      console.error("Error fetching language data:", error);
    }
  };
//   ഇത് username മാറ്റിവന്നാൽ നിലവിലുള്ള fetchLanguageData ഫംഗ്ഷൻ അപ്ഡേറ്റുചെയ്യും എന്നതാണ്.
  useEffect(() => {
    fetchLanguageData();
  }, [username]);

  return (
    // JSX for your component
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
              {/* <p className="section3__username">Name: {userData?.name || "Not Found"}</p> */}
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
          {followers.length > 0 && (
            <div className="section3__userfollower">
              <h2 className="section3__table">Followers</h2>
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
                    {followers.map((follower) => (
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
        </div>
      </div>
      <div className="chart">
        <LanguagePieChart />
      </div>
    </div>
  );
};

export default GitHubUserInfo;
