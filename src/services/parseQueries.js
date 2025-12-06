import Parse from "parse";

/**
 * Fetch all profiles with interests
 */
export async function fetchProfiles({ excludeUserId } = {}) {
  try {
    // Query all users
    const userQuery = new Parse.Query("Users");
    userQuery.select(
      "first_name",
      "last_name",
      "profile_pic",
      "programme",
      "semester",
      "country",
      "phone_visibility",
      "phone"
    );

    // Exclude current user
    if (excludeUserId) {
      userQuery.notEqualTo("objectId", excludeUserId);
    }

    const users = await userQuery.find();

    // Fetch ALL interests at once
    const allUserInterestsQuery = new Parse.Query("User_interests");
    allUserInterestsQuery.containedIn("user", users);
    allUserInterestsQuery.include("interest");
    allUserInterestsQuery.select("interest", "user");
    const allInterestResults = await allUserInterestsQuery.find();

    // Build lookup map: { userId: [interest1, interest2, ...] }
    const interestsByUserId = {};
    allInterestResults.forEach((entry) => {
      const user = entry.get("user");
      const interest = entry.get("interest");
      if (user && interest) {
        const userId = user.id;
        const interestName = interest.get("interest_name");
        if (interestName) {
          if (!interestsByUserId[userId]) {
            interestsByUserId[userId] = [];
          }
          interestsByUserId[userId].push(interestName);
        }
      }
    });

    // Transform into profile objects
    const profilesWithInterests = users.map((user) => {
      try {
        const interests = interestsByUserId[user.id] || [];
        const profilePic = user.get("profile_pic");
        const profilePictureUrl = profilePic ? profilePic.url() : null;

        return {
          id: user.id,
          objectId: user.id,
          name: `${user.get("first_name")} ${user.get("last_name")}`,
          profilePicture: profilePictureUrl,
          interests,
          degree: user.get("programme"),
          semester: user.get("semester"),
          country: user.get("country") || "Not specified",
          phone: user.get("phone") || null,
          phone_visibility: user.get("phone_visibility") || "all",
        };
      } catch (err) {
        console.error(`Error processing user ${user.id}:`, err);
        return {
          id: user.id,
          objectId: user.id,
          name: `${user.get("first_name")} ${user.get("last_name")}`,
          profilePicture: null,
          interests: [],
          degree: user.get("programme"),
          semester: user.get("semester"),
          country: user.get("country") || "Not specified",
          phone: user.get("phone") || null,
          phone_visibility: user.get("phone_visibility") || "all",
        };
      }
    });

    return profilesWithInterests;
  } catch (error) {
    console.error("fetchProfiles error", error);
    throw error;
  }
}

/**
 * Fetch a single profile by ID with interests
 */
export async function fetchProfileById(id) {
  if (!id) return null;

  try {
    const userQuery = new Parse.Query("Users");
    const user = await userQuery.get(id);

    const userInterestQuery = new Parse.Query("User_interests");
    userInterestQuery.equalTo("user", user);
    userInterestQuery.include("interest");
    userInterestQuery.select("interest");
    const interestResults = await userInterestQuery.find();

    const interests = interestResults
      .map((entry) => entry.get("interest")?.get("interest_name"))
      .filter(Boolean);

    const profilePic = user.get("profile_pic");
    const profilePictureUrl = profilePic ? profilePic.url() : null;

    return {
      id: user.id,
      objectId: user.id,
      name: `${user.get("first_name")} ${user.get("last_name")}`,
      profilePicture: profilePictureUrl,
      interests,
      degree: user.get("programme"),
      semester: user.get("semester"),
      country: user.get("country") || "Not specified",
      phone: user.get("phone") || null,
      phone_visibility: user.get("phone_visibility") || "all",
    };
  } catch (err) {
    console.error("fetchProfileById error", err);
    throw err;
  }
}

/**
 * Fetch current user's interests (for highlighting shared interests)
 */
