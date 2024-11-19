import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
 } from '@mui/icons-material'
 import moment from 'moment'
import { transformImage } from '../../lib/features'


const Profile=({ user })=> {
  return (
   <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
    <Avatar
     src={transformImage(user?.avatar?.url)}
    sx={{
      width:"180px",
      height:"180px",
      objectFit:"contain",
      marginBottom:"1rem",
      border:"4px solid white",
      
    }}
    />
    <ProfileCard heading={"Bio"} text={user?.bio}  />
    <ProfileCard heading={"username"} text={user?.username} Icon={<UserNameIcon/>} />
    <ProfileCard heading={"Nane"} text={user?.name} Icon={<FaceIcon />} />
    <ProfileCard heading={"joined"} text={moment(user?.createdAt).fromNow()} Icon={<CalendarIcon />} />
   </Stack>
  )
}
const ProfileCard=({text , Icon , heading})=> <Stack 
direction={"row"} 
alignItems={"center"}
spacing={"1rem"}
color={"white"}
textAlign={"center"}
>
{Icon && Icon}
<Stack>
  <Typography variant='body1'>{text}</Typography>
  <Typography color='gray' variant='caption'>{heading}</Typography>
</Stack>

</Stack>
    
export default Profile
