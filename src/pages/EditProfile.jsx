import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DefaultImg from "../assets/images/default.jpg";
import InterestPicker from "../components/interestPicker/InterestPicker.jsx";
import EditInformation from "../components/editInformation/EditInformation.jsx";
import useEditProfile from "../hooks/useEditProfile";
import Toast from "../components/ui/Toast.jsx";
import { CURRENT_USER_ID } from "../constants/currentUser";
import "./Pages.css";

export default function EditProfile() {
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const {
    loading,
    saving,
    error,
    country,
    setCountry,
    phone,
    setPhone,
    phoneVisibility,
    setPhoneVisibility,
    selected,
    allInterests,
    handleToggleInterest,
    handleSave: saveProfile,
  } = useEditProfile(CURRENT_USER_ID);

  const handleSave = async (e) => {
    e.preventDefault();
    const success = await saveProfile();
    if (success) {
      setToastMessage("Profile updated successfully.");
      setToastOpen(true);
      setTimeout(() => {
        navigate("/user-profile");
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="page container stack">
        <p>Loading edit form...</p>
      </div>
    );
  }

  return (
    <div className="page container stack">
      <h2 className="edit-profile-title">Edit your profile</h2>
      {error && <p className="error-message">{error}</p>}

      <EditInformation
        country={country}
        onCountryChange={setCountry}
        phone={phone}
        onPhoneChange={setPhone}
        phoneVisibility={phoneVisibility}
        onPhoneVisibilityChange={setPhoneVisibility}
        onSubmit={handleSave}
      >
        <div className="interests-edit">
          <h4>Interests</h4>
          <div className="interests-grid">
            <InterestPicker
              items={allInterests.map(item => ({
                ...item,
                img: item.img || DefaultImg
              }))}
              selected={selected}
              onToggle={handleToggleInterest}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={saving}
            className="button button--teal"
            style={{
              color: "white",
              borderRadius: "9999px",
              padding: "0.75rem 1.5rem",
            }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </EditInformation>

      <Toast
        open={toastOpen}
        message={toastMessage}
        duration={2000}
        onClose={() => setToastOpen(false)}
        type="success"
      />
    </div>
  );
}
