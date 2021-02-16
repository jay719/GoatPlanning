import React from 'react'
import { Image, Text, View } from 'react-native'



export default function TripCard({trip}) {

        const showIcon = () => {
            if (trip.icon == "Road-trip:"){
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
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {showIcon()}
                <Text>{trip.name}-{trip.description}</Text>
                <View>
                    <Image source={require('../assets/16.png')}/>
                    <Text>Friends:{trip.friend}</Text>
                </View>
            </View>
        </View>
    )
}


