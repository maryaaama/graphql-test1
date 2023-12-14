 import Home from './pages/Home/Home';
 import Jobs from './pages/Jobs/Jobs.js';
 import UserList from './pages/Users/UserList';
 import CreateUser from './pages/NewUser/CreateUser.js';

 let routes =[
    {path:'/' , element:<Home/>},
    {path:'/UserList' , element:<UserList/>},
    {path:'/Jobs' , element:<Jobs/>},
    {path:'/CreateUser' , element:<CreateUser/>},
   
 ];
 export default routes ;