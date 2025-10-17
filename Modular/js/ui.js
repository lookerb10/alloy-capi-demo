// ui.js - UI Components Module (FINAL ENHANCED)
import { SchemaParser } from './schemaParser.js';
import { API } from './api.js';
import { getCurrentTheme } from './themes.js'; // ADD THIS LINE

export const UI = {
  renderStepIndicator(currentStep) {
    const steps = [
      { num: 1, name: 'Platform' },
      { num: 2, name: 'Resource' },
      { num: 3, name: 'Configure' },
      { num: 4, name: 'Execute' },
      { num: 5, name: 'Result' }
    ];
    
    return `
      <div class="flex items-center justify-between mb-8 max-w-4xl mx-auto">
        ${steps.map((step, idx) => `
          <div class="flex items-center ${idx < steps.length - 1 ? 'flex-1' : ''}">
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                step.num < currentStep ? 'bg-green-500 text-white' :
                step.num === currentStep ? 'badge-primary' :
                'bg-gray-200 text-gray-600'
              }">
                ${step.num < currentStep ? '✓' : step.num}
              </div>
              <span class="text-xs mt-1 font-medium">${step.name}</span>
            </div>
            ${idx < steps.length - 1 ? `
              <div class="flex-1 h-0.5 mx-2 ${
                step.num < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }"></div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  },
  
  renderHeader(demoMode, apiCallCount, connectedCount, darkMode, templateCount, activityCount) {
    return `
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-3xl font-bold mb-2">Alloy Connectivity API Demo</h1>
            <p class="text-gray-600">Universal schema-driven integration platform</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1">
              <span class="w-2 h-2 bg-green-500 rounded-full pulse"></span>
              Live API
            </span>
          </div>
        </div>
        <div class="flex gap-3 flex-wrap items-center">
          <button id="reset-btn" class="px-4 py-2 btn-primary rounded-md flex items-center gap-2 font-medium">
            🔄 Reset Demo
          </button>
          <button id="dark-mode-btn" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
            ${darkMode ? '☀️ Light' : '🌙 Dark'}
            <span class="kbd">⌘D</span>
          </button>
          <button id="theme-btn" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
            🎨 Theme
            <span class="kbd">T</span>
          </button>
        </div>
      </div>
    `;
  },
  
  renderConnectionsButton(connectedCount, totalCount) {
    return `
      <button id="connections-btn" class="fixed top-5 left-5 z-50 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
        <span>🔌</span>
        <span class="font-medium">Connections</span>
        <span class="px-2 py-0.5 rounded-full badge-primary text-xs font-bold">${connectedCount}/${totalCount}</span>
      </button>
    `;
  },
  
  renderConnectors(connectors, loading, searchQuery = '', categoryFilter = 'all', recentActivity = []) {
    const currentTheme = getCurrentTheme();
    
    // Route to theme-specific layout
    if (currentTheme === 'theme-enterprise') {
      return this.renderConnectorsEnterprise(connectors, loading, searchQuery, categoryFilter);
    }
    if (currentTheme === 'theme-minimal') {
      return this.renderConnectorsMinimal(connectors, loading, searchQuery, categoryFilter);
    }
    if (currentTheme === 'theme-developer') {
      return this.renderConnectorsDeveloper(connectors, loading, searchQuery, categoryFilter);
    }
    
    // DEFAULT: Original Alloy Blue theme - YOUR EXACT CODE PRESERVED
    if (loading) {
      return `
        <div class="bg-white rounded-lg border p-12 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style="border-bottom-color: var(--alloy-blue);"></div>
          <p class="mt-4 text-gray-600">Loading connectors...</p>
        </div>
      `;
    }
    
    const categories = ['all', ...new Set(connectors.flatMap(c => c.category || []))];
    let filteredConnectors = connectors;
    
    if (searchQuery) {
      filteredConnectors = filteredConnectors.filter(c => 
        c.name.toLowerCase().includes(searchQuery) ||
        (c.category || []).some(cat => cat.toLowerCase().includes(searchQuery))
      );
    }
    
    if (categoryFilter !== 'all') {
      filteredConnectors = filteredConnectors.filter(c => 
        (c.category || []).includes(categoryFilter)
      );
    }
    
    return `
      <div class="space-y-6">
        ${recentActivity.length > 0 ? `
          <div class="rounded-lg border p-4" style="background: linear-gradient(135deg, rgba(33, 43, 196, 0.05), rgba(33, 43, 196, 0.1)); border-color: rgba(33, 43, 196, 0.2);">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <span>⏱️</span>
              <span>Recent Activity</span>
              <span class="text-xs text-gray-600 ml-auto">${recentActivity.length} total</span>
            </h3>
            <div class="space-y-2">
              ${recentActivity.slice(0, 5).map(activity => `
                <div class="bg-white rounded-lg p-3 flex items-center justify-between hover:shadow-md transition-shadow border border-gray-200">
                  <div class="flex items-center gap-3 flex-1 min-w-0">
                    <span class="text-2xl flex-shrink-0">${activity.success ? '✅' : '❌'}</span>
                    <div class="flex-1 min-w-0">
                      <div class="font-medium text-sm text-gray-900">${activity.connectorName} - ${activity.actionName}</div>
                      <div class="text-xs text-gray-600">${new Date(activity.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                  <button class="rerun-activity px-3 py-1 text-sm border rounded hover:bg-gray-50 flex-shrink-0 font-medium" style="border-color: var(--alloy-blue); color: var(--alloy-blue);" data-activity-id="${activity.id}">
                    🔄 Run Again
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <div class="bg-white rounded-lg border p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold">1. Choose Integration Platform</h2>
            <div class="text-sm text-gray-500">
              ${filteredConnectors.filter(c => c.credentialStatus === 'connected').length} connected
            </div>
          </div>
          
          <div class="mb-6 space-y-4">
            <div class="relative">
              <input 
                type="text" 
                id="connector-search" 
                placeholder="Search connectors... (⌘K)" 
                class="w-full px-4 py-2 pl-10 border rounded-lg"
                value="${searchQuery}"
              >
              <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            
            <div class="flex gap-2 flex-wrap">
              ${categories.map(cat => `
                <button 
                  class="px-3 py-1 rounded-full text-sm font-medium ${
                    categoryFilter === cat 
                      ? 'badge-primary' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }"
                  onclick="window.alloyDemo.state.categoryFilter='${cat}'; window.alloyDemo.render();"
                >
                  ${cat === 'all' ? '📋 All' : cat}
                </button>
              `).join('')}
            </div>
          </div>
          
          <p class="text-gray-600 mb-4 text-sm">
            Showing <strong>${filteredConnectors.length}</strong> of <strong>${connectors.length}</strong> connectors
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${filteredConnectors.map((connector, idx) => {
              const originalIdx = connectors.indexOf(connector);
              return `
                <div data-connector-idx="${originalIdx}" class="connector-card border-2 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all relative" style="border-color: #e5e7eb;">
                  <div class="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded cursor-pointer transition-all hover:scale-105 ${
                    connector.credentialStatus === 'connected' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }" onclick="event.stopPropagation(); window.alloyDemo.showCredentialModal(${originalIdx})">
                    ${connector.credentialStatus === 'connected' ? '✓ Connected' : '🔒 Connect'}
                  </div>
                  <div class="flex items-center gap-3">
                    ${connector.icon ? 
                      `<img src="${connector.icon}" alt="${connector.name}" class="w-12 h-12 rounded-lg">` :
                      `<div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center font-bold">${connector.name.charAt(0)}</div>`
                    }
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-base truncate">${connector.name}</h3>
                      <p class="text-xs text-gray-600 truncate">${connector.category?.join(', ') || 'Integration'}</p>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          
          ${filteredConnectors.length === 0 ? `
            <div class="text-center py-12 text-gray-500">
              <p class="text-lg mb-2">No connectors found</p>
              <p class="text-sm mb-4">Try adjusting your search or filters</p>
              <button onclick="document.getElementById('connector-search').value=''; window.alloyDemo.state.searchQuery=''; window.alloyDemo.state.categoryFilter='all'; window.alloyDemo.render();" class="px-4 py-2 btn-primary rounded-md">
                Clear Filters
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },
  // ADD THESE 3 NEW METHODS AFTER renderConnectors():

  renderConnectorsEnterprise(connectors, loading, searchQuery, categoryFilter) {
    if (loading) {
      return `
        <div class="bg-white rounded-lg border p-12 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style="border-bottom-color: #0f766e;"></div>
          <p class="mt-4 text-gray-600">Loading connectors...</p>
        </div>
      `;
    }

    const categories = ['all', ...new Set(connectors.flatMap(c => c.category || []))];
    let filteredConnectors = connectors;
    
    if (searchQuery) {
      filteredConnectors = filteredConnectors.filter(c => 
        c.name.toLowerCase().includes(searchQuery)
      );
    }
    
    if (categoryFilter !== 'all') {
      filteredConnectors = filteredConnectors.filter(c => 
        (c.category || []).includes(categoryFilter)
      );
    }

    return `
      <div class="page-container">
        <div class="sidebar">
          <h1>Integrations</h1>
          
          <input 
            type="text" 
            id="connector-search"
            placeholder="Search..."
            style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; margin: 20px 0;"
            value="${searchQuery}"
          />
          
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 12px;">
            Categories
          </div>
          <div class="space-y-1">
            ${categories.map(cat => `
              <div 
                class="category-item px-4 py-2 rounded-lg cursor-pointer ${categoryFilter === cat ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-100'}"
                onclick="window.alloyDemo.state.categoryFilter='${cat}'; window.alloyDemo.render();"
              >
                ${cat === 'all' ? 'All Integrations' : cat}
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="main-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
            <div>
              <h2 style="font-size: 1.75rem; font-weight: 600; color: #0f172a; margin-bottom: 4px;">
                Available Integrations
              </h2>
              <p style="color: #64748b; font-size: 14px;">
                Showing ${filteredConnectors.length} of ${connectors.length} connectors
              </p>
            </div>
            <div style="display: flex; gap: 24px; font-size: 14px;">
              <div>
                <div style="font-size: 24px; font-weight: 700; color: #0f766e;">${filteredConnectors.filter(c => c.credentialStatus === 'connected').length}</div>
                <div style="color: #64748b;">Connected</div>
              </div>
              <div>
                <div style="font-size: 24px; font-weight: 700; color: #64748b;">${filteredConnectors.length}</div>
                <div style="color: #64748b;">Total</div>
              </div>
            </div>
          </div>
          
          <div class="connector-grid">
            ${filteredConnectors.map((connector) => {
              const originalIdx = connectors.indexOf(connector);
              return `
                <div class="connector-card" data-connector-idx="${originalIdx}">
                  ${connector.icon ? 
                    `<img src="${connector.icon}" alt="${connector.name}" style="width: 32px; height: 32px; border-radius: 4px;">` :
                    `<div style="width: 32px; height: 32px; background: #e2e8f0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold;">${connector.name.charAt(0)}</div>`
                  }
                  <div style="flex: 1; min-width: 0;">
                    <div style="font-weight: 600; font-size: 15px; color: #0f172a;">${connector.name}</div>
                    <div style="font-size: 13px; color: #64748b;">${connector.category?.[0] || 'Integration'}</div>
                  </div>
                  <div style="font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 6px; ${connector.credentialStatus === 'connected' ? 'background: #dcfce7; color: #166534;' : 'background: #f1f5f9; color: #64748b;'}">
                    ${connector.credentialStatus === 'connected' ? '✓ Active' : 'Inactive'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderConnectorsMinimal(connectors, loading, searchQuery, categoryFilter) {
    if (loading) {
      return `
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto" style="border-bottom-color: #8b5cf6;"></div>
          <p class="mt-4 text-gray-600">Loading connectors...</p>
        </div>
      `;
    }

    let filteredConnectors = connectors;
    
    if (searchQuery) {
      filteredConnectors = filteredConnectors.filter(c => 
        c.name.toLowerCase().includes(searchQuery)
      );
    }
    
    if (categoryFilter !== 'all') {
      filteredConnectors = filteredConnectors.filter(c => 
        (c.category || []).includes(categoryFilter)
      );
    }

    return `
      <div>
        <h1>Integrations</h1>
        <p class="subtitle">Connect your favorite apps in seconds</p>
        
        <div class="connector-grid">
          ${filteredConnectors.map((connector) => {
            const originalIdx = connectors.indexOf(connector);
            return `
              <div class="connector-card" data-connector-idx="${originalIdx}">
                ${connector.icon ? 
                  `<img src="${connector.icon}" alt="${connector.name}" style="width: 80px !important; height: 80px !important; margin: 0 auto 24px !important; border-radius: 16px;">` :
                  `<div style="width: 80px; height: 80px; background: #e5e7eb; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 32px; margin: 0 auto 24px;">${connector.name.charAt(0)}</div>`
                }
                <h3>${connector.name}</h3>
                <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">${connector.category?.[0] || 'Integration'}</p>
                <div style="font-size: 13px; font-weight: 700; padding: 10px 20px; border-radius: 12px; display: inline-block; ${connector.credentialStatus === 'connected' ? 'background: linear-gradient(135deg, #10b981, #059669); color: white;' : 'background: #f3f4f6; color: #6b7280;'}">
                  ${connector.credentialStatus === 'connected' ? '✓ Connected' : 'Connect'}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  renderConnectorsDeveloper(connectors, loading, searchQuery, categoryFilter) {
    if (loading) {
      return `
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style="border-bottom-color: #00ff41;"></div>
          <p class="mt-4" style="color: #00ff41;">LOADING CONNECTORS...</p>
        </div>
      `;
    }

    let filteredConnectors = connectors;
    
    if (searchQuery) {
      filteredConnectors = filteredConnectors.filter(c => 
        c.name.toLowerCase().includes(searchQuery)
      );
    }
    
    if (categoryFilter !== 'all') {
      filteredConnectors = filteredConnectors.filter(c => 
        (c.category || []).includes(categoryFilter)
      );
    }

    return `
      <div class="page-container">
        <h1>alloy-integrations --list</h1>
        
        <div style="padding: 16px 24px; border-bottom: 1px solid #1a2332; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 13px;">
            <span style="color: #6b7280;">Found</span> 
            <span style="color: #00ff41; font-weight: bold;">${filteredConnectors.length}</span> 
            <span style="color: #6b7280;">integrations</span>
          </div>
        </div>
        
        <div class="connector-grid">
          ${filteredConnectors.map((connector, idx) => {
            const originalIdx = connectors.indexOf(connector);
            return `
              <div class="connector-card" data-connector-idx="${originalIdx}">
                <span style="color: #6b7280; font-size: 11px; width: 40px;">${String(idx + 1).padStart(3, '0')}</span>
                ${connector.icon ? 
                  `<img src="${connector.icon}" alt="${connector.name}" style="width: 20px; height: 20px;">` :
                  `<div style="width: 20px; height: 20px; background: #1a2332; border-radius: 2px;"></div>`
                }
                <div style="flex: 1; min-width: 0;">
                  <span style="font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${connector.name}</span>
                </div>
                <span class="status-badge ${connector.credentialStatus === 'connected' ? 'status-connected' : 'status-disconnected'}">
                  ${connector.credentialStatus === 'connected' ? '[ONLINE]' : '[OFFLINE]'}
                </span>
                <span style="color: #6b7280; font-size: 11px;">${(connector.category?.[0] || 'INTEGRATION').toUpperCase()}</span>
              </div>
            `;
          }).join('')}
        </div>
        
        <div style="padding: 16px 24px; border-top: 1px solid #1a2332; font-size: 12px; color: #6b7280;">
          <span style="color: #00ff41;">$</span> Press [T] to cycle themes | 
          <span style="color: #00ff41;">${filteredConnectors.filter(c => c.credentialStatus === 'connected').length}</span> active connections
        </div>
      </div>
    `;
  },
  
  renderResources(selectedConnector, resources, loading) {
    return `
      <div class="bg-white rounded-lg border p-6">
        <h2 class="text-2xl font-bold mb-4">2. Select Resource & Action</h2>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <div class="flex items-center gap-2">
            <span class="font-semibold">Platform:</span>
            <span>${selectedConnector.name}</span>
            ${selectedConnector.credentialStatus === 'connected' ? 
              '<span class="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Connected</span>' :
              '<span class="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">⚠ Not Connected</span>'
            }
          </div>
        </div>
        ${loading ? `
          <div class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style="border-bottom-color: var(--alloy-blue);"></div>
            <p class="mt-4 text-gray-600">Loading resources...</p>
          </div>
        ` : `
          <div class="space-y-4">
            ${resources.map((resource, idx) => `
              <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="font-semibold text-lg">${resource.displayName || resource.name}</h3>
                    ${resource.description ? `<p class="text-sm text-gray-600 mt-1">${resource.description}</p>` : ''}
                  </div>
                  <span class="text-xs bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">${resource.actions?.length || 0} actions</span>
                </div>
                <select data-resource-idx="${idx}" class="action-select w-full px-3 py-2 border rounded-md font-medium">
                  <option value="">Choose an action...</option>
                  ${resource.actions?.map((action, actionIdx) => `
                    <option value="${actionIdx}">
                      [${SchemaParser.detectHttpMethod(action)}] ${action.name}
                    </option>
                  `).join('')}
                </select>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  },
  
  renderActionForm(actionSchema, selectedAction, formData, savedTemplates = [], selectedConnector) {
    return `
      <div class="bg-white rounded-lg border p-6">
        <h2 class="text-2xl font-bold mb-4">3. Configure Action</h2>
        <div class="mb-6">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="inline-block px-2 py-1 text-xs font-bold rounded text-white ${
                actionSchema.method === 'GET' ? 'bg-green-500' :
                actionSchema.method === 'POST' ? 'bg-blue-500' :
                actionSchema.method === 'PUT' ? 'bg-yellow-500' :
                'bg-red-500'
              }">
                ${actionSchema.method}
              </span>
              <span class="font-semibold text-lg">${selectedAction.displayName || selectedAction.name}</span>
            </div>
          </div>
          ${selectedAction.description ? `
            <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">${selectedAction.description}</p>
          ` : ''}
        </div>
        
        ${actionSchema.requiredFields.length === 0 && actionSchema.optionalFields.length === 0 ? `
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <strong class="text-yellow-700">⚠️ No Schema Available</strong>
            <p class="text-yellow-600 text-sm mt-1">This action doesn't provide field definitions via the API.</p>
          </div>
        ` : ''}
        
        ${actionSchema.requiredFields.length > 0 ? `
          <div class="mb-6">
            <h3 class="font-semibold mb-4 text-base flex items-center gap-2 border-b pb-2">
              <span>Required Fields</span>
              <span class="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">${actionSchema.requiredFields.length}</span>
            </h3>
            ${actionSchema.requiredFields.map(field => this.renderFormField(field, formData[field.name] || '')).join('')}
          </div>
        ` : ''}
        
        ${actionSchema.optionalFields.length > 0 ? `
          <div class="mb-6">
            <details class="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <summary class="font-semibold cursor-pointer hover:text-blue-600 flex items-center gap-2">
                <span class="mr-2">▶</span>
                <span>Optional Fields</span>
                <span class="text-xs bg-gray-100 px-2 py-0.5 rounded-full">${actionSchema.optionalFields.length}</span>
              </summary>
              <div class="mt-4 pt-4 border-t">
                ${actionSchema.optionalFields.map(field => this.renderFormField(field, formData[field.name] || '')).join('')}
              </div>
            </details>
          </div>
        ` : ''}
        
        <div class="flex gap-2 flex-wrap">
          <button id="autofill-btn" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all font-medium">
            ✨ Fill Example Data
          </button>
          <button id="execute-btn" class="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all font-medium ml-auto">
            ${actionSchema.method === 'GET' ? '📥 Retrieve Data' : 
              actionSchema.method === 'POST' ? '➕ Create Record' :
              actionSchema.method === 'PUT' ? '✏️ Update Record' :
              actionSchema.method === 'DELETE' ? '🗑️ Delete Record' :
              '▶️ Execute Action'}
          </button>
        </div>
      </div>
    `;
  },
  
  renderFormField(field, value) {
    if (field.type === 'select' && field.options) {
      return `
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1">
            ${field.displayName} ${field.required ? '<span class="text-red-500">*</span>' : '<span class="text-gray-400 text-xs font-normal">(optional)</span>'}
          </label>
          ${field.description ? `<p class="text-xs text-gray-500 mb-2">${field.description}</p>` : ''}
          <select data-field-name="${field.name}" class="field-input w-full px-3 py-2 border rounded-md">
            <option value="">Select ${field.displayName}</option>
            ${field.options.map(opt => `
              <option value="${opt.value}" ${value === opt.value ? 'selected' : ''}>${opt.label}</option>
            `).join('')}
          </select>
        </div>
      `;
    }
    
    if (field.type === 'textarea' || field.isArray) {
      return `
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1">
            ${field.displayName} ${field.required ? '<span class="text-red-500">*</span>' : '<span class="text-gray-400 text-xs font-normal">(optional)</span>'}
          </label>
          ${field.description ? `<p class="text-xs text-gray-500 mb-2">${field.description}</p>` : ''}
          <textarea 
            data-field-name="${field.name}" 
            class="field-input w-full px-3 py-2 border rounded-md font-mono text-sm" 
            rows="3"
            placeholder="Enter ${field.displayName.toLowerCase()}"
          >${value}</textarea>
        </div>
      `;
    }
    
    return `
      <div class="mb-4">
        <label class="block text-sm font-semibold mb-1">
          ${field.displayName} ${field.required ? '<span class="text-red-500">*</span>' : '<span class="text-gray-400 text-xs font-normal">(optional)</span>'}
        </label>
        ${field.description ? `<p class="text-xs text-gray-500 mb-2">${field.description}</p>` : ''}
        <input 
          type="${field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}"
          data-field-name="${field.name}"
          class="field-input w-full px-3 py-2 border rounded-md"
          placeholder="Enter ${field.displayName.toLowerCase()}"
          value="${value}"
        >
      </div>
    `;
  },
  
  renderExecuting() {
    return `
      <div class="bg-white rounded-lg border p-12 text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-4" style="border-bottom-color: var(--alloy-blue);"></div>
        <p class="text-lg font-semibold text-gray-700">Executing action...</p>
        <p class="text-sm text-gray-500 mt-2">This may take a few seconds</p>
      </div>
    `;
  },
  
  renderResult(result, viewMode = 'json') {
    return `
      <div class="bg-white rounded-lg border p-6">
        <h2 class="text-2xl font-bold mb-4">5. Result</h2>
        ${result.success ? `
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div class="flex items-center gap-2">
              <span class="text-2xl">✅</span>
              <div>
                <strong class="text-green-700 text-lg">Success!</strong>
                <p class="text-green-600 text-sm">Action executed successfully</p>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <div class="flex items-center justify-between">
              <div class="flex gap-2">
                <button class="view-mode-btn px-3 py-1 text-sm rounded font-medium ${viewMode === 'json' ? 'badge-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}" data-mode="json">
                  📄 JSON
                </button>
                <button class="view-mode-btn px-3 py-1 text-sm rounded font-medium ${viewMode === 'table' ? 'badge-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}" data-mode="table">
                  📊 Table
                </button>
              </div>
              <button onclick="navigator.clipboard.writeText(JSON.stringify(${JSON.stringify(result.data)}, null, 2))" class="text-xs px-3 py-1 border rounded hover:bg-gray-50">
                📋 Copy Response
              </button>
            </div>
          </div>
          
          ${this.renderResultData(result.data, viewMode)}
        ` : `
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div class="flex items-center gap-2">
              <span class="text-2xl">❌</span>
              <div>
                <strong class="text-red-700 text-lg">Error</strong>
                <p class="text-red-600">${result.error}</p>
              </div>
            </div>
          </div>
        `}
        <div class="flex gap-2 mt-6">
          <button id="try-again-btn" class="px-6 py-2 btn-primary rounded-md font-medium">
            🔄 Try Another Integration
          </button>
        </div>
      </div>
    `;
  },
  
  renderResultData(data, viewMode) {
    if (viewMode === 'json') {
      return `
        <div class="code-snippet">
          <pre class="font-mono text-sm">${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }
    
    if (viewMode === 'table') {
      // Flatten the data structure for better table view
      const flattenObject = (obj, prefix = '') => {
        const flattened = [];
        
        for (const [key, value] of Object.entries(obj)) {
          const newKey = prefix ? `${prefix}.${key}` : key;
          
          if (value === null || value === undefined) {
            flattened.push([newKey, String(value)]);
          } else if (Array.isArray(value)) {
            // For arrays, show the first few items or the whole array if small
            if (value.length === 0) {
              flattened.push([newKey, '[]']);
            } else if (value.length <= 3 && value.every(item => typeof item !== 'object')) {
              // Simple array with few items
              flattened.push([newKey, value.join(', ')]);
            } else {
              // Complex array or many items
              flattened.push([newKey, `Array (${value.length} items)`]);
              value.forEach((item, idx) => {
                if (idx < 5) { // Show first 5 items
                  if (typeof item === 'object' && item !== null) {
                    flattened.push(...flattenObject(item, `${newKey}[${idx}]`));
                  } else {
                    flattened.push([`${newKey}[${idx}]`, String(item)]);
                  }
                }
              });
              if (value.length > 5) {
                flattened.push([`${newKey}[...]`, `... ${value.length - 5} more items`]);
              }
            }
          } else if (typeof value === 'object') {
            // Nested object - flatten it
            flattened.push(...flattenObject(value, newKey));
          } else {
            // Primitive value
            flattened.push([newKey, String(value)]);
          }
        }
        
        return flattened;
      };
      
      if (typeof data === 'object' && data !== null) {
        const flatData = flattenObject(data);
        
        return `
          <div class="overflow-x-auto border rounded-lg">
            <table class="min-w-full">
              <thead style="background-color: rgba(33, 43, 196, 0.1);">
                <tr>
                  <th class="border-b px-4 py-3 text-left font-semibold text-sm" style="width: 35%;">Property</th>
                  <th class="border-b px-4 py-3 text-left font-semibold text-sm">Value</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                ${flatData.map(([key, value]) => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 font-mono text-xs align-top" style="color: var(--alloy-blue);">${key}</td>
                    <td class="px-4 py-3 text-sm align-top break-words">${value}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }
    }
    
    return `<pre class="code-snippet font-mono text-sm">${JSON.stringify(data, null, 2)}</pre>`;
  },
  
  renderConfigModal() {
    return `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
          <h3 class="text-2xl font-bold mb-2">Configure API Credentials</h3>
          <p class="text-sm text-gray-600 mb-6">Enter your Alloy API credentials to start the demo</p>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold mb-2">API Key *</label>
              <input type="password" id="config-api-key" class="w-full px-3 py-2 border rounded-md" placeholder="sk_...">
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2">User ID *</label>
              <input type="text" id="config-user-id" class="w-full px-3 py-2 border rounded-md" placeholder="user_...">
            </div>
            <button id="save-config-btn" class="w-full btn-primary py-3 px-4 rounded-md font-semibold">
              Start Demo →
            </button>
          </div>
        </div>
      </div>
    `;
  },
  
  renderApiInspector(callHistory, collapsed) {
    let totalCalls = 0;
    callHistory.forEach(call => {
      totalCalls += call.isGrouped ? call.callCount : 1;
    });

    return `
      <div class="fixed top-5 right-5 bg-white border-2 rounded-lg shadow-xl overflow-hidden z-40 transition-all ${collapsed ? 'w-48 h-16' : 'w-96 max-h-96'}">
        <div class="p-3 border-b flex items-center justify-between cursor-pointer hover:bg-gray-50" id="api-inspector-header" style="background: linear-gradient(135deg, rgba(33, 43, 196, 0.05), rgba(33, 43, 196, 0.1));">
          <div class="flex items-center gap-2">
            <span class="font-semibold">🔍 API Inspector</span>
            <span class="px-2 py-0.5 rounded badge-primary text-xs font-bold">${totalCalls}</span>
          </div>
          <div class="text-gray-600 text-xl transition-transform ${collapsed ? 'rotate-180' : ''}">▼</div>
        </div>
        ${!collapsed ? `
          <div class="overflow-y-auto max-h-80 p-3 space-y-2">
            ${callHistory.length === 0 ? `
              <div class="text-center text-gray-500 py-8 text-sm">
                <p class="mb-2">No API calls yet</p>
                <p class="text-xs">Start the demo to see live requests!</p>
              </div>
            ` : callHistory.map(call => {
              if (call.isGrouped && call.groupType === 'credential-checks') {
                const uniqueConnectors = [...new Set(call.connectors)];
                const avgDuration = Math.round(call.totalDuration / call.callCount);
                return `
                  <details class="text-xs bg-blue-50 border border-blue-200 rounded">
                    <summary class="p-2 cursor-pointer hover:bg-blue-100">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="px-2 py-0.5 rounded font-bold text-white text-xs bg-green-500">GET</span>
                        <span class="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-semibold">200</span>
                      </div>
                      <div class="font-semibold" style="color: var(--alloy-blue);">📊 Credential Status Checks</div>
                      <div class="text-gray-600 text-xs mt-1">
                        ${uniqueConnectors.length} connector${uniqueConnectors.length > 1 ? 's' : ''} • ${call.callCount} call${call.callCount > 1 ? 's' : ''}
                      </div>
                    </summary>
                    <div class="p-2 border-t bg-white space-y-2">
                      <div class="text-xs text-gray-500">
                        ${new Date(call.lastTimestamp).toLocaleTimeString()} • ~${avgDuration}ms avg • ${Math.round(call.totalDuration)}ms total
                      </div>
                    </div>
                  </details>
                `;
              }
              
              return `
                <details class="text-xs bg-gray-50 border rounded hover:shadow-sm">
                  <summary class="p-2 cursor-pointer hover:bg-gray-100">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="px-2 py-0.5 rounded font-bold text-white text-xs ${
                        call.method === 'GET' ? 'bg-green-500' :
                        call.method === 'POST' ? 'bg-blue-500' :
                        call.method === 'PUT' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }">${call.method}</span>
                      <span class="px-2 py-0.5 rounded text-xs font-semibold ${
                        call.status >= 200 && call.status < 300 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }">${call.status}</span>
                      <span class="text-gray-500 font-semibold">${call.duration}ms</span>
                    </div>
                    <div class="font-mono text-gray-600 text-xs truncate" title="${call.url}">${call.url}</div>
                  </summary>
                  <div class="p-2 border-t bg-white space-y-2">
                    <div class="text-xs text-gray-500">
                      ${new Date(call.timestamp).toLocaleTimeString()}
                    </div>
                    <div>
                      <div class="font-semibold text-gray-700 mb-1 text-xs">Full URL</div>
                      <div class="bg-gray-50 p-2 rounded text-xs break-all font-mono">${call.url}</div>
                    </div>
                    ${call.requestBody ? `
                      <div>
                        <div class="font-semibold text-gray-700 mb-1 text-xs">Request Body</div>
                        <pre class="bg-gray-50 p-2 rounded text-xs overflow-x-auto max-h-32">${JSON.stringify(call.requestBody, null, 2)}</pre>
                      </div>
                    ` : ''}
                    ${call.responseBody ? `
                      <div>
                        <div class="font-semibold text-gray-700 mb-1 text-xs">Response</div>
                        <pre class="bg-gray-50 p-2 rounded text-xs overflow-x-auto max-h-32">${typeof call.responseBody === 'string' ? call.responseBody : JSON.stringify(call.responseBody, null, 2)}</pre>
                      </div>
                    ` : ''}
                  </div>
                </details>
              `;
            }).join('')}
          </div>
          <div class="p-2 bg-gray-50 border-t text-center">
            <button onclick="window.alloyDemo.clearApiHistory()" class="px-3 py-1 text-xs border rounded hover:bg-white font-medium">
              Clear History
            </button>
          </div>
        ` : ''}
      </div>
    `;
  },
  
  renderConnectionsModal(connectors) {
    const connectedConnectors = connectors.filter(c => c.credentialStatus === 'connected');
    const notConnectedConnectors = connectors.filter(c => c.credentialStatus !== 'connected');
    
    return `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="connections-modal" onclick="if(event.target.id === 'connections-modal') document.getElementById('connections-modal').remove();">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col" style="max-height: 80vh;" onclick="event.stopPropagation();">
          <div class="flex items-center justify-between p-4 border-b flex-shrink-0" style="background: linear-gradient(135deg, rgba(33, 43, 196, 0.05), rgba(33, 43, 196, 0.1));">
            <div>
              <h3 class="text-lg font-bold flex items-center gap-2">
                <span>🔌</span>
                <span>Manage Connections</span>
              </h3>
              <p class="text-xs text-gray-600 mt-0.5">${connectedConnectors.length} of ${connectors.length} platforms connected</p>
            </div>
            <button id="close-connections-modal" class="text-gray-600 hover:text-gray-900 text-2xl leading-none w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded" onclick="document.getElementById('connections-modal').remove();">&times;</button>
          </div>
          
          <div class="overflow-y-auto flex-1">
            ${connectedConnectors.length > 0 ? `
              <div>
                <div class="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-700 sticky top-0">
                  ✅ Connected (${connectedConnectors.length})
                </div>
                ${connectedConnectors.map((connector) => `
                  <div class="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 flex items-center gap-3" onclick="window.alloyDemo.showCredentialModalById('${connector.id}')">
                    ${connector.icon ? 
                      `<img src="${connector.icon}" alt="${connector.name}" class="w-8 h-8 rounded flex-shrink-0">` :
                      `<div class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center font-bold text-sm flex-shrink-0">${connector.name.charAt(0)}</div>`
                    }
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm">${connector.name}</div>
                      <div class="text-xs text-gray-500">${connector.credentialCount || 1} credential${(connector.credentialCount || 1) > 1 ? 's' : ''}</div>
                    </div>
                    <span class="text-green-500 text-lg flex-shrink-0">✓</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            
            ${notConnectedConnectors.length > 0 ? `
              <div>
                <div class="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-700 sticky top-0">
                  🔓 Available to Connect (${notConnectedConnectors.length})
                </div>
                ${notConnectedConnectors.map((connector) => `
                  <div class="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 flex items-center gap-3 opacity-70" onclick="window.alloyDemo.showCredentialModalById('${connector.id}')">
                    ${connector.icon ? 
                      `<img src="${connector.icon}" alt="${connector.name}" class="w-8 h-8 rounded flex-shrink-0">` :
                      `<div class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center font-bold text-sm flex-shrink-0">${connector.name.charAt(0)}</div>`
                    }
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm">${connector.name}</div>
                      <div class="text-xs text-gray-500">Not connected</div>
                    </div>
                    <span class="text-gray-300 text-lg flex-shrink-0">○</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },

  renderCredentialModal(connector) {
    const credentials = connector.credentials || [];
    const primaryCred = credentials[0] || {};
    const credentialId = primaryCred.credentialId || primaryCred.id || 'N/A';
    const createdDate = primaryCred.createdAt || primaryCred.created || 'Unknown';
    const formattedDate = createdDate !== 'Unknown' ? new Date(createdDate).toLocaleDateString() : 'Unknown';
    
    return `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="credential-modal">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <div class="flex items-center gap-3 mb-6 pb-4 border-b-2">
            ${connector.icon ? 
              `<img src="${connector.icon}" alt="${connector.name}" class="w-12 h-12 rounded-lg">` :
              `<div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-xl">${connector.name.charAt(0)}</div>`
            }
            <div class="flex-1">
              <h3 class="text-xl font-bold">${connector.name}</h3>
              <p class="text-sm text-gray-600">${connector.credentialCount || 0} credential${connector.credentialCount > 1 ? 's' : ''}</p>
            </div>
            <button id="close-credential-modal" class="text-gray-600 hover:text-gray-900 text-2xl">×</button>
          </div>
          
          ${connector.credentialStatus === 'connected' ? `
            <div class="bg-gray-50 border rounded-lg p-4 mb-6 space-y-3">
              <div class="flex justify-between items-center pb-2 border-b">
                <span class="text-sm font-semibold text-gray-600">Status</span>
                <span class="text-sm font-semibold text-green-600">✓ Connected</span>
              </div>
              <div class="flex justify-between items-center pb-2 border-b">
                <span class="text-sm font-semibold text-gray-600">Credential ID</span>
                <span class="text-xs font-mono text-gray-800">${credentialId}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-gray-600">Connected On</span>
                <span class="text-sm font-mono text-gray-800">${formattedDate}</span>
              </div>
            </div>
            
            <div class="flex flex-col gap-2">
              <button onclick="window.alloyDemo.testConnection('${connector.id}')" class="w-full px-4 py-2 border rounded-md hover:bg-gray-50 font-medium">
                🔍 Test Connection
              </button>
              <button onclick="window.alloyDemo.reconnectCredential('${connector.id}')" class="w-full px-4 py-2 btn-primary rounded-md font-medium">
                🔄 Reconnect
              </button>
              <button onclick="window.alloyDemo.disconnectCredential('${connector.id}', '${credentialId}')" class="w-full px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 font-medium">
                🗑️ Disconnect
              </button>
            </div>
          ` : `
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <strong class="text-blue-700 text-lg">Not Connected</strong>
              <p class="text-blue-600 text-sm mt-1">Connect to ${connector.name} to start using this integration.</p>
            </div>
            
            <button onclick="window.alloyDemo.connectPlatform('${connector.id}')" class="w-full px-4 py-3 btn-primary rounded-md font-semibold">
              🔐 Connect ${connector.name}
            </button>
          `}
        </div>
      </div>
    `;
  },
  
  renderTemplatesModal(templates) {
    return '';
  }
};