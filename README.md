# Alloy Connectivity API Demo

A comprehensive, interactive demo application showcasing the Alloy Connectivity API with **4 stunning white-label themes**. This demo provides a complete integration workflow from connector selection to action execution with live API calls.

## 🎨 4 White-Label Themes

Press **T** to cycle through completely different layouts:

1. **Alloy Blue** (Default) - Clean, technical card grid layout with step indicators
2. **Enterprise Dashboard** - Professional sidebar navigation with table view and teal accents
3. **Startup Minimal** - Bold, spacious cards with purple/cyan gradients and glassmorphism
4. **Developer Console** - Terminal-style monospace interface with green-on-black theme

Each theme demonstrates the white-label power of Alloy CAPI - **same data, completely different products!**

## ✨ Features

### Core Functionality
- **Live API Integration** - Real-time calls to Alloy Connectivity API
- **100+ Connectors** - Support for all major SaaS platforms
- **OAuth 2.0 Flow** - Complete authentication workflow with popup handling
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
- **Modular Architecture** - Clean separation of concerns

### UI/UX
- **5-Step Workflow** - Visual progress through the integration flow
- **Real-time Status** - Live credential status badges
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Loading States** - Smooth transitions and feedback
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Non-intrusive theme change alerts
- **Modal Management** - Keyboard accessible modals (ESC to close)

## 🚀 Getting Started

