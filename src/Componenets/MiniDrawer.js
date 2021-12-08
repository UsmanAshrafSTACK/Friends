import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import { doc, onSnapshot } from "firebase/firestore";
import {app , db, auth , storage} from './FirebaseConfig'
import {useState,useLayoutEffect} from 'react';
import UpdateUser from './UpdateUser';
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "@firebase/storage";
import ColorButtons from './ColorButtons';
import Stack from '@mui/material/Stack';
import { height } from '@mui/system';
import PostCard from './PostCard'
import {
  collection,
  setDoc,
  query,
  where
} from "firebase/firestore";
const Input = styled('input')({
  display: 'none',
});

const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {

const UploadPost=()=>{
  console.log("object")
  const user = auth.currentUser;
  if (user !== null) {
    const email = user.email;
    let d = new Date();
    let dd = new Date().toLocaleDateString;
    let t = d.getTime().toString();
    let files = document.getElementById("contained-button-file").files[0];
    let caption = document.getElementById("caption").value;
    const storageRef = ref(storage, `/${email}/${t}`);
    const uploadTask = uploadBytesResumable(storageRef, files);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        alert("An Error Occured During Uploading Your Picture");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          let pic = downloadURL;
          setDoc(doc(db, "Accounts", email , "post" ,t), {
          pic,
          caption
          });
       
        });
      }
    );

  }
}



  let [postDiv, setPostDiv] = useState(false)
  let [userDiv, setUserDiv] = useState(false)
let [post , setPost] = useState([])
  let [userInfo, setUserInfo] = useState("null")

  useLayoutEffect(() => {
  
    const user = auth.currentUser;
    if (user !== null) {
      const email = user.email;
      const uid = user.uid;
      onSnapshot(doc(db, "Accounts", email ), (doc) => {
        setUserInfo(doc.data().user);
    }); 
    }
      },[])
      useLayoutEffect(() => {
        const user = auth.currentUser;
        if (user !== null) {
          const email = user.email;
          onSnapshot(collection(db, "Accounts", email, 'post'), (snapShot) => setPost(snapShot.docs.map((doc) => (doc.data()))))

        }

    }, []);
   



  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            F R I E N D S
          </Typography>
          <Avatar alt="Trevor Henderson" style={{ left: "80%"}} src={userInfo.pic} onClick={()=>setUserDiv(!userDiv)}/>
        </Toolbar>
        
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Posts"].map((text) => (
            <ListItem button key={text}>
                <ListItemIcon>
              <Link to="/" className = "link">
                 {<PictureInPictureIcon />}
              </Link>
                </ListItemIcon>
              <Link to="/" className = "link">
                <ListItemText primary={text}  onClick={()=>{
                  if(!postDiv){
                    setPostDiv(true)
                  }
                }}/>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
       
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {userDiv && <UpdateUser src={userInfo.pic} name={userInfo.userName} phone={userInfo.phone} dob={userInfo.dob} gender={userInfo.gender} email={userInfo.email}/>}
        {postDiv &&  <div className="postDiv"> 
      <input type="button" value="X" className="input" onClick={()=>{
        if(postDiv){
setPostDiv(false)
        }
      }}/>
      <div className="postMain">     
           <textarea id="caption" placeholder="Enter Your Caption Here" style={{width:"100%", height:"300px"}}></textarea>
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          Upload a Picture
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
     
        </IconButton>
      </label>
    </Stack>
    <Stack direction="row" spacing={10} style={{margin:"20px 0px"}}>
      <Button variant="contained" color="success" onClick={UploadPost}>
        Upload A Post
      </Button>
     
    </Stack>
    {/* <ColorButtons /> */}
    </div>
    </div>}
     {post.map((e)=><PostCard/>)}
      </Box>
    </Box>
  );
}
