# Alloy Connectivity API Demo

A reference implementation showcasing the Alloy Connectivity API with real integrations, OAuth flows, and dynamic form generation.

> **⚠️ Important**: This is a reference implementation for learning and prototyping. It is **not production-ready code**. See [Production Considerations](#production-considerations) below.

## 🚀 Try the Live Demo

**[Launch Demo →](https://lookerb10.github.io/alloy-capi-demo/)**

Just enter your Alloy API credentials and start testing integrations immediately!

## Features

* **Real API Integration** - Connect to actual third-party platforms
* **Session-Based Config** - Enter credentials once, use throughout your session
* **Professional UI** - Beautiful connector cards with icons and descriptions
* **Dynamic Forms** - Auto-generated forms with required and optional fields
* **OAuth Flow** - Seamless authentication with credential management
* **Live Execution** - Actually create records in connected platforms

## Getting Started

### 1. Get Your Alloy Credentials (2 minutes)

1. **Sign up** at [Alloy](https://alloy.com)
2. **Get API Key**: Dashboard → Settings → API Keys
3. **Get User ID**: Dashboard → Users → Create user → Copy ID

### 2. Try the Demo

1. **Visit**: https://lookerb10.github.io/alloy-capi-demo/
2. **Enter credentials** in the modal that appears
3. **Start testing** - your credentials are saved for the session
4. **Reset anytime** - credentials persist until you close the browser

## How It Works

### 1. Connector Selection
* Loads all connectors from your Alloy account
* Beautiful cards with icons, categories, and descriptions
* Supports 200+ integrations (HubSpot, Salesforce, Shopify, etc.)

### 2. Resource & Action Selection
* Dynamically loads available resources and actions
* Uses real API data, not hardcoded options
* Interactive dropdown selection

### 3. Smart Form Generation
* **Required fields** prominently displayed with red asterisks
* **Optional fields** in expandable section
* Proper input types (date pickers, email validation, dropdowns)
* Uses actual field schemas from the Alloy API

### 4. Seamless Authentication
* Auto-detects missing credentials
* Launches OAuth flow when needed
* Preserves form data during authentication
* Works with all OAuth-enabled platforms

### 5. Live API Execution
* Makes real API calls to create records
* Shows actual responses from platforms
* Handles errors with helpful guidance
* Success confirmation with created record data

## For Developers

Want to customize or self-host?

### Local Development

```bash
# Clone the repository
git clone https://github.com/lookerb10/alloy-capi-demo.git
cd alloy-capi-demo

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Key Files

* `src/components/ConnectorGrid.jsx` - Connector selection UI
* `src/components/DynamicForm.jsx` - Schema-driven form generation
* `src/services/alloyApi.js` - API client wrapper
* `src/hooks/useOAuth.js` - OAuth flow handling

## Production Considerations

**⚠️ This demo is NOT production-ready.** It's designed for learning and prototyping. For production use, you'll need:

### Security
- [ ] Backend API to proxy Alloy calls (never expose API keys in frontend)
- [ ] Secure storage of Alloy credential IDs and user-to-credential mappings
- [ ] User authentication and authorization
- [ ] API key rotation and management
- [ ] Rate limiting and access controls
- [ ] Input validation and sanitization

**Note:** Alloy securely stores the actual OAuth tokens and third-party credentials. You're responsible for protecting your Alloy API key and managing which users have access to which credential IDs.

### Architecture
- [ ] Server-side API key management (never in frontend)
- [ ] Backend credential ID storage and user mappings
- [ ] Webhook handling for real-time updates
- [ ] Queue system for async operations
- [ ] Error handling and retry logic
- [ ] Logging and monitoring
- [ ] Database for user data and integration metadata

### User Experience
- [ ] Custom UI/UX for your domain
- [ ] Data transformation and mapping layers
- [ ] Validation rules specific to your business logic
- [ ] Onboarding and help documentation
- [ ] Usage analytics

### Compliance
- [ ] Data privacy and GDPR compliance
- [ ] Audit logging
- [ ] Terms of service and user agreements
- [ ] Security testing and penetration testing

## Architecture Options

The Alloy Connectivity API supports multiple approaches:

**Frontend-Heavy** (like this demo):
- User authenticates directly with third parties
- Browser makes API calls to Alloy
- ✅ Good for: Rapid prototyping, simple apps
- ❌ Limitations: Security concerns, limited data transformation

**Backend-Heavy** (recommended for production):
- Your backend manages credentials
- Server-side API calls to Alloy
- ✅ Good for: Security, complex workflows, data transformation
- ❌ Limitations: More infrastructure to manage

**Hybrid**:
- Frontend for OAuth initiation and UX
- Backend for execution and storage
- ✅ Good for: Balance of UX and security
- ❌ Limitations: More complex to implement

## Use This Demo As

✅ **Learning tool** - Understand how the API works  
✅ **Prototype base** - Quick POCs and demos  
✅ **Code reference** - Example patterns and implementations  
✅ **Testing sandbox** - Try integrations before building  

## Don't Use This Demo As

❌ Production code to deploy as-is  
❌ The only way to build integrations  
❌ A secure, complete solution  
❌ Best practices for your specific use case  

## API Documentation

For complete API reference, visit the [Alloy Connectivity API Docs](https://docs.alloy.com)

## Support

- **Issues**: [GitHub Issues](https://github.com/lookerb10/alloy-capi-demo/issues)
- **Questions**: Open a discussion in the repo
- **Alloy Support**: brandon@runalloy.com

## License

MIT License - feel free to use this code as a starting point for your own projects.

---

**Built with**: React, Alloy Connectivity API  
**Maintained by**: Brandon Looker of Alloy Automation

