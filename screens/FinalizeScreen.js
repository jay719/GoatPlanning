import React from 'react'
import { Button, StyleSheet, Text,View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';



export default function FinalizeScreen() {

    const tripLat = useSelector(state => state.latitude)
    const tripLong = useSelector(state => state.longitude)
    const generatedEvents = useSelector(state => state.generatedEvents)
    const tripName = useSelector(state => state.name)
    const tripAPI = "https://deploy-trip-planner.herokuapp.com/trips"
    
    
    // const currentUser = useSelector(state => state.user)
    const friends = useSelector(state => state.friends)
    const start = useSelector(state=> state.start)
    const end = useSelector(state=> state.end)


    const [descriptionText, setDescriptionText] = useState('')

    const handleDescriptionText = (text) => {
        setDescriptionText(text)
    }

    const submitTrip = () => {
        fetch(tripApi, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },body: JSON.stringify({

                name: tripName,
                startDate: start,
                endDate: end,
                latitude: tripLat,
                longitude: tripLong,
                // user_id: currentUser,
                // friend_id: friend_id,
            })
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.selector}>
                <Text>Select Category Below:</Text>
                <MaterialCommunityIcons name="car-convertible" size={24} color="black" />
                <Fontisto name="heart-alt" size={24} color="red" />
                <Ionicons name="fast-food-outline" size={24} color="black" />
                <FontAwesome5 name="mountain" size={24} color="black" />
            </View>
            <View style={styles.friends}>
                <Text>Add Friends</Text>
            </View>
            <View style={styles.description}>
            <TextInput
                style={styles.search}
                placeholder="Enter Trip Description"
                onChangeText={handleDescriptionText}
                // value={searchValue}
            />
            </View>
            <Button 
            style={styles.Button} 
            title='🎉Finalize Trip🎉'
            onPress={submitTrip}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: "#fff"
    },
})
// borderColor: 'gray', 
//         borderWidth: 1, 
//         borderTopWidth:0, 
//         borderRightWidth:0,
//         borderLeftWidth:0