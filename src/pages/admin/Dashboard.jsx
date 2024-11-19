import React from 'react'
import AdminLayout from "../../components/layout/AdminLayout"
import { Box, Container, Input, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, 
    Group as GroupIcon,
     Message as MessageIcon ,  
     Notifications as NotificationsIcon, 
     Person as PersonIcon, } from '@mui/icons-material'
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/style/StyledComponents'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'
import { useFetchData } from '6pp'
import { server } from '../../constants/config'
import { useErrors } from "../../hooks/hook";



const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    "dashboard-stats"
  );

  
  const { stats } = data || {};

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);


const Appbar = <Paper
elevation={3}
sx={{
  padding: "2rem",
  margin: "2rem 1rem",
  borderradius: "1rem",

  
}}
>

  <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
    <AdminPanelSettingsIcon sx={{fontSize:"2rem"}}/>
    <SearchField placeholder="Search..." />
    <CurveButton>Search</CurveButton>
    <Box flexGrow={1}/>
   <Typography 
   display={{
    xs: "none",
    lg:"block"
   }}
   color={"rgba(0,0,0,0.7)"}
   textAlign={"center"}
   
   >{moment().format(" dddd, D  MMMM   YYYY")}
   
   
   </Typography>
  <NotificationsIcon/>
      
  </Stack>
</Paper>

const Widgets = (
  <Stack direction={{
    xs: "column",
    sm: "row",
 
  }} 
  spacing="2rem"
  alignItems="center"
  justifyContent="space-between"
  margin="2rem 0"
  >
    <Widget title={"Users"} value={stats?.userCount} icon={<PersonIcon/>}/>
    <Widget title={"Chats"} value={stats?.totalChatsCount} icon={<GroupIcon/>}/>
    <Widget title={"Messages"}value={stats?.messagesCount} icon={<MessageIcon/>}/>
  </Stack>
)
// console.log(data);


return (
  <AdminLayout>
    {loading ? (
      <Skeleton height={"100vh"} />
    ) : (
      <Container component={"main"}>
        {Appbar}

        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
          sx={{ gap: "2rem" }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "80%",
              maxWidth: "40rem",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">
              Last Messages
            </Typography>

            <LineChart value={stats?.messagesChart || []} />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem ",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              maxWidth: "25rem",
            }}
          >
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              value={[
                stats?.totalChatsCount - stats?.groupsCount || 0,
                stats?.groupsCount || 0,
              ]}
            />

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"80%"}
              height={"80%"}
            >
              <GroupIcon /> <Typography>Vs </Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    )}
  </AdminLayout>
);
};


const Widget = ({title , value ,icon})=>
<Paper 
elevation={3}
sx={{
  padding:"2rem",
  margin:"2rem 0",
  borderRadius:"1.5rem",
  width:"18rem",
}}
>

  <Stack  alignItems={"center"} spacing={"1rem"}>
    <Typography 
    sx={{
      color:"rgba(0,0,0,0.7)",
      borderRadius:"50%",
      border:`5px solid rgba(0,0,0,0.9)`,
      width:"5rem",
      height:"5rem",
      justifyContent:"center",
      alignItems:"center",
      display:"flex",
    }}
    
    >{value}</Typography>
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}> 
      {icon}
      <Typography>{title}</Typography>
    </Stack>
  </Stack>
</Paper>;

export default Dashboard


