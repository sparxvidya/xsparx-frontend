import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Skeleton, Stack } from '@mui/material';
import { gray, orange } from '../constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon} from '@mui/icons-material';
import { InputBox } from '../components/style/StyledComponents';
import FileMenu from '../components/dialog/FileMenu';
import MessageComponent from '../components/shared/MessageComponent';
import { getSocket } from '../socket';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/event';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { removeNewMessagesAlert } from '../redux/reducers/chat';
import { useInfiniteScrollTop } from '6pp';
import { TypingLoader } from "../components/layout/Loaders";
import { setIsFileMenu } from '../redux/reducers/misc';



 const Chat =({ chatId , user }) =>{
  const containerRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);



 const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);
   
    
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

   
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );
  

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas", //my name
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];
  
  return chatDetails.isLoading ? (
    <Skeleton/>
  ) : (
    <Fragment>
      <Stack 
    ref={containerRef}
     boxSizing={"border-box"}
     padding={"1rem"}
     spacing={"1rem"}
     bgcolor={ gray}
     height={"90%"}
     sx={{
       overflowY:"auto",
       overflowX:"hidden",
     }}
     >
{
  allMessages.map((i)=>(
    <MessageComponent key={i._id} message={i} user={user}/>
  ))
}
  {userTyping && <TypingLoader />}

        <div ref={bottomRef} />
    </Stack>
    <form style={{
      height:"10%",
    }}
    onSubmit={submitHandler}
    
    >
<Stack 
direction={"row"} 
padding={"1rem"}
height={"100%"}
alignItems={"center"}
position={"relative"}


>
  <IconButton 
  sx={{
    position:"relative" ,
    // left:"1.5rem",
    rotate:"30deg",
    spacing:"1rem",
  }}
  onClick={handleFileOpen}
  
  >
    <AttachFileIcon/>
  </IconButton>
  
  <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange }
          />
  <IconButton type="submit" sx={{
   bgcolor:orange,
    color:"white",
    padding:"0.5rem",
    marginLeft:"1rem",
    "&:hover":{
      bgcolor:"error.dark",
    },

  }}>
    <SendIcon />
  </IconButton>
</Stack>
    </form>
    <FileMenu   anchorE1={fileMenuAnchor} chatId={chatId}/>
    </Fragment>
  ) ;
}

export default AppLayout()(Chat);

