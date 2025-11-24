import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse";
import DefaultImg from "../assets/images/interests/default.jpg";
import InterestPicker from "../components/interestPicker/InterestPicker.jsx";
import "./Pages.css";

export default function EditProfile() {

	const CURRENT_USER_ID = "C6YoifVWmr";

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null);

	const [country, setCountry] = useState("");

	// selected interests is an array of interest names
	const [selected, setSelected] = useState([]);

	// all available interests 
	const [allInterests, setAllInterests] = useState([]);

	// store the Parse user object so we can save it later
	const [userObj, setUserObj] = useState(null);

	const navigate = useNavigate();

	// Load user, user's interests, and all interests
	useEffect(() => {
		async function load() {
			try {
				setLoading(true);

				// load user
				const userQ = new Parse.Query("Users");
				const user = await userQ.get(CURRENT_USER_ID);
				setUserObj(user);
				setCountry(user.get("country") || "");

				// load user's interest entries (User_interests)
				const uiQ = new Parse.Query("User_interests");
				uiQ.equalTo("user", user);
				uiQ.include("interest");
				const uiEntries = await uiQ.find();
				const userInterestNames = uiEntries
					.map((e) => e.get("interest")?.get("interest_name"))
					.filter(Boolean);
				setSelected(userInterestNames);

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

	// Allow toggling /selecting/unselecting interests in the array
	function toggleInterest(name) {
		setSelected((prev) => {
			if (prev.includes(name)) return prev.filter((n) => n !== name);
			return [...prev, name];
		});
	}

	// Save country and sync interests
	async function handleSave(e) {
		e.preventDefault();
		if (!userObj) return;

		try {
			setSaving(true);
			setError(null);

			// pdate country
			userObj.set("country", country);
			await userObj.save();

			// get current User_interests rows
			const uiQ = new Parse.Query("User_interests");
			uiQ.equalTo("user", userObj);
			uiQ.include("interest");
			const existing = await uiQ.find();

			const existingNames = existing
				.map((e) => e.get("interest")?.get("interest_name"))
				.filter(Boolean);

			// compute adds and removes
			const toAdd = selected.filter((n) => !existingNames.includes(n));
			const toRemove = existingNames.filter((n) => !selected.includes(n));

			// remove entries
			for (const entry of existing) {
				const name = entry.get("interest")?.get("interest_name");
				if (toRemove.includes(name)) {
					await entry.destroy();
				}
			}

			// add entries: for each name, find the Interest object and create a row
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
			<h2>Edit Profile</h2>
			{error && <p className="error-message">{error}</p>}

			<form className="profile-edit-form" onSubmit={handleSave}>
				<label>
					Country
					<input value={country} onChange={(e) => setCountry(e.target.value)} />
				</label>

		<div className="interests-edit">
				<h4>Interests</h4>
				<div className="interests-grid">
					<InterestPicker items={allInterests} selected={selected} onToggle={toggleInterest} />
				</div>
			</div>

			<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
				<button type="submit" disabled={saving} className="button button--teal" style={{ color: "white", borderRadius: "9999px", padding: "0.75rem 1.5rem" }}>
					{saving ? "Saving..." : "Save"}
				</button>
			</div>
			</form>
		</div>
	);
}