import './App.css';
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./src/components/login";
import Register from "./src/components/register";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import ManagerHome from "./src/components/Home/ManagerHome";
import UserHome from "./src/components/Home/UserHome";
import UserReservations from "./src/components/Home/UserReservations";
import {getBearerToken} from "./src/redux/utils";
import {login_with_token} from "./src/redux/user/action_creators";
import {Button, Descriptions, PageHeader, Switch} from "antd";
import Bikes from "./src/components/Bikes";
import ManageUsers from "./src/components/ManageUsers";

function App() {
    const user = useSelector(state => state.user.userObj)
    const showReservedBikes = useSelector(state => state.home.showBikesReserved)
    const dispatch = useDispatch();

    useEffect(() => {
        if (getBearerToken()) {
            dispatch(login_with_token())
        }
    }, [])
    return (
        <BrowserRouter>
            {user ?
                <>
                    {user.is_manager ?
                        <>
                            <PageHeader
                                ghost={false}
                                onBack={() => window.history.back()}
                                backIcon={null}
                                title={`Bike Rentals`}
                                subTitle={user.is_manager ? "manager's portal" : null}
                                extra={[
                                    <Button key="4" onClick={() => {
                                        window.location = '/'
                                    }}>Home</Button>,
                                    <Button key="3" onClick={() => {
                                        window.location = '/manage_bikes'
                                    }}>Manage Bikes</Button>,
                                    <Button key="2" onClick={() => {
                                        window.location = '/manage_users'
                                    }}>Manage Users/Managers</Button>,
                                    <Button key="1" type="primary" onClick={() => dispatch({type: "LOGOUT"})}>
                                        Log Out
                                    </Button>,
                                ]}
                            />
                            <div style={{padding: 30, background: "#ececec"}}>
                                <Routes>
                                    <Route exact path="/" element={<ManagerHome/>}/>
                                    <Route exact path="/manage_bikes" element={<Bikes/>}/>
                                    <Route exact path="/manage_users" element={<ManageUsers/>}/>
                                </Routes>
                            </div>
                        </>
                        :
                        <>
                            <PageHeader
                                ghost={false}
                                onBack={() => window.history.back()}
                                backIcon={null}
                                title={`Bike Rentals`}
                                subTitle={user.is_manager ? "manager's portal" : null}
                                extra={[
                                    <Button key="3" onClick={() => {
                                        window.location = '/my_reservations'
                                    }}>My Reservations</Button>,
                                    <Button key="2" onClick={() => {
                                        window.location = '/'
                                    }}>Home</Button>,
                                    <Button key="1" type="primary" onClick={() => {
                                        dispatch({type: "LOGOUT"})
                                        window.location = '/'
                                    }}>
                                        Log Out
                                    </Button>,
                                ]}
                            />
                            <div style={{padding: 30, background: "#ececec"}}>
                                <Routes>
                                   <Route exact path="/" element={<UserHome/>}/>
                                   <Route exact path="/my_reservations" element={<UserReservations/>}/>
                                    <Route path={'/register'} element={<Navigate to={'/'}/>}/>
                                    <Route path={'/login'} element={<Navigate to={'/'}/>}/>

                                </Routes>

                            </div>
                        </>
                    }
                </>
                :
                <>
                    {/*<PageHeader*/}
                    {/*    ghost={false}*/}
                    {/*    onBack={() => window.history.back()}*/}
                    {/*    backIcon={null}*/}
                    {/*    title={`Bike Rentals`}*/}
                    {/*    subTitle={"a place to rent bikes"}*/}

                    {/*/>*/}
                    <div style={{width: "99%", height:"96%",background:"#fff"}} >
                        <div style={{padding:"100px 200px", display:"flex"}}>
                            <div style={{background:"#ececec",padding:50, flex:1, borderBottomLeftRadius:10,borderTopLeftRadius:10, display:"flex", alignItems:"center",justifyContent:"center"}}>
                                <Routes>
                                    {/*<Route path={'/'} element={<Navigate to={'login'}/>}/>*/}
                                    <Route path="/" element={<Login/>}/>
                                    <Route path="register" element={<Register/>}/>
                                </Routes>
                            </div>
                            <div style={{flex:1, background:"#5d4770", borderBottomRightRadius:10,borderTopRightRadius:10,
                                display: "flex",
                                justifyContent: "center",
                                color:"white",
                                fontSize:40,
                                flexDirection:"column"
                                // padding: 100,
                            }}>
                                <h2 style={{marginLeft:40,color:"white"}}>Bike</h2>
                                <h2 style={{marginTop:-75,marginLeft:40,color:"white"}}>Rental</h2>
                                <h2 style={{marginTop:-75,marginLeft:40,color:"white"}}>System</h2>
                                <p style={{marginTop:-50,marginLeft:40,color:"white", fontSize:23}}>A place to rent bikes</p>
                            </div>
                        </div>

                    </div>
                    <div style={{height:20}}></div>
                </>
            }
            }
        </BrowserRouter>
    );
}

export default App;
