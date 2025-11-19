import React, { useEffect, useState } from "react";
import Parse from "parse";
import Buttons from "../components/buttons/Buttons.jsx";
import BumpHeader from "../components/bump/BumpHeader.jsx";
import InterestGallery from "../components/interestGallery/InterestGallery.jsx";
import "../App.css";
import "./Pages.css";
import { useParams } from "react-router-dom";

export default function BumpSent() {
  const { otherUserId } = useParams();

  const CURRENT_USER_ID = "C6YoifVWmr"; //same currentuserid as profile page

  const [currentUser, setCurrentUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [bumpCreated, setBumpCreated] = useState(false);
  const [sharedInterests, setSharedInterests] = useState([]);

  useEffect(() => {
    async function fetchUsersAndCreateBump() {
      try {
        // get current user
        const userQuery = new Parse.Query("Users");
        userQuery.select("first_name", "last_name", "profile_pic");
        const currentUser = await userQuery.get(CURRENT_USER_ID);

        // get other user
        const otherUserQuery = new Parse.Query("Users");
        otherUserQuery.select("first_name", "last_name", "profile_pic");
        const otherUser = await otherUserQuery.get(otherUserId);

        // get interests for both users
        const interestQueryA = new Parse.Query("User_interests");
        interestQueryA.equalTo("user", currentUser);
        interestQueryA.include("interest");
        const interestsA = await interestQueryA.find();

        const interestQueryB = new Parse.Query("User_interests");
        interestQueryB.equalTo("user", otherUser);
        interestQueryB.include("interest");
        const interestsB = await interestQueryB.find();

        // get interest names for both users
        const namesA = interestsA
          .map((e) => e.get("interest")?.get("interest_name"))
          .filter(Boolean);
        const namesB = interestsB
          .map((e) => e.get("interest")?.get("interest_name"))
          .filter(Boolean);

        console.log("Current user interests:", namesA);
        console.log("Other user interests:", namesB);

        // shared interests
        const shared = namesA.filter((name) => namesB.includes(name));

        console.log("Shared interests:", shared);

        setSharedInterests(shared);

        const youProfilePic = currentUser.get("profile_pic");
        const otherProfilePic = otherUser.get("profile_pic");

        setCurrentUser({
          id: currentUser.id,
          name: `${currentUser.get("first_name")} ${currentUser.get(
            "last_name"
          )}`,
          profilePicture: youProfilePic ? youProfilePic.url() : null,
        });

        setOtherUser({
          id: otherUser.id,
          name: `${otherUser.get("first_name")} ${otherUser.get("last_name")}`,
          profilePicture: otherProfilePic ? otherProfilePic.url() : null,
        });

        // create a bump requst with status pending in the Bump_status table
        const BumpStatus = Parse.Object.extend("Bump_status");
        const bumpStatus = new BumpStatus();
        bumpStatus.set("userA", currentUser);
        bumpStatus.set("userB", otherUser);
        bumpStatus.set("status", "pending");
        bumpStatus.set("requestedBy", currentUser);
        await bumpStatus.save();

        setBumpCreated(true);
      } catch (error) {
        console.error("Error fetching users or creating bump:", error);
      }
    }

    if (otherUserId) {
      fetchUsersAndCreateBump();
    }
  }, [otherUserId]);

  //if users are not loaded yet, show loading message
  if (!currentUser || !otherUser) return <div>Loading..</div>;

  return (
    <div className="page container stack">
      <BumpHeader
        currentUser={currentUser}
        otherUser={otherUser}
        leftImageSrc={currentUser.profilePicture}
        rightImageSrc={otherUser.profilePicture}
        type="sent"
      />

      {/*
        I moved the following html from the BumpHeader jsx, maybe we need to move it back when refactoring the parse code? 
        idk what the best solution is here. 
        /Vic
      */}

      <div className="shared-interest-title">
        <h4 className="name-row">You both like:</h4>
      </div>
      <div className="shared-interest-card">
        <InterestGallery interests={sharedInterests} />
      </div>

      <Buttons mode="bump" variant="sent" />
    </div>
  );
}
