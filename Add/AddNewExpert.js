
import { StyleSheet,TextInput,ActivityIndicator, Text,Animated,ScrollView, View,Image, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';
import {globalStyles} from '../Styles/GlobalStyles';
import Card from '../Shared/card';
import { MaterialIcons } from '@expo/vector-icons';
import useFetch from '../useFetch';
import axios from 'axios';
import Header from '../Header/header';
// import HomeScreenCard from '../Shared/HomeScreenCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {MotiView} from 'moti';


import { Ionicons, FontAwesome} from '@expo/vector-icons';


import{LinearGradient} from 'expo-linear-gradient';
import MinorHeader from '../Header/MinorHeader';
import HobsPage from '../RenderedComponents/HobsPage';

//import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

//import {AppLoading} from 'expo';
import * as SplashScreen from 'expo-splash-screen';
//E3E4FA
import {useFonts} from 'expo-font';
//import AppLoading from 'expo-app-loading';



// This import used to change color
import { EventRegister } from 'react-native-event-listeners';
import theme from '../theme/theme';
import themeContext from '../theme/themeContext';
import React, {useState, useEffect, useContext} from 'react';

import { EndPoint } from "../Constant/links";
import LotterViewScreen from '../Screens/LotterViewScreen';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
//import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import AddLotterViewScreen from '../Screens/AddLotterViewScreen';

const AddNewExpert =() => {

const navigation = useNavigation();
 const goBackPage = () =>{
    navigation.navigate('Home Stack');

  }

 const {width, height} = Dimensions.get('window');


    const [StudentImage, setStudentImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

const [LoadingButton, setLoadingButton] = useState(false);

//MWANZO WA PICK IMAGE FROM THE PHONE
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
      setStudentImage(result.assets[0].uri); // Use assets array
      //console.log("PROJECT IMAGE", StudentImage)
      processImage(); // Use assets array
  };

 const  processImage = ()=>{
    console.log('Converted')
  }

  //MWISHO WA PICK IMAGE FROM THE PHONE


//MWANZO WA PICK PDF FROM THE PHONE

// Add PDF state
const [pdf, setPdf] = useState(null);

// Add PDF picker function
const pickPdf = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf'
    });
    if (!result.cancelled) {
      setPdf(result.assets[0].uri);
      console.log("result URI:", result);
      console.log("PDF URI:", pdf); // Log PDF URI after setting
    }
  };
//MWISHO WA PICK PDF FROM THE PHONE





 const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };




let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});
// To change color
const theme = useContext(themeContext)
const [darkMode, setdarkMode] = useState(false)


//FOR SEARCHING
const [input, setInput] = useState('');
//console.log(input);





 

//Load more
//const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);






//-----------------TO ADD NEW ITEM------------

