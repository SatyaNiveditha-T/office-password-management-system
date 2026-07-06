import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import "./Settigs.css";

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: true,
    passwordExpiry: 90,
    sessionTimeout: 30,
    apiKey: "",
    theme: "dark"
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSave = async () => {
    try {
      // Save to localStorage
      localStorage.setItem("appSettings", JSON.stringify(settings));
      
      // TODO: Make API call to save settings to backend
      console.log("Saving settings:", settings);
      setSaveStatus("✅ Settings saved successfully!");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus("❌ Failed to save settings");
      console.error("Error saving settings:", error);
    }
  };

  const handleCopyApiKey = () => {
    if (settings.apiKey) {
      navigator.clipboard.writeText(settings.apiKey);
      setCopyStatus("✅ Copied!");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  };

  const handleRegenerateApiKey = () => {
    // Generate a new API key
    const newApiKey = "sk_live_" + Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
    setSettings({
      ...settings,
      apiKey: newApiKey
    });
    setSaveStatus("🔄 API Key regenerated. Click Save to persist.");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  return (
    <MainLayout>
      <div className="settings-container">
        <div className="settings-header">
          <h2>Settings</h2>
          <p>Manage your application settings</p>
        </div>

        {saveStatus && <div className="settings-status">{saveStatus}</div>}

        <div className="settings-grid">
          {/* General Settings */}
          <div className="settings-section">
            <h3>General Settings</h3>
            <div className="settings-item">
              <label>Theme</label>
              <select 
                name="theme" 
                value={settings.theme} 
                onChange={handleChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="settings-item">
              <label>Session Timeout (minutes)</label>
              <input 
                type="number" 
                name="sessionTimeout" 
                value={settings.sessionTimeout}
                onChange={handleChange}
                min="5"
                max="120"
              />
            </div>
          </div>

          {/* Security Settings */}
          <div className="settings-section">
            <h3>Security Settings</h3>
            
            <div className="settings-item checkbox">
              <input 
                type="checkbox" 
                id="twoFactorAuth"
                name="twoFactorAuth" 
                checked={settings.twoFactorAuth}
                onChange={handleChange}
              />
              <label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</label>
            </div>

            <div className="settings-item">
              <label>Password Expiry (days)</label>
              <input 
                type="number" 
                name="passwordExpiry" 
                value={settings.passwordExpiry}
                onChange={handleChange}
                min="1"
                max="365"
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="settings-section">
            <h3>Notification Settings</h3>
            
            <div className="settings-item checkbox">
              <input 
                type="checkbox" 
                id="emailNotifications"
                name="emailNotifications" 
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
              <label htmlFor="emailNotifications">Email Notifications</label>
            </div>

            <p className="settings-note">
              Get notified about security alerts and account changes
            </p>
          </div>

          {/* API Settings */}
          <div className="settings-section">
            <h3>API Settings</h3>
            
            <div className="settings-item">
              <label>API Key</label>
              <div className="api-key-display">
                <div className="api-key-input-wrapper">
                  <input 
                    type={showApiKey ? "text" : "password"}
                    value={settings.apiKey}
                    onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                    placeholder="Enter your API key"
                  />
                  <button 
                    className="toggle-visibility-btn" 
                    onClick={() => setShowApiKey(!showApiKey)}
                    title={showApiKey ? "Hide" : "Show"}
                  >
                    {showApiKey ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <button className="copy-btn" onClick={handleCopyApiKey} title="Copy to clipboard">
                  <FaCopy /> Copy
                </button>
              </div>
              {copyStatus && <div className="copy-status">{copyStatus}</div>}
            </div>

            <button className="regenerate-btn" onClick={handleRegenerateApiKey}>
              🔄 Regenerate API Key
            </button>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn-save" onClick={handleSave}>
            💾 Save Changes
          </button>
          <button className="btn-reset" onClick={() => window.location.reload()}>
            🔄 Reset to Default
          </button>
        </div>
      </div>
    </MainLayout>
  );
}