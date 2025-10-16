// config.js - Configuration Management Module
export const Config = {
  getConfig() {
    return {
      apiKey: sessionStorage.getItem('alloy_api_key') || '',
      userId: sessionStorage.getItem('alloy_user_id') || '',
      baseUrl: 'https://production.runalloy.com'
    };
  },
  
  saveConfig(apiKey, userId) {
    sessionStorage.setItem('alloy_api_key', apiKey);
    sessionStorage.setItem('alloy_user_id', userId);
  },
  
  clearConfig() {
    sessionStorage.removeItem('alloy_api_key');
    sessionStorage.removeItem('alloy_user_id');
  },
  
  isValid() {
    const config = this.getConfig();
    return config.apiKey && config.userId && 
           config.apiKey !== '' && config.userId !== '';
  }
};