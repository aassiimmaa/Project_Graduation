'use client'
import React, { useState } from 'react';
import { Avatar, Box, Button, Container, Paper, TextField, Typography, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { NavBar } from '../components/NavBar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const ProfilePage: React.FC = () => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phoneNumber: '0123456789',
    });

    const [avatar, setAvatar] = useState<string | null>(null);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
       <>
            <NavBar />
            <Container maxWidth="sm" sx={{ mt: 18 }}>
                <Paper elevation={4} sx={{ p: 4, textAlign: 'center', m: 4 }}>
                    <Box position="relative" display="inline-block">
                        <Avatar
                            src={avatar || '/default-avatar.png'}
                            sx={{ width: 120, height: 120, margin: '0 auto', mb: 2 }}
                        />
                        {isEditing && (
                            <>
                                <input
                                    accept="image/*"
                                    type="file"
                                    style={{ display: 'none' }}
                                    id="avatar-upload"
                                    onChange={handleAvatarChange}
                                />
                                <label htmlFor="avatar-upload">
                                    <IconButton
                                        component="span"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            backgroundColor: 'white',
                                            boxShadow: 2,
                                        }}
                                    >
                                        <PhotoCameraIcon />
                                    </IconButton>
                                </label>
                            </>
                        )}
                    </Box>
                    
                    <Typography variant="h5" fontWeight="bold">Thông tin cá nhân</Typography>
                    <Box component="form" sx={{ mt: 3 }}>
                        <TextField
                            fullWidth
                            label="Họ và tên"
                            name="fullName"
                            margin="normal"
                            variant="outlined"
                            value={userInfo.fullName}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            margin="normal"
                            variant="outlined"
                            value={userInfo.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                        <TextField
                            fullWidth
                            label="Số điện thoại"
                            name="phoneNumber"
                            margin="normal"
                            variant="outlined"
                            value={userInfo.phoneNumber}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleEditToggle}
                            >
                                {isEditing ? 'Lưu' : 'Chỉnh sửa'}
                            </Button>
                            <Button
                                variant="outlined"
                                color="warning"
                                onClick={() => router.push('/Profile/ChangePassword')}
                            >
                                Đổi mật khẩu
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
       </>
    );
};

export default ProfilePage;
