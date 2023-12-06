 import Home from './pages/Home/Home';
 import Jobs from './pages/Jobs/Jobs.js';
 import UserList from './pages/Users/UserList';
 import NewUser from './pages/NewUser/NewUser';

 let routes =[
    {path:'/' , element:<Home/>},
    {path:'/UserList' , element:<UserList/>},
    {path:'/Jobs' , element:<Jobs/>},
    {path:'/NewUser' , element:<NewUser/>},
 ];
 export default routes ;