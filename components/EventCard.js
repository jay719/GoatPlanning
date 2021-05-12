import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet, 
    TouchableOpacity,
    Linking,
    ImageBackground
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
export default function EventCard({event, index}) {
    const dispatch = useDispatch();
    const eimage = {uri:event.images[2].url}
    const eventName = useSelector(state => state.selectedEventsName)
    const handleClickedEvent = () => {
        dispatch({type:"SET_EVENT_NAME", eventName: event.name})
        console.log(event)
    }
    const showAtractions = (event) => {
        const attractions = event._embedded.attractions.map(attraction => {
            return <Text key={attraction.name} style={styles.attraction}>🌟{attraction.name}</Text>
        })
        return attractions
    }
    
    return (
        
        <View style={styles.container}>
            <ImageBackground source={eimage} style={styles.card} blurRadius={0.7} >
                    <View style={styles.headerContainer}>
                        <Text style={styles.names}>{index}.{event.name}</Text>
                        <Text style={styles.genre}>📣{event.classifications[0].segment.name}: {event.classifications[0].genre.name}📣 </Text>
                        <Text style={styles.date}>⏳{event.dates.start.localDate}⏳</Text>
                        <Text style={styles.location}>🗺Location: {event._embedded.venues[0].name}🗺</Text>
                    </View>
            <View style={styles.infoContainer}>
                <View style={styles.attraction}>
                    <Text>Performing:</Text>
                    {showAtractions(event)}
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleClickedEvent} >
                <Text style={styles.buttonText}>Add Event To Trip</Text>
            </TouchableOpacity>
            </ImageBackground> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        
    },headerContainer: {
        marginVertical: 21,
        paddingHorizontal: 30,
        left: -3,
        // justifyContent: 'center',
        // marginHorizontal:20,
    },
    infoContainer: {
        flex:1,
        flexDirection: "row",
        padding:5,
        // left: 10,
        // backgroundColor:'hsl(299, 100%, 95%)'
        
    },
    card: {
        // borderWidth: 1,
        // borderColor: 'hsl(299, 100%, 91%)',
        // backgroundColor: '#fff',
        flex: 1,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 6,
	        height: 3,
            },
shadowOpacity: 0.29,
shadowRadius: 4.65,

elevation: 7,
    },
    cardImage: {
        
        width:'50%',
        height: 150,
        left: -9,
        
    },
    names: {
        fontSize: 20,
        fontWeight:'600',
        color: 'hsl(155, 56%, 83%)',
        paddingBottom: 3,
        textAlign: 'center',
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    },
    genre: {
        fontSize: 15,
        fontWeight:'400',
        color: 'hsl(155, 56%, 83%)',
        paddingBottom: 5,
        paddingLeft: 2,
        textAlign: 'center',
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    },
    date: {
        fontSize: 15,
        fontWeight:'700',
        color: 'hsl(155, 56%, 83%)',
        textAlign: 'center',
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
        padding:10,
        
    },
    fact: {
        paddingBottom:10,
    },

    location: {
        paddingBottom:10,
        fontSize: 15,
        fontWeight:'600',
        color: 'hsl(155, 56%, 83%)',
        // marginBottom:20, 
        textAlign: 'center',
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    },
    attraction: {
        fontWeight:'600',
        color: 'hsl(155, 56%, 83%)',
        flexDirection: "column",
        width:"50%",
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    },
    button: {
        paddingVertical: 10,
        backgroundColor:'hsl(155, 56%, 83%)',
        // borderRadius: 6,
        
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: "700",
    }


    
})