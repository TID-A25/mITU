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

// Create a bump (Bump_status) between two users
export async function createBump({ userAId, userBId, requestedById } = {}) {
	if (!userAId || !userBId) throw new Error('userAId and userBId required');
	try {
		const userQuery = new Parse.Query('Users');
		const userA = await userQuery.get(userAId);
		const userB = await userQuery.get(userBId);

		const BumpStatus = Parse.Object.extend('Bump_status');
		const bump = new BumpStatus();
		bump.set('userA', userA);
		bump.set('userB', userB);
		bump.set('status', 'pending');
		if (requestedById) {
			const requestedBy = requestedById === userAId ? userA : requestedById === userBId ? userB : await userQuery.get(requestedById);
			bump.set('requestedBy', requestedBy);
		}

		const saved = await bump.save();
		return saved;
	} catch (err) {
		console.error('createBump error', err);
		throw err;
	}
}

