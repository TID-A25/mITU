import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse";
import DefaultImg from "../assets/images/interests/default.jpg";
import InterestPicker from "../components/interestPicker/InterestPicker.jsx";
import "./Pages.css";

export default function EditProfile() {

	const CURRENT_USER_ID = "C6YoifVWmr";

    // prevents rendering before the loading of the data is complete
	const [loading, setLoading] = useState(true);

    // disables the save button and shows "saving..."" while saving to prevent further user action
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null);

    // country text field value
	const [country, setCountry] = useState("");

	
	const [phone, setPhone] = useState("");

	// visibility for WhatsApp: 'all' | 'bumps' | 'none'
	const [phoneVisibility, setPhoneVisibility] = useState("bumps");

	// array of interests chosen by the user 
	const [selected, setSelected] = useState([]);

	// an array of all available interests  (each item is a parse object)
	const [allInterests, setAllInterests] = useState([]);

	// store the Parse user-object so it can be saved it later
	const [userObj, setUserObj] = useState(null);

    // to navigate back to User-profile after saving
	const navigate = useNavigate();

	// when page opens: Load currentUser, user's interests, and all interests
	useEffect(() => {
		async function load() {
			try {
				setLoading(true); // loading is set to true to show "Loading..."

				// load User from Parse and stores it in userObj
				const userQ = new Parse.Query("Users");
				const user = await userQ.get(CURRENT_USER_ID);
				setUserObj(user);
				setCountry(user.get("country") || "");
				setPhone(user.get("phone") || "");
				setPhoneVisibility(user.get("phone_visibility") || "all");

				// load user's interests from Parse and puts in 'selected' array
				const uiQ = new Parse.Query("User_interests");
				uiQ.equalTo("user", user); //find the current user from the column "user"
				uiQ.include("interest");
				const uiEntries = await uiQ.find(); // get all rows for that user
				const userInterestNames = uiEntries
					.map((e) => e.get("interest")?.get("interest_name")) // get interest names
				setSelected(userInterestNames); // set the selected interests

				// load all available interests (keep the Parse object and image url)
				const interestQ = new Parse.Query("Interest");
				interestQ.ascending("interest_name");
				const interests = await interestQ.find();
				const list = interests.map((i) => ({
					name: i.get("interest_name"),
					object: i,
					img: i.get("interest_pic") ? i.get("interest_pic").url() : DefaultImg,
				}));
				setAllInterests(list);

				setError(null);
			} catch (err) {
				console.error("Load error:", err);
				setError(err.message || "Failed to load data");
			} finally {
				setLoading(false);
			}
		}

		load();
	}, []);

	// Allow toggling to update the "selected" array.
    //if prev array includes user picked interest: remove it; else add it 
	const handleToggleInterest = (selectedInterest) => {
		setSelected((prev) =>
			prev.includes(selectedInterest) ? prev.filter((n) => n !== selectedInterest) : [...prev, selectedInterest]
		);
	};

	// Save country and sync interests
	async function handleSave(e) {
		e.preventDefault(); // have JS handle saving
		if (!userObj) return; // dont save if user hasn't loaded yet

		try {
			setSaving(true); // show "saving..."
			setError(null); //clear error messages if any

			// update country and phone and write the change to the server
			userObj.set("country", country);
			userObj.set("phone", phone);
			userObj.set("phone_visibility", phoneVisibility);
			await userObj.save(); 

			// get current User_interests rows from DB
			const uiQ = new Parse.Query("User_interests");
			uiQ.equalTo("user", userObj);
			uiQ.include("interest");
			const existing = await uiQ.find(); // get the rows

            // get an array of interest names from the existing rows
			const existingNames = existing 
				.map((e) => e.get("interest")?.get("interest_name"))


			// compute adds and removes
            // selected = the array of interest currently selected by the user
			const toAdd = selected.filter((n) => !existingNames.includes(n));
			const toRemove = existingNames.filter((n) => !selected.includes(n));

			// remove entries
			for (const entry of existing) {
				const name = entry.get("interest")?.get("interest_name");
				if (toRemove.includes(name)) {
					await entry.destroy(); // remove the row from Parse
				}
			}

			// add entries: for each  interest to add, create a row with a link between the user and the interest
			for (const name of toAdd) {
				const interestQ = new Parse.Query("Interest");
				interestQ.equalTo("interest_name", name);
				const interestObj = await interestQ.first();
				if (interestObj) {
					const UserInterests = Parse.Object.extend("User_interests");
					const ui = new UserInterests();
					ui.set("user", userObj);
					ui.set("interest", interestObj);
					await ui.save();
				}
			}

			// confirmation then return to profile
			alert("Profile updated successfully.");
			navigate("/user-profile");
		} catch (err) {
			console.error("Save failed:", err);
			setError(err.message || "Failed to save");
		} finally {
			setSaving(false);
		}
	}

	if (loading) {
		return (
			<div className="page container stack">
				<p>Loading edit form...</p>
			</div>
		);
	}

	return (
		<div className="page container stack">
			<h2 className="profile-page-title">Edit your profile</h2>
			{error && <p className="error-message">{error}</p>}

			<form className="profile-edit-form" onSubmit={handleSave}>
				<div className="row-2">
					<label>
						Country
						<input value={country} placeholder="e.g. Denmark" onChange={(e) => setCountry(e.target.value)} />
					</label>

					<div className="col-stack">
						<label>
							WhatsApp number
							<input value={phone} placeholder="e.g. +45 12 34 56 78" onChange={(e) => setPhone(e.target.value)} />
						</label>

						<label>
							Who can see your WhatsApp number
							<select value={phoneVisibility} onChange={(e) => setPhoneVisibility(e.target.value)}>
								<option value="all">Visible to all</option>
								<option value="bumps">Visible to bumps</option>
								<option value="none">Visible to no one</option>
							</select>
						</label>
					</div>
				</div>

		<div className="interests-edit">
				<h4>Interests</h4>
			<div className="interests-grid">
				<InterestPicker items={allInterests} selected={selected} onToggle={handleToggleInterest} />
			</div>
			</div>

			<div className="form-actions">
				<button type="submit" disabled={saving} className="button button--teal" style={{ color: "white", borderRadius: "9999px", padding: "0.75rem 1.5rem" }}>
					{saving ? "Saving..." : "Save"}
				</button>
			</div>
			</form>
		</div>
	);
}