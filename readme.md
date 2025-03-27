# Full-Stack React Native Expo App with Auth

This is a comprehensive guide to building a full-stack application with:
- React Native Expo (frontend)
- Bun + Express + Prisma (backend)
- Role-based authentication
- TailwindCSS for styling

## Project Structure

```
my-full-stack-app/
├── frontend/            # React Native Expo app
└── backend/             # Bun + Express + Prisma server
```

## 1. Backend Setup

### Initialize the backend

```bash
# Create the project structure
mkdir -p my-full-stack-app/{frontend,backend}
cd my-full-stack-app/backend

# Initialize backend with Bun
bun init
```

### Install dependencies

```bash
bun add express prisma @prisma/client cors jsonwebtoken bcryptjs dotenv
bun add -d typescript @types/express @types/cors @types/jsonwebtoken @types/bcryptjs
```

### Configure TypeScript

Create a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "dist",
    "sourceMap": true
  },
  "include": ["src/**/*"]
}
```

### Set up Prisma

```bash
bunx prisma init
```

Edit the `.env` file to set your database URL:

```
DATABASE_URL="postgresql://username:password@localhost:5432/my_app_db?schema=public"
```

Create the Prisma schema in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id             String   @id @default(uuid())
  email          String   @unique
  password       String
  name           String?
  role           Role     @default(USER)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
  MODERATOR
}
```

Generate the Prisma client:

```bash
bunx prisma generate
bunx prisma db push
```

### Create the Express server

Create `src/index.ts`:

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import { authenticateToken } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Create auth middleware

Create `src/middleware/auth.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret) as TokenPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};
```

### Create auth routes

Create `src/routes/auth.ts`:

```typescript
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'USER',
      },
    });

    // Create and sign JWT
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(tokenPayload, secret, { expiresIn: '1d' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign JWT
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(tokenPayload, secret, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
```

### Create user routes

Create `src/routes/users.ts`:

```typescript
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authorizeRole } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all users (admin only)
router.get('/', authorizeRole(['ADMIN']), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user (self or admin)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    // Check if this is the current user or an admin
    if (req.user?.userId !== id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    // Only admin can change roles
    const updateData: any = { name };
    if (req.user?.role === 'ADMIN' && role) {
      updateData.role = role;
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
```

### Create environment variables file

Create `.env`:

```
PORT=5000
JWT_SECRET=your-secret-key-change-this-in-production
DATABASE_URL="postgresql://username:password@localhost:5432/my_app_db?schema=public"
```

### Create start script

Update `package.json` to include start scripts:

```json
{
  "scripts": {
    "dev": "bun --watch src/index.ts",
    "build": "tsc",
    "start": "bun src/index.ts"
  }
}
```

## 2. Frontend Setup (React Native Expo)

### Initialize the Expo project

```bash
cd ../frontend
npx create-expo-app -t expo-template-blank-typescript .
```

### Install dependencies

```bash
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
npx expo install nativewind tailwindcss
npx expo install react-native-svg
npx expo install axios
```

### Configure TailwindCSS

Create a `tailwind.config.js` file:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add Babel configuration in `babel.config.js`:

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

Create a `app.d.ts` file to add TypeScript support for TailwindCSS:

```typescript
/// <reference types="nativewind/types" />
```

### Create the auth context

