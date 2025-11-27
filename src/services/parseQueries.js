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

/*Get notifications (bumps) for a specific user*/
export async function fetchNotifications(userId) {
  if (!userId) return [];
  
  try {
    const userQuery = new Parse.Query('Users');
    const currentUser = await userQuery.get(userId);
    
    const BumpStatus = Parse.Object.extend('Bump_status');
    
    // Queries for bumps where current user is either A or B from bump_status
    const query1 = new Parse.Query(BumpStatus);
    query1.equalTo('userA', currentUser);
    const query2 = new Parse.Query(BumpStatus);
    query2.equalTo('userB', currentUser);
    
    // combined query to differentiate if current user is A or B
    const combinedQuery = Parse.Query.or(query1, query2);
    
    combinedQuery.include('userA');
    combinedQuery.include('userB');
    combinedQuery.include('requestedBy');
    
    // ordering by most recent first
    combinedQuery.descending('createdAt');
    
    const bumps = await combinedQuery.find();
    
    // Bumps are transformed to objects for the notifications
    const notifications = bumps.map(bump => {
      const userA = bump.get('userA');
      const userB = bump.get('userB');
      const requestedBy = bump.get('requestedBy');
      const status = bump.get('status');
      
      // If userA is current user, other user is B, else vice versa
      const otherUser = userA.id === userId ? userB : userA;
      const otherUserName = `${otherUser.get('first_name')} ${otherUser.get('last_name')}`;
      
      const profilePic = otherUser.get('profile_pic');
      const avatar = profilePic ? profilePic.url() : null;
      
      // determine notification type based on status and states defined in frontend
      let type;
      if (status === 'pending') {
        if (requestedBy.id === userId) {
          type = 'bump_sent';
        } else {
          type = 'bump_received';
        }
      } else if (status === 'accepted') {
        if (requestedBy.id === userId) {
          type = 'bump_accepted'; 
        } else {
          type = 'accepted_by_current_user'; 
        }
      }
      
      return {
        id: bump.id,
        type,
        status,
        actor: {
          id: otherUser.id,
          name: otherUserName,
          avatar
        },
        createdAt: bump.get('createdAt'),
        updatedAt: bump.get('updatedAt'),
        bumpId: bump.id,
        otherUserId: otherUser.id
      };
    });
    
    return notifications;
  } catch (error) {
    console.error('Failed to get notifications: ', error);
    throw error;
  }
}

