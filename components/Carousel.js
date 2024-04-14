import { FlatList, Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

// image 
import img1 from "../assets/pexels-matt-stone-20586326.jpg"
import img2 from "../assets/pexels-florian-stein-20881051.jpg"
import img3 from "../assets/pexels-susanne-jutzeler-sujufoto-17070821.jpg"

const Carousel = () => {

    const flatlistRef = useRef()
    // get dimension 
    const screenWidth = Dimensions.get("window").width
    // state to store index
    const[activeIndex, setActiveIndex] = useState(0)

    // auto scroll 
    useEffect(() => {
        
        let interval = setInterval(() => {
            //if activeindex === last index --> jump back to first index
            if(activeIndex === carouselData.length -1){
                flatlistRef.current.scrollToIndex({
                    index: 0,
                    animation: true
                })
            }
            // else activeindex +1
            else{
                flatlistRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animation: true
                })
            }
        }, 3000)

        return () => clearInterval(interval);
    })

    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index
    })
    // data for carousel 
    const carouselData = [
        {
            id: "01",
            image: img1,
        },
        {
            id: "02",
            image: img2,
        },
        {
            id: "03",
            image: img3,
        }
    ]

    // Handle Scroll 
    const handleScroll = (event) => {
        // get the scroll position 

        const scrollPosition = event.nativeEvent.contentOffset.x
        // get the index of the active item
        let index = scrollPosition / screenWidth;
        index = Math.ceil(index)

        // update the index 
        setActiveIndex(index)
    }

    // display data 
    const renderItem = ({item, index}) => {
        return(
            <View>
                <Image source={item.image} style={{height: 200, width: screenWidth}} />
            </View>
        )
    }

    //render Dot Indicators
    const renderDotIndicators = () => {
        return carouselData.map((dot, index) => {

            // if the active index === index 

            if(activeIndex === index){
                return(
                    <View style={{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, marginHorizontal: 6}}>
                        
                    </View>
                )
            }
            else{
                return(
                    <View key={index} style={{backgroundColor: "red", height: 10, width: 10, borderRadius: 5, marginHorizontal: 6}}>
                    </View>
                )
            }
        })
    }

  return (
    <View>
      <Text>Carousel</Text>
      <FlatList
      data={carouselData}
      ref={flatlistRef}
      getItemLayout={getItemLayout}
      renderItem={renderItem} 
      horizontal={true}
      pagingEnabled={true}
      onScroll={handleScroll}
      keyExtractor={(item) => item.id}/>

      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
        {renderDotIndicators()}
      </View>
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({})