# Alloy Connectivity API Demo

A comprehensive reference implementation showcasing the Alloy Connectivity API with real integrations, OAuth flows, dynamic form generation, credential management, live API inspection, and modern UI enhancements.

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
- **Full URL on hover** - see complete endpoint URLs in tooltips
- **Performance metrics** - timing for every API call
- **Collapsible panel** - stays out of the way until needed

### 🎨 Modern UI & UX
- **Dark mode** - Toggle between light and dark themes (⌘D)
- **Search & filter** - Find connectors quickly with real-time search (⌘K)
- **Category filters** - Filter by CRM, E-commerce, Productivity, etc.
- **Recent Activity** - See your last 5 executed actions with "Run Again" buttons
- **Enhanced step indicator** - Clear progress visualization with step names
- **Responsive design** - Works beautifully on desktop and mobile
- **Alloy brand colors** - Professional UI using official Alloy blue (`rgb(33, 43, 196)`)
- **Keyboard shortcuts** - Power-user features for faster navigation

### 🔍 Dynamic Form Generation
- **Schema-driven forms** - automatically generated from API schemas
- **Required fields** prominently displayed with red asterisks
- **Optional fields** in expandable sections
- **Smart input types** - date pickers, dropdowns, email validation, textareas
- **Nested object support** - handles complex nested data structures
- **Array fields** - JSON input for array parameters
- **Auto-fill demo data** - One-click sample data for testing

### 📈 Result Visualization
- **Multiple view modes**:
  - **JSON view** - Formatted JSON with syntax highlighting
  - **Table view** - Clean key-value table with flattened nested objects
- **Copy response** - One-click copy to clipboard
- **Smart data flattening** - Nested objects displayed as `parent.child.property`

### ⌨️ Keyboard Shortcuts
- **⌘K / Ctrl+K** - Focus search bar
- **⌘D / Ctrl+D** - Toggle dark mode
- **Esc** - Close any open modal

### 🔄 Session Management
- **Session-based credentials** - Persists until browser closes
- **Recent activity tracking** - Last 10 actions saved locally
- **Automatic reconnection** - Handles expired credentials gracefully

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

# Serve locally (use any static file server)
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node.js
npx serve

# Option 3: VS Code Live Server extension
# Just right-click index.html and select "Open with Live Server"

# Open in browser
open http://localhost:8000
```

**Note**: The demo uses ES6 modules, so you need to serve it via HTTP (not file://)

---

## 📖 How to Use the Demo

### Main Interface

#### 1. View Connections Button (Top Left)
- Shows a count badge of connected platforms (e.g., "3/15")
- Click to open the **Manage Connections** modal
- See all connected and available platforms
- Connect new platforms or manage existing connections

#### 2. API Inspector (Top Right)
- Tracks all API calls in real-time
- Shows total call count in badge
- Click the header to expand/collapse
- Hover over truncated URLs to see full endpoint
- Click to expand and see request/response details
- Groups repetitive calls (like credential checks) to reduce noise
- Click "Clear History" to reset

#### 3. Search & Filter (Step 1)
- **Search box** - Type to filter connectors by name or category (⌘K)
- **Category pills** - Quick filter by type (All, CRM, E-commerce, etc.)
- Shows count of filtered results

#### 4. Recent Activity
- Appears after your first successful action
- Shows last 5 executed actions with timestamps
- **"Run Again"** button to quickly re-execute with same data
- Success/failure indicators for each action

#### 5. Dark Mode Toggle
- Click the 🌙/☀️ button in header
- Or press ⌘D / Ctrl+D
- Preference saved in localStorage

### Workflow: Connecting a Platform

1. **Find a connector** on the main grid (use search if needed)
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
   - Click "✨ Fill Example Data" for quick testing
   - Use proper formats (dates, emails, etc.)
5. **Click the execute button** (e.g., "➕ Create Record")
6. **Watch the API Inspector** to see the request/response
7. **View results** in JSON or Table view
8. **Use "Run Again"** from Recent Activity to repeat

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

## 🗂️ Project Structure

```
alloy-capi-demo/
├── index.html              # Main HTML file with styles
└── js/
    ├── main.js            # Main application logic & state management
    ├── ui.js              # UI rendering components
    ├── api.js             # API client & request tracking
    ├── config.js          # Configuration management
    ├── schemaParser.js    # Schema parsing & form generation
    └── demoData.js        # Demo data generator for auto-fill
```

### Module Overview

#### `main.js` - Application Core
- State management
- Workflow orchestration
- Event handling
- OAuth flow management
- Recent activity tracking
- Keyboard shortcuts

#### `ui.js` - UI Components
- All rendering functions
- Modal generation
- Form field rendering
- Result visualization
- Dark mode styling

#### `api.js` - API Client
- HTTP request wrapper
- Authentication headers
- API call tracking
- Request/response logging
- Smart call grouping for inspector

#### `config.js` - Configuration
- Credential storage (sessionStorage)
- API base URL configuration
- Validation helpers

#### `schemaParser.js` - Schema Processing
- Recursive schema parsing
- Nested object handling
- Field type detection
- Request building
- Path parameter extraction

#### `demoData.js` - Demo Data
- Sample data generation
- Field-specific examples
- Auto-fill functionality

---

## 🛠️ Customization Guide

### Changing Brand Colors

Edit `index.html` CSS variables:
```css
:root {
    --alloy-blue: rgb(33, 43, 196);        /* Primary brand color */
    --alloy-blue-dark: rgb(25, 32, 150);   /* Hover states */
    --alloy-blue-light: rgb(60, 80, 220);  /* Dark mode */
}
```

### Modifying API Configuration

Edit `js/config.js`:
```javascript
getConfig() {
    return {
        apiKey: sessionStorage.getItem('alloy_api_key'),
        userId: sessionStorage.getItem('alloy_user_id'),
        baseUrl: 'https://production.runalloy.com'
    };
}
```

### Adding Custom Features

The modular structure makes it easy to extend:
- **New UI component?** → Add to `ui.js`
- **New API endpoint?** → Add to `api.js`
- **Custom data processing?** → Add to `schemaParser.js`
- **New workflow step?** → Add to `main.js`

---

## 🚀 Deployment Options

### Option 1: GitHub Pages (Easiest)
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from branch: main"
4. Your demo will be live at `https://yourusername.github.io/alloy-capi-demo/`

