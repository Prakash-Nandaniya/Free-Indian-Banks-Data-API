import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useNavigate } from "react-router-dom";
import ApiKeyModal from "../../components/apiModel/model";
import "./form.css";

const SubscriptionForm = ({ setApiKey }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");
  const navigate = useNavigate();

  const countryOptions = useMemo(() => countryList().getData(), []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption ? selectedOption.label : "" });
    if (errors.country) setErrors({ ...errors, country: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
  
    if (validateForm()) {
      try {
        console.log(formData);
        const BE_URL = process.env.REACT_APP_BE_URL;
        const response = await fetch(`${BE_URL}/api/subscribe/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Success: show API key
          setGeneratedKey(data.apikey);
          setShowModal(true);
          setApiKey(data.apikey);
        } else {
          // Handle known error from backend
          if (data.error === "Email already registered") {
            setErrors({ form: "Email already registered" });
          } else {
            setErrors({ form: data.error || "An error occurred. Please try again." });
          }
        }
      } catch (error) {
        setErrors({ form: "Server error. Please try again later." });
      }
    }
  };
  

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="subscription-form-container">
      <h2 className="form-title">API Subscription Form</h2>
      <form onSubmit={handleSubmit}>
        {errors.form && (
          <div className="error-message">{errors.form}</div>
        )}
        <div className="form-group">
          <label>
            First Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className={errors.first_name ? "input-error" : ""}
          />
          {errors.first_name && (
            <div className="error-message">{errors.first_name}</div>
          )}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>
            Country <span className="required">*</span>
          </label>
          <Select
            options={countryOptions}
            value={countryOptions.find(option => option.label === formData.country)}
            onChange={handleCountryChange}
            className={
              errors.country ? "country-select-error" : "country-select"
            }
            classNamePrefix="country-select"
            placeholder="Select or type a country name"
          />
          {errors.country && (
            <div className="error-message">{errors.country}</div>
          )}
        </div>
        <div className="form-buttons">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
      {showModal && (
        <ApiKeyModal apiKey={generatedKey} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default SubscriptionForm;
