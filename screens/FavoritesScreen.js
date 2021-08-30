import React, { useState } from 'react'
import { Button, Image, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import {Picker} from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux'
import TripCard from '../components/TripCard.js'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 


export default function FavoritesScreen({navigation}) {
    const dispatch = useDispatch();
    // const currentUserID = useSelector(state => state.currentUserID)
    // const currentUserID = 2
    const currentUser = useSelector(state => state.currentUser)
    const userAndTrip = useSelector(state => state.generatedUserObject )

    const tripName =  useSelector(state => state.tripName)

    const tripLat = useSelector(state => state.latitude)
    const tripLong = useSelector(state => state.longitude)

    const startDate = useSelector(state => state.start)
    const endDate = useSelector(state => state.end)

    const userDescription = useSelector(state => state.tripDescription)
    const tripRestaurants = useSelector(state => state.tripRestaurants)

    const events =  useSelector(state => state.tripEvents)
    const icon = useSelector(state => state.currentIcon)

    const [toggleFinish, setFinishToggle] = useState(true);
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [toggleConfirm, setConfirmToggle] = useState(true);

    const [selectableFriends, setSelectableFriends] = useState([])
    const [selectedFriendID, setSelectedFriendID] = useState([])
    const [iconVariable, setIconVariable] = useState('')
    const [tripDescription, setTripDescription] = useState('')

    const tripsURL = 'https://deploy-trip-planner.herokuapp.com/trips'
    const usersURL = 'https://deploy-trip-planner.herokuapp.com/users'

    const splitDates = (startDate, endDate) => {
        const start = startDate.split('12:00:00')[0]
        const end = endDate.split('12:00:00')[0]
        return `${start}- ${end}`
    }

function parseJSON(response){
    return response.json()
    }



const z = 0
const spawnUserTrips = (userAndTrip) => {
    
   console.log("usertrip", userAndTrip)
    const userTrips = userAndTrip.trips;
    const friend = userAndTrip.friends.map((friend) => friend.username)
    const userCards = userTrips.map((trip)=>{
        return <TripCard 
        trip={trip}
        friend={friend}
        key={z+1}
        />
        })
    return userCards
}
   

    const toggleCategory = () => {
        setCategoryToggle(!categoryToggle)
        dispatch({type:"SET_ICON", icon: iconVariable})
    }
    
    const showIcon = () => {
        if (iconVariable == "Road-trip:"){
            return <MaterialCommunityIcons name="car-convertible" size={24} color="green" style={styles.choiceIcon}/> 
        } else if (iconVariable == "Date:"){
            return <Fontisto name="heart-alt" size={24} color="green" style={styles.choiceIcon}/>
        } else if (iconVariable == "Food:") {
            return  <Ionicons name="fast-food-outline" size={24} color="green" style={styles.choiceIcon}/>
        }else if (iconVariable == "Hike:"){
            return <FontAwesome5 name="mountain" size={24} color="green" style={styles.choiceIcon}/>
        } else if(iconVariable == "Other:"){
            return  <FontAwesome name="question-circle" size={24} color="green" style={styles.choiceIcon} />
        }
        else return <Text>"N/A"</Text>

    }
    const handleDescription = (text) => { 
        setTripDescription(text);
        
    }

    const confirmAnswers = () => {
        setConfirmToggle(!toggleConfirm)
        dispatch({type:"SET_ICON", icon: iconVariable})
        dispatch({type:"SET_DESCRIPTION", description: tripDescription})
        console.log(userDescription,icon,)
    }

    const postTrip = () => {
        
        dispatch({type:"SET_DESCRIPTION", description: tripDescription})
        const restArray = []
        restArray.push(tripRestaurants)
        console.log(tripName, startDate,endDate,tripLat,tripLong, selectedFriendID,userDescription,icon, tripRestaurants,"@", restArray)

        fetch(tripsURL, {
            method: "POST",
            headers: {
                
                "Content-Type": "application/json"
            
            },
            body: JSON.stringify({ 
                name: tripName,
                startDate: startDate,
                endDate: endDate,
                latitude: tripLat,
                longitude: tripLong,
                restaurants: tripRestaurants,
                user_id: currentUserID,
                friend_id: selectedFriendID,
                description: userDescription,
                icon: icon,
                


            }), 
        }
        )
        .then(parseJSON)
        .then(showUserTrips)
        .then(response => setFinishToggle(!toggleFinish))
        

    } 

    const finalizeTrip = () => {
        setFinishToggle(!toggleFinish);

        fetch(usersURL)
            .then(parseJSON)
            .then(friendsObject => {
                
                setSelectableFriends(friendsObject)
                console.log(selectableFriends)
                })
            .then(spawnFriends)

    }

    const spawnFriends = () => {
        console.log("Starting")
        const friendOptions = selectableFriends.map(friend => {
            const friendName = friend.username
            const friendId = friend.id
            const friendPhrase = `${friendId}: ${friendName}`
                return <Picker.Item label={friendPhrase} value={friendId} />
        })
        return friendOptions
    }

   
    const location = `${tripLat}, ${tripLong}`
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.unfinishedTrip}>
            <Text style={styles.pending}>Pending Trip:</Text>
                <Image source={require('../assets/friends.png')} style={styles.pendingCard} />
                
                    <Text style={styles.pendingText}>Name: {tripName}</Text>
                    <Text style={styles.pendingText}>Where: {location}</Text>
                    <Text style={styles.pendingText}>When: {splitDates(startDate, endDate)}</Text>
                    <Text style={styles.pendingText}>Attractions: {tripRestaurants}</Text>
            </View>
           
                    <TouchableHighlight style={styles.button} underlayColor='hsl(230, 100%, 100%)' onPress={finalizeTrip}>
                        <Text style={styles.buttonText}>Finish trip</Text>
                    </TouchableHighlight>
                    <View>
                        {toggleFinish ? 
                        <View>
                            <ScrollView style={styles.oldTrips}>
                                <TouchableOpacity onPress={spawnUserTrips}>
                                <Text style={styles.upcoming}>Upcoming Memories:</Text>
                                </TouchableOpacity>
                                <View>
                                    {spawnUserTrips(userAndTrip)}
                                </View>
                            </ScrollView>

                            </View> :  
                                <ScrollView 
                                // alwaysBounceVertical={false}
                                // bounces={false}
                                style={styles.selectorTwo}
                                contentContainerStyle={styles.selector} 
                                >
                                    <View>
                                            <Text style={styles.categories} onPress={toggleCategory}>Select Category Below: </Text> 
                                            <Text style={styles.selectedCategory}>{iconVariable} {showIcon()}</Text>
                                        {categoryToggle ? <Text onPress={toggleCategory} style={{fontWeight:"200", fontSize:18}}>Choose your category by clicking here!</Text> :
                                        <View>
                                            <TouchableOpacity style={styles.icons}onPress={() => setIconVariable("Road-trip:")}>
                                                <MaterialCommunityIcons name="car-convertible" size={24} color="black" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.icons} onPress={() => setIconVariable("Date:")}>
                                                <Fontisto name="heart-alt" size={24} color="black" />
                                            </TouchableOpacity>
                        
                                            <TouchableOpacity style={styles.icons} onPress={() => setIconVariable("Food:")}>
                                                <Ionicons name="fast-food-outline" size={24} color="black" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.icons}  onPress={() => setIconVariable("Hike:")}>
                                                <FontAwesome5 name="mountain" size={24} color="black" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.icons} onPress={() => setIconVariable("Other:")}>
                                                <FontAwesome name="question-circle" size={24} color="black"  />
                                            </TouchableOpacity>
                                        </View>
                                        }
                                    
                                    </View>
                                    <Text style={styles.friends}>Add friends to your trip using the slider below! </Text>
                                    <Text style={styles.selectedFriend}>Friend: {selectedFriendID}</Text>
                                    <Picker
                                        selectedValue={selectedFriendID}
                                        style={styles.pickOptions}
                                        onValueChange={(itemValue, itemIndex) => setSelectedFriendID(itemValue)}
                                        
                                    >
                                        {spawnFriends()}
                                    </Picker>
                                    <Text style={styles.description}>Add a Description of Your Trip Below:</Text>
                                    
                                    <TextInput
                                        style={styles.descriptionInput}
                                        placeholder="Your Trip's Description"
                                        onChangeText={handleDescription}
                                        value={tripDescription}
                                    />  
                                        {toggleConfirm ? 
                                        <TouchableHighlight style={styles.completeButton} onPress={confirmAnswers}>
                                        <Text>Confirm Answers!</Text>
                                    </TouchableHighlight> 
                                    :
                                    <TouchableHighlight style={styles.completeButton} onPress={postTrip}>
                                            <Text>Complete Trip!</Text>
                                        </TouchableHighlight>}
                                    
                                </ScrollView> } 
                    </View>

                
            
            
        </SafeAreaView>

    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1, 
        // backgroundColor: "hsl(181, 59%, 95%)"   
        backgroundColor: 'hsl(183, 100%, 100%)'
    },
    oldTrips: {
        
     paddingTop:40,
     paddingBottom:20,
     paddingLeft:10,
     height:"52%"
    },
    newTrips: {
        paddingTop:20,
    },
    unfinishedTrip: {
        backgroundColor:'hsl(63, 100%, 96%)',
        alignItems: "center",

    },pendingCard: {
        backgroundColor:'hsl(58, 100%, 96%)',
        padding:10,
        height:150,
        width:240,
        marginBottom:15,
    
    },
    pending: {
            
            // bottom: 230,
            // justifyContent: "center",
            // alignItems: "center",
            fontSize: 26,
            paddingBottom: 10,
            fontWeight: "700",
            color: 'hsl(181, 59%, 88%)',
            textShadowColor: "black",
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 1,
            // position:'absolute',
            
            
        
        
    },
    pendingText:{
        color:'hsl(181, 59%, 7%)',
        // textShadowColor: "black",
        // textShadowOffset: {width: 1, height: 1},
        // textShadowRadius: 1,
        // backgroundColor:'hsl(204, 97%, 100%)',
        fontSize:19,

        marginBottom:15
    },
    button: {
        paddingVertical: 10,
        paddingBottom:15,
        marginBottom:10,
        backgroundColor:'hsl(181, 59%, 94%)',
        alignItems:"center",
        width:'100%'
        
    },
    completeButton: {
        paddingVertical: 10,
        paddingBottom:10,
        
        backgroundColor:'hsl(181, 59%, 94%)',
        alignItems:"center",
        width:'100%',
        
    },
    buttonText: {
        
        alignItems:'center'
    },
    selector: {
        // backgroundColor:'hsl(63, 100%, 96%)',
        // paddingLeft:10,
        marginBottom:20,
        
        
    },selectorTwo: {
        height: '30%',
        width: '100%',
    },
    categories:{
        fontWeight: "500",
        paddingTop:12,
        paddingLeft:6,
        paddingBottom:2,
        fontSize:15,
            // color: 'hsl(181, 59%, 88%)',
            textShadowColor: "grey",
            textShadowOffset: {width: 0, height: 1},
            textShadowRadius: 1,
    },
    selectedCategory: {
        paddingBottom:12,
        fontSize:16,
    },
    friends:{
        fontWeight: "500",
        paddingTop:12,
        paddingLeft:6,
        paddingBottom:4,
        fontSize:15,
        
        
            // color: 'hsl(181, 59%, 88%)',
            textShadowColor: "grey",
            textShadowOffset: {width: 0, height: 1},
            textShadowRadius: 1,
    },
    selectedFriend: {
        fontSize:16,
    },
    choiceIcon: {
        
        paddingLeft:12
    },
    pickOptions: {
        height:200,
        width:200,
        paddingLeft:40,
        marginBottom:3,
    },
    icons: {
        left:10,
        paddingBottom:10,
        justifyContent:"center"
        
    },  
    description:{
        paddingTop:40,
        paddingBottom:20
    },
    descriptionInput: { 
        height: 20, 
        
        borderColor: 'gray', 
        borderWidth: 1, 
        borderTopWidth:0, 
        borderRightWidth:0,
        borderLeftWidth:0,
        
        marginBottom:20,
    },
    upcoming: {
        fontSize:20
    }
    
    })