### Option 2: Netlify
1. Connect your GitHub repo to Netlify
2. Build settings: None needed (static site)
3. Publish directory: `/` (root)
4. Deploy!

### Option 3: Vercel
1. Import your GitHub repo to Vercel
2. Framework preset: Other
3. Root directory: `./`
4. Deploy!

### Option 4: Any Static Host
Upload all files to any web hosting service:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- DigitalOcean App Platform
- Cloudflare Pages

**Important**: Must be served via HTTP/HTTPS (not file://) due to ES6 modules.

---

## 🎓 Learning Resources

### Understanding the Code Flow

**Initialization:**
```
User enters credentials → Load all connectors → Check credential status for each → Display grid
```

**Action Execution:**
```
Select connector → Load resources → Choose action → Fetch action schema → Generate form → Submit → Execute via API → Show result → Add to recent activity
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

### Schema Parsing Deep Dive

The `schemaParser.js` module handles complex schema structures:

```javascript
// Handles nested objects
{
  "name": "string",
  "address": {
    "street": "string",
    "city": "string"
  }
}
// Becomes: name, address.street, address.city

// Handles arrays
{
  "tags": ["string"],
  "contacts": [{ "name": "string", "email": "string" }]
}
// Arrays can be input as JSON
```

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
- [ ] **CSP headers** - Content Security Policy

**Note**: Alloy securely stores the actual OAuth tokens and third-party credentials. You're responsible for:
1. Protecting your Alloy API key
2. Managing which users have access to which credential IDs
3. Storing the credential ID ↔ user mappings

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
- [ ] **Bulk operations** - Handle multiple records efficiently
- [ ] **Field mapping UI** - Let users customize field mappings

### Compliance & Legal
- [ ] **Data privacy** - GDPR, CCPA compliance
- [ ] **Audit logging** - Track all integration activity
- [ ] **Terms of service** - Legal agreements with users
- [ ] **Data retention** - Policies for storing integration data
- [ ] **Security testing** - Penetration testing, vulnerability scans
- [ ] **SOC 2 compliance** - If handling sensitive data

---

## 🏗️ Architecture Patterns

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

### Pattern 2: Backend-Heavy (Recommended for Production)
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

- **Alloy Connectivity API Docs**: https://docs.runalloy.com
- **Alloy Dashboard**: https://dashboard.runalloy.com
- **API Reference**: https://docs.runalloy.com/reference
- **Connector Catalog**: https://runalloy.com/integrations
- **Support**: brandon@runalloy.com

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
✅ **Internal tool** - Quick integrations for your team  

## ❌ Don't Use This Demo As

❌ Production code to deploy as-is  
❌ The only way to build integrations  
❌ A secure, complete solution  
❌ Best practices for your specific use case  
❌ A replacement for reading the API docs  
❌ Customer-facing production application  

---

## 🆘 Support

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

**Built with**: Vanilla JavaScript ES6, Alloy Connectivity API, Tailwind CSS  
**Maintained by**: Brandon Looker @ Alloy Automation  
**Version**: 4.0 - Enhanced UI/UX with Dark Mode, Search, and Modern Features  

---

## 📊 Feature Comparison

| Feature | v1.0 | v2.0 | v3.0 | v4.0 (Current) |
|---------|------|------|------|----------------|
| Connector Selection | ✅ | ✅ | ✅ | ✅ |
| Dynamic Forms | ✅ | ✅ | ✅ | ✅ |
| OAuth Flow | ✅ | ✅ | ✅ | ✅ |
| Nested Schema Parsing | ❌ | ✅ | ✅ | ✅ |
| Credential Management | ❌ | ❌ | ✅ | ✅ |
| API Inspector | ❌ | ❌ | ✅ | ✅ |
| Dark Mode | ❌ | ❌ | ❌ | ✅ |
| Search & Filter | ❌ | ❌ | ❌ | ✅ |
| Recent Activity | ❌ | ❌ | ❌ | ✅ |
| Keyboard Shortcuts | ❌ | ❌ | ❌ | ✅ |
| Table View | ❌ | ❌ | ❌ | ✅ |
| Modular Architecture | ❌ | ❌ | ❌ | ✅ |

---

## 📝 Changelog

### Version 4.0 (Current) - Enhanced UI/UX
- ✨ Added dark mode with Alloy brand colors
- ✨ Added search and filter for connectors
- ✨ Added recent activity feed with "Run Again"
- ✨ Added keyboard shortcuts (⌘K, ⌘D, Esc)
- ✨ Added table view for results with smart flattening
- ✨ Enhanced step indicator with progress visualization
- ✨ Added full URL visibility on hover in API inspector
- ✨ Modular architecture with separate JS files
- 🎨 Professional styling with Alloy brand colors
- 🐛 Improved dark mode contrast and readability
- 🐛 Better form field organization (required/optional)

### Version 3.0
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

---

**Want to contribute?** Open an issue with your idea!

---

**Made with ❤️ by the Alloy team**