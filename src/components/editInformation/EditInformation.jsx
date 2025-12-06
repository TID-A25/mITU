import React from "react";
import "./EditInformation.css";

export default function EditInformation({
  country,
  onCountryChange,
  phone,
  onPhoneChange,
  phoneVisibility,
  onPhoneVisibilityChange,
  onSubmit,
  children,
}) {
  return (
    <form className="profile-edit-form" onSubmit={onSubmit}>
      <div className="row-2">
        <label>
          Country
          <input
            value={country}
            placeholder="e.g. Denmark"
            onChange={(e) => onCountryChange(e.target.value)}
          />
        </label>

        <div className="col-stack">
          <label>
            WhatsApp number
            <input
              type="number" //dont accept letters
              value={phone}
              placeholder="e.g. +45 12 34 56 78"
              onChange={(e) => onPhoneChange(e.target.value)}
            />
          </label>

          <label>
            Who can see your WhatsApp number
            <select
              value={phoneVisibility}
              onChange={(e) => onPhoneVisibilityChange(e.target.value)}
            >
              <option value="all">Visible to all</option>
              <option value="bumps">Visible to bumps</option>
              <option value="none">Visible to no one</option>
            </select>
          </label>
        </div>
      </div>

      {children}
    </form>
  );
}
