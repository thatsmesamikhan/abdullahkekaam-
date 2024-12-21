import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Navbar from './components/Navbar';
import MenuBtn from './components/MenuBtn';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeAllProducts, removeFromCart } from './redux/counterSlice';
import { useNavigation } from '@react-navigation/native';
import LoginBtn from './components/LoginBtn';
const CartScreen = () => {
   const cart = useSelector((state) => state.counter.cart)
   const dispatch = useDispatch()
   const navigation = useNavigation()

   const CartItems = ({item}) => {
    const title = item.name.length > 15 ? item.name.slice(0 , 15) + '...' : item.name
    return(
        <View style={{
            height:180,
            width:'90%',
            marginTop:'5%',
            flexDirection:'row',
            marginLeft:'5%'
         }}>
         <View style={{
            height:180,
            width:'35%'
         }}>
       <Image source={{uri : item.image_link}}
              style={{
                width:'100%',
                height:180,
                borderRadius:80
              }}/>
         </View>
         <View style={{
            height:180,
            width:'55%',
            justifyContent:'center',
            alignItems:'center'
         }}>
          <Text style={{
            fontWeight:'bold',
            fontSize:20,
        
          }}>{title}</Text>
           <Text style={{
            fontWeight:'bold',
            fontSize:15,
            marginTop:'10%',
            marginRight:'50%',
            color:'#9B643D'
          }}>${item.price}</Text>
          <View style={{
            height:35,
            width:'70%',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:'20%'
          }}> 
          <MenuBtn  iconname={'minus'} onpress={() => dispatch(removeFromCart(item))}
                    style={{width:'25%' }}/>
                    <Text style={{
                        fontWeight:'bold',
                        fontSize:17
                    }}>{item.quantity}</Text>
                    <MenuBtn iconname={'plus'}  onpress={() => dispatch(addToCart(item))}
                    style={{width:'25%'}}/>
          </View>
         </View>
    <View style={{
        height:180,
        width:'10%',
        alignItems:'center',
        
    }}>
        <TouchableOpacity onPress={() => dispatch(removeAllProducts(item.id))}>
    <AntDesign name="closecircleo" size={30} color="black" />
    </TouchableOpacity>
    </View>
         </View>
    )
   }


  return (
    <View style={styles.container}>
    
     {               
        cart.length === 0 ?   
          <>
        <Image source={require('./assets/emptycart.png')} 
                                    style={{width:'40%' , height:'18%',marginTop:'45%'}}/> 
                                    
                              <Text style={{fontWeight:'bold',fontSize:25,marginTop:'10%'}}>Your Cart is Empty</Text>
                              <LoginBtn style={{marginTop:'50%',height:50}} txt={'Continue Shopping'} onpress={() => navigation.navigate('MainScreen')}/>

                              </>    
                                    :
                                    <>                                
                                    <Navbar iconname={'arrowleft'}
                                    onpress={() => navigation.navigate('MainScreen')} 
                                    txt={'My Cart'}
                                    iconname2={'menufold'}
                                    onpress2={() => navigation.openDrawer()}
                                    />
                          <View style={{ flex: 1, width: '100%' }}>
  <FlatList
    data={cart}
    renderItem={({ item }) => <CartItems item={item} />}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 50 }}
    style={{ flex: 1 }}
  />
  <View style={{ position: 'absolute', bottom: 0, width: '100%', alignItems: 'center' }}>
    <LoginBtn onpress={() => navigation.navigate('Checkout')} style={{ height: 50, marginVertical: 20 }} txt={'Check Out'} />
  </View>
</View>

                             </>

     }



  

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#FFF7EA'
  },
});

export default CartScreen;