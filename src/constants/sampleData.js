

export const samplechats = [{
    avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
    name: "John Doe",
    _id:"1",
    groupChat:false,
    members:["1","2"],
},

{
    avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
    name: "John ",
    _id:"2",
    groupChat:false,
    members:["1","2"],
},
];
 export const sampleUsers = [{
    avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
    name: "John ",
    _id:"1",
 },
 {
    avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
    name: "John ",
    _id:"2",
 },
];
export const sampleNotification = [{
    sender:{
      avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
      name: "John ",
    },
      _id:"1",
   },
   {
      sender:{
          avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
          name: "John ",
        },
      _id:"2",
   },
];
export const sampleMessage = [{
   attachments: [{
      public_id:"vidya",
      url:"https://www.w3schools.com/images/w3schools_green.jpg",
      
   },
],
content: "vfiffjfig vfnvfegn d" ,
_id:"vfjgrgjrfjrfnrfnfnrf",
sender:{
   _id:"user_id",
   name:" vvfff"
},
chat:"chatId",
createdAt:"2024-05-22T18:30:00.000Z"
},
{
   attachments: [{
      public_id:"vidya2",
      url:"https://www.w3schools.com/images/w3schools_green.jpg",
      
   },
],
content: "vfiffjfig vfnvfegn d2" ,
_id:"vfjgrgjrfjrfnrfnfnrf2",
sender:{
   _id:"vidgg",
   name:" vvfff2"
},
chat:"chatId2",
createdAt:"2024-05-22T18:30:00.000Z"
},

];

export const dashboardData= {
   users:[{
      _id:"1",
      name:"John Doe",
      avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
      username:"John_Doe",
      friends:20,
      groups:4,
   },
{
   _id:"2",
   name:"John Doe2",
   avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
   username:"John_Doe2",
   friends:15,
   groups:3,
},
],
chats:
[
   {
   _id:"1",
   name:"John Do",
   avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
   members:["2", "3", "4", ],
   totalMessages:20,
   totalMembers:4,
   creator:{
     
      name:"John Doe",
      avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
   },
},
{
   _id:"2",
   name:"Johnghgh Do",
   avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
   members:["2", "3", "4", ],
   totalMessages:20,
   totalMembers:4,
   creator:{
     
      name:"Jhjhjjjj",
      avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
   },
},
],
messages:[{
   _id:"1",
   attachments:[],
   content:"Hello",
   createdAt:"2024-05-22T18:30:00.000Z",
   sender:{
      _id:"1",
      name:"John Doe",
      avatar:["https://www.w3schools.com/images/w3schools_green.jpg"],
   },
   chat:"1",
}]
};