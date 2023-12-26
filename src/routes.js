 import Home from './pages/Home/Home';
 import Jobs from './pages/Jobs/Jobs.js';
 import Users from './pages/Users/UserList';
 import CreateUser from './pages/NewUser/CreateUser.js';
 import LogIn from './pages/LogIn/LogIn.js';
 let routes =[
    {path:'/' , element:<Home/>},
    {path:'/Users' , element:<Users/>},
    {path:'/Jobs' , element:<Jobs/>},
    {path:'/CreateUser' , element:<CreateUser/>},
    {path:'/LogIn' , element:<LogIn/>},
 ];
 export default routes ;