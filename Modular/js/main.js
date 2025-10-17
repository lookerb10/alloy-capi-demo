// main.js - Main Application (ENHANCED)
import { Config } from './config.js';
import { API } from './api.js';
import { SchemaParser } from './schemaParser.js';
import { DemoDataGenerator } from './demoData.js';
import { UI } from './ui.js';
import { cycleTheme, initTheme } from './themes.js'; // ADD THIS LINE

class AlloyDemo {
  constructor() {
    this.state = {
      step: 1,
      connectors: [],
      selectedConnector: null,
      resources: [],
      selectedAction: null,
      actionSchema: null,
      formData: {},
      loading: false,
      result: null,
      showConfig: false,
      apiInspectorCollapsed: false,
      demoMode: false,
      searchQuery: '',
      categoryFilter: 'all',
      darkMode: false,
      recentActivity: [],
      savedTemplates: this.loadTemplates(),
      showTemplates: false,
      responseViewMode: 'json'
    };
    
    this.init();
    this.setupKeyboardShortcuts();
  }
  
  async init() {
    if (!Config.isValid()) {
      this.state.showConfig = true;
      this.render();
    } else {
      await this.loadConnectors();
    }
    
    API.onHistoryUpdate(() => this.render());
    
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('alloy_dark_mode') === 'true';
    if (savedDarkMode) {
      this.state.darkMode = true;
      document.body.classList.add('dark-mode');
    }
    
    // Load recent activity
    this.loadRecentActivity();
  }
  
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('connector-search');
        if (searchInput) searchInput.focus();
      }
      
      // Esc to close modals
      if (e.key === 'Escape') {
        document.getElementById('connections-modal')?.remove();
        document.getElementById('credential-modal')?.remove();
        document.getElementById('templates-modal')?.remove();
      }
      
      // Cmd/Ctrl + D for dark mode
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        this.toggleDarkMode();
      }
      
      // ADD THIS: T key for theme cycling
      if (e.key.toLowerCase() === 't' && document.activeElement.tagName !== 'INPUT') {
        cycleTheme();
      }
    });
  }
  
  toggleDarkMode() {
    this.state.darkMode = !this.state.darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('alloy_dark_mode', this.state.darkMode);
    this.render();
  }
  
  loadTemplates() {
    try {
      return JSON.parse(localStorage.getItem('alloy_templates') || '[]');
    } catch {
      return [];
    }
  }
  
  saveTemplate() {
    const { selectedAction, selectedConnector, formData, actionSchema } = this.state;
    if (!selectedAction || !formData || Object.keys(formData).length === 0) {
      alert('Please fill out the form before saving a template');
      return;
    }
    
    const templateName = prompt('Enter a name for this template:');
    if (!templateName) return;
    
    const template = {
      id: Date.now().toString(),
      name: templateName,
      connectorId: selectedConnector.id,
      connectorName: selectedConnector.name,
      actionId: selectedAction.id,
      actionName: selectedAction.name || selectedAction.displayName,
      formData: { ...formData },
      createdAt: new Date().toISOString()
    };
    
    this.state.savedTemplates.push(template);
    localStorage.setItem('alloy_templates', JSON.stringify(this.state.savedTemplates));
    alert('✅ Template saved successfully!');
    this.render();
  }
  
  loadTemplate(templateId) {
    const template = this.state.savedTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    // Set form data
    this.state.formData = { ...template.formData };
    
    // Update UI
    Object.keys(template.formData).forEach(fieldName => {
      const inputElement = document.querySelector(`[data-field-name="${fieldName}"]`);
      if (inputElement) {
        inputElement.value = template.formData[fieldName];
      }
    });
    
    document.getElementById('templates-modal')?.remove();
    alert('✅ Template loaded successfully!');
  }
  
  deleteTemplate(templateId) {
    if (!confirm('Are you sure you want to delete this template?')) return;
    
    this.state.savedTemplates = this.state.savedTemplates.filter(t => t.id !== templateId);
    localStorage.setItem('alloy_templates', JSON.stringify(this.state.savedTemplates));
    this.render();
  }
  
  loadRecentActivity() {
    try {
      this.state.recentActivity = JSON.parse(localStorage.getItem('alloy_recent_activity') || '[]');
    } catch {
      this.state.recentActivity = [];
    }
  }
  
  addToRecentActivity(action, connector, result) {
    const activity = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      connectorName: connector.name,
      connectorId: connector.id,
      actionName: action.name || action.displayName,
      actionId: action.id,
      success: result.success,
      formData: { ...this.state.formData }
    };
    
    this.state.recentActivity.unshift(activity);
    this.state.recentActivity = this.state.recentActivity.slice(0, 10);
    localStorage.setItem('alloy_recent_activity', JSON.stringify(this.state.recentActivity));
  }
  
  async rerunActivity(activityId) {
    const activity = this.state.recentActivity.find(a => a.id === activityId);
    if (!activity) return;
    
    // Find connector
    const connector = this.state.connectors.find(c => c.id === activity.connectorId);
    if (!connector) {
      alert('Connector not found');
      return;
    }
    
    // Load the connector and action
    await this.selectConnector(connector);
    
    // Load resources and find the action
    const resource = this.state.resources.find(r => 
      r.actions?.some(a => a.id === activity.actionId)
    );
    
    if (resource) {
      const action = resource.actions.find(a => a.id === activity.actionId);
      if (action) {
        await this.selectAction(action, resource);
        
        // Load the saved form data
        this.state.formData = { ...activity.formData };
        
        // Update UI
        setTimeout(() => {
          Object.keys(activity.formData).forEach(fieldName => {
            const inputElement = document.querySelector(`[data-field-name="${fieldName}"]`);
            if (inputElement) {
              inputElement.value = activity.formData[fieldName];
            }
          });
        }, 100);
      }
    }
  }
  
  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.render();
  }
  
  async loadConnectors() {
    this.setState({ loading: true });
    
    try {
      const response = await API.call('/connectors', 'GET', null, false);
      const connectorList = response.connectors || response.data || response || [];
      
      const withStatus = await Promise.all(
        connectorList.map(async (conn) => {
          try {
            const credResponse = await API.call(`/connectors/${conn.id}/credentials`, 'GET', null, true);
            const creds = credResponse.credentials || credResponse.data || [];
            return { 
              ...conn, 
              credentialStatus: creds.length > 0 ? 'connected' : 'not_connected',
              credentialCount: creds.length,
              credentials: creds
            };
          } catch {
            return { 
              ...conn, 
              credentialStatus: 'not_connected',
              credentialCount: 0,
              credentials: []
            };
          }
        })
      );
      
      this.setState({ connectors: withStatus, loading: false });
    } catch (error) {
      console.error('Failed to load connectors:', error);
      this.setState({ loading: false });
    }
  }
  
  async selectConnector(connector) {
    this.setState({ 
      selectedConnector: connector, 
      step: 2, 
      loading: true 
    });
    
    try {
      const response = await API.call(`/connectors/${connector.id}/resources`, 'GET', null, false);
      this.setState({ 
        resources: response.resources || response.data || [], 
        loading: false 
      });
    } catch (error) {
      console.error('Failed to load resources:', error);
      this.setState({ loading: false });
    }
  }
  
  async selectAction(action, resource) {
    console.log('🎯 selectAction called with:', action);
    this.setState({ loading: true, step: 3 });
    
    try {
      console.log('📡 Fetching action metadata...');
      const response = await API.call(
        `/connectors/${this.state.selectedConnector.id}/actions/${action.id}`, 
        'GET', 
        null, 
        false
      );
      
      console.log('📦 Raw API response:', response);
      
      const fullAction = response.action || response.data || response;
      console.log('🔍 Full action data:', fullAction);
      
      const schema = SchemaParser.parseActionSchema(fullAction);
      console.log('📋 Parsed schema:', schema);
      
      this.setState({
        actionSchema: schema,
        selectedAction: { ...fullAction, resource },
        formData: {},
        loading: false
      });
    } catch (error) {
      console.error('❌ Failed to load action metadata:', error);
      console.log('⚠️ Falling back to basic action data');
      
      const schema = SchemaParser.parseActionSchema(action);
      console.log('📋 Fallback parsed schema:', schema);
      
      this.setState({
        actionSchema: schema,
        selectedAction: { ...action, resource },
        formData: {},
        loading: false
      });
    }
  }
  
  updateFormData(fieldName, value) {
    this.state.formData[fieldName] = value;
    console.log('Form data updated:', fieldName, '=', value);
  }
  
  autoFillForm() {
    if (!this.state.actionSchema) return;
    
    const allFields = [...this.state.actionSchema.requiredFields, ...this.state.actionSchema.optionalFields];
    const newFormData = {};
    
    allFields.forEach(field => {
      if (field.type !== 'select' || !field.options) {
        const sampleValue = DemoDataGenerator.generate(field);
        newFormData[field.name] = sampleValue;
        
        const inputElement = document.querySelector(`[data-field-name="${field.name}"]`);
        if (inputElement) {
          inputElement.value = sampleValue;
          inputElement.style.background = '#f0fdf4';
          setTimeout(() => {
            inputElement.style.background = '';
          }, 500);
        }
      }
    });
    
    this.state.formData = newFormData;
    console.log('✨ Form auto-filled with sample data');
  }
  
  async executeAction() {
    const { actionSchema, formData, selectedConnector, selectedAction } = this.state;
    
    const missingFields = actionSchema.requiredFields.filter(
      field => !formData[field.name] || formData[field.name] === ''
    );
    
    if (missingFields.length > 0) {
      alert(`Please fill in: ${missingFields.map(f => f.displayName).join(', ')}`);
      return;
    }
    
    this.setState({ step: 4, loading: true });
    
    try {
      let credential;
      try {
        const credResponse = await API.call(
          `/connectors/${selectedConnector.id}/credentials`, 
          'GET', 
          null, 
          true
        );
        const creds = credResponse.credentials || credResponse.data || [];
        
        if (creds.length === 0) {
          console.log('No credentials found, starting OAuth flow');
          await this.startOAuthFlow(selectedConnector.id);
          
          const retryCredResponse = await API.call(
            `/connectors/${selectedConnector.id}/credentials`, 
            'GET', 
            null, 
            true
          );
          const retryCreds = retryCredResponse.credentials || retryCredResponse.data || [];
          
          if (retryCreds.length === 0) {
            throw new Error('Authentication was not completed. Please try again.');
          }
          credential = retryCreds[0];
        } else {
          credential = creds[0];
        }
      } catch (error) {
        if (error.message.includes('401') || error.message.includes('403') || error.message.includes('404')) {
          console.log('Starting OAuth flow due to auth error');
          await this.startOAuthFlow(selectedConnector.id);
          
          const retryCredResponse = await API.call(
            `/connectors/${selectedConnector.id}/credentials`, 
            'GET', 
            null, 
            true
          );
          const retryCreds = retryCredResponse.credentials || retryCredResponse.data || [];
          
          if (retryCreds.length === 0) {
            throw new Error('Authentication was not completed. Please try again.');
          }
          credential = retryCreds[0];
        } else {
          throw error;
        }
      }
      
      const request = SchemaParser.buildRequest(actionSchema, formData);
      request.credentialId = credential.credentialId || credential.id;
      request.additionalHeaders = {};
      
      const response = await API.call(
        `/connectors/${selectedConnector.id}/actions/${selectedAction.id}/execute`,
        'POST',
        request,
        true
      );
      
      this.setState({ 
        result: { success: true, data: response },
        step: 5,
        loading: false
      });
      
      this.addToRecentActivity(selectedAction, selectedConnector, { success: true });
    } catch (error) {
      this.setState({ 
        result: { success: false, error: error.message },
        step: 5,
        loading: false
      });
      
      this.addToRecentActivity(selectedAction, selectedConnector, { success: false });
    }
  }
  
  async startOAuthFlow(connectorId) {
    return new Promise((resolve, reject) => {
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      
      const connector = this.state.connectors.find(c => c.id === connectorId) || this.state.selectedConnector;
      const connectorName = connector?.name || connectorId;
      
      modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
          <h3 class="text-xl font-bold mb-4">Authenticate with ${connectorName}</h3>
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <strong class="text-yellow-700">Authentication Required</strong>
            <p class="text-yellow-600">You need to authenticate with ${connectorName} before using this action.</p>
          </div>
          <div class="text-center">
            <p class="mb-4">Click the button below to authenticate:</p>
            <button id="start-oauth-btn" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4">
              🔐 Authenticate with ${connectorName}
            </button>
            <button id="cancel-oauth-btn" class="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      document.getElementById('start-oauth-btn').onclick = async () => {
        try {
          const config = Config.getConfig();
          const credentialRequest = {
            userId: config.userId,
            authenticationType: 'oauth2',
            redirectUri: window.location.origin + '/oauth-callback'
          };
          
          const oauthResponse = await API.call(
            `/connectors/${connectorId}/credentials`,
            'POST',
            credentialRequest,
            false
          );
          
          const authUrl = oauthResponse.oauthUrl || oauthResponse.authUrl || oauthResponse.url;
          
          if (authUrl) {
            window.open(authUrl, '_blank');
            
            modal.innerHTML = `
              <div class="bg-white rounded-lg p-8 max-w-md w-full">
                <h3 class="text-xl font-bold mb-4">Waiting for Authentication...</h3>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <strong class="text-blue-700">Complete the authentication in the popup window</strong>
                  <p class="text-blue-600">Once complete, click "I've Authenticated" below.</p>
                </div>
                <button id="check-auth-btn" class="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                  ✅ I've Authenticated
                </button>
              </div>
            `;
            
            document.getElementById('check-auth-btn').onclick = async () => {
              try {
                const credResponse = await API.call(
                  `/connectors/${connectorId}/credentials`,
                  'GET',
                  null,
                  true
                );
                const creds = credResponse.credentials || credResponse.data || [];
                
                if (creds.length > 0) {
                  document.body.removeChild(modal);
                  await this.loadConnectors();
                  resolve();
                } else {
                  alert('Authentication not complete yet. Please complete the OAuth flow and try again.');
                }
              } catch (error) {
                alert(`Error checking authentication: ${error.message}`);
              }
            };
          } else {
            throw new Error('No OAuth URL returned');
          }
        } catch (error) {
          alert(`Authentication error: ${error.message}`);
          document.body.removeChild(modal);
          reject(error);
        }
      };
      
      document.getElementById('cancel-oauth-btn').onclick = () => {
        document.body.removeChild(modal);
        reject(new Error('Authentication cancelled'));
      };
    });
  }
  
  showConnectionsModal() {
    const modalHtml = UI.renderConnectionsModal(this.state.connectors);
    const existingModal = document.getElementById('connections-modal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
  
  showCredentialModal(connectorIdx) {
    const connector = this.state.connectors[connectorIdx];
    this.showCredentialModalById(connector.id);
  }
  
  showCredentialModalById(connectorId) {
    const connector = this.state.connectors.find(c => c.id === connectorId);
    if (!connector) return;
    
    const modalHtml = UI.renderCredentialModal(connector);
    const existingModal = document.getElementById('credential-modal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    document.getElementById('close-credential-modal').onclick = () => {
      document.getElementById('credential-modal').remove();
    };
  }
  
  async testConnection(connectorId) {
    const connector = this.state.connectors.find(c => c.id === connectorId);
    if (!connector) return;
    
    document.getElementById('credential-modal')?.remove();
    
    const loadingModal = document.createElement('div');
    loadingModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loadingModal.innerHTML = `
      <div class="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <h3 class="text-xl font-bold mb-4">Testing ${connector.name} Connection...</h3>
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    `;
    document.body.appendChild(loadingModal);
    
    try {
      await API.call(`/connectors/${connectorId}/resources`, 'GET', null, false);
      loadingModal.remove();
      
      const successModal = document.createElement('div');
      successModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      successModal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <strong class="text-green-700">✅ Connection Successful!</strong>
            <p class="text-green-600">${connector.name} is connected and working properly.</p>
          </div>
          <button onclick="this.closest('.fixed').remove()" class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Close
          </button>
        </div>
      `;
      document.body.appendChild(successModal);
      
      successModal.onclick = (e) => {
        if (e.target.classList.contains('fixed')) successModal.remove();
      };
    } catch (error) {
      loadingModal.remove();
      
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      errorModal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <strong class="text-red-700">❌ Connection Test Failed</strong>
            <p class="text-red-600">${error.message}</p>
          </div>
          <button onclick="this.closest('.fixed').remove()" class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Close
          </button>
        </div>
      `;
      document.body.appendChild(errorModal);
      
      errorModal.onclick = (e) => {
        if (e.target.classList.contains('fixed')) errorModal.remove();
      };
    }
  }
  
  async reconnectCredential(connectorId) {
    document.getElementById('credential-modal')?.remove();
    
    try {
      await this.startOAuthFlow(connectorId);
      await this.loadConnectors();
      alert('✅ Reconnected successfully!');
    } catch (error) {
      alert(`Error reconnecting: ${error.message}`);
    }
  }
  
  async disconnectCredential(connectorId, credentialId) {
    if (!confirm('Are you sure you want to disconnect? This cannot be undone.')) {
      return;
    }
    
    document.getElementById('credential-modal')?.remove();
    
    const loadingModal = document.createElement('div');
    loadingModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loadingModal.innerHTML = `
      <div class="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <h3 class="text-xl font-bold mb-4">Disconnecting...</h3>
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    `;
    document.body.appendChild(loadingModal);
    
    try {
      await API.call(`/connectors/${connectorId}/credentials/${credentialId}`, 'DELETE', null, true);
      loadingModal.remove();
      await this.loadConnectors();
      alert('✅ Disconnected successfully!');
    } catch (error) {
      loadingModal.remove();
      alert(`Error disconnecting: ${error.message}`);
    }
  }
  
  async connectPlatform(connectorId) {
    document.getElementById('credential-modal')?.remove();
    
    try {
      await this.startOAuthFlow(connectorId);
      await this.loadConnectors();
      alert('✅ Connected successfully!');
    } catch (error) {
      alert(`Error connecting: ${error.message}`);
    }
  }
  
  toggleApiInspector() {
    this.setState({ apiInspectorCollapsed: !this.state.apiInspectorCollapsed });
  }
  
  reset() {
    this.setState({
      step: 1,
      selectedConnector: null,
      resources: [],
      selectedAction: null,
      actionSchema: null,
      formData: {},
      result: null
    });
    this.loadConnectors();
  }
  
  clearApiHistory() {
    API.clearHistory();
  }
  
  render() {
    const root = document.getElementById('root');
    if (!root) return;
    
    const connectedCount = this.state.connectors.filter(c => c.credentialStatus === 'connected').length;
    
    root.innerHTML = `
      ${UI.renderConnectionsButton(connectedCount, this.state.connectors.length)}
      ${UI.renderApiInspector(API.callHistory, this.state.apiInspectorCollapsed)}
      <div class="max-w-6xl mx-auto p-6">
        ${UI.renderHeader(
          this.state.demoMode, 
          API.callHistory.length, 
          connectedCount,
          this.state.darkMode,
          this.state.savedTemplates.length,
          this.state.recentActivity.length
        )}
        ${UI.renderStepIndicator(this.state.step)}
        ${this.renderContent()}
        ${this.state.showConfig ? UI.renderConfigModal() : ''}
      </div>
    `;
    
    this.attachEventListeners();
  }
  
  renderContent() {
    const { step, loading, connectors, selectedConnector, resources, actionSchema, selectedAction, formData, result } = this.state;
    
    if (step === 1) return UI.renderConnectors(
      connectors, 
      loading, 
      this.state.searchQuery, 
      this.state.categoryFilter,
      this.state.recentActivity
    );
    if (step === 2) return UI.renderResources(selectedConnector, resources, loading);
    if (step === 3 && actionSchema) return UI.renderActionForm(
      actionSchema, 
      selectedAction, 
      formData,
      this.state.savedTemplates,
      selectedConnector
    );
    if (step === 4) return UI.renderExecuting();
    if (step === 5 && result) return UI.renderResult(result, this.state.responseViewMode);
    
    return '';
  }
  
  attachEventListeners() {
    // Header buttons
    document.getElementById('reset-btn')?.addEventListener('click', () => this.reset());
    document.getElementById('dark-mode-btn')?.addEventListener('click', () => this.toggleDarkMode());
    
    // ADD THIS LINE:
    document.getElementById('theme-btn')?.addEventListener('click', () => cycleTheme());
    
    document.getElementById('templates-btn')?.addEventListener('click', () => {
      const modalHtml = UI.renderTemplatesModal(this.state.savedTemplates);
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    });
  
    // Connections button
    document.getElementById('connections-btn')?.addEventListener('click', () => this.showConnectionsModal());
    
    // API Inspector toggle
    document.getElementById('api-inspector-header')?.addEventListener('click', () => this.toggleApiInspector());
    
    // Search and filter
    document.getElementById('connector-search')?.addEventListener('input', (e) => {
      this.state.searchQuery = e.target.value.toLowerCase();
      this.render();
    });
    
    document.getElementById('category-filter')?.addEventListener('change', (e) => {
      this.state.categoryFilter = e.target.value;
      this.render();
    });
    
    // Response view mode
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.state.responseViewMode = e.target.dataset.mode;
        this.render();
      });
    });
    
    // Config modal
    document.getElementById('save-config-btn')?.addEventListener('click', () => {
      const apiKey = document.getElementById('config-api-key').value.trim();
      const userId = document.getElementById('config-user-id').value.trim();
      if (apiKey && userId) {
        Config.saveConfig(apiKey, userId);
        this.setState({ showConfig: false });
        this.loadConnectors();
      }
    });
    
    // Connector selection
    document.querySelectorAll('.connector-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.connectorIdx);
        this.selectConnector(this.state.connectors[idx]);
      });
    });
    
    // Recent activity
    document.querySelectorAll('.rerun-activity').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const activityId = btn.dataset.activityId;
        this.rerunActivity(activityId);
      });
    });
    
    // Action selection
    document.querySelectorAll('.action-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const resourceIdx = parseInt(select.dataset.resourceIdx);
        const actionIdx = parseInt(e.target.value);
        if (!isNaN(actionIdx)) {
          const resource = this.state.resources[resourceIdx];
          const action = resource.actions[actionIdx];
          this.selectAction(action, resource);
        }
      });
    });
    
    // Form fields
    document.querySelectorAll('.field-input').forEach(input => {
      const fieldName = input.dataset.fieldName;
      
      input.addEventListener('input', (e) => {
        this.updateFormData(fieldName, e.target.value);
      });
      
      input.addEventListener('change', (e) => {
        this.updateFormData(fieldName, e.target.value);
      });
    });
    
    // Form buttons
    document.getElementById('autofill-btn')?.addEventListener('click', () => this.autoFillForm());
    document.getElementById('save-template-btn')?.addEventListener('click', () => this.saveTemplate());
    document.getElementById('execute-btn')?.addEventListener('click', () => this.executeAction());
    document.getElementById('try-again-btn')?.addEventListener('click', () => this.reset());
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initTheme(); // Initialize theme first
    window.alloyDemo = new AlloyDemo();
  }, 100);
});