import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { currentUser, getProfile, loading, error, token } = useContext(AuthContext);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    // Log current user and token to assist debugging
    console.log('Current auth state:', { 
      currentUser: currentUser ? 'exists' : 'null', 
      token: token ? 'exists' : 'null',
      isAuthenticated: token ? true : false
    });
    
    // Load user profile data when component mounts
    const loadProfile = async () => {
      if (!profileLoaded) {
        console.log('Attempting to load profile...');
        try {
          const success = await getProfile();
          console.log('Profile load result:', success);
          setProfileLoaded(true);
        } catch (err) {
          console.error('Error in loadProfile:', err);
          setLocalError('Failed to load profile: ' + err.message);
        }
      }
    };

    // Only attempt to load profile if we have a token
    if (token) {
      loadProfile();
    } else {
      setLocalError('No authentication token found. Please login again.');
    }
  }, [getProfile, profileLoaded, currentUser, token]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show either context error or local component error
  if (error || localError) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Error loading profile</h4>
          <p>{error || localError}</p>
          <hr />
          <p className="mb-0">Please try logging out and logging in again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Your Profile</h2>
            </div>
            <div className="card-body">
              {currentUser ? (
                <div className="profile-details">
                  <div className="row mb-4">
                    <div className="col-md-4 text-center mb-3 mb-md-0">
                      <div 
                        className="profile-avatar rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mx-auto"
                        style={{ width: '150px', height: '150px', fontSize: '3rem' }}
                      >
                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : '?'}
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h3 className="profile-name">{currentUser.name}</h3>
                      <p className="text-muted mb-3">
                        <i className="fas fa-envelope me-2"></i> {currentUser.email}
                      </p>
                      <p className="text-muted">
                        <i className="fas fa-calendar-alt me-2"></i> 
                        <small>
                          Member since: {currentUser.created_at && new Date(currentUser.created_at).toLocaleDateString()}
                        </small>
                      </p>
                    </div>
                  </div>

                  <hr />

                  <div className="account-info">
                    <h4 className="mb-3">Account Information</h4>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={currentUser.name || ''} 
                        disabled 
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        value={currentUser.email || ''} 
                        disabled 
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Account ID</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={currentUser.id || ''} 
                        disabled 
                      />
                    </div>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <button className="btn btn-outline-primary me-md-2">
                      Edit Profile
                    </button>
                    <button className="btn btn-outline-danger">
                      Change Password
                    </button>
                  </div>
                </div>
              ) : (
                <div className="alert alert-warning">
                  User profile data not available. Please try logging in again.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 