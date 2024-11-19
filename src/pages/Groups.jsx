import React, { memo, Suspense, useState ,lazy } from 'react'
import {Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography} from "@mui/material"
import {
Add as AddIcon,
Delete as DeleteIcon,
Done as DoneIcon, 
Edit as EditIcon,
KeyboardBackspace as KeyboardBackspaceIcon,
 Menu as MenuIcon,
  } from "@mui/icons-material"
import { bgGradient, matBlack } from '../constants/color';
import {useNavigate , useSearchParams} from "react-router-dom";
import {Link} from "../components/style/StyledComponents"
import AvatarCard from "../components/shared/AvatarCard"
import {samplechats, sampleUsers} from "../constants/sampleData"
import { useEffect } from 'react';
import UserItem from '../components/shared/UserItem';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, 
  useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { LayoutLoader } from '../components/layout/Loaders';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../redux/reducers/misc';

const ConfirmDeleteDioalog = lazy(()=>
import("../components/dialog/ConfirmDeleteDioalog")
);
const AddMemberDialog = lazy(()=>
  import("../components/dialog/AddMemberDialog")
  );


const Groups=()=> {

  const chatId = useSearchParams()[0].get("group")
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);
const myGroups = useMyGroupsQuery("");

// console.log(myGroups.data)
const groupDetails = useChatDetailsQuery( { chatId, populate: true }, { skip: !chatId }
);
// console.log(groupDetails.data)


const [updateGroup, isLoadingGroupName] = useAsyncMutation(
  useRenameGroupMutation
);
const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
  useRemoveGroupMemberMutation
);

const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
  useDeleteChatMutation
);

  const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);
  const navigateBack = () => {
    navigate("/");
  };
    const handleMobile = ()=> { 
      setIsMobileMenuOpen((prev) =>!prev);
    };
    const handleMobileClosed = () => setIsMobileMenuOpen(false);
    const [isEdit,setIsEdit]=useState(false);
const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false);

    const [groupName, setGroupName]=useState("");
    const [groupNameUpadatedvalue, setGroupNameUpadatedValue]=useState("");
    const [members, setMembers] = useState([]);

    const errors = [{
      isError : myGroups.isError,
      error : myGroups.error,
    },
     
    { isError : groupDetails.isError,
      error : groupDetails.error,
    },
  ];
  

    useErrors(errors)

    useEffect(() => {
      const groupData = groupDetails.data;
      if (groupData) {
        setGroupName(groupData.chat.name);
        setGroupNameUpadatedValue(groupData.chat.name);
        setMembers(groupData.chat.members);
      }
  
      return () => {
        setGroupName("");
        setGroupNameUpadatedValue("");
        setMembers([]);
        setIsEdit(false);
      };
    }, [groupDetails.data]);

    const updateGroupName = () => {
      setIsEdit(false);
      updateGroup("Group Name Updating...",{chatId, name:groupNameUpadatedvalue})
      // console.log(groupNameUpadatedvalue);
    };
   const openconfirmDeleteHandler=() => {
    setConfirmDeleteDialog(true);
  
   };
   const closeConfirmDeleteHandler=() => {
    setConfirmDeleteDialog(false);
  
   };
   const openAddMemberHandler = () => {
   dispatch(setIsAddMember(true));
   };
   const DeleteHandler=() => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups")
   };
   const removeMemeberHandler=(userId)=>{
   removeMember("Removing member",{ chatId , userId});
   };

    useEffect(()=>{
      if(chatId){
        setGroupName(`Group Name ${chatId}`)
        setGroupNameUpadatedValue(`Group Name ${chatId}`)
      }
      return ()=>{
        setGroupName("");
        setGroupNameUpadatedValue("");
      setIsEdit(false);
      }
    },[chatId]);

      const IconBtns = (<>
<Box 
sx={{
  display:{
    xs:"block",
    sm:"none",
    position:"fixed",
    right:"1rem",
    top:"1rem",
  }
}}

>
<IconButton onClick={handleMobile} >
  <MenuIcon />
</IconButton>
</Box>

  <Tooltip title="back">
    <IconButton 
    sx={{
      position: 'absolute',
      top: '2rem',
      left: "2rem",
      bgcolor: matBlack,
      color:"white",
      "&:hover":{
        bgcolor: "rgba(0,0,0,0.6)",
      },
    }}
    onClick={navigateBack}
    >
      <KeyboardBackspaceIcon />
    </IconButton>
  </Tooltip>

  </>);
  const GroupName =( 
  <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}spacing={"1rem"}padding={"3rem"}>
    {
      isEdit ? (<> 
      <TextField  value={groupNameUpadatedvalue} onChange={e=>setGroupNameUpadatedValue(e.target.value)}/>
      <IconButton onClick={updateGroupName}  disabled={isLoadingGroupName}>
        <DoneIcon />
      </IconButton>
      </> ):( <>
      <Typography variant='h3'>{groupName}</Typography>
      <IconButton  disabled={isLoadingGroupName} onClick={()=>setIsEdit(true)}><EditIcon/></IconButton>

      </>
   ) }
  </Stack>
  );