### Prerequisites
- Alloy API Key ([Get one here](https://runalloy.com))
- Alloy User ID
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (Python, Node.js, or VS Code Live Server)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/alloy-capi-demo.git
cd alloy-capi-demo
```

2. **Start a local server**

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

4. **Enter credentials**
- API Key (starts with `sk_`)
- User ID (your Alloy user identifier)

5. **Start integrating!**

## 📁 Project Structure
```
/alloy-capi-demo
  /js
    - main.js           # Main application logic
    - ui.js             # UI rendering (includes theme layouts)
    - themes.js         # Theme management system
    - api.js            # API client with call history
    - config.js         # Configuration management
    - schemaParser.js   # Dynamic schema parsing
    - demoData.js       # Smart test data generation
  - index.html          # Main HTML file with theme CSS
  - README.md           # This file
```

## 🎯 Usage Flow

### 1. Choose Platform
Browse and select from 100+ available connectors. Use search and category filters to find the platform you need.

### 2. Select Resource & Action
Pick the data model (resource) and the specific action you want to perform (Create, Read, Update, Delete, List, etc.).

### 3. Configure Action
Fill in required and optional fields. Use the "Fill Example Data" button to auto-populate with realistic test data.

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

Each theme uses CSS classes for easy white-labeling. Modify colors, fonts, and layouts in `index.html`:
```css
/* Enterprise Theme - Teal colors */
body.theme-enterprise { 
  background: #f8fafc;
}
body.theme-enterprise h1 { 
  color: #0f766e; 
}

/* Startup Minimal - Purple/Cyan gradients */
body.theme-minimal h1 {
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
}

/* Developer Console - Green terminal */
body.theme-developer {
  background: #0a0e1a;
  color: #00ff41;
}
```

Create your own themes by adding new CSS classes and registering them in `js/themes.js`.

## 🔧 API Endpoints Used

- `GET /connectors` - List available integrations
- `GET /connectors/{id}/credentials` - Check connection status
- `GET /connectors/{id}/credentials/metadata` - Get credential requirements
- `POST /connectors/{id}/credentials` - Create OAuth connection
- `DELETE /connectors/{id}/credentials/{credentialId}` - Disconnect
- `GET /connectors/{id}/resources` - Get available resources
- `GET /connectors/{id}/actions/{actionId}` - Get action schema
- `POST /connectors/{id}/actions/{actionId}/execute` - Execute action

## 📊 Features Deep Dive

### API Inspector
The built-in API Inspector shows:
- HTTP method and status codes
- Request/response bodies
- Response times and timestamps
- Full URLs with parameters
- Grouped credential checks for better UX

### Recent Activity
- Tracks last 10 executions
- Shows success/failure status
- One-click re-run functionality
- Persists across browser sessions

### Smart Form Generation
- Parses OpenAPI/JSON schemas automatically
- Handles nested objects and arrays
- Supports enums and boolean fields
- Validates required vs optional fields
- Generates intelligent placeholders

### OAuth Flow
- Popup-based authentication
- Supports subdomain requirements (Zendesk, etc.)
- Automatic retry on auth failure
- Credential persistence

## 🏗️ Technical Architecture

### Modular Design
- **Config Module** - Credential management with sessionStorage
- **API Module** - Fetch wrapper with history tracking
- **Schema Parser** - Dynamic form generation from OpenAPI specs
- **UI Module** - Theme-aware rendering system
- **Theme Module** - CSS-based theme switching
- **Demo Data Generator** - Context-aware test data

### State Management
- Centralized state object
- Immutable updates via `setState()`
- Automatic re-rendering on state changes

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Modern browsers with ES6+ module support

### Storage
- **sessionStorage** - API credentials (cleared on tab close for security)
- **localStorage** - Dark mode preference, theme selection, recent activity, saved templates

## 🔒 Security

- API credentials stored in `sessionStorage` (not persistent across browser sessions)
- No credentials logged to console
- OAuth flow uses Alloy's secure redirect
- HTTPS required for production use
- No backend required (all client-side)

## 🐛 Troubleshooting

### Blank page on load
**Cause:** CORS error when opening `file://` directly  
**Solution:** Use a local web server (see Installation section)

### "No connectors loading"
- ✅ Check API key is valid
- ✅ Ensure User ID is correct
- ✅ Open browser console for error details
- ✅ Verify internet connection

### "OAuth not working"
- ✅ Allow popups in browser settings
- ✅ Check redirect URI matches configuration
- ✅ Verify connector supports OAuth2
- ✅ Complete authentication in popup window

### "Action execution fails"
- ✅ Ensure connector is connected (green badge)
- ✅ Fill all required fields (marked with *)
- ✅ Check API Inspector for detailed error
- ✅ Try "Test Connection" in credential modal

### Theme not switching
- ✅ Press T key (not in an input field)
- ✅ Click the 🎨 Theme button
- ✅ Check browser console for errors
- ✅ Refresh the page

## 📚 Resources

- [Alloy Documentation](https://docs.runalloy.com)
- [Alloy API Reference](https://docs.runalloy.com/reference)
- [Alloy Dashboard](https://runalloy.com)
- [Get API Credentials](https://runalloy.com/settings)

## 🎯 Use Cases

This demo is perfect for:
- **Sales Demos** - Show prospects the ease of integration
- **Partner Enablement** - Help partners understand the API
- **Internal Testing** - Test integrations without writing code
- **White-Label Examples** - Demonstrate different UI possibilities
- **API Exploration** - Learn the Alloy API interactively
- **Integration Prototyping** - Quickly test workflows before building
- **Training & Onboarding** - Teach teams about the Alloy platform

## 🌟 Key Highlights

- ✅ **Zero backend required** - Pure client-side JavaScript
- ✅ **Live API calls** - Real integrations, not mocked data
- ✅ **4 complete themes** - Demonstrate white-label flexibility
- ✅ **Full OAuth flow** - Production-ready authentication
- ✅ **Schema-driven** - Adapts to any connector automatically
- ✅ **Developer-friendly** - API inspector and keyboard shortcuts
- ✅ **Production-ready** - Comprehensive error handling
- ✅ **Modular architecture** - Easy to extend and customize
- ✅ **Open source** - Use and modify freely

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation
- Add new themes

## 📄 License

This demo is provided as-is for use with Alloy Connectivity API.

## 💡 Tips & Tricks

### Creating Custom Themes
1. Add CSS class in `index.html` (e.g., `body.theme-custom`)
2. Define your styles
3. Register in `js/themes.js` THEMES array
4. Press T to see your theme!

### Debugging API Calls
- Open API Inspector (top-right)
- Expand any call to see full request/response
- Copy responses for testing
- Watch grouped credential checks

### Keyboard Power User
- `⌘K` → Search connectors
- Select connector → `Tab` through resources
- `⌘D` → Toggle dark mode anytime
- `T` → Cycle themes
- `Esc` → Close any modal

---

**Built with ❤️ to showcase the power of Alloy Connectivity API**

Press **T** to see the magic! 🎨