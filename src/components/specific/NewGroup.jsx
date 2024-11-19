import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography} from '@mui/material'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';
import { useDispatch, useSelector } from 'react-redux';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { setIsNewGroup } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';



const NewGroup=()=> {

  const { isNewGroup} = useSelector(state => state.misc);

  const dispatch = useDispatch();

  const {isError, isLoading ,error, data} = useAvailableFriendsQuery();

  const [newGroup , isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)
 
const groupName = useInputValidation("")
  
const[members,setMembers]= useState(sampleUsers)
const[selectdMembers,setSelectedMembers]= useState([])

const errors = [{
  isError,
  error,
  
}];

useErrors(errors);

  const selectMemberHandler =(id)=>{
    setSelectedMembers((prev) =>(prev.includes(id)?prev.filter((currElement)=>currElement !==id) : [...prev,id]))
  };

  const submitHandler =()=>{
  
    if(!groupName.value) return toast.error("Group name is required");

    if(selectdMembers.length < 2) return toast.error("Please select atleast 3 members");

    newGroup("Creating New Group....",{name:groupName.value , members:selectdMembers })

    closeHandler();

  };
  const closeHandler=()=>{
    dispatch(setIsNewGroup(false));
  };
  return (
    <Dialog onClose={closeHandler} open={isNewGroup} >
    <Stack p={{xs:"1rem",sm:"3rem"}} width={"25rem"} spacing={"1rem"}>
      <DialogTitle textAlign={"center"} variant="h4">New Group</DialogTitle>
      <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
      <Typography variant="body1">Members</Typography>
      <Stack>


      {isLoading?( <Skeleton/>  ) :(data.friends?.map((i)=>(
   <UserItem  user={i} key={i._id}
handler={selectMemberHandler} isAdded={selectdMembers.includes(i._id)} />
  )))}


      </Stack >
      <Stack direction={"row"} justifyContent={"space-evenly"} ></Stack>
      <Button variant="contained"size="large" onClick={submitHandler} disabled={ isLoadingNewGroup} >Create</Button>
      <Button variant="text" color="error"  size="large" onClick={closeHandler}>Cancel</Button>
      
    </Stack>

  </Dialog>
  )
}

export default NewGroup
