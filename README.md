# Alloy Connectivity API Demo

A comprehensive reference implementation showcasing the Alloy Connectivity API with real integrations, OAuth flows, dynamic form generation, credential management, and live API inspection.

> **⚠️ Important**: This is a reference implementation for learning and prototyping. It is **not production-ready code**. See [Production Considerations](#production-considerations) below.

## 🚀 Try the Live Demo

**[Launch Demo →](https://lookerb10.github.io/alloy-capi-demo/)**

Just enter your Alloy API credentials and start testing integrations immediately!

---

## ✨ Features

### 🔌 Real API Integration
- Connect to actual third-party platforms (200+ integrations)
- Execute real actions that create/update/delete data
- Works with HubSpot, Salesforce, Shopify, Google Drive, Notion, and more

### 🔐 Advanced Credential Management
- **Visual status badges** on every connector showing connection state
- **"View Connections" panel** to manage all credentials in one place
- **One-click authentication** - connect platforms directly from the UI
- **Test connections** to verify credentials are working
- **Reconnect & disconnect** capabilities for each platform
- Automatic OAuth flow handling with popup windows

### 📊 Live API Inspector
- **Real-time API call tracking** - see every request and response
- **Smart grouping** - credential checks are grouped to reduce noise
- **Full request/response visibility** - perfect for demos and debugging
- **Performance metrics** - timing for every API call
- **Collapsible panel** - stays out of the way until needed

### 🎨 Professional UI
- Beautiful connector cards with icons, categories, and descriptions
- Session-based credential storage (persists until browser closes)
- Responsive design that works on desktop and mobile
- Clean, modern interface with smooth animations

### 📝 Dynamic Form Generation
- **Schema-driven forms** - automatically generated from API schemas
- **Required fields** prominently displayed with red asterisks
- **Optional fields** in expandable sections
- **Smart input types** - date pickers, dropdowns, email validation, textareas
- **Nested object support** - handles complex nested data structures
- **Array fields** - JSON input for array parameters

### 🔄 Universal Integration Flow
1. **Choose platform** - Select from 200+ connectors
2. **Pick resource** - Contacts, Companies, Deals, etc.
3. **Select action** - Create, Update, List, Delete
4. **Configure fields** - Fill in the dynamic form
5. **Execute** - Watch it happen in real-time

---

## 🎯 Getting Started

### 1. Get Your Alloy Credentials (2 minutes)

You'll need two things from your Alloy account:

1. **API Key**: 
   - Go to [Alloy Dashboard](https://dashboard.runalloy.com)
   - Navigate to **Settings → API Keys**
   - Create a new API key or copy an existing one

2. **User ID**:
   - In Alloy Dashboard, go to **Users**
   - Create a test user (or use an existing one)
   - Copy the User ID

### 2. Run the Demo

**Option A: Use the Hosted Version**

1. Visit: https://lookerb10.github.io/alloy-capi-demo/
2. Enter your API Key and User ID in the modal
3. Start exploring! Your credentials are saved for the session

**Option B: Run Locally**

```bash
# Clone the repository
git clone https://github.com/lookerb10/alloy-capi-demo.git
cd alloy-capi-demo

# Open the HTML file in your browser
# No build step needed - it's a single HTML file!
open index.html
```

That's it! The demo is a single self-contained HTML file with no dependencies.

---

## 📖 How to Use the Demo

### Main Interface

#### 1. View Connections Button (Top Left)
- Shows a count badge of connected platforms
- Click to open the **Manage Connections** modal
- See all connected and available platforms
- Connect new platforms or manage existing connections

#### 2. API Inspector (Top Right)
- Tracks all API calls in real-time
- Click the header to expand/collapse
- Shows request bodies, response data, and timing
- Groups repetitive calls (like credential checks) to reduce noise
- Click "Clear History" to reset

#### 3. Credential Status Badges
- Every connector card shows its connection status:
  - **✓ Connected** (green) - Ready to use
  - **🔐 Not Connected** (gray) - Needs authentication
- Click any badge to open credential details modal

### Workflow: Connecting a Platform

1. **Find a connector** on the main grid
2. **Click the credential badge** or select the connector
3. **Follow the OAuth flow**:
   - Some platforms require additional info (like tenant ID)
   - A popup window will open for authentication
   - Authenticate in the popup
   - Return and click "I've Authenticated"
4. **Badge turns green** ✓ - you're connected!

### Workflow: Executing an Action

1. **Select a connector** (must be connected first)
2. **Pick a resource** (e.g., "Contacts", "Companies")
3. **Choose an action** from the dropdown (e.g., "Create Contact")
4. **Fill in the form**:
   - Required fields are marked with red asterisks
   - Optional fields are in the expandable section
   - Use proper formats (dates, emails, etc.)
5. **Click "Create Record"** (or equivalent button)
6. **Watch the API Inspector** to see the request/response
7. **View results** - success message or error details

### Managing Credentials

#### From the Credential Modal:
- **🔍 Test Connection** - Verify the credential works
- **🔄 Reconnect** - Refresh the OAuth token
- **🗑️ Disconnect** - Remove the credential

#### From View Connections:
- See all connected platforms at once
- Connect new platforms without leaving the modal
- Quickly access credential details

---

## 🏗️ Technical Architecture

### Single-File Design
This demo is intentionally built as a **single HTML file** with embedded CSS and JavaScript to make it:
- ✅ Easy to understand and modify
- ✅ Simple to deploy (just upload one file)
- ✅ Perfect for learning (no build tools required)
- ✅ Great for quick demos and prototypes

### Key Components

#### API Client (`makeAlloyApiCall`)
- Handles all HTTP requests to Alloy API
- Automatically adds authentication headers
- Tracks requests in the API Inspector
- Error handling with detailed messages

#### Schema Parser (`parseActionSchema`)
- **Recursive parsing** of nested object schemas
- Extracts path parameters from URLs
- Identifies required vs optional fields
- Handles arrays, objects, enums, and primitives

#### Form Generator (`displayActionForm`)
- Creates input fields based on schema types
- Handles nested objects with dot notation
- Supports dates, selects, textareas, numbers, emails
- Validates required fields before submission

#### Credential Manager
- Checks credentials for all connectors on load
- Groups credential status checks in API Inspector
- Manages OAuth flows with popup windows
- Handles platform-specific authentication requirements

---

## 🛠️ Customization Guide

### Styling
All CSS is in the `<style>` tag at the top. Key classes:
- `.connector-card` - Individual connector tiles
- `.credential-badge` - Connection status badges
- `.api-inspector` - The API call tracking panel
- `.modal-overlay` - Popup modals for credentials

### API Configuration
Located in the JavaScript section:
```javascript
function getConfig() {
    return {
        apiKey: sessionStorage.getItem('alloy_api_key'),
        userId: sessionStorage.getItem('alloy_user_id'),
        baseUrl: 'https://production.runalloy.com'
    };
}
```

### Adding Custom Features
The code is well-commented and organized into logical sections:
1. Configuration & State
2. API Inspector Functions
3. API Client
4. Schema Parsing
5. Form Generation
6. Credential Management
7. Workflow Steps

---

## 🚀 Deployment Options

### Option 1: GitHub Pages (Easiest)
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from branch: main"
4. Your demo will be live at `https://yourusername.github.io/alloy-capi-demo/`

### Option 2: Netlify Drop
1. Drag and drop `index.html` into [Netlify Drop](https://app.netlify.com/drop)
2. Get an instant live URL

### Option 3: Any Web Server
Upload `index.html` to any web hosting service. It's just a single file!

### Option 4: Local Development
Simply open `index.html` in your browser. No server required.

---

## 🎓 Learning Resources

### Understanding the Code Flow

**Initialization:**
```
User enters credentials → Load all connectors → Check credential status for each → Display grid
```

**Action Execution:**
```
Select connector → Load resources → Choose action → Fetch action schema → Generate form → Submit → Execute via API → Show result
```

**Credential Flow:**
```
Detect missing credential → Fetch metadata → Collect required fields → POST to create credential → Open OAuth popup → Poll for completion → Update UI
```

### Key API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /connectors` | List all available connectors |
| `GET /connectors/{id}/resources` | Get resources for a connector |
| `GET /connectors/{id}/actions/{actionId}` | Get action schema details |
| `POST /connectors/{id}/actions/{actionId}/execute` | Execute an action |
| `GET /connectors/{id}/credentials` | List credentials for a connector |
| `POST /connectors/{id}/credentials` | Create new credential (OAuth) |
| `DELETE /connectors/{id}/credentials/{credId}` | Remove credential |
| `GET /connectors/{id}/credentials/metadata` | Get credential requirements |

---

## ⚠️ Production Considerations

**This demo is NOT production-ready.** It's designed for learning and prototyping. For production use, you'll need:

### Security (CRITICAL)
- [ ] **Backend API proxy** - NEVER expose API keys in frontend code
- [ ] **Server-side credential storage** - Store credential IDs and user mappings securely
- [ ] **User authentication** - Implement proper auth (OAuth, JWT, sessions)
- [ ] **API key rotation** - Regular key rotation and secrets management
- [ ] **Rate limiting** - Prevent abuse and API quota exhaustion
- [ ] **Input validation** - Sanitize all user inputs server-side
- [ ] **CORS configuration** - Proper origin restrictions

**Note:** Alloy securely stores the actual OAuth tokens and third-party credentials. You're responsible for:
1. Protecting your Alloy API key
2. Managing which users have access to which credential IDs
3. Storing the credential ID → user mappings

### Architecture
- [ ] **Backend API layer** - Node.js, Python, Ruby, etc.
- [ ] **Database** - Store users, credential mappings, integration metadata
- [ ] **Queue system** - Handle async operations (Bull, Sidekiq, etc.)
- [ ] **Webhook handling** - Listen for real-time updates from integrations
- [ ] **Error handling** - Retry logic, dead letter queues, alerting
- [ ] **Logging & monitoring** - Track usage, errors, performance
- [ ] **Caching** - Redis for connector lists, schemas, etc.

### User Experience
- [ ] **Custom UI/UX** - Design for your specific use case
- [ ] **Data transformation** - Map fields between your app and integrations
- [ ] **Validation rules** - Business logic specific to your domain
- [ ] **Onboarding flow** - Guide users through setup
- [ ] **Help documentation** - Explain what each integration does
- [ ] **Usage analytics** - Track which integrations are popular

### Compliance & Legal
- [ ] **Data privacy** - GDPR, CCPA compliance
- [ ] **Audit logging** - Track all integration activity
- [ ] **Terms of service** - Legal agreements with users
- [ ] **Data retention** - Policies for storing integration data
- [ ] **Security testing** - Penetration testing, vulnerability scans

---

## 🏛️ Architecture Patterns

The Alloy Connectivity API supports multiple implementation patterns:

### Pattern 1: Frontend-Heavy (This Demo)
```
Browser → Alloy API → Third-Party Platform
```
**Pros:**
- ✅ Quick to build
- ✅ Low server costs
- ✅ Easy to understand

**Cons:**
- ❌ API key exposed in browser
- ❌ Limited data transformation
- ❌ No background processing

**Best for:** Prototypes, internal tools, learning

### Pattern 2: Backend-Heavy (Recommended)
```
Browser → Your API → Alloy API → Third-Party Platform
```
**Pros:**
- ✅ Secure API key storage
- ✅ Complex data transformations
- ✅ Background jobs & webhooks
- ✅ Full control over auth

**Cons:**
- ❌ More infrastructure
- ❌ Longer development time

**Best for:** Production applications, SaaS products

### Pattern 3: Hybrid
```
Browser → Your API (OAuth) → Alloy API (Execute)
       ↘ Alloy API (Direct for UI)
```
**Pros:**
- ✅ Great UX (fast UI updates)
- ✅ Secure credential storage
- ✅ Flexible architecture

**Cons:**
- ❌ Most complex to build

**Best for:** High-scale production apps

---

## 📚 Additional Resources

- **Alloy Connectivity API Docs**: https://docs.alloy.com
- **Alloy Dashboard**: https://dashboard.runalloy.com
- **API Reference**: https://docs.alloy.com/reference
- **Connector Catalog**: https://runalloy.com/integrations

---

## 🤝 Contributing

This is a reference implementation maintained by Alloy. We welcome:
- Bug reports
- Feature suggestions
- Questions about implementation
- Success stories using this as a starting point

**Open an issue** or **start a discussion** in this repository.

---

## 📄 Use This Demo As

✅ **Learning tool** - Understand how the Connectivity API works  
✅ **Prototype base** - Kickstart your integration project  
✅ **Code reference** - See implementation patterns and best practices  
✅ **Testing sandbox** - Try integrations before building  
✅ **Demo tool** - Show stakeholders what's possible  

## ❌ Don't Use This Demo As

❌ Production code to deploy as-is  
❌ The only way to build integrations  
❌ A secure, complete solution  
❌ Best practices for your specific use case  
❌ A replacement for reading the API docs  

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/lookerb10/alloy-capi-demo/issues)
- **Questions**: Open a discussion in the repo
- **Alloy Support**: brandon@runalloy.com
- **Sales/Demos**: brandon@runalloy.com

For anything related to this demo or the Alloy Connectivity API, reach out to **brandon@runalloy.com**

---

## 📜 License

MIT License - feel free to use this code as a starting point for your own projects.

---

## 🙏 Acknowledgments

**Built with**: Vanilla JavaScript, Alloy Connectivity API  
**Maintained by**: Brandon Looker @ Alloy Automation  
**Version**: 3.0 - Now with Credential Management & API Inspector!

---

## 🔄 Changelog

### Version 3.0 (Current)
- ✨ Added credential management UI
- ✨ Added live API inspector with smart grouping
- ✨ Added "View Connections" panel
- ✨ Enhanced credential status badges
- 🐛 Fixed nested schema parsing
- 🐛 Improved OAuth flow handling

### Version 2.0
- ✨ Added recursive schema parsing for nested objects
- ✨ Improved form generation
- 🐛 Fixed path parameter extraction

### Version 1.0
- 🎉 Initial release
- ✨ Basic connector selection
- ✨ Dynamic form generation
- ✨ OAuth flow support