Create `src/context/AuthContext.tsx`:

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../config';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in
    const loadStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        
        if (storedToken) {
          // Set the token in axios headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          
          // Get user info
          const response = await axios.get(`${API_URL}/api/users/me`);
          setUser(response.data);
          setToken(storedToken);
        }
      } catch (error) {
        // Token is invalid or expired
        await AsyncStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save token to storage
      await AsyncStorage.setItem('token', token);
      
      // Set token in axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        email,
        password,
        name,
      });

      const { token, user } = response.data;

      // Save token to storage
      await AsyncStorage.setItem('token', token);
      
      // Set token in axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // Remove token from storage
      await AsyncStorage.removeItem('token');
      
      // Remove token from axios headers
      delete axios.defaults.headers.common['Authorization'];
      
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasRole = (roles: string[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Create configuration file

Create `src/config.ts`:

```typescript
// Use your server IP or domain here
export const API_URL = 'http://192.168.1.100:5000'; // Change to your server IP
```

### Create components

Create `src/components/Button.tsx`:

```typescript
import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  variant = 'primary',
  disabled = false,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 border-blue-500';
      case 'secondary':
        return 'bg-gray-500 border-gray-500';
      case 'outline':
        return 'bg-transparent border-gray-300';
      default:
        return 'bg-blue-500 border-blue-500';
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return 'text-white';
      case 'outline':
        return 'text-gray-700';
      default:
        return 'text-white';
    }
  };

  return (
    <TouchableOpacity
      className={`rounded-lg px-4 py-3 border ${getButtonStyle()} ${
        disabled ? 'opacity-50' : 'opacity-100'
      }`}
      onPress={onPress}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? '#4B5563' : '#FFFFFF'} />
      ) : (
        <Text className={`text-center font-semibold ${getTextStyle()}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
```

Create `src/components/Input.tsx`:

```typescript
import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-gray-700 mb-1 font-medium">{label}</Text>
      )}
      <TextInput
        className={`border rounded-lg px-4 py-2 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};

export default Input;
```

### Create screens

Create `src/screens/LoginScreen.tsx`:

```typescript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { login, isLoading } = useAuth();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      await login(email, password);
    } catch (error: any) {
      Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-12">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-800">Welcome back</Text>
          <Text className="text-gray-600 mt-2">Sign in to your account</Text>
        </View>

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          error={errors.email}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />

        <View className="mb-6 mt-2">
          <TouchableOpacity>
            <Text className="text-blue-500 text-right">Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Login"
          onPress={handleLogin}
          isLoading={isLoading}
        />

        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-blue-500 font-semibold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
```

Create `src/screens/RegisterScreen.tsx`:

```typescript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { register, isLoading } = useAuth();

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await register(email, password, name);
    } catch (error: any) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-12">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-800">Create account</Text>
          <Text className="text-gray-600 mt-2">Sign up to get started</Text>
        </View>

        <Input
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          error={errors.email}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />

        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={errors.confirmPassword}
        />

        <View className="mt-4 mb-8">
          <Button
            title="Register"
            onPress={handleRegister}
            isLoading={isLoading}
          />
        </View>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-blue-500 font-semibold">Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
```

Create `src/screens/HomeScreen.tsx`:

```typescript
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const HomeScreen = () => {
  const { user, logout, hasRole } = useAuth();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-12">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-800">Welcome, {user?.name || 'User'}</Text>
          <Text className="text-gray-600 mt-2">
            You are logged in as {user?.role.toLowerCase()}
          </Text>
        </View>

        <View className="p-6 bg-gray-50 rounded-lg mb-6">
          <Text className="text-lg font-semibold mb-2">Your Information</Text>
          <View className="mb-2">
            <Text className="text-gray-500">Email</Text>
            <Text>{user?.email}</Text>
          </View>
          <View className="mb-2">
            <Text className="text-gray-500">Role</Text>
            <Text>{user?.role}</Text>
          </View>
        </View>

        {hasRole(['ADMIN']) && (
          <View className="p-6 bg-blue-50 rounded-lg mb-6">
            <Text className="text-lg font-semibold mb-2">Admin Features</Text>
            <Text>You have access to admin-only features.</Text>
          </View>
        )}

        {hasRole(['MODERATOR', 'ADMIN']) && (
          <View className="p-6 bg-green-50 rounded-lg mb-6">
            <Text className="text-lg font-semibold mb-2">Moderator Features</Text>
            <Text>You have access to moderation features.</Text>
          </View>
        )}

        <Button
          title="Logout"
          onPress={logout}
          variant="outline"
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
```

Create `src/screens/ProfileScreen.tsx`:

```typescript
import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { API_URL } from '../config';

const ProfileScreen = () => {
  const { user, token } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const validate = () => {
    const newErrors: { name?: string } = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async () => {
    if (!validate()) return;

    try {
      setIsLoading(true);
      await axios.put(`${API_URL}/api/users/${user?.id}`, {
        name,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error: any) {
      Alert.alert('Update Failed', error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1