// demoData.js - Demo Data Generator Module
export const DemoDataGenerator = {
  generate(field) {
    const fieldName = field.name.toLowerCase();
    const fieldType = field.type;
    
    if (fieldName.includes('email')) return 'demo@example.com';
    if (fieldName.includes('phone') || fieldName.includes('mobile') || fieldName.includes('cell')) return '+1-555-0123';
    if (fieldName.includes('firstname') || fieldName.includes('first_name') || fieldName === 'first') return 'Jane';
    if (fieldName.includes('lastname') || fieldName.includes('last_name') || fieldName === 'last') return 'Smith';
    if (fieldName.includes('fullname') || fieldName.includes('full_name') || (fieldName === 'name' && !fieldName.includes('company'))) return 'Jane Smith';
    if (fieldName.includes('company') && !fieldName.includes('id')) return 'Acme Corporation';
    if (fieldName.includes('title') || fieldName.includes('position') || fieldName.includes('job')) return 'Product Manager';
    if (fieldName.includes('address') && !fieldName.includes('email')) return '123 Main Street';
    if (fieldName.includes('city')) return 'San Francisco';
    if (fieldName.includes('state') || fieldName.includes('province')) return 'California';
    if (fieldName.includes('zip') || fieldName.includes('postal')) return '94102';
    if (fieldName.includes('country')) return 'United States';
    if (fieldName.includes('website') || fieldName.includes('url') || fieldName.includes('domain')) return 'https://example.com';
    if (fieldName.includes('description') || fieldName.includes('note') || fieldName.includes('comment') || fieldName.includes('message')) {
      return 'This is a sample description created in demo mode for testing purposes.';
    }
    if (fieldName.includes('amount') || fieldName.includes('price') || fieldName.includes('revenue') || fieldName.includes('value') || fieldName.includes('budget')) {
      return fieldType === 'number' ? 50000 : '50000';
    }
    if (fieldName.includes('quantity') || fieldName.includes('qty') || fieldName.includes('count')) {
      return fieldType === 'number' ? 10 : '10';
    }
    if (fieldType === 'date') return new Date().toISOString().split('T')[0];
    if (fieldType === 'number') return 100;
    if (fieldType === 'select') return '';
    if (field.isArray) return '["example1", "example2"]';
    
    return `Sample ${field.displayName}`;
  }
};