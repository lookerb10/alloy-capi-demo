# Alloy Connectivity API Demo

A comprehensive reference implementation showcasing the Alloy Connectivity API with real integrations, OAuth flows, dynamic form generation, credential management, and modern UI enhancements.

> **⚠️ Important**: This is a reference implementation for learning and prototyping. It is **not production-ready code**. See [Production Considerations](#production-considerations) below.

## 🚀 Quick Start

**[Launch Live Demo →](https://lookerb10.github.io/alloy-capi-demo/Single-File/)**

Choose your version:
- **[Single-File Version](./Single-File/)** - All-in-one HTML file (recommended for quick demos)
- **[Modular Version](./Modular/)** - Organized codebase for development and learning

---

## 📁 Repository Structure

### Single-File Version
📂 **[Single-File/](./Single-File/)**
- `index.html` - Complete demo in one file
- ✅ **Use when**: Quick demos, sharing, embedding
- ✅ **Deploy to**: GitHub Pages, Netlify Drop, any static host
- ⚡ **Zero build steps** - just open in browser

### Modular Version  
📂 **[Modular/](./Modular/)**
- `index.html` - Entry point
- `js/` - Organized JavaScript modules:
  - `main.js` - Application core & orchestration
  - `ui.js` - All rendering components
  - `api.js` - API client & request tracking
  - `config.js` - Configuration management
  - `schemaParser.js` - Schema parsing & form generation
  - `demoData.js` - Demo data generator
- ✅ **Use when**: Learning, customizing, contributing
- ✅ **Better for**: Code review, maintenance, extensions

---

## ✨ Features (v4.0)

### 🔌 Real API Integration
- Connect to 200+ actual third-party platforms
- Execute real actions (create/update/delete data)
- Works with HubSpot, Salesforce, Shopify, Google Drive, Notion, and more

### 🔐 Advanced Credential Management
- **Visual status badges** - See connection state at a glance
- **"View Connections" panel** - Manage all credentials in one place
- **One-click authentication** - Connect platforms directly from the UI
- **Test connections** - Verify credentials are working
- **Reconnect & disconnect** - Full credential lifecycle management
- **Automatic OAuth flow** - Handles popup windows and callbacks

### 📊 Live API Inspector
- **Real-time tracking** - See every request and response
- **Smart grouping** - Credential checks grouped to reduce noise
- **Full visibility** - Request/response bodies, timing, status codes
- **Collapsible panel** - Stays out of the way until needed

### 🎨 Modern UI & UX
- **Dark mode** - Toggle with ⌘D keyboard shortcut
- **Search & filter** - Find connectors instantly with ⌘K
- **Category filters** - CRM, E-commerce, Productivity, etc.
- **Recent Activity** - Last 5 actions with "Run Again" buttons
- **Keyboard shortcuts** - Power-user features
- **Responsive design** - Works on desktop and mobile
- **Alloy brand colors** - Professional UI with `rgb(33, 43, 196)`

### 🔄 Dynamic Form Generation
- **Schema-driven forms** - Auto-generated from API schemas
- **Smart field types** - Date pickers, dropdowns, validation
- **Nested object support** - Complex data structures handled
- **Auto-fill demo data** - One-click sample data for testing

### 📈 Result Visualization
- **JSON view** - Formatted with syntax highlighting
- **Table view** - Clean key-value pairs with nested flattening
- **Copy to clipboard** - One-click response copying

---

## 🎯 Getting Started

### 1. Get Your Alloy Credentials (2 minutes)

1. **API Key**: 
   - Go to [Alloy Dashboard](https://dashboard.runalloy.com)
   - Navigate to **Settings → API Keys**
   - Create or copy an API key

2. **User ID**:
   - In Alloy Dashboard, go to **Users**
   - Create a test user or use existing
   - Copy the User ID

### 2. Choose Your Version

#### Option A: Single-File (Quickest)

```bash
# Just open the HTML file
open Single-File/index.html
```

Or visit the hosted version: [https://lookerb10.github.io/alloy-capi-demo/Single-File/](https://lookerb10.github.io/alloy-capi-demo/Single-File/)

#### Option B: Modular (For Development)

```bash
# Must serve via HTTP (ES6 modules requirement)
cd Modular
python3 -m http.server 8000
# or
npx serve
# or use VS Code Live Server

open http://localhost:8000
```

### 3. Enter Credentials & Start Exploring!

---

## ⌨️ Keyboard Shortcuts

- **⌘K / Ctrl+K** - Focus search bar
- **⌘D / Ctrl+D** - Toggle dark mode
- **Esc** - Close any open modal

---

## 🛠️ Customization Guide

### Single-File Version
Edit the CSS in `<style>` tags to change:
```css
:root {
    --alloy-blue: rgb(33, 43, 196);        /* Primary brand color */
    --alloy-blue-dark: rgb(25, 32, 150);   /* Hover states */
    --alloy-blue-light: rgb(60, 80, 220);  /* Dark mode */
}
```

### Modular Version
The modular structure makes extending easier:
- **New UI component?** → Add to `js/ui.js`
- **New API endpoint?** → Add to `js/api.js`
- **Custom data processing?** → Add to `js/schemaParser.js`
- **New workflow step?** → Add to `js/main.js`

---

## 🚀 Deployment Options

### GitHub Pages (Easiest)
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from branch: main"
4. Your demo will be live at `https://yourusername.github.io/alloy-capi-demo/Single-File/`

### Netlify / Vercel
1. Connect your GitHub repo
2. Build settings: None needed (static site)
3. Publish directory: `Single-File/` or `Modular/`
4. Deploy!

### Any Static Host
Upload either folder to:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- DigitalOcean App Platform
- Cloudflare Pages

**Note**: Modular version requires HTTP/HTTPS (not file://) due to ES6 modules.

---

## 📖 How to Use

### Main Workflow

1. **Connect a Platform**
   - Click credential badge or select connector
   - Follow OAuth flow in popup window
   - Badge turns green ✓

2. **Execute an Action**
   - Select connected platform
   - Pick resource (Contacts, Companies, etc.)
   - Choose action from dropdown
   - Fill form (or click "✨ Fill Example Data")
   - Execute and view results

3. **Manage Connections**
   - Click "🔌 Connections" button (top left)
   - View all connected platforms
   - Test, reconnect, or disconnect

4. **Track API Calls**
   - Click "🔍 API Inspector" (top right)
   - See real-time request/response data
   - Expand for full details

---

## ⚠️ Production Considerations

**This demo is NOT production-ready.** For production use, you need:

### Security (CRITICAL)
- [ ] **Backend API proxy** - Never expose API keys in frontend
- [ ] **Server-side credential storage** - Secure credential ID mappings
- [ ] **User authentication** - OAuth, JWT, or sessions
- [ ] **API key rotation** - Regular key management
- [ ] **Rate limiting** - Prevent abuse
- [ ] **Input validation** - Sanitize all inputs server-side
- [ ] **CORS configuration** - Proper origin restrictions

**Note**: Alloy securely stores OAuth tokens. You're responsible for:
1. Protecting your Alloy API key
2. Managing user-to-credential mappings
3. Access control

### Architecture
- [ ] Backend API layer (Node.js, Python, etc.)
- [ ] Database for users & mappings
- [ ] Queue system for async operations
- [ ] Webhook handling for real-time updates
- [ ] Logging & monitoring
- [ ] Caching (Redis for schemas, etc.)

### Compliance
- [ ] Data privacy (GDPR, CCPA)
- [ ] Audit logging
- [ ] Terms of service
- [ ] Security testing

---

## 🗺️ Architecture Patterns

### Pattern 1: Frontend-Heavy (This Demo)
```
Browser → Alloy API → Third-Party Platform
```
**Best for**: Prototypes, internal tools, learning

### Pattern 2: Backend-Heavy (Recommended for Production)
```
Browser → Your API → Alloy API → Third-Party Platform
```
**Best for**: Production apps, SaaS products

### Pattern 3: Hybrid
```
Browser → Your API (OAuth) → Alloy API (Execute)
       ↘ Alloy API (Direct for UI)
```
**Best for**: High-scale production apps

---

## 📚 Resources

- **Alloy Docs**: https://docs.runalloy.com
- **Dashboard**: https://dashboard.runalloy.com
- **API Reference**: https://docs.runalloy.com/reference
- **Connector Catalog**: https://runalloy.com/integrations
- **Support**: brandon@runalloy.com

---

## 🤝 Contributing

We welcome:
- 🐛 Bug reports
- 💡 Feature suggestions
- ❓ Questions about implementation
- 📖 Documentation improvements

**Open an issue** or **start a discussion** in this repository.

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
- ✨ Added table view for results
- ✨ Enhanced step indicator
- ✨ Modular architecture option
- 🎨 Professional styling with Alloy branding
- 🐛 Improved form field organization

### Version 3.0
- ✨ Added credential management UI
- ✨ Added live API inspector
- ✨ Added "View Connections" panel

### Version 2.0
- ✨ Added recursive schema parsing
- 🐛 Fixed path parameter extraction

### Version 1.0
- 🎉 Initial release

---

## 📄 Use This Demo As

✅ **Learning tool** - Understand the Connectivity API  
✅ **Prototype base** - Kickstart your integration project  
✅ **Code reference** - See implementation patterns  
✅ **Testing sandbox** - Try integrations before building  
✅ **Demo tool** - Show stakeholders what's possible  

## ❌ Don't Use This Demo As

❌ Production code to deploy as-is  
❌ The only way to build integrations  
❌ A secure, complete solution  
❌ Customer-facing production application  

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/lookerb10/alloy-capi-demo/issues)
- **Questions**: Open a discussion
- **Alloy Support**: brandon@runalloy.com

---

## 📜 License

MIT License - feel free to use this code as a starting point for your projects.

---

## 🙏 Acknowledgments

**Built with**: Vanilla JavaScript ES6, Alloy Connectivity API, Tailwind CSS  
**Maintained by**: Brandon Looker @ Alloy Automation  
**Version**: 4.0 - Enhanced UI/UX with Dark Mode & Modular Architecture  

---

**Made with ❤️ by the Alloy team**