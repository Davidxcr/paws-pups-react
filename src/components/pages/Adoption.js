import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Select from 'react-select';

const Adoption = () => {
  const { isAuthenticated, currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: isAuthenticated ? currentUser.name.split(' ')[0] : '',
    lastName: isAuthenticated ? (currentUser.name.split(' ').length > 1 ? currentUser.name.split(' ')[1] : '') : '',
    email: isAuthenticated ? currentUser.email : '',
    phone: '',
    dogType: '',
    homeType: '',
    experience: '',
    preferences: {
      friendly: false,
      trained: false,
      quiet: false,
      active: false,
      goodWithKids: false
    },
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  // Define the dog type options for react-select
  const dogTypeOptions = [
    { value: 'Puppy', label: 'Puppy (under 1 year)' },
    { value: 'Young Adult', label: 'Young Adult (1-3 years)' },
    { value: 'Adult', label: 'Adult (3-7 years)' },
    { value: 'Senior', label: 'Senior (7+ years)' },
    { value: 'Any', label: 'Any age' }
  ];

  // Define the home type options
  const homeTypeOptions = [
    { value: 'House with yard', label: 'House with yard' },
    { value: 'House without yard', label: 'House without yard' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Condo', label: 'Condo' },
    { value: 'Other', label: 'Other' }
  ];

  // Define the experience options
  const experienceOptions = [
    { value: 'First-time owner', label: 'First-time owner' },
    { value: 'Had one dog before', label: 'Had one dog before' },
    { value: 'Had multiple dogs', label: 'Had multiple dogs' },
    { value: 'Experienced owner', label: 'Experienced owner' }
  ];

  const { firstName, lastName, email, phone, dogType, homeType, experience, preferences, message } = formData;

  // Custom styles for react-select
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#6b4226' : (!dogType && state.selectProps.isRequired) ? '#dc3545' : provided.borderColor,
      boxShadow: state.isFocused ? '0 0 0 1px #6b4226' : provided.boxShadow,
      '&:hover': {
        borderColor: '#6b4226'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#6b4226' : state.isFocused ? '#f8f3eb' : null,
      color: state.isSelected ? 'white' : '#333',
      cursor: 'pointer'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaa'
    })
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('pref-')) {
      // Handle checkbox preferences
      const prefName = name.replace('pref-', '');
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          [prefName]: checked
        }
      });
    } else {
      // Handle regular inputs
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle react-select change
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value
    });
  };

  // Calculate form completion progress
  useEffect(() => {
    let filledFields = 0;
    let totalRequiredFields = 5; // firstName, lastName, email, dogType, homeType, experience

    if (firstName) filledFields++;
    if (lastName) filledFields++;
    if (email) filledFields++;
    if (dogType) filledFields++;
    if (homeType) filledFields++;
    if (experience) filledFields++;

    // Add bonus progress for optional fields
    if (phone) filledFields += 0.5;
    if (message) filledFields += 0.5;

    // Add bonus for preferences
    const selectedPreferences = Object.values(preferences).filter(val => val).length;
    filledFields += selectedPreferences * 0.2;

    // Calculate percentage (cap at 100%)
    const progress = Math.min(Math.round((filledFields / totalRequiredFields) * 100), 100);
    setFormProgress(progress);
  }, [formData, firstName, lastName, email, dogType, homeType, experience, phone, message, preferences]);

  const handleSubmit = e => {
    e.preventDefault();
    
    // Check if required fields are filled out
    if (!firstName || !lastName || !email || !dogType || !homeType || !experience) {
      alert('Please fill out all required fields');
      return;
    }
    
    // In a real app, you would send this data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <>
      <section className="container-fluid px-0">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <img className="img-fluid" src="/imgs/dog3.jpg" alt="Dog" />
          </div>
          <div className="col-md-6 text-center">
            <div className="row justify-content-center">
              <div className="col-10 col-lg-8 blurb mb-5 mb-md-0">
                <h2>ADOPT A DOG</h2>
                <img src="/imgs/paw_icon.svg" alt="paw icon" className="d-none d-lg-inline" style={{ width: '30px', height: '30px' }} />
                <p className="lead">Ready to welcome a new furry friend into your home? Our adoption process is designed to ensure a perfect match between you and your new companion. Fill out the application form below to start your journey to pet parenthood.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2 className="display-4" style={{ color: '#6b4226' }}>AVAILABLE DOGS</h2>
            <p className="lead">Here are some of our adorable dogs currently looking for their forever homes:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/imgs/dog1.jpg" className="card-img-top" alt="Max" />
              <div className="card-body">
                <h5 className="card-title">Max</h5>
                <p className="card-text">Max is a 3-year-old Labrador Retriever with a heart of gold. He loves playing fetch and is great with children.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/imgs/dog2.jpg" className="card-img-top" alt="Bella" />
              <div className="card-body">
                <h5 className="card-title">Bella</h5>
                <p className="card-text">Bella is a 2-year-old Border Collie mix. She's incredibly smart and would thrive in an active household.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/imgs/dog4.jpg" className="card-img-top" alt="Charlie" />
              <div className="card-body">
                <h5 className="card-title">Charlie</h5>
                <p className="card-text">Charlie is a 5-year-old Golden Retriever. He's calm, well-trained, and gets along with other pets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2 className="display-4" style={{ color: '#6b4226' }}>ADOPTION APPLICATION</h2>
            <p className="lead">Fill out the form below to start your adoption journey</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            {submitted ? (
              <div className="alert alert-success p-4 shadow-sm" style={{ borderRadius: '10px', backgroundColor: '#e8f4f8', borderLeft: '5px solid #6b4226' }}>
                <h4 style={{ color: '#6b4226' }}>Thank you for your application!</h4>
                <p className="mb-0">We've received your information and will contact you soon to discuss the next steps in the adoption process.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-4 shadow-sm" style={{ borderRadius: '10px', border: '1px solid rgba(107, 66, 38, 0.2)' }}>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span style={{ color: '#6b4226', fontWeight: '500' }}>Application Progress</span>
                    <span style={{ color: '#6b4226', fontWeight: '700' }}>{formProgress}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px', backgroundColor: '#e9ecef' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${formProgress}%`,
                        backgroundColor: formProgress < 50 ? '#dc3545' : formProgress < 80 ? '#ffc107' : '#6b4226',
                        transition: 'width 0.5s ease-in-out'
                      }}
                      aria-valuenow={formProgress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstName" style={{ color: '#6b4226', fontWeight: '500' }}>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="Your first name"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lastName" style={{ color: '#6b4226', fontWeight: '500' }}>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Your last name"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="email" style={{ color: '#6b4226', fontWeight: '500' }}>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Your email address"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="phone" style={{ color: '#6b4226', fontWeight: '500' }}>Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder="Your phone number"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group mt-4">
                  <label htmlFor="dogType" style={{ color: '#6b4226', fontWeight: '500' }}>
                    What type of dog are you interested in? <span className="text-danger">*</span>
                  </label>
                  <Select
                    id="dogType"
                    name="dogType"
                    options={dogTypeOptions}
                    placeholder="Select dog age..."
                    onChange={(option) => handleSelectChange(option, { name: 'dogType' })}
                    value={dogTypeOptions.find(option => option.value === dogType)}
                    styles={customSelectStyles}
                    className="basic-select"
                    classNamePrefix="select"
                    isRequired={true}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="homeType" style={{ color: '#6b4226', fontWeight: '500' }}>
                    What type of home do you live in? <span className="text-danger">*</span>
                  </label>
                  <Select
                    id="homeType"
                    name="homeType"
                    options={homeTypeOptions}
                    placeholder="Select home type..."
                    onChange={(option) => handleSelectChange(option, { name: 'homeType' })}
                    value={homeTypeOptions.find(option => option.value === homeType)}
                    styles={customSelectStyles}
                    className="basic-select"
                    classNamePrefix="select"
                    isRequired={true}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experience" style={{ color: '#6b4226', fontWeight: '500' }}>
                    What is your experience with dogs? <span className="text-danger">*</span>
                  </label>
                  <Select
                    id="experience"
                    name="experience"
                    options={experienceOptions}
                    placeholder="Select experience level..."
                    onChange={(option) => handleSelectChange(option, { name: 'experience' })}
                    value={experienceOptions.find(option => option.value === experience)}
                    styles={customSelectStyles}
                    className="basic-select"
                    classNamePrefix="select"
                    isRequired={true}
                  />
                </div>

                <div className="form-group mt-4">
                  <label style={{ color: '#6b4226', fontWeight: '500' }}>Dog Preferences (select all that apply)</label>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <div className="custom-control custom-checkbox mb-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="pref-friendly"
                          name="pref-friendly"
                          checked={preferences.friendly}
                          onChange={handleChange}
                        />
                        <label className="custom-control-label" htmlFor="pref-friendly">Friendly with other pets</label>
                      </div>
                      <div className="custom-control custom-checkbox mb-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="pref-trained"
                          name="pref-trained"
                          checked={preferences.trained}
                          onChange={handleChange}
                        />
                        <label className="custom-control-label" htmlFor="pref-trained">Already house-trained</label>
                      </div>
                      <div className="custom-control custom-checkbox mb-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="pref-quiet"
                          name="pref-quiet"
                          checked={preferences.quiet}
                          onChange={handleChange}
                        />
                        <label className="custom-control-label" htmlFor="pref-quiet">Quiet/calm temperament</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-control custom-checkbox mb-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="pref-active"
                          name="pref-active"
                          checked={preferences.active}
                          onChange={handleChange}
                        />
                        <label className="custom-control-label" htmlFor="pref-active">Active/energetic</label>
                      </div>
                      <div className="custom-control custom-checkbox mb-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="pref-goodWithKids"
                          name="pref-goodWithKids"
                          checked={preferences.goodWithKids}
                          onChange={handleChange}
                        />
                        <label className="custom-control-label" htmlFor="pref-goodWithKids">Good with children</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group mt-4">
                  <label htmlFor="message" style={{ color: '#6b4226', fontWeight: '500' }}>Tell us about yourself</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    placeholder="Tell us why you want to adopt a dog and any specific requirements you may have..."
                    name="message"
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-lg px-5 py-2"
                    style={{
                      backgroundColor: '#6b4226',
                      borderColor: '#6b4226',
                      color: 'white',
                      borderRadius: '30px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Submit Application
                  </button>
                </div>

                <div className="text-center mt-3">
                  <small className="text-muted">By submitting this form, you agree to be contacted about dog adoption opportunities.</small>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Adoption;
