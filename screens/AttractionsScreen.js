import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../components/EventCard.js';
// import foodMarker from '../assets/foodMarker.png';

export default function AttractionsScreen({navigation}) {

    const dispatch = useDispatch();

    const tripLat = useSelector(state => state.latitude)
    const tripLong = useSelector(state => state.longitude)
    const tripName = useSelector(state => state.generatedRestaurants)


    const generatedEvents = useSelector(state => state.generatedEvents)
    const [generatedFood, setGeneratedFood] = useState([])

   

    const [userInput, setUserInput] = useState('')
    
    const initialRegion = {
        latitude: Number(tripLat),
        longitude: Number(tripLong),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.1421,
        }

    const apiKey = "eg8UB2Lxa0g8XZrt2PAAppo8EinYYmpw"
    const eventURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${userInput}`
    const foodURL = `https://developers.zomato.com/api/v2.1/geocode?lat=${tripLat}&lon=${tripLong}`

    
        
    const loadEvents = () => {
        fetch(eventURL, {
            headers: {
            "apikey": `${apiKey}`
            }
        })
        .then(parseJSON) 
        .then(eventsObject => {
            const events = eventsObject._embedded.events
            dispatch({type:"SET_GENERATED_EVENTS", events: events})
                console.log(apiURL)
            })
        .then(spawnEvents)
    }

    const loadRestaurants = () => {
        fetch(foodURL, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "user-key": "a6631f3561d12ac2fa67b3d8cc55d409",
            },
        
        })
        .then(parseJSON)
        .then(apiObject=> {
            const nearbyRestaurants = apiObject.nearby_restaurants
            setGeneratedFood(nearbyRestaurants)
            // dispatch({type:"SET_GENERATED_RESTAURANTS", food: nearbyRestaurants})
            console.log(generatedFood)
            
        })
        .then(spawnFood)
    
     }
    
  
    const spawnFood = () => {
        const foodMarkers = generatedFood.map(restaurantIndex => {
            const restaurant = restaurantIndex.restaurant
            const location = restaurant.location;
            const img = `<img src="${restaurant.featured_image}">`
            const name = restaurant.name
            // console.log(apiObject)
           
            // console.log(img);
    
            const foodLong = location.longitude;
            const foodLat = location.latitude;
            const address = location.address;
            const ratingNumber = restaurant.user_rating.aggregate_rating;
            const ratingText = restaurant.user_rating.rating_text;

            const foodType= restaurant.cuisines

            
             
            return <Marker 
            key={restaurant.id}
            coordinate={{latitude: foodLat, longitude: foodLong,}}
            title={`${restaurant.name} 🌟${ratingNumber}🌟`}
            description={` ${address} ${foodType} `}
            stopPropagation="true"
            onSelect={console.log(`hi`)}
                    > 
                    <Image
                        source={require('../assets/foodMarker.png')}
                        style={{width: 30, height: 40}}
                        resizeMode="contain"
                        onPress={console.log(`hey`)}
                    />
                    </Marker>
            })
            return foodMarkers
        }

    const spawnEvents = () => {
        const eventMarks = generatedEvents.map((event, i) => {
            const eventLat = Number(event._embedded.venues[0].location.latitude);
            const eventLong = Number(event._embedded.venues[0].location.longitude);

            console.log(eventLat, eventLong, event)
            return  <Marker
                key={event.id}
                coordinate={{latitude: eventLat, longitude: eventLong,}}
                title="hi"
                description={` name: ${event.name} lattitude: ${eventLat}, long: ${eventLong}`}
                image={foodMarker}
            /> 
            }
        )
        return eventMarks
    }

    const handleSearch = (text) => {
        setUserInput(text)
    }


    // const handleMapPress = (e) => {
    

    //     const lat = e.nativeEvent.coordinate.latitude;
    //     const fLat = lat.toFixed(3);

    //     const long = e.nativeEvent.coordinate.longitude;
    //     const fLong = long.toFixed(3);
        
    //     setEventLat(fLat);
    //     setEventLong(fLong)

    //     dispatch({type:"SET_LATITUDE", latitude: latitude})
    //     dispatch({type:"SET_LONGITUDE", longitude: longitude})

    
    // }

      
function parseJSON(response){
    return response.json()
    }


    const i = 0
    const showEvents = () => {
        return <Text>{i+1} {tripName}</Text>
    }

    return (
        <View style={styles.container}>
            <View> 
                <Text>hi</Text>
                {showEvents()}
            </View>
            <View style={styles.button}>
            <TextInput
                style={styles.search}
                onChangeText={handleSearch}
                value={userInput}
                />
                <Button
                
                title="Spawn Events"
                onPress={loadEvents}
                >

                </Button>

                <Button
                
                title="Spawn Restaurants"
                onPress={loadRestaurants}
                >

                </Button>
            </View>
            <View style={styles.mapContainer}>
                <MapView 
                    style={styles.map} 
                    initialRegion={initialRegion} 
                    
                >
                    {spawnFood()}
                    {spawnEvents()}
                    
                    <Marker 
                        coordinate={{latitude: 	Number(tripLat), longitude: Number(tripLong),}}
                        title={`Latitude:${tripLat} Longitude:${tripLong}`}
                        description="Add Your Next Destination Using the Forum Below"
                    />
                    
                </MapView>
                
            </View>
            <ScrollView style={styles.cards}>
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'hsl(181, 59%, 88%)',
    },
    mapContainer:{
        height: "40%",
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
    },
    cards: {
        paddingTop:10,
    },
    button:{
        flexDirection:'row',
        justifyContent:"space-between"
    },
    
    });

