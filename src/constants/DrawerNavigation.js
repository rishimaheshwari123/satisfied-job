
import CustomDrawerContent from "../component/CustomDrawerContent.jsx";
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons, or any other icon library you prefer
import { useSelector } from "react-redux";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { headerStyle } from '../constants/colors';

/* login */
import { useEmployeeLoggedIn } from "./auth.js";


/* employee */
import DashScreen from "../dashbord/DashBord.jsx";
import Profile from "../dashbord/Profile";
import AllJobsScreen from "../dashbord/AllJobs";
import CreateJobScreen from "../dashbord/CreateJob";
import AddForCompny from "../dashbord/AddForCompny.jsx";


/* Admin */
import AllStudent from "../Admin/AllStudent.jsx"
import AllEmployee from "../Admin/AllEmployee.jsx"
import AllJobs from "../Admin/AllJobs.jsx"
import DashBoard from "../Admin/Dashboard.jsx"

/* icons */
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import Adds from "../component/Adds.jsx";

const Drawer = createDrawerNavigator();

function MyDrawer() {
    const { employee, loading } = useSelector((e) => e.employee);


    const route = useRoute();
    const { employeeLoggedIn, setEmployeeLoggedIn } = route.params || {};


    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent  {...props} setEmployeeLoggedIn={setEmployeeLoggedIn} />}>
            {!employee?.isAdmin ?
                <>
                    <Drawer.Screen
                        name="Dashboard"
                        component={DashScreen}
                        options={{
                            drawerIcon: ({ focused, size }) => (
                                <Icon
                                    name={focused ? 'home' : 'home-outline'}
                                    size={size}
                                    color={focused ? '#4080ED' : '#5F5F5F'}
                                />
                            ),
                            headerStyle: {
                                backgroundColor: '#4080ED',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            },
                            headerTintColor: 'white',
                        }}
                    />

                    <Drawer.Screen
                        name="Jobs"
                        component={AllJobsScreen}
                        options={{
                            drawerIcon: ({ focused, size }) => (
                                <Icon
                                    name={focused ? 'briefcase' : 'briefcase-outline'}
                                    size={size}
                                    color={focused ? '#4080ED' : 'black'}
                                />
                            ),
                            headerStyle: {
                                backgroundColor: '#4080ED',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            },
                            headerTintColor: 'white',
                        }}
                    />

                    <Drawer.Screen
                        name="Create Job"
                        component={CreateJobScreen}
                        options={{
                            drawerIcon: ({ focused, size }) => (
                                <Icon
                                    name={focused ? 'create' : 'create-outline'}
                                    size={size}
                                    color={focused ? '#4080ED' : 'black'}
                                />
                            ),
                            headerStyle: {
                                backgroundColor: '#4080ED',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            },
                            headerTintColor: 'white',
                        }}

                    />

                    <Drawer.Screen
                        name="profile"
                        component={Profile}
                        options={{
                            drawerIcon: ({ focused, size }) => (
                                <Icon
                                    name={focused ? 'person' : 'person-outline'}
                                    size={size}
                                    color={focused ? '#4080ED' : 'black'}
                                />
                            ),
                            headerStyle: {
                                backgroundColor: '#4080ED',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            },
                            headerShown: false,
                            headerTintColor: 'white',
                        }}
                    />
                    <Drawer.Screen
                        name="Adds"
                        component={AddForCompny}
                        options={{
                            drawerIcon: ({ focused, size }) => (
                                <Entypo name="megaphone" size={24} color={focused ? '#4080ED' : '#5F5F5F'} />
                            ),
                            headerStyle: {
                                backgroundColor: '#4080ED',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            },
                            headerShown: true,
                            headerTintColor: 'white',
                        }}
                    />
                </>
                :
                <>
                    <Drawer.Screen
                        name="Dashboard"
                        component={DashBoard}
                        options={{

                            drawerIcon: ({ focused, size }) => (
                                <MaterialIcons name="dashboard" size={24} color={`${focused ? "#4080ED" : "#5F5F5F"}`} />
                            ),
                            headerStyle: {

                                backgroundColor: '#4080ED',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            },
                            headerShown: true,
                            headerTintColor: 'white',
                        }}
                    />

                    <Drawer.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            drawerIcon: ({ focused, size }) => (
                                <Octicons name="person-fill" size={24} color={focused ? '#4080ED' : '#5F5F5F'} />
                            ),
                            headerStyle: {
                                backgroundColor: '#4080ED',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            },
                            headerShown: false,
                            headerTintColor: 'white',
                        }}
                    />
                    <Drawer.Screen
                        name="Companies"
                        component={AllEmployee}
                        options={{
                            drawerLabel: 'Companies',
                            drawerIcon: ({ focused, size }) => (
                                <FontAwesome name="building" size={24} color={focused ? '#4080ED' : '#5F5F5F'} />
                            ),
                            headerStyle: {
                                backgroundColor: '#4080ED',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            },
                            headerShown: true,
                            headerTintColor: 'white',
                        }}
                    />

                    <Drawer.Screen
                        name="Students"
                        component={AllStudent}
                        options={{
                            drawerIcon: ({ focused, size }) => (
                                <Entypo name="book" size={24} color={focused ? '#4080ED' : '#5F5F5F'} />
                            ),
                            headerStyle: {
                                backgroundColor: '#4080ED',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            },
                            headerShown: true,
                            headerTintColor: 'white',
                        }}
                    />

                    {/* <Drawer.Screen
                        name="Adds"
                        component={Adds}
                        options={{
                            drawerIcon: ({ focused, size }) => (
                                <Entypo name="megaphone" size={24} color={focused ? '#4080ED' : '#5F5F5F'} />
                            ),
                            headerStyle: {
                                backgroundColor: '#4080ED',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            },
                            headerShown: true,
                            headerTintColor: 'white',
                        }}
                    /> */}



                    <Drawer.Screen
                        name="All Jobs"
                        component={AllJobs}
                        options={{
                            drawerLabel: 'All Jobs',
                            drawerIcon: ({ focused, size }) => (
                                <MaterialIcons name="work-history" size={24} color={focused ? '#4080ED' : '#5F5F5F'} />
                            ),
                            headerStyle: {

                                backgroundColor: '#4080ED',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            },
                            headerShown: true,
                            headerTintColor: 'white',
                        }}
                    />
                </>
            }
        </Drawer.Navigator>
    );
}

export default MyDrawer;