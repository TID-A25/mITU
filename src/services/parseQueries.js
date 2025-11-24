import Parse from 'parse';

// Fetch all user profiles (plain JS objects) excluding the provided user id.
// Returns objects shaped like the original inline implementation used in Home.jsx
export async function fetchProfiles({ excludeUserId } = {}) {
	try {
		const userQuery = new Parse.Query('Users');
		userQuery.select(
			'first_name',
			'last_name',
			'profile_pic',
			'programme',
			'semester',
			'country'
		);
		if (excludeUserId) {
			userQuery.notEqualTo('objectId', excludeUserId);
		}

		const users = await userQuery.find();

		const profilesWithInterests = await Promise.all(
			users.map(async (user) => {
				try {
					const userInterestQuery = new Parse.Query('User_interests');
					userInterestQuery.equalTo('user', user);
					userInterestQuery.include('interest');
					userInterestQuery.select('interest');
					const interestResults = await userInterestQuery.find();

					const interests = interestResults
						.map((entry) => {
							const interest = entry.get('interest');
							return interest ? interest.get('interest_name') : null;
						})
						.filter(Boolean);

					const profilePic = user.get('profile_pic');
					const profilePictureUrl = profilePic ? profilePic.url() : null;

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
					console.error(`Error fetching interests for user ${user.id}:`, err);
					return {
						id: user.id,
						objectId: user.id,
						name: `${user.get('first_name')} ${user.get('last_name')}`,
						profilePicture: null,
						interests: [],
						degree: user.get('programme'),
						semester: user.get('semester'),
						country: user.get('country') || 'Not specified',
					};
				}
			})
		);

		return profilesWithInterests;
	} catch (error) {
		console.error('fetchProfiles error', error);
		throw error;
	}
}

export async function fetchProfileById(id) {
	if (!id) return null;
	try {
		const userQuery = new Parse.Query('Users');
		const user = await userQuery.get(id);

		const userInterestQuery = new Parse.Query('User_interests');
		userInterestQuery.equalTo('user', user);
		userInterestQuery.include('interest');
		userInterestQuery.select('interest');
		const interestResults = await userInterestQuery.find();

		const interests = interestResults
			.map((entry) => {
				const interest = entry.get('interest');
				return interest ? interest.get('interest_name') : null;
			})
			.filter(Boolean);

		const profilePic = user.get('profile_pic');
		const profilePictureUrl = profilePic ? profilePic.url() : null;

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

// Fetch current user's interests
export async function fetchCurrentUserInterests(userId) {
	if (!userId) return [];
	try {
		const userQuery = new Parse.Query('Users');
		const currentUser = await userQuery.get(userId);
		
		const currentUserInterestQuery = new Parse.Query('User_interests');
		currentUserInterestQuery.equalTo('user', currentUser);
		currentUserInterestQuery.include('interest');
		const currentUserInterestEntries = await currentUserInterestQuery.find();
		
		const currentInterests = currentUserInterestEntries
			.map((e) => e.get('interest')?.get('interest_name'))
			.filter(Boolean);
		
		return currentInterests;
	} catch (err) {
		console.error('fetchCurrentUserInterests error', err);
		throw err;
	}
}

// Create a bump (Bump_status) between two users
export async function createBump({ userAId, userBId, requestedById } = {}) {
	if (!userAId || !userBId) throw new Error('userAId and userBId required');
	try {
		const userQuery = new Parse.Query('Users');
		const userA = await userQuery.get(userAId);
		const userB = await userQuery.get(userBId);

		// First, check if a bump already exists between these two users (either direction)
		const BumpStatus = Parse.Object.extend('Bump_status');
		const q1 = new Parse.Query(BumpStatus);
		q1.equalTo('userA', userA);
		q1.equalTo('userB', userB);

		const q2 = new Parse.Query(BumpStatus);
		q2.equalTo('userA', userB);
		q2.equalTo('userB', userA);

		const existing = await Parse.Query.or(q1, q2).first();
		if (existing) {
			// Return existing bump instead of creating a duplicate
			return { bump: existing, created: false };
		}

		const bump = new BumpStatus();
		bump.set('userA', userA);
		bump.set('userB', userB);
		bump.set('status', 'pending');
		if (requestedById) {
			const requestedBy = requestedById === userAId ? userA : requestedById === userBId ? userB : await userQuery.get(requestedById);
			bump.set('requestedBy', requestedBy);
		}

		const saved = await bump.save();
		return { bump: saved, created: true };
	} catch (err) {
		console.error('createBump error', err);
		throw err;
	}
}

