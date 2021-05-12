import React, { useState } from 'react'
import { Image, Modal, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 


export default function TripCard({trip, friend}) {

        const [modalVisible, setModalVisible] = useState(false)
        const showIcon = () => {
            console.log(trip)
            if (trip.icon == "Road-trip:"){
                return <MaterialCommunityIcons name="car-convertible" size={24} color="green" style={styles.choiceIcon}/> 
            } else if (trip.icon == "Date:"){
                return <Fontisto name="heart-alt" size={24} color="green" style={styles.choiceIcon}/>
            } else if (trip.icon == "Food:") {
                return  <Ionicons name="fast-food-outline" size={24} color="green" style={styles.choiceIcon}/>
            }else if (trip.icon == "Hike:"){
                return <FontAwesome5 name="mountain" size={26} color="green" style={styles.choiceIcon}/>
            } else if(trip.icon == "Other:"){
                return  <FontAwesome name="question-circle" size={24} color="green" style={styles.choiceIcon} />
            }
            else return <Text>"N/A"</Text>
        } 
        const viewTrip = () => {
            setModalVisible(!modalVisible)
    
        }
        const showUpdates = () => {
            const updates = trip.updates.map(update => {
                return <Text style={styles.updatesText}>{update}</Text>
            })
            console.log("updates",updates)
            return updates
        }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {showIcon()}
                <Text style={styles.name}>Trip: {trip.name}- </Text>
                <Text style={styles.description}>{trip.description}</Text>
            </View>
            <View>
                    <Text >Friends: {friend}</Text>
                    <Text>Updates:</Text>
                    {showUpdates()}
                    <TouchableOpacity onPress={viewTrip}>
                        
                        <Text>Add Update?</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        width:"100%",
        height:"100%"
    },
    header: {
        display:"flex",
        paddingBottom:10,
    },
    name: {
        fontSize:15,
        fontWeight:"600",
        paddingTop:15
    },
    updatesText: {
        fontWeight: "300",
        padding:20
    },
    description: {
        fontSize:15,
        fontWeight: "500"
        
    }
})