export async function fetchCurrentUserInterests(userId) {
  if (!userId) return [];

  try {
    const userQuery = new Parse.Query("Users");
    const currentUser = await userQuery.get(userId);

    const currentUserInterestQuery = new Parse.Query("User_interests");
    currentUserInterestQuery.equalTo("user", currentUser);
    currentUserInterestQuery.include("interest");
    const currentUserInterestEntries = await currentUserInterestQuery.find();

    const currentInterests = currentUserInterestEntries
      .map((e) => e.get("interest")?.get("interest_name"))
      .filter(Boolean);

    return currentInterests;
  } catch (err) {
    console.error("fetchCurrentUserInterests error", err);
    throw err;
  }
}

/**
 * Create bump between users (checks for duplicates)
 */
export async function createBump({ userAId, userBId, requestedById } = {}) {
  if (!userAId || !userBId) throw new Error("userAId and userBId required");

  try {
    // Check if bump already exists
    const existingBump = await checkBumpStatus(userAId, userBId);
    if (existingBump?.exists) {
      return { bump: existingBump, created: false };
    }

    // Create new bump
    const userQuery = new Parse.Query("Users");
    const userA = await userQuery.get(userAId);
    const userB = await userQuery.get(userBId);

    const BumpStatus = Parse.Object.extend("Bump_status");
    const bump = new BumpStatus();
    bump.set("userA", userA);
    bump.set("userB", userB);
    bump.set("status", "pending");

    if (requestedById) {
      const requestedBy =
        requestedById === userAId
          ? userA
          : requestedById === userBId
          ? userB
          : await userQuery.get(requestedById);
      bump.set("requestedBy", requestedBy);
    }

    const saved = await bump.save();
    return { bump: saved, created: true };
  } catch (err) {
    console.error("createBump error", err);
    throw err;
  }
}

/**
 * Check bump status between two users
 */
export async function checkBumpStatus(userAId, userBId) {
  if (!userAId || !userBId) return null;

  try {
    const userQuery = new Parse.Query("Users");
    const userA = await userQuery.get(userAId);
    const userB = await userQuery.get(userBId);

    const BumpStatus = Parse.Object.extend("Bump_status");

    const q1 = new Parse.Query(BumpStatus);
    q1.equalTo("userA", userA);
    q1.equalTo("userB", userB);

    const q2 = new Parse.Query(BumpStatus);
    q2.equalTo("userA", userB);
    q2.equalTo("userB", userA);

    const combinedQuery = Parse.Query.or(q1, q2);
    combinedQuery.include("requestedBy");
    const bump = await combinedQuery.first();

    if (!bump) return null;

    const requestedBy = bump.get("requestedBy");
    const status = bump.get("status");

    return {
      exists: true,
      status,
      requestedByCurrentUser: requestedBy?.id === userAId,
      bumpId: bump.id,
      createdAt: bump.createdAt,
    };
  } catch (err) {
    console.error("checkBumpStatus error", err);
    return null;
  }
}

/**
 * Fetch user data and interests for editing profile
 */
export async function fetchEditProfileData(userId) {
  if (!userId) throw new Error("userId required");

  try {
    // Load user
    const userQ = new Parse.Query("Users");
    const user = await userQ.get(userId);

    // Load user's interests
    const uiQ = new Parse.Query("User_interests");
    uiQ.equalTo("user", user);
    uiQ.include("interest");
    const uiEntries = await uiQ.find();

    const userInterestNames = uiEntries
      .map((e) => e.get("interest")?.get("interest_name"))
      .filter(Boolean);

    // Load all interests
    const interestQ = new Parse.Query("Interest");
    interestQ.ascending("interest_name");
    const interests = await interestQ.find();

    const allInterests = interests.map((i) => ({
      name: i.get("interest_name"),
      object: i,
      img: i.get("interest_pic") ? i.get("interest_pic").url() : null,
    }));

    return {
      user,
      country: user.get("country") || "",
      phone: user.get("phone") || "",
      phoneVisibility: user.get("phone_visibility") || "all",
      userInterests: userInterestNames,
      allInterests,
    };
  } catch (err) {
    console.error("fetchEditProfileData error", err);
    throw err;
  }
}

