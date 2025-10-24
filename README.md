# Alloy Connectivity API Demo

A comprehensive, interactive demo application showcasing the Alloy Connectivity API with **4 stunning white-label themes**. This demo provides a complete integration workflow from connector selection to action execution with live API calls.

Available in **two versions**: a single-file version for quick deployment and a modular version for development.

## 🎨 4 White-Label Themes

Press **T** to cycle through completely different layouts:

1. **Alloy Blue** (Default) - Clean, technical card grid layout with step indicators
2. **Enterprise Dashboard** - Professional sidebar navigation with table view and teal accents
3. **Startup Minimal** - Bold, spacious cards with purple/cyan gradients and glassmorphism
4. **Developer Console** - Terminal-style monospace interface with green-on-black theme

Each theme demonstrates the white-label power of Alloy CAPI - **same data, completely different products!**

## 🚀 Quick Start

### Option 1: Single-File Version (No Server Required)

**[📱 Try it Live](https://your-username.github.io/alloy-capi-demo/)** ← Click to use immediately!

Or download `index.html` (single-file version) and open directly in your browser. No server needed!

### Option 2: Modular Version (For Development)

Requires a local web server (see [Installation](#installation) below).
```bash
git clone https://github.com/yourusername/alloy-capi-demo.git
cd alloy-capi-demo/modular
python -m http.server 8000
# Open http://localhost:8000
```

## 📦 Two Versions Explained

### Single-File Version (`index.html`)
- ✅ All code in one HTML file
- ✅ No server required - open directly in browser
- ✅ Easy to share and deploy
- ✅ Perfect for demos and quick testing
- ✅ Can be hosted on GitHub Pages

### Modular Version (`/modular/`)
- ✅ Organized file structure
- ✅ Easier to maintain and extend
- ✅ Better for team development
- ✅ Requires local web server
- ✅ ES6 modules for clean imports

**Both versions have identical functionality and all 4 themes!**

## ✨ Features

### Core Functionality
- **Live API Integration** - Real-time calls to Alloy Connectivity API
- **100+ Connectors** - Support for all major SaaS platforms (HubSpot, Salesforce, Stripe, QuickBooks, etc.)
- **OAuth 2.0 Flow** - Complete authentication workflow with popup handling
- **Setup Requirements Badge** - Visual indicator for connectors requiring client credentials
- **Dynamic Schema Parsing** - Automatically generates forms from API schemas
- **Credential Management** - Connect, test, reconnect, and disconnect integrations
- **Action Execution** - Execute any API action with form validation
- **Recent Activity Tracking** - View and re-run past executions

### Developer Experience
- **API Inspector** - View all API calls with full request/response details
- **Grouped Credential Checks** - Intelligent batching of credential status calls
- **Dark Mode** - Full dark theme support (⌘D / Ctrl+D)
- **Keyboard Shortcuts** - Quick navigation and actions
- **Demo Data Generator** - Smart autofill for testing actions
- **Search & Filters** - Find connectors by name or category
- **Template System** - Save and reuse action configurations

### UI/UX
- **5-Step Workflow** - Visual progress through the integration flow
- **Real-time Status** - Live credential status badges with setup requirements
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Loading States** - Smooth transitions and feedback
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Non-intrusive theme change alerts
- **Modal Management** - Keyboard accessible modals (ESC to close)
- **Connection Manager** - Central hub for all connected platforms

## 📁 Project Structure
```
/alloy-capi-demo
  - index.html             # Single-file version (no server needed)
  - README.md              # This file
  
  /modular                 # Modular version (requires server)
    /js
      - main.js            # Main application logic
      - ui.js              # UI rendering (includes theme layouts)
      - themes.js          # Theme management system
      - api.js             # API client with call history
      - config.js          # Configuration management
      - schemaParser.js    # Dynamic schema parsing
      - demoData.js        # Smart test data generation
    - index.html           # Main HTML file with theme CSS
    - README.md            # Modular version documentation
```

## 🚀 Installation

### Prerequisites
- Alloy API Key ([Get one here](https://runalloy.com))
- Alloy User ID
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Single-File Setup (Easiest)

1. **Download** `index.html` (single-file version)
2. **Open** directly in your browser
3. **Enter** your API credentials
4. **Start** integrating!

### Modular Version Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/alloy-capi-demo.git
cd alloy-capi-demo/modular
```

2. **Start a local server** (choose one):

**Option A: Python**
```bash
python -m http.server 8000
```

**Option B: Node.js**
```bash
npx http-server -p 8000
```

**Option C: VS Code**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

3. **Open in browser**
```
http://localhost:8000
```

4. **Enter credentials** when prompted

## 🎯 Usage Flow

### 1. Choose Platform
Browse and select from 100+ available connectors. Use search and category filters to find the platform you need. Look for the **"⚙️ Setup Req'd"** badge to identify connectors that need additional configuration.

### 2. Select Resource & Action
Pick the data model (resource) and the specific action you want to perform (Create, Read, Update, Delete, List, etc.).

### 3. Configure Action
Fill in required and optional fields. Use the "✨ Fill Example Data" button to auto-populate with realistic test data.

### 4. Execute
Run the action against the live Alloy API. If not connected, you'll be prompted to authenticate via OAuth.

### 5. View Results
See the response in JSON or Table format. Copy the response or try another integration.

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `T` | Cycle through themes |
| `⌘D` / `Ctrl+D` | Toggle dark mode |
| `⌘K` / `Ctrl+K` | Focus search |
| `Esc` | Close modals |

## 🎨 Theme Customization

Each theme uses CSS classes for easy white-labeling. Modify colors, fonts, and layouts:
```css
/* Enterprise Theme - Teal colors */
body.theme-enterprise { 
  background: #f8fafc;
  color: #0f172a;
}
body.theme-enterprise .btn-primary { 
  background: #0f766e; 
}

/* Startup Minimal - Purple/Cyan gradients */
body.theme-minimal {
  background: linear-gradient(135deg, #faf5ff 0%, #f0f9ff 100%);
}
body.theme-minimal h1 {
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Developer Console - Green terminal */
body.theme-developer {
  background: #0a0e1a;
  color: #00ff41;
  font-family: 'Courier New', monospace;
}
```

### Creating Your Own Theme

**For Single-File Version:**
1. Add CSS in the `<style>` section
2. Add theme to `THEMES` array in JavaScript
3. Press T to cycle to your theme

**For Modular Version:**
1. Add CSS in `index.html` `<style>` section
2. Register in `js/themes.js` THEMES array
3. Add render method in `js/ui.js` (optional for custom layout)

## 🔧 API Endpoints Used

- `GET /connectors` - List available integrations
- `GET /connectors/{id}/credentials` - Check connection status
- `GET /connectors/{id}/credentials/metadata` - Get credential requirements & authConfigRequired
- `POST /connectors/{id}/credentials` - Create OAuth connection
- `DELETE /connectors/{id}/credentials/{credentialId}` - Disconnect
- `GET /connectors/{id}/resources` - Get available resources
- `GET /connectors/{id}/actions/{actionId}` - Get action schema
- `POST /connectors/{id}/actions/{actionId}/execute` - Execute action

## 📊 Features Deep Dive

### Setup Requirements Badge
The **"⚙️ Setup Req'd"** badge indicates connectors that require additional configuration (like client ID and secret) before authentication. Hover over the badge to see the tooltip explaining what's needed.

### API Inspector
The built-in API Inspector shows:
- HTTP method and status codes
- Request/response bodies
- Response times and timestamps
- Full URLs with parameters
- Grouped credential checks for better UX
- Expandable details for each call

### Recent Activity
- Tracks last 10 executions
- Shows success/failure status
- One-click re-run functionality
- Persists across browser sessions
- Preserves form data for quick retry

### Connection Manager
- View all connected platforms
- See credential count per platform
- Identify setup requirements at a glance
- Test connections in one click
- Reconnect or disconnect easily
- Central management hub

### Smart Form Generation
- Parses OpenAPI/JSON schemas automatically
- Handles nested objects and arrays
- Supports enums and boolean fields
- Validates required vs optional fields
- Generates intelligent placeholders
- Collapses optional fields for cleaner UI

### OAuth Flow
- Popup-based authentication
- Supports dynamic configuration fields (subdomain, API keys, etc.)
- Automatic retry on auth failure
- Credential persistence
- Secure redirect handling

## 🗂️ Technical Architecture

### Modular Design (Modular Version)
- **Config Module** (`config.js`) - Credential management with sessionStorage
- **API Module** (`api.js`) - Fetch wrapper with history tracking
- **Schema Parser** (`schemaParser.js`) - Dynamic form generation from OpenAPI specs
- **UI Module** (`ui.js`) - Theme-aware rendering system with setup badge support
- **Theme Module** (`themes.js`) - CSS-based theme switching
- **Demo Data Generator** (`demoData.js`) - Context-aware test data

### State Management
- Centralized state object
- Immutable updates via `setState()`
- Automatic re-rendering on state changes
- Reactive UI updates

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari 14+
- Modern browsers with ES6+ support

### Storage
- **sessionStorage** - API credentials (cleared on tab close for security)
- **localStorage** - Dark mode, theme selection, recent activity, saved templates

## 🔒 Security

- ✅ API credentials stored in `sessionStorage` (not persistent)
- ✅ No credentials logged to console
- ✅ OAuth flow uses Alloy's secure redirect
- ✅ HTTPS recommended for production
- ✅ No backend required (all client-side)
- ✅ Credentials cleared on browser close

## 🛠 Troubleshooting

### Blank page (Modular version only)
**Cause:** CORS error when opening `file://` directly  
**Solution:** Use a local web server (see [Installation](#installation))

### "No connectors loading"
- ✅ Check API key is valid
- ✅ Ensure User ID is correct
- ✅ Open browser console for error details
- ✅ Verify internet connection
- ✅ Try refreshing the page

### "OAuth not working"
- ✅ Allow popups in browser settings
- ✅ Check redirect URI configuration
- ✅ Verify connector supports OAuth2
- ✅ Complete authentication in popup window
- ✅ Click "I've Authenticated" button after OAuth
- ✅ Provide required setup fields (subdomain, client ID, etc.)

### "Action execution fails"
- ✅ Ensure connector is connected (green badge)
- ✅ Check if "Setup Req'd" badge is showing
- ✅ Fill all required fields (marked with *)
- ✅ Check API Inspector for detailed error
- ✅ Try "Test Connection" in credential modal
- ✅ Verify form data is in correct format

### Theme not switching
- ✅ Press T key (not while focused in input)
- ✅ Click the 🎨 Theme button
- ✅ Check browser console for errors
- ✅ Refresh page if needed

### Dark mode issues
- ✅ Try toggling dark mode (⌘D / Ctrl+D)
- ✅ Check if theme CSS conflicts
- ✅ Clear localStorage and try again

## 🌐 Deployment

### GitHub Pages (Single-File)
1. Push `index.html` to your repo
2. Go to Settings → Pages
3. Select branch and root folder
4. Visit `https://yourusername.github.io/repo-name/`

### GitHub Pages (Modular)
1. Push entire project to repo
2. Go to Settings → Pages
3. Select branch and `/modular` folder
4. Visit `https://yourusername.github.io/repo-name/`

### Static Hosting (Netlify, Vercel, etc.)
- Drag and drop the file/folder
- Or connect your GitHub repo
- Automatic deployments on push

## 📚 Resources

- [Alloy Documentation](https://docs.runalloy.com)
- [Alloy API Reference](https://docs.runalloy.com/reference)
- [Alloy Dashboard](https://runalloy.com)
- [Get API Credentials](https://runalloy.com/settings)
- [Alloy Support](https://runalloy.com/support)

## 🎯 Use Cases

This demo is perfect for:
- **Sales Demos** - Show prospects the ease of integration
- **Partner Enablement** - Help partners understand the API
- **Internal Testing** - Test integrations without writing code
- **White-Label Examples** - Demonstrate different UI possibilities
- **API Exploration** - Learn the Alloy API interactively
- **Integration Prototyping** - Quickly test workflows before building
- **Training & Onboarding** - Teach teams about the Alloy platform
- **Customer Demos** - Show live integrations to potential customers
- **Hackathons** - Quick setup for integration challenges

## 🌟 Key Highlights

- ✅ **Two versions** - Single-file and modular architectures
- ✅ **Zero backend required** - Pure client-side JavaScript
- ✅ **Live API calls** - Real integrations, not mocked data
- ✅ **4 complete themes** - Demonstrate white-label flexibility
- ✅ **Full OAuth flow** - Production-ready authentication
- ✅ **Setup badge indicator** - Visual cue for configuration requirements
- ✅ **Schema-driven** - Adapts to any connector automatically
- ✅ **Developer-friendly** - API inspector and keyboard shortcuts
- ✅ **Production-ready** - Comprehensive error handling
- ✅ **Open source** - Use and modify freely

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs via Issues
- Suggest new features
- Submit pull requests
- Improve documentation
- Add new themes
- Share use cases

## 📄 License

This demo is provided as-is for use with Alloy Connectivity API. Free to use and modify.

## 💡 Tips & Tricks

### Quick Testing
1. Use "Fill Example Data" to populate forms quickly
2. Save frequently used configurations as templates
3. Use Recent Activity to re-run past actions
4. Test connections before executing actions
5. Look for "Setup Req'd" badges to identify special requirements

### Keyboard Power User
- `⌘K` → Instant search
- `Tab` → Navigate through fields
- `⌘D` → Dark mode toggle
- `T` → Theme cycling
- `Esc` → Close any modal

### Debugging API Calls
- Open API Inspector (top-right)
- Expand any call for full details
- Copy responses for testing
- Watch grouped credential checks
- Monitor response times

### Custom Themes
1. Start with existing theme CSS
2. Change colors and fonts
3. Test in both light and dark mode
4. Share your theme with the community!

---

## 🔗 Quick Links

- **[📱 Try Single-File Live Demo](https://your-username.github.io/alloy-capi-demo/)**
- **[📦 Download Single-File Version](https://github.com/your-username/alloy-capi-demo/blob/main/index.html)**
- **[💻 View Modular Source](https://github.com/your-username/alloy-capi-demo/tree/main/modular)**
- **[📖 Alloy Docs](https://docs.runalloy.com)**

---

**Built with ❤️ to showcase the power of Alloy Connectivity API**

Press **T** to see the magic! 🎨