import React, { useEffect, useState }from 'react'
import { ScrollView, Text, StyleSheet, View, Dimensions, Button} from 'react-native'
// import { useDispatch, useSelector } from 'react-redux';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux'
// const dispatch = useDispatch();


export default function MapScreen({navigation}) {

    const [latitude, setMarkerLat] = useState('')
    const [longitude, setMarkerLong] = useState('')
    const [latitudeInputText, setLatitude] = useState('')
    const [longitudeInputText, setLongitude] = useState('')
    const [tripName, setTripName] = useState('')
    
    
    const startDate = useSelector(state => state.start)
    const endDate = useSelector(state => state.end)

    console.log(startDate)
    console.log(endDate)
    const handleMapPress = (e) => {
        const lat = e.nativeEvent.coordinate.latitude;
        const fLat = lat.toFixed(3);

        const long = e.nativeEvent.coordinate.longitude;
        const fLong = long.toFixed(3);
        
        setMarkerLat(fLat);
        setMarkerLong(fLong)
        
        

    
    }
    
    const handleLatitudeText = (text) => { //usually would be event and event.target.value
        setLatitude(text)
        console.log(latitudeInputText)
    }
    const handleLongitudeText = (text) => { //usually would be event and event.target.value
        setLongitude(text)
    }
    const handleTripName = (text) => { //usually would be event and event.target.value
        setTripName(text)
    }
    const handleStartDate = (text) => { //usually would be event and event.target.value
        setStartDate(text)
    }

    const handleSubmit = () => {
        console.log(hi)
    }    

    return (
        
        <View style={styles.container}>
            
            <View style={styles.mapContainer}>
                <MapView 
                    style={styles.map} 
                    initialRegion={initialRegion} 
                    onPress={handleMapPress}
                >
                    <Marker 
                        coordinate={{latitude: 	latitude, longitude: longitude,}}
                        title={`Latitude:${latitude} Longitude:${longitude}`}
                        description="Add Your Next Destination Using the Forum Below"
                    />
                </MapView>
            </View>
            <View style={styles.text}>
                <ScrollView >
                
                    <Text>Create Trip</Text>
                    
                    <TextInput
                    style={styles.search}
                    placeholder="Your Trip Name"
                    onChangeText={handleTripName}
                    value={tripName}
                    />
                    <Text> Location:</Text>
                    <TextInput
                        style={styles.search}
                        placeholder="Enter Latitude"
                        onChangeText={handleLatitudeText}
                        value={latitudeInputText}
                        keyboardType="decimal-pad"
                    />
                    <TextInput
                    style={styles.search}
                    placeholder="Enter Longitude"
                    onChangeText={handleLongitudeText}
                    value={longitudeInputText}
                    keyboardType="decimal-pad"

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
                        style={styles.button}
                        onPress={handleSubmit}
                        title='Spawn Marker And Set Trip'
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
        height: 40, 
        flex: 1,
        borderColor: 'gray', 
        borderWidth: 1, 
        borderTopWidth:0, 
        borderRightWidth:0,
        borderLeftWidth:0
    },
    touchable: {
        paddingTop:20,
    },
    coord: {
        padding:10,
    }
    });

const initialRegion = {
latitude: 	38.846127,
longitude: -104.800644,
latitudeDelta: 0.0922,
longitudeDelta: 0.1421,
}