/**
 * Save profile changes (country, phone, interests)
 */
export async function saveProfileChanges(
  userId,
  { country, phone, phoneVisibility, selectedInterests, allInterests }
) {
  if (!userId) throw new Error("userId required");

  try {
    // Update user fields
    const userQ = new Parse.Query("Users");
    const user = await userQ.get(userId);

    user.set("country", country);
    user.set("phone", phone);
    user.set("phone_visibility", phoneVisibility);
    await user.save();

    // Get current User_interests
    const uiQ = new Parse.Query("User_interests");
    uiQ.equalTo("user", user);
    uiQ.include("interest");
    const existing = await uiQ.find();

    const existingNames = existing
      .map((e) => e.get("interest")?.get("interest_name"))
      .filter(Boolean);

    // Compute adds and removes
    const toAdd = selectedInterests.filter((n) => !existingNames.includes(n));
    const toRemove = existingNames.filter(
      (n) => !selectedInterests.includes(n)
    );

    // Remove entries
    for (const entry of existing) {
      const name = entry.get("interest")?.get("interest_name");
      if (toRemove.includes(name)) {
        await entry.destroy();
      }
    }

    // When adding new interests - look them up in allInterests
    for (const name of toAdd) {
      const interestData = allInterests.find((i) => i.name === name);
      if (interestData && interestData.object) {
        const UserInterests = Parse.Object.extend("User_interests");
        const ui = new UserInterests();
        ui.set("user", user);
        ui.set("interest", interestData.object);
        await ui.save();
      }
    }

    return true;
  } catch (err) {
    console.error("saveProfileChanges error", err);
    throw err;
  }
}

/**
 * Fetch notifications for a user (ordered by most recent)
 */
export async function fetchNotifications(userId) {
  if (!userId) return [];

  try {
    // Fetch current user
    const userQuery = new Parse.Query("Users");
    const currentUser = await userQuery.get(userId);

    const BumpStatus = Parse.Object.extend("Bump_status");

    // Query bumps where current user is either A or B
    const query1 = new Parse.Query(BumpStatus);
    query1.equalTo("userA", currentUser);
    const query2 = new Parse.Query(BumpStatus);
    query2.equalTo("userB", currentUser);

    // combined query to differentiate if current user is A or B
    const combinedQuery = Parse.Query.or(query1, query2);
    combinedQuery.include("userA");
    combinedQuery.include("userB");
    combinedQuery.include("requestedBy");
    combinedQuery.descending("createdAt");

    const bumps = await combinedQuery.find();

    // Transform bumps into notification objects
    const notifications = bumps.map((bump) => {
      const userA = bump.get("userA");
      const userB = bump.get("userB");
      const requestedBy = bump.get("requestedBy");
      const status = bump.get("status");

      // If userA is current user, other user is B, else vice versa
      const otherUser = userA.id === userId ? userB : userA;
      const otherUserName = `${otherUser.get("first_name")} ${otherUser.get(
        "last_name"
      )}`;

      const profilePic = otherUser.get("profile_pic");
      const avatar = profilePic ? profilePic.url() : null;

      // Determine notification type
      let type;
      if (status === "pending") {
        if (requestedBy.id === userId) {
          type = "bump_sent";
        } else {
          type = "bump_received";
        }
      } else if (status === "accepted") {
        if (requestedBy.id === userId) {
          type = "bump_accepted";
        } else {
          type = "accepted_by_current_user";
        }
      }

      return {
        id: bump.id,
        type,
        status,
        actor: {
          id: otherUser.id,
          name: otherUserName,
          avatar,
        },
        createdAt: bump.get("createdAt"),
        updatedAt: bump.get("updatedAt"),
        bumpId: bump.id,
        otherUserId: otherUser.id,
      };
    });

    return notifications;
  } catch (error) {
    console.error("Failed to get notifications: ", error);
    throw error;
  }
}
