import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import TripCard from './components/TripCard.js'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-gesture-handler';



export default function FavoritesScreen({navigation}) {

    const tripName =  useSelector(state => state.tripName)

    const tripLat = useSelector(state => state.latitude)
    const tripLong = useSelector(state => state.longitude)

    const startDate = useSelector(state => state.start)
    const endDate = useSelector(state => state.end)

    const events =  useSelector(state => state.tripEvents)

    const [toggleFinish, setFinishToggle] = useState(true);

    const splitDates = (startDate, endDate) => {
        const start = startDate.split('12:00:00')[0]
        const end = endDate.split('12:00:00')[0]
        return `${start}- ${end}`
    }
    

    const finalizeTrip = () => {
        setToggle(!toggle);

    }
    const location = `${tripLat},${tripLong}`
    return (
        <View style={styles.container}>
            <View style={styles.unfinishedTrip}>
                <Text style={styles.pending}>Pending</Text>
                <View style={styles.pendingCard}>
                    <Text style={styles.pendingText}>Name: {tripName}</Text>
                    <Text style={styles.pendingText}>Where: {location}</Text>
                    <Text style={styles.pendingText}>When: {splitDates(startDate, endDate)}</Text>
                </View>
                </View>
            <View>
                    <TouchableHighlight style={styles.button} onPress={finalizeTrip}>
                        <Text>Finish trip</Text>
                    </TouchableHighlight>
                    <Text>
                        {toggleFinish ? 
                        '':  
                            <View style={styles.selector}>
                                <Text>Select Category Below:</Text>

                                <MaterialCommunityIcons name="car-convertible" size={24} color="black" />
                                <Fontisto name="heart-alt" size={24} color="red" />
                                <Ionicons name="fast-food-outline" size={24} color="black" />
                                <FontAwesome5 name="mountain" size={24} color="black" />

                                
                                <Text>Add your Friends</Text>
                            </View>} 
                    </Text>
                </View>
                
            <View style={styles.oldTrips}>
                <Text>Past Endeavors</Text>
            </View>
            <View style={styles.newTrips}>
                <Text>Upcoming Memories:</Text>
                
            </View >
        </View>

    )
}


const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    oldTrips: {
     paddingTop:40,
    },
    newTrips: {
        paddingTop:20,
    },
    unfinishedTrip: {
        
        alignItems: "center",

    },pendingCard: {
        padding:50
    },
    pending: {
            left: 30,
            // bottom: 230,
            // justifyContent: "center",
            // alignItems: "center",
            fontSize: 30,
            paddingBottom: 50,
            fontWeight: "700",
            color: 'hsl(155, 100%, 84%)',
            textShadowColor: "black",
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 2,
            position:'absolute',
        
        
    },
    button: {
        paddingVertical: 10,
        backgroundColor:'hsl(155, 56%, 83%)',
        // borderRadius: 6,
        
    },
    
    })