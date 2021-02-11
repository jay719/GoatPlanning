import React from 'react'
import { Button, StyleSheet, Text,View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-gesture-handler';



export default function FinalizeScreen() {

    const tripLat = useSelector(state => state.latitude)
    const tripLong = useSelector(state => state.longitude)
    const generatedEvents = useSelector(state => state.generatedEvents)
    const tripName = useSelector(state => state.name)
    const tripAPI = "http://localhost:3000/trips"

    const [descriptionText, setDescriptionText] = useState('')

    const handleDescriptionText = (text) => {
        setDescriptionText(text)
    }

    const submitTrip = () => {
        fetch(tripApi, {
            method: "POST",
            header: {
                "Content-type": "application"
            },
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