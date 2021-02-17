import React, { useState } from 'react'
import { Image, Modal, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'



export default function TripCard({trip}) {

        const [modalVisible, setModalVisible] = useState(false)
        const showIcon = () => {
            // console.log("tripcard")
            if (trip.icon == "Road-trip:"){
                return <MaterialCommunityIcons name="car-convertible" size={24} color="green" style={styles.choiceIcon}/> 
            } else if (trip.icon == "Date:"){
                return <Fontisto name="heart-alt" size={24} color="green" style={styles.choiceIcon}/>
            } else if (trip.icon == "Food:") {
                return  <Ionicons name="fast-food-outline" size={24} color="green" style={styles.choiceIcon}/>
            }else if (trip.icon == "Hike:"){
                return <FontAwesome5 name="mountain" size={24} color="green" style={styles.choiceIcon}/>
            } else if(trip.icon == "Other:"){
                return  <FontAwesome name="question-circle" size={24} color="green" style={styles.choiceIcon} />
            }
            else return <Text>"N/A"</Text>
           
        } 
        
        const viewTrip = () => {
            setModalVisible(!modalVisible)
    
        }
        
    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                {showIcon()}
                <Text style={styles.name}>{trip.name}-{trip.description}</Text>
                <View>
                    <Text>Friends:{trip.friend}</Text>
                    <TouchableOpacity onPress={viewTrip}>
                        <Text>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header: {
        display:"flex",
    },
    name: {
        fontWeight:"300"
    }

})