const ButtonGroup =(
<Stack
direction={{
  xs:"column-reverse",
  sm:"row",
  
}}
        spacing={"2rem"}
        p={{
          xs:"0",
          sm:"1rem",
          md:"1rem 4rem"
        }}
>

        <Button color="error"  size="large" startIcon={<DeleteIcon/>} 
        onClick={openconfirmDeleteHandler}>Delete Group</Button>
        <Button  variant="contained"size="large" startIcon={<AddIcon/>} 
        onClick={openAddMemberHandler}>Add Member</Button>
</Stack>)


  return  myGroups.isLoading ? (
    <LayoutLoader />
  ) :  myGroups.isLoading ? < LayoutLoader/> : (
    <Grid container height={"100vh"}>

      <Grid 
        item 
        sx={{
          display:{
          xs:"none",
          sm:"block",
          },
        
        }}
        sm={4}
       
        >
          <GroupList  myGroups={myGroups?.data?.groups} chatId={chatId}/>
        </Grid>
        <Grid item xs={12} sm={8} sx={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          position:"relative",
          padding:"1rem 3rem",
        }} >

          {IconBtns}
          {
           groupName &&  <>
           
           {GroupName}
           <Typography 
           margin={"2rem"}
           alignSelf={"flex-start"}
           variant={"body1"}
           >Members
           </Typography>
           <Stack
           maxWidth={"45rem"}
           width={"100%"}
           boxSizing={"border-box"}
           padding={{
            sm:"1rem",
            xs:"0rem",
            md:"1rem 4rem",
           }}
           spacing={"2rem"}
           height={"50vh"}
           overflow={"auto"}
           >
           {/* {Members}  */}
           {
            isLoadingDeleteGroup? (<CircularProgress/>
              
            ):
            members.map((i)=>(
              <UserItem user={i} isAdded styling={{
                boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                padding:"1 rem 2rem",
                borderRadius:"1rem",
              }} 
              handler={removeMemeberHandler}
              key={i._id}
              />
            ))
           }
           </Stack>
           {ButtonGroup}
           </>
          }
          </Grid>
          {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}
        {
          confirmDeleteDialog && (
            <Suspense fallback={<Backdrop open/>}>
           <ConfirmDeleteDioalog open={confirmDeleteDialog}
           handleClose={closeConfirmDeleteHandler}
           deleteHandler={DeleteHandler}
           />
            </Suspense>
          )
        }



          <Drawer
           sx={{
            display:{
            xs:"block",
            sm:"none",
            },
          
          }}
          open={isMobileMenuOpen} onClose={handleMobileClosed} >
          <GroupList  w={"50vm"}myGroups={myGroups?.data?.groups} chatId={chatId}/>
          </Drawer>
    </Grid>
  );
};

const GroupList = ({w="100%",myGroups=[],chatId}) => (
  <Stack width={w} 
  sx={{
    backgroundImage:bgGradient,
    height:"100vh"
  }}
  >
    {
      myGroups.length > 0 ? (
        myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />) 
      ):(
          <Typography textAlign={"center"} padding={"1rem"}>
            No Groups found
          </Typography>
        )
    }
  </Stack>
);
const GroupListItem =memo( ({group ,chatId}) => {
  const {
    name,avatar,_id
  }= group;
  return <Link to={`?group=${_id}`} 
  onClick={(e)=>{
    if(chatId ===_id)e.preventDefault();
  }}
  >
  <Stack direction={"row"} alignItems={"center"}spacing={"1rem"}>
    <AvatarCard  avatar={avatar}/>
    <Typography>{name}</Typography>
  </Stack>
  
  
  </Link>
});
export default Groups