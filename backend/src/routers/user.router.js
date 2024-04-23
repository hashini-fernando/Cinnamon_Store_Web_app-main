import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import { UserModel } from '../models/user.model.js';

const PASSWORD_HASH_SALT_ROUNDS = 10;
const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;


  const user = await UserModel.findOne({ email });

  if (user) {
    if (user.password === password) {
    
      const token = generateTokenResponse(user);
      res.send(token);
    } else {
    
      res.status(BAD_REQUEST).send('Invalid password');
    }
  } else {
 
    res.status(BAD_REQUEST).send('User not found');
  }
});



  const generateTokenResponse = user => {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      'SomeRandomText',
      {
        expiresIn: '30d',
      }
    );
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token,
    };

    }

    router.post('/register', async (req, res) => {
      try {
        const newUserData = req.body; 
    
        
        const newUser = await UserModel.create(newUserData);
    
        await newUser.save();
    
       
    
        res.status(201).json({ message: 'Registration successful', user: newUser });
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
      }
    });

    router.get('/users', async (req, res) => {
      try {
        
        const users = await UserModel.find();
    
        res.status(200).json(users);
      } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
      }
    });

    router.get('/users/:id', async (req, res) => {
      try {
        const userId = req.params.id;
    
     
        const user = await UserModel.findById(userId);
    
        if (!user) {
         
          return res.status(404).json({ error: 'User not found' });
        }
    
  
        res.status(200).json(user);
      } catch (error) {
        console.error('Error retrieving user by ID:', error);
        res.status(500).json({ error: 'Failed to retrieve user' });
      }
    });

    router.put('/users/:id', async (req, res) => {
      try {
        const userId = req.params.id;
        const updateData = req.body;
    
     
        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          updateData,
          { new: true } 
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
      }
    });

    router.delete('/delete/:id', async (req, res) => {
      try {
        const deleteUser = await UserModel.findByIdAndRemove(req.params.id).exec();
        if (!deleteUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Delete Successful', deleteUser });
      } catch (error) {
        res.status(400).json({ message: 'Delete unsuccessful', error: error.message });
      }
    });
    
  
    
  
    const logout = () => {
      userService.logout();
      setUser(null);
      toast.success('Logout Successful');
    };
  
    const updateProfile = async user => {
      const updatedUser = await userService.updateProfile(user);
      toast.success('Profile Update Was Successful');
      if (updatedUser) setUser(updatedUser);
    };
  
export default router;