// State variable to store the RoomClasses data
  const [universityCategories, setUniversityCategories] = useState([]);
  const [CategoryName, setCategoryName] = useState([]);
  // State variable to store the selected RoomClass
  const [selectedUniversityCategory, setSelectedUniversityCategory] = useState(null);
 const [selectedCategoryName, setSelectedCategoryName] = useState(null);
 

  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/apis/Universities/`)
      .then((response) => response.json())
      .then((data) => {
        setUniversityCategories(data);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);


 useEffect(() => {
    fetch(`${EndPoint}/apis/Hobs/`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryName(data);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product unit:', error);
        //showAlertFunction("Error fetching  courses");
      });
  }, []);


const emailRegex = /\S+@\S+\.\S+/;

   const [queryset, setQueryset] = useState({
    StudentName: '',
    StudentPlace: '', 
    
    Email: '',
    Phone: '',
    Github: '',
    Youtube: '',
    Whatsapp: '',
    Body: '',
    
  });

const handleSubmit = () => {
  if (
    queryset.StudentName.trim() === '' &&
    queryset.StudentPlace.trim() === '' &&
     
    !selectedCategoryName &&
    
    queryset.Phone.trim() === ''  &&
    queryset.Email.trim() === '' 
    //!StudentImage
  ) {
    showAlertFunction("All fields are required ");
    setLoadingButton(false);
  } 

  else if (
    queryset.StudentName.trim() === ''
  ) {
    showAlertFunction("Please enter Student name ");
    setLoadingButton(false);
  } 

   else if (
    queryset.StudentPlace.trim() === ''
  ) {
    showAlertFunction("Please enter Student place ");
    setLoadingButton(false);
  } 

   else if (
    queryset.Email.trim() === ''
  ) {
    showAlertFunction("Please enter your email ");
    setLoadingButton(false);
  } 

  // Validate email format
  
  else if (
    !emailRegex.test(queryset.Email)
    ) {
    showAlertFunction("Please enter a valid email address");
    setLoadingButton(false);
    
  }


   else if (
    queryset.Phone.trim() === ''
  ) {
    showAlertFunction("Please enter your phone number ");
    setLoadingButton(false);
  } 

   

  else if (
    StudentImage === ''
  ) {
    showAlertFunction("Please select Your Image ");
    setLoadingButton(false);
  } 

  




  else if (
    isNaN(Number(queryset.Phone)) 

  ) {
    showAlertFunction("Phone Numbers must be valid numbers");
    setLoadingButton(false);
  } else {
      setLoadingButton(true);
    // Validation passed, prepare form data for submission
    const formData = new FormData();
    formData.append('StudentName', queryset.StudentName);
    formData.append('StudentPlace', queryset.StudentPlace);
    
    formData.append('CategoryName', selectedCategoryName.id); // Pass the Course ID
    formData.append('Email', queryset.Email);
    formData.append('Youtube', queryset.Youtube);
    formData.append('Github', queryset.Github);
    formData.append('Whatsapp', queryset.Whatsapp);
    formData.append('Phone', queryset.Phone);
    
    formData.append('Body', queryset.Body);
    // Append the image file
    formData.append('StudentImage', {
      uri: StudentImage,
      name: 'StudentImage.jpg',
      type: 'image/jpeg',
    });

    

    // Make the API request
    fetch(EndPoint + '/CreateNewExpert/', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        showAlertFunction("Expert was added successfully");
        // Clear the form after successful submission
        setQueryset({
          StudentName: '',
          StudentPlace: '',
          Phone: '',
          
          Github: '',
          Youtube: '',
          Whatsapp: '',
          Email: '',
          Body: '',
        });
        setLoadingButton(false);
        setStudentImage(null); // Clear the selected image
        
      })
      .catch((error) => {
          setLoadingButton(false);
        showAlertFunction("Failed to add new expert, makesure you are uploading Expert Image");
      });
  }
};









 return (
 

 <>{!fontsLoaded ? (<View/>):(
 

<>
 {!LoadingButton ? (

// { MWANZO WA container1}
 <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>



<MinorHeader title="New Expert"/>










<ScrollView keyboardShouldPersistTaps="handled">
  <View style={globalStyles.AddFormContainerMainAddProject}
  >
          <View style={globalStyles.AddCustomerModalView}>
            <Text style={globalStyles.ViewOrderModalTitleAddProject}>NEW EXPERT</Text>

            
           {/* ADD PRODUCT  Form*/}
           
        


{/*mwanzo wa form*/}
     <View style={globalStyles.form}>
               {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}> Your Name <Text style={{
                      color:'red'
                    }}>*</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Your Name' 
                        onChangeText={(text) =>
          setQueryset({ ...queryset, StudentName: text })
        }
        value={queryset.StudentName}
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}


               {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}> Place <Text style={{
                      color:'red'
                    }}>*</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Place' 
                        onChangeText={(text) =>
          setQueryset({ ...queryset, StudentPlace: text })
        }
        value={queryset.StudentPlace}
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}



            {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}> Your Email <Text style={{
                      color:'red'
                    }}>*</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Your Email' 
                        onChangeText={(text) =>
          setQueryset({ ...queryset, Email: text })
        }
        value={queryset.Email}
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}



               {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}>Youtube Link <Text style={{
                      color:'red'
                    }}>(option)</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Youtube  Link' 
                        onChangeText={(text) =>
          setQueryset({ ...queryset, Youtube: text })
        }
        value={queryset.Youtube}
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}



               {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}> Github Link <Text style={{
                      color:'red'
                    }}>(option)</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Github Link' 
                        onChangeText={(text) =>
          setQueryset({ ...queryset, Github: text })
        }
        value={queryset.Github}
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}



               {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}> Whatsapp Link <Text style={{
                      color:'red'
                    }}>(option)</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Whatsapp Link' 
                        onChangeText={(text) =>
          setQueryset({ ...queryset, Whatsapp: text })
        }
        value={queryset.Whatsapp}
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}




                {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}> Phone Number <Text style={{
                      color:'red'
                    }}>*</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Phone Number' 
                        onChangeText={(text) =>
          setQueryset({ ...queryset, Phone: text })
        }
        value={queryset.Phone}
        keyboardType="numeric" // Set the keyboard type to numeric
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}


                 


               

















 <View style={{ marginTop: 20 }}>
        

        < View style={globalStyles.inputTax}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 Category
            </Text>

     <View style={globalStyles.picker}>

            
          <Picker
           style={globalStyles.pickerInputAddNewProject}
            selectedValue={selectedCategoryName}
            onValueChange={(itemValue) => setSelectedCategoryName(itemValue)}
          >

            {CategoryName.map((x) => (
              <Picker.Item
                key={x.id}
                label={x.CategoryName}
                value={x}
              />
            ))}
          </Picker>

         </View>
          
            
          
        
    </View>








      </View>
{/*mwisho wa view ya margin 20*/}









<View style={{ marginTop: 20 }}>
  <Text style={{ fontSize: 16, marginLeft: 3 }}>Your Image <Text style={{
                      color:'red'
                    }}>*</Text></Text>
  <View style={globalStyles.input}>
    <FontAwesome style={globalStyles.InputIcon} name='image' />
    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProject}
      onPress={pickImage}
    >
      <Text style={{ color: 'gray' }}>Choose Image</Text>
    </TouchableOpacity>
  </View>
  {StudentImage && (
<Image source={{ uri: StudentImage }} style={{ 
width: width-90,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}

</View>















 {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}> Short Description <Text style={{
                      color:'red'
                    }}>(option)</Text></Text>
                    < View style={globalStyles.ProjectBodyinput}>
                        {/*<FontAwesome style={globalStyles.InputIcon} name='pencil'/>*/}
                        <TextInput 
                        style={globalStyles.ProjectBodyInputIcon}  
                        placeholder='Short Description' 
                        onChangeText={(text) =>
          setQueryset({ ...queryset, Body: text })
        }
        value={queryset.Body}
         multiline={true}  // Enable multiline
          numberOfLines={10}  // Set a maximum number of lines
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}







            </View>
{/*mwisho wa form*/}
          
  
{!LoadingButton && (
          
  <View style={globalStyles.ButtonConatinerAddNewProject}>
                   {/* <TouchableOpacity style={globalStyles.ButtonClose}  
                    onPress={() => setModalVisibleAddProduct(false)} >
                        <Text style={globalStyles.ConfirmCancelButtonText}>CLOSE</Text>
                    </TouchableOpacity>*/}

                    <TouchableOpacity 
                    style={globalStyles.ButtonAddAddNewProject}  
                    onPress={handleSubmit} >
                        <Text style={globalStyles.ConfirmCancelButtonTextAddNewProject}>CONFIRM</Text>
                    </TouchableOpacity>
            </View>
  )}



{/*MWISHO WA ADD PRODUCT FORM*/}

          </View>


        </View>
</ScrollView>














<AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Alert!"
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="green"
        onConfirmPressed={hideAlert}
      />








    </View>
// MWISHO WA container1



):(

<AddLotterViewScreen />

)}

    </>



)}</>

  );
};






  
export default AddNewExpert;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'black',

    
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  universityheadertext:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    color:'red',
    // marginBottom:20,
    marginTop:0,
  
  },
});