import React, { useEffect, useState }from 'react'
import { ScrollView, Text, StyleSheet, View, Dimensions, Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Circle, Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons'; 




export default function MapScreen({navigation}) {
    const dispatch = useDispatch();
    const [latitude, setMarkerLat] = useState('')
    const [longitude, setMarkerLong] = useState('')
    
    const [tripName, setTripName] = useState('')
    

    const startDate = useSelector(state => state.start)
    const endDate = useSelector(state => state.end)

      const currentUserID = useSelector(state => state.currentUserID)

    console.log(currentUserID)
    const usersURL = 'https://deploy-trip-planner.herokuapp.com/users'

   
    const handleMapPress = (e) => {
        const lat = e.nativeEvent.coordinate.latitude;
        const fLat = lat.toFixed(3);

        const long = e.nativeEvent.coordinate.longitude;
        const fLong = long.toFixed(3);
        
        setMarkerLat(fLat);
        setMarkerLong(fLong)

        
    
    }
    

    const handleTripName = (text) => { //usually would be event and event.target.value
        setTripName(text);
        dispatch({type:"SET_NAME", name: tripName})
    }

    function parseJSON(response){
        return response.json()
        }
    

    const handleSubmit = () => {
        
            fetch(`${usersURL}/${currentUserID}`)
            .then(parseJSON)
            .then(userObject => {
                
                // console.log(currentUserID,"..",userObject)
                dispatch({type:"SET_GENERATED_USER", userObject: userObject})
                
            })
            .then( response => {
                dispatch({type:"SET_LATITUDE", latitude: latitude})
                dispatch({type:"SET_LONGITUDE", longitude: longitude})
                dispatch({type:"SET_NAME", name: tripName})
                
        
                navigation.navigate("Nearby Attractions")
            }
            )
       
    }    


    useEffect(() => {
        const findUserAndTrips = () => {
            if (Number.isNaN(currentUserID) === false) {
                console.log('successful')
                fetch(`${usersURL}/${currentUserID}`)
                .then(parseJSON)
                .then(userObject => {
                    console.log('userURL',`${usersURL}/${currentUserID}`)
                    console.log('keys',Object.keys(userObject))
                    dispatch({type:"SET_GENERATED_USER", userObject: userObject})
                    // setTimeout(() => {
                    //     console.log("hi",userObject)
                    //     dispatch({type:"SET_GENERATED_USER", userObject: userObject})
                    //   }, 5000)
                    })
                .catch((error) => {
                    console.error('Error:', error);
                    });
                } else {
                        console.log('loading')
                    }
            };
        findUserAndTrips();

    }, [currentUserID])

    return (
        
        <View style={styles.container}>
            
            <View style={styles.mapContainer}>
                <MapView 
                    style={styles.map} 
                    initialRegion={initialRegion} 
                    onPress={handleMapPress}
                >
                    <Marker 
                        coordinate={{latitude: 	Number(latitude), longitude: Number(longitude),}}
                        description={`Latitude:${latitude} Longitude:${longitude}`}
                        title="Next: Add Your Trips Name and Date Below!"
                    />
             <Circle fillColor= "hsl(155, 100%, 84%)"radius={200} center={{latitude: 38.846127, longitude:-104.800644,}} />
                </MapView>
            </View>
            <View style={styles.text}>
                <ScrollView >
                
                    <Text style={styles.coord}>Trip Name</Text>
                    
                    <TextInput
                    style={styles.search}
                    placeholder="Your Trip Name"
                    onChangeText={handleTripName}
                    value={tripName}
                    />
                    <TouchableOpacity 
                        style={styles.touchable}
                        onPress={() => navigation.navigate("Calendar")}
                    >
                        <AntDesign name="calendar" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.coord}> Start Date: {startDate}</Text>
                    <Text style={styles.coord}> End Date: {endDate}</Text>
                    
                    <Button
                        onPress={handleSubmit}  
                        title='Check Out Local Establishments And Attractions?'
                    />
                    
                </ScrollView>
                
            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    mapContainer:{
        height: "50%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: "100%",
    },
    text: {
        height: "50%",
    },
    search: { 
        left:10,
        height: 50, 
        flex: 1,
        borderColor: 'gray', 
        borderWidth: 1, 
        borderTopWidth:0, 
        borderRightWidth:0,
        borderLeftWidth:0,
    },
    touchable: {
        paddingTop:20,
    },
    coord: {
        padding:10,
        fontSize:20
    }
    });

const initialRegion = {
latitude: 	38.846127,
longitude: -104.800644,
latitudeDelta: 0.0922,
longitudeDelta: 0.1421,
}
