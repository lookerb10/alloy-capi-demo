// schemaParser.js - Schema Parsing Module (WITH DEBUG LOGGING)
export const SchemaParser = {
  parseActionSchema(action) {
    console.log('🔧 parseActionSchema called with:', action);
    
    const schema = {
      method: this.detectHttpMethod(action),
      pathParameters: [],
      queryParameters: [],
      bodyParameters: [],
      requiredFields: [],
      optionalFields: []
    };

    console.log('📌 Detected method:', schema.method);

    // Extract path parameters
    if (action.path) {
      console.log('🔗 Action path:', action.path);
      const pathParams = action.path.match(/\{([^}]+)\}/g);
      if (pathParams) {
        console.log('🔍 Found path parameters:', pathParams);
        pathParams.forEach(match => {
          const paramName = match.replace(/[{}]/g, '');
          schema.pathParameters.push({
            name: paramName,
            displayName: this.humanizeFieldName(paramName),
            type: 'string',
            description: `Enter the ${this.humanizeFieldName(paramName)}`,
            required: true,
            paramType: 'path'
          });
        });
      }
    }

    // Find the schema - CHECK MULTIPLE LOCATIONS
    console.log('🔍 Checking for schema in action...');
    console.log('  - action.requestBody:', action.requestBody);
    console.log('  - action.requestBody?.schema:', action.requestBody?.schema);
    console.log('  - action.requestBody?.properties:', action.requestBody?.properties);
    console.log('  - action.requestBody?.content:', action.requestBody?.content);
    console.log('  - action.inputSchema:', action.inputSchema);
    console.log('  - action.schema:', action.schema);
    console.log('  - action.parameters:', action.parameters);
    
    let actionSchema = null;
    let requiredList = [];
    
    // Try multiple schema locations
    if (action.requestBody?.properties) {
      actionSchema = action.requestBody;
      requiredList = action.requestBody.required || [];
      console.log('📋 Found schema directly in requestBody (has properties)');
    } else if (action.requestBody?.content?.['application/json']?.schema) {
      actionSchema = action.requestBody.content['application/json'].schema;
      console.log('📋 Found schema in requestBody.content["application/json"].schema');
    } else if (action.requestBody?.schema) {
      actionSchema = action.requestBody.schema;
      console.log('📋 Found schema in requestBody.schema');
    } else if (action.inputSchema) {
      actionSchema = action.inputSchema;
      console.log('📋 Found schema in inputSchema');
    } else if (action.schema) {
      actionSchema = action.schema;
      console.log('📋 Found schema in schema');
    } else if (action.parameters && Array.isArray(action.parameters) && action.parameters.length > 0) {
      console.log('🔍 Checking action.parameters array...');
      console.log('  - Full parameters:', action.parameters);
      const bodyParam = action.parameters.find(p => p.in === 'body' || p.schema);
      console.log('  - Found bodyParam:', bodyParam);
      if (bodyParam?.schema) {
        actionSchema = bodyParam.schema;
        console.log('📋 Found schema in parameters[].schema');
      }
    }
    
    console.log('📋 Selected actionSchema:', actionSchema);
    console.log('📋 actionSchema.properties:', actionSchema?.properties);
    
    // Parse the schema if found
    if (actionSchema?.properties) {
      console.log('📦 Found properties in schema:', Object.keys(actionSchema.properties));
      if (!requiredList.length) {
        requiredList = actionSchema.required || [];
      }
      
      schema.bodyParameters = this.parseProperties(
        actionSchema.properties, 
        requiredList
      );
      console.log('✅ Parsed body parameters:', schema.bodyParameters);
    } else {
      console.log('⚠️ No properties found in schema');
    }

    const allParams = [...schema.pathParameters, ...schema.queryParameters, ...schema.bodyParameters];
    schema.requiredFields = allParams.filter(p => p.required);
    schema.optionalFields = allParams.filter(p => !p.required);

    console.log('📊 Final schema:', {
      method: schema.method,
      pathParams: schema.pathParameters.length,
      queryParams: schema.queryParameters.length,
      bodyParams: schema.bodyParameters.length,
      requiredFields: schema.requiredFields.length,
      optionalFields: schema.optionalFields.length
    });

    // If no schema found and no path params, generate generic schema
    if (schema.requiredFields.length === 0 && schema.optionalFields.length === 0) {
      console.log('⚠️ No fields found, generating generic schema for', schema.method);
      return this.generateGenericSchema(schema.method, action);
    }

    return schema;
  },
  
  generateGenericSchema(method, action) {
    console.log('🔧 Generating generic schema for method:', method);
    
    const schema = {
      method,
      pathParameters: [],
      queryParameters: [],
      bodyParameters: [],
      requiredFields: [],
      optionalFields: []
    };

    // For POST/PUT methods, add some generic fields
    if (method === 'POST' || method === 'PUT') {
      const genericFields = [
        {
          name: 'name',
          displayName: 'Name',
          type: 'string',
          description: 'Enter a name',
          required: true,
          paramType: 'body'
        },
        {
          name: 'description',
          displayName: 'Description',
          type: 'textarea',
          description: 'Enter a description',
          required: false,
          paramType: 'body'
        }
      ];
      
      schema.bodyParameters = genericFields;
      schema.requiredFields = genericFields.filter(f => f.required);
      schema.optionalFields = genericFields.filter(f => !f.required);
    }

    console.log('✅ Generated generic schema:', schema);
    return schema;
  },
  
  parseProperties(properties, requiredList = [], parentPath = '') {
    console.log(`  🔧 parseProperties called with ${Object.keys(properties).length} properties`);
    const fields = [];
    
    for (const key of Object.keys(properties)) {
      const prop = properties[key];
      const isRequired = requiredList.includes(key);
      const fieldPath = parentPath ? `${parentPath}.${key}` : key;
      
      console.log(`    • Processing field: ${key}`, { type: prop.type, hasNested: !!prop.properties });
      
      // Handle nested objects recursively
      if (prop.type === 'object' && prop.properties) {
        console.log(`    🔽 Recursing into nested object: ${key}`);
        const nestedFields = this.parseProperties(
          prop.properties, 
          prop.required || [], 
          fieldPath
        );
        fields.push(...nestedFields);
        continue;
      }
      
      // Handle arrays
      if (prop.type === 'array') {
        console.log(`    📋 Array field: ${key}`);
        fields.push({
          name: fieldPath,
          displayName: prop.title || this.humanizeFieldName(key),
          type: 'textarea',
          description: prop.description || `Enter ${this.humanizeFieldName(key)} as JSON array`,
          required: isRequired,
          paramType: 'body',
          isArray: true
        });
        continue;
      }
      
      // Regular field
      const field = {
        name: fieldPath,
        displayName: prop.title || this.humanizeFieldName(key),
        type: this.mapSchemaType(prop.type, prop.format),
        description: prop.description || `Enter ${this.humanizeFieldName(key)}`,
        required: isRequired,
        paramType: 'body'
      };

      if (prop.enum && Array.isArray(prop.enum)) {
        field.type = 'select';
        field.options = prop.enum.map(val => ({
          value: val,
          label: this.humanizeFieldName(String(val))
        }));
      }

      if (prop.type === 'boolean') {
        field.type = 'select';
        field.options = [
          { value: 'true', label: 'Yes' },
          { value: 'false', label: 'No' }
        ];
      }

      console.log(`    ➕ Added field: ${key}`);
      fields.push(field);
    }

    console.log(`  ✅ parseProperties returning ${fields.length} fields`);
    return fields;
  },
  
  detectHttpMethod(action) {
    if (action.httpMethod) return action.httpMethod.toUpperCase();
    if (action.method) return action.method.toUpperCase();
    
    const name = (action.name || action.id || '').toLowerCase();
    if (name.includes('create')) return 'POST';
    if (name.includes('update')) return 'PUT';
    if (name.includes('delete')) return 'DELETE';
    if (name.includes('list') || name.includes('get')) return 'GET';
    return 'POST';
  },
  
  mapSchemaType(type, format) {
    if (format === 'date' || format === 'date-time') return 'date';
    if (type === 'integer' || type === 'number') return 'number';
    if (type === 'boolean') return 'select';
    return 'string';
  },
  
  humanizeFieldName(name) {
    return name
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();
  },
  
  buildRequest(schema, formData) {
    console.log('🔧 buildRequest called with formData:', formData);
    
    const request = {
      pathParams: {},
      queryParameters: {},
      requestBody: {}
    };

    const allParams = [...schema.pathParameters, ...schema.queryParameters, ...schema.bodyParameters];
    
    allParams.forEach(param => {
      const value = formData[param.name];
      
      if (value !== undefined && value !== '') {
        let convertedValue = value;
        
        if (param.type === 'number') {
          convertedValue = Number(value);
        } else if (param.type === 'select' && (value === 'true' || value === 'false')) {
          convertedValue = value === 'true';
        } else if (param.isArray) {
          try {
            convertedValue = JSON.parse(value);
          } catch (e) {
            console.warn(`Failed to parse array for ${param.name}`);
          }
        }
        
        if (param.paramType === 'path') {
          request.pathParams[param.name] = convertedValue;
          console.log(`  🔗 Path param: ${param.name} = ${convertedValue}`);
        } else if (param.paramType === 'query') {
          request.queryParameters[param.name] = convertedValue;
          console.log(`  🔍 Query param: ${param.name} = ${convertedValue}`);
        } else {
          this.setNestedValue(request.requestBody, param.name, convertedValue);
          console.log(`  📦 Body param: ${param.name} = ${convertedValue}`);
        }
      }
    });

    console.log('✅ Built request:', request);
    return request;
  },
  
  setNestedValue(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[keys[keys.length - 1]] = value;
  }
};
