import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import { useUser } from "../Context/UserContext";

function Settings() {
  const {user} = useUser();

  return (
    <div>
      <div className="container mt-4">

        <div className="row">
          <div className="col-12 mb-3">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h5 className="card-title mb-3" style={{ fontSize: '1.5rem' }}>User Information</h5>
                <div className="mb-3" style={{ fontSize: '1.2rem' }}>
                  <AccountCircleIcon /> <strong>Username:</strong> {user.username}
                </div>
                <div className="mb-3" style={{ fontSize: '1.2rem' }}>
                  <EmailIcon /> <strong>Email:</strong> {user.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h5 className="card-title">Change Password</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <input type="password" className="form-control" id="currentPassword" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="newPassword" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control" id="confirmPassword" required />
                  </div>
                  <button type="submit" className="btn btn-dark">Update Password</button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h5 className="card-title">Account Settings</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="notification" className="form-label">Notifications</label>
                    <select className="form-select" id="notification">
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="theme" className="form-label">Theme</label>
                    <select className="form-select" id="theme">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-dark" >Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
