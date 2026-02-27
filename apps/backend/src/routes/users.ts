// import express from 'express';
// import { PrismaClient } from '@repo/db';
// import { authorizeRole } from '../middleware/auth';

// const router = express.Router();
// const prisma = new PrismaClient();

// // Get all users (admin only)
// router.get('/', authorizeRole(['ADMIN']), async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         role: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get current user
// router.get('/me', async (req, res) => {
//   try {
//     if (!req.user?.userId) {
//       return res.status(401).json({ message: 'Authentication required' });
//     }

//     const user = await prisma.user.findUnique({
//       where: { id: req.user.userId },
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         role: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update user (self or admin)
// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, role } = req.body;

//     // Check if this is the current user or an admin
//     if (req.user?.userId !== id && req.user?.role !== 'ADMIN') {
//       return res.status(403).json({ message: 'Insufficient permissions' });
//     }

//     // Only admin can change roles
//     const updateData: any = { name };
//     if (req.user?.role === 'ADMIN' && role) {
//       updateData.role = role;
//     }

//     const user = await prisma.user.update({
//       where: { id },
//       data: updateData,
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         role: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;