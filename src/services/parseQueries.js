import Parse from 'parse';

// Fetch all user profiles (plain JS objects) excluding the provided user id.
// Returns objects shaped like the original inline implementation used in Home.jsx
export async function fetchProfiles({ excludeUserId } = {}) {
	try {
		// Build query for Users table
		const userQuery = new Parse.Query('Users');
		// Select only the fields we need for profile display
		userQuery.select(
			'first_name',
			'last_name',
			'profile_pic',
			'programme',
			'semester',
			'country'
		);
		// Optionally exclude the current user from results
		if (excludeUserId) {
			userQuery.notEqualTo('objectId', excludeUserId);
		}

		// Execute query to get all users
		const users = await userQuery.find();

		// Fetch all interests for all users in one query to avoid N+1 problem
		const allInterestsQuery = new Parse.Query('User_interests');
		allInterestsQuery.containedIn('user', users);
		allInterestsQuery.include('interest');
		allInterestsQuery.select('user', 'interest');
		const allInterestResults = await allInterestsQuery.find();

		// Group interests by user id
		const interestsByUserId = {};
		allInterestResults.forEach((entry) => {
			const user = entry.get('user');
			const interest = entry.get('interest');
			if (user && interest) {
				const userId = user.id;
				if (!interestsByUserId[userId]) {
					interestsByUserId[userId] = [];
				}
				const interestName = interest.get('interest_name');
				if (interestName) {
					interestsByUserId[userId].push(interestName);
				}
			}
		});

		// Map users to profile objects with their interests
		const profilesWithInterests = users.map((user) => {
			// Extract and convert profile picture to URL
			const profilePic = user.get('profile_pic');
			const profilePictureUrl = profilePic ? profilePic.url() : null;

			// Build plain JS object for UI consumption
			return {
				id: user.id,
				objectId: user.id,
				name: `${user.get('first_name')} ${user.get('last_name')}`,
				profilePicture: profilePictureUrl,
				interests: interestsByUserId[user.id] || [], // Get interests from our grouped map
				degree: user.get('programme'),
				semester: user.get('semester'),
				country: user.get('country') || 'Not specified',
			};
		});

		return profilesWithInterests;
	} catch (error) {
		console.error('fetchProfiles error', error);
		throw error;
	}
}

export async function fetchProfileById(id) {
	// Return null if no id provided
	if (!id) return null;
	try {
		// Fetch the specific user by id
		const userQuery = new Parse.Query('Users');
		const user = await userQuery.get(id);

		// Query for this user's interests from User_interests table
		const userInterestQuery = new Parse.Query('User_interests');
		userInterestQuery.equalTo('user', user);
		userInterestQuery.include('interest'); // Include related Interest object
		userInterestQuery.select('interest');
		const interestResults = await userInterestQuery.find();

		// Extract interest names from the results
		const interests = interestResults
			.map((entry) => {
				const interest = entry.get('interest');
				return interest ? interest.get('interest_name') : null;
			})
			.filter(Boolean); // Remove any null values

		// Extract and convert profile picture to URL
		const profilePic = user.get('profile_pic');
		const profilePictureUrl = profilePic ? profilePic.url() : null;

		// Build plain JS object for UI consumption
		return {
			id: user.id,
			objectId: user.id,
			name: `${user.get('first_name')} ${user.get('last_name')}`,
			profilePicture: profilePictureUrl,
			interests,
			degree: user.get('programme'),
			semester: user.get('semester'),
			country: user.get('country') || 'Not specified',
		};
	} catch (err) {
		console.error('fetchProfileById error', err);
		throw err;
	}
}

// Create a bump (Bump_status) between two users
// Returns { bump, created } where created=true if new, false if already existed
export async function createBump({ userAId, userBId, requestedById } = {}) {
	// Validate required parameters
	if (!userAId || !userBId) throw new Error('userAId and userBId required');
	try {
		// Fetch both user objects from the database
		const userQuery = new Parse.Query('Users');
		const userA = await userQuery.get(userAId);
		const userB = await userQuery.get(userBId);

		// Check if a bump already exists between these two users (either direction)
		const BumpStatus = Parse.Object.extend('Bump_status');
		// Query 1: userA -> userB
		const q1 = new Parse.Query(BumpStatus);
		q1.equalTo('userA', userA);
		q1.equalTo('userB', userB);

		// Query 2: userB -> userA (reverse direction)
		const q2 = new Parse.Query(BumpStatus);
		q2.equalTo('userA', userB);
		q2.equalTo('userB', userA);

		// Combine queries with OR and check if any bump exists
		const existing = await Parse.Query.or(q1, q2).first();
		if (existing) {
			// Return existing bump to prevent duplicates
			return { bump: existing, created: false };
		}

		// Create new bump object
		const bump = new BumpStatus();
		bump.set('userA', userA);
		bump.set('userB', userB);
		bump.set('status', 'pending'); // Initial status
		// Set who initiated the bump request
		if (requestedById) {
			const requestedBy = requestedById === userAId ? userA : requestedById === userBId ? userB : await userQuery.get(requestedById);
			bump.set('requestedBy', requestedBy);
		}

		// Save to database and return
		const saved = await bump.save();
		return { bump: saved, created: true };
	} catch (err) {
		console.error('createBump error', err);
		throw err;
	}
}

