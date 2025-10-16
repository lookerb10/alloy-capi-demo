// api.js - API Client Module
import { Config } from './config.js';

export const API = {
  callHistory: [],
  listeners: [],
  
  onHistoryUpdate(callback) {
    this.listeners.push(callback);
  },
  
  notifyListeners() {
    this.listeners.forEach(cb => cb(this.callHistory));
  },
  
  async call(endpoint, method = 'GET', body = null, includeUserId = true) {
    const startTime = Date.now();
    const config = Config.getConfig();
    const url = `${config.baseUrl}${endpoint}`;
    
    const headers = {
      'Authorization': `Bearer ${config.apiKey}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-version': '2025-06',
    };
    
    if (includeUserId && config.userId) {
      headers['x-alloy-userid'] = config.userId;
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      const duration = Date.now() - startTime;
      let responseData;
      
      try {
        const text = await response.text();
        responseData = text ? JSON.parse(text) : null;
      } catch (e) {
        responseData = null;
      }

      // Log API call with grouping logic
      const apiCall = {
        method,
        url,
        status: response.status,
        timestamp: startTime,
        duration,
        requestBody: body,
        responseBody: response.ok ? responseData : `${response.status} ${response.statusText}`
      };
      
      // Check if this is a credential check call
      if (url.includes('/credentials') && method === 'GET') {
        const existingGroupIndex = this.callHistory.findIndex(call => 
          call.isGrouped && call.groupType === 'credential-checks'
        );
        
        if (existingGroupIndex !== -1) {
          const group = this.callHistory[existingGroupIndex];
          group.callCount++;
          group.connectors.push(url.match(/\/connectors\/([^\/]+)\//)?.[1] || 'unknown');
          group.totalDuration += duration;
          group.lastTimestamp = startTime;
          
          this.callHistory.splice(existingGroupIndex, 1);
          this.callHistory.unshift(group);
        } else {
          const connectorId = url.match(/\/connectors\/([^\/]+)\//)?.[1] || 'unknown';
          this.callHistory.unshift({
            isGrouped: true,
            groupType: 'credential-checks',
            method: 'GET',
            callCount: 1,
            connectors: [connectorId],
            totalDuration: duration,
            timestamp: startTime,
            lastTimestamp: startTime,
            status: response.status
          });
        }
      } else {
        this.callHistory.unshift(apiCall);
      }
      
      if (this.callHistory.length > 30) {
        this.callHistory = this.callHistory.slice(0, 30);
      }
      
      this.notifyListeners();

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return responseData;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  clearHistory() {
    this.callHistory = [];
    this.notifyListeners();
  }
};