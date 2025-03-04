import React, { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [jobBoardSettings, setJobBoardSettings] = useState({
    monster: { enabled: true, apiKey: 'mock-api-key-1', refreshInterval: 60 },
    apec: { enabled: true, apiKey: 'mock-api-key-2', refreshInterval: 120 },
    franceTravail: { enabled: true, apiKey: 'mock-api-key-3', refreshInterval: 180 },
    linkedin: { enabled: false, apiKey: '', refreshInterval: 60 },
    indeed: { enabled: false, apiKey: '', refreshInterval: 60 },
  });

  const [cvTemplate, setCvTemplate] = useState('capgemini-standard');
  const [dataRetentionDays, setDataRetentionDays] = useState(90);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleJobBoardToggle = (board: keyof typeof jobBoardSettings) => {
    setJobBoardSettings({
      ...jobBoardSettings,
      [board]: {
        ...jobBoardSettings[board],
        enabled: !jobBoardSettings[board].enabled
      }
    });
  };

  const handleApiKeyChange = (board: keyof typeof jobBoardSettings, value: string) => {
    setJobBoardSettings({
      ...jobBoardSettings,
      [board]: {
        ...jobBoardSettings[board],
        apiKey: value
      }
    });
  };

  const handleIntervalChange = (board: keyof typeof jobBoardSettings, value: number) => {
    setJobBoardSettings({
      ...jobBoardSettings,
      [board]: {
        ...jobBoardSettings[board],
        refreshInterval: value
      }
    });
  };

  const handleSaveSettings = () => {
    // In a real application, this would save to a backend
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleTestConnections = () => {
    // In a real application, this would test API connections
    alert('Testing connections to job boards...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">System Settings</h1>
      
      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Settings saved successfully!
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Board Connections */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Board Connections</h2>
            <div className="space-y-6">
              {Object.entries(jobBoardSettings).map(([board, settings]) => {
                const boardName = board === 'franceTravail' ? 'France Travail' : 
                                 board.charAt(0).toUpperCase() + board.slice(1);
                return (
                  <div key={board} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.enabled}
                          onChange={() => handleJobBoardToggle(board as keyof typeof jobBoardSettings)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700 font-medium">{boardName}</span>
                      </label>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        settings.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {settings.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                        <input
                          type="text"
                          value={settings.apiKey}
                          onChange={(e) => handleApiKeyChange(board as keyof typeof jobBoardSettings, e.target.value)}
                          disabled={!settings.enabled}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="Enter API key"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Refresh Interval (minutes)
                        </label>
                        <input
                          type="number"
                          min="15"
                          max="1440"
                          value={settings.refreshInterval}
                          onChange={(e) => handleIntervalChange(
                            board as keyof typeof jobBoardSettings, 
                            parseInt(e.target.value)
                          )}
                          disabled={!settings.enabled}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6">
              <button
                onClick={handleTestConnections}
                className="flex items-center space-x-2 bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
              >
                <RefreshCw size={18} />
                <span>Test Connections</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Other Settings */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">CV Template</h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="template"
                  value="capgemini-standard"
                  checked={cvTemplate === 'capgemini-standard'}
                  onChange={() => setCvTemplate('capgemini-standard')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">CAPGEMINI Standard</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="template"
                  value="capgemini-detailed"
                  checked={cvTemplate === 'capgemini-detailed'}
                  onChange={() => setCvTemplate('capgemini-detailed')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">CAPGEMINI Detailed</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="template"
                  value="minimal"
                  checked={cvTemplate === 'minimal'}
                  onChange={() => setCvTemplate('minimal')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">Minimal</span>
              </label>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Data Retention</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keep candidate data for (days)
              </label>
              <input
                type="number"
                min="30"
                max="365"
                value={dataRetentionDays}
                onChange={(e) => setDataRetentionDays(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                Candidate data will be automatically deleted after this period to comply with GDPR.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSaveSettings}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          <Save size={18} />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;