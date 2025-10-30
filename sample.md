# Welcome to File Converter! 

This is a **sample markdown file** to test your conversion.

## Features

Here are some great features of this app:

- Beautiful glassmorphism UI design
- Fast and efficient conversion
- Easy to use interface
- Responsive design

## Code Example

You can even include code blocks:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

Here's a longer code example to test page breaking:

```javascript
// Example: React Component with State Management
import React, { useState, useEffect } from 'react';

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://api.example.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
```

## Blockquote

> "The best way to predict the future is to invent it." - Alan Kay

## Lists

### Ordered List
1. First item
2. Second item
3. Third item

### Unordered List
- Apple
- Banana
- Orange

## Table

| Feature | Status |
|---------|--------|
| Markdown to PDF | ✓ Ready |
| HTML to PDF | Coming Soon |
| Word to PDF | Coming Soon |

## Links

Visit [GitHub](https://github.com) for more projects!

---

**Try converting this file to see the result!**

