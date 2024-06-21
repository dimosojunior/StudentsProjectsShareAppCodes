
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
import AddLotterViewScreen from '../Screens/AddLotterViewScreen';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
//import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

const AddNewProject =() => {

const navigation = useNavigation();
 const goBackPage = () =>{
    navigation.navigate('Home Stack');

  }

    const [LoadingButton, setLoadingButton] = useState(false);

 const {width, height} = Dimensions.get('window');


    const [ProjectImage, setProjectImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');



//MWANZO WA PICK IMAGE FROM THE PHONE
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
      setProjectImage(result.assets[0].uri); // Use assets array
      console.log("PROJECT IMAGE", ProjectImage)
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
  const [CourseName, setCourseName] = useState([]);
  // State variable to store the selected RoomClass
  const [selectedUniversityCategory, setSelectedUniversityCategory] = useState(null);
 const [selectedCourseName, setSelectedCourseName] = useState(null);
 

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
    fetch(`${EndPoint}/apis/CoursesViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setCourseName(data);
        
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
    ProjectName: '',
    StudentName: '',
    Year: '',
    StudentEmail: '',
    StudentPhoneNumber: '',
    Github: '',
    Youtube: '',
    WhatsappLink: '',
    ProjectBody: '',
    
  });

const handleSubmit = () => {
  if (
    queryset.ProjectName.trim() === '' &&
    queryset.StudentName.trim() === '' &&
    !selectedUniversityCategory && 
    !selectedCourseName &&
    queryset.Year.trim() === ''  &&
    queryset.StudentPhoneNumber.trim() === ''  &&
    queryset.StudentEmail.trim() === '' &&
    queryset.ProjectBody.trim() === '' 
    //!ProjectImage
  ) {
    showAlertFunction("All fields are required ");
    setLoadingButton(false);
  } 

  else if (
    queryset.ProjectName.trim() === ''
  ) {
    showAlertFunction("Please enter project name ");
    setLoadingButton(false);
  } 

   else if (
    queryset.StudentName.trim() === ''
  ) {
    showAlertFunction("Please enter your name ");
  setLoadingButton(false);
  } 

   else if (
    queryset.ProjectBody.trim() === ''
  ) {
    showAlertFunction("Please enter Project Description ");
  setLoadingButton(false);
  } 

   else if (
    queryset.StudentEmail.trim() === ''
  ) {
    showAlertFunction("Please enter your email ");
  setLoadingButton(false);
  } 

  // Validate email format
  
  else if (
    !emailRegex.test(queryset.StudentEmail)
    ) {
    showAlertFunction("Please enter a valid email address");
  setLoadingButton(false);
    
  }


   else if (
    queryset.StudentPhoneNumber.trim() === ''
  ) {
    showAlertFunction("Please enter your phone number ");
  setLoadingButton(false);
  } 

   else if (
    queryset.Year.trim() === ''
  ) {
    showAlertFunction("Please enter project year ");
  setLoadingButton(false);
  } 

  else if (
    ProjectImage === ''
  ) {
    showAlertFunction("Please select project Image ");
  setLoadingButton(false);
  } 

  else if (
    pdf === ''
  ) {
    showAlertFunction("Please select project pdf ");
  setLoadingButton(false);
  } 




  else if (
    isNaN(Number(queryset.StudentPhoneNumber)) ||
    isNaN(Number(queryset.Year))


  ) {
    showAlertFunction("Phone Numbers and Year must be valid numbers");
     setLoadingButton(false);
  } else {

    setLoadingButton(true);
    
    //navigation.navigate('Add New Project');
    // Validation passed, prepare form data for submission
    const formData = new FormData();
    formData.append('ProjectName', queryset.ProjectName);
    formData.append('StudentName', queryset.StudentName);
    formData.append('university', selectedUniversityCategory.id); // Pass the University ID
    formData.append('CourseName', selectedCourseName.id); // Pass the Course ID
    formData.append('StudentEmail', queryset.StudentEmail);
    formData.append('Youtube', queryset.Youtube);
    formData.append('Github', queryset.Github);
    formData.append('WhatsappLink', queryset.WhatsappLink);
    formData.append('StudentPhoneNumber', queryset.StudentPhoneNumber);
    formData.append('Year', queryset.Year);
    formData.append('ProjectBody', queryset.ProjectBody);
    // Append the image file
    formData.append('ProjectImage', {
      uri: ProjectImage,
      name: 'projectImage.jpg',
      type: 'image/jpeg',
    });

    formData.append('pdf', {
      uri: pdf,
      name: 'project.pdf',
      type: 'application/pdf',
    });

    // Make the API request
    fetch(EndPoint + '/CreateNewProject/', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        showAlertFunction("Project is added successfully");
        // Clear the form after successful submission
        setQueryset({
          ProjectName: '',
          StudentName: '',
          StudentPhoneNumber: '',
          Year: '',
          Github: '',
          Youtube: '',
          WhatsappLink: '',
          StudentEmail: '',
          ProjectBody: '',
        });
        setLoadingButton(false);
        setProjectImage(null); // Clear the selected image
        setPdf(null);
      })
      .catch((error) => {
        setLoadingButton(false);
        showAlertFunction("Failed to add new project, makesure you are uploading Project Image and Projectpdf file");
        
        //console.log(error);
      });
  }
};









 return (
 

 <>{!fontsLoaded ? (<View/>):(
 
<>
 {!LoadingButton ? (
   



// { MWANZO WA container1}
 <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>



<MinorHeader title="New Project"/>










<ScrollView keyboardShouldPersistTaps="handled">
  <View style={globalStyles.AddFormContainerMainAddProject}
  >
          <View style={globalStyles.AddCustomerModalView}>
            <Text style={globalStyles.ViewOrderModalTitleAddProject}>ADD NEW PROJECT</Text>

            
           {/* ADD PRODUCT  Form*/}
           
        


{/*mwanzo wa form*/}
     <View style={globalStyles.form}>
               {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}> Project Name <Text style={{
                      color:'red'
                    }}>*</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Project Name' 
                        onChangeText={(text) =>
          setQueryset({ ...queryset, ProjectName: text })
        }
        value={queryset.ProjectName}
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}


               {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}> Student Name <Text style={{
                      color:'red'
                    }}>*</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Student Name' 
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
                    <Text style={{ fontSize:16, marginLeft:3 }}> Student Email <Text style={{
                      color:'red'
                    }}>*</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Student Email' 
                        onChangeText={(text) =>
          setQueryset({ ...queryset, StudentEmail: text })
        }
        value={queryset.StudentEmail}
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}



               {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}>Youtube Project Link <Text style={{
                      color:'red'
                    }}>(option)</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Youtube Project Link' 
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
                    <Text style={{ fontSize:16, marginLeft:3 }}> Github Project Link <Text style={{
                      color:'red'
                    }}>(option)</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Github Project Link' 
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
          setQueryset({ ...queryset, WhatsappLink: text })
        }
        value={queryset.WhatsappLink}
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
          setQueryset({ ...queryset, StudentPhoneNumber: text })
        }
        value={queryset.StudentPhoneNumber}
        keyboardType="numeric" // Set the keyboard type to numeric
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}


                 


                {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}> Year <Text style={{
                      color:'red'
                    }}>*</Text></Text>
                    < View style={globalStyles.input}>
                        <FontAwesome style={globalStyles.InputIcon} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputAddNewProjectAddProject}  
                        placeholder='Year' 
                        onChangeText={(text) =>
          setQueryset({ ...queryset, Year: text })
        }
        value={queryset.Year}
        keyboardType="numeric" // Set the keyboard type to numeric
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}







 <View style={{ marginTop: 20 }}>
        

        < View style={globalStyles.inputTax}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 University
            </Text>

     <View style={globalStyles.picker}>

            
          <Picker
           style={globalStyles.pickerInputAddNewProject}
            selectedValue={selectedUniversityCategory}
            onValueChange={(itemValue) => setSelectedUniversityCategory(itemValue)}
          >

            {universityCategories.map((x) => (
              <Picker.Item
                key={x.id}
                label={x.UniversityName}
                value={x}
              />
            ))}
          </Picker>

         </View>
          
            
          
        
    </View>








      </View>
{/*mwisho wa view ya margin 20*/}










 <View style={{ marginTop: 20 }}>
        

        < View style={globalStyles.inputTax}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 Course
            </Text>

     <View style={globalStyles.picker}>

            
          <Picker
           style={globalStyles.pickerInputAddNewProject}
            selectedValue={selectedCourseName}
            onValueChange={(itemValue) => setSelectedCourseName(itemValue)}
          >

            {CourseName.map((x) => (
              <Picker.Item
                key={x.id}
                label={x.CourseName}
                value={x}
              />
            ))}
          </Picker>

         </View>
          
            
          
        
    </View>








      </View>
{/*mwisho wa view ya margin 20*/}









<View style={{ marginTop: 20 }}>
  <Text style={{ fontSize: 16, marginLeft: 3 }}>Project Image <Text style={{
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
  {ProjectImage && (
<Image source={{ uri: ProjectImage }} style={{ 
width: width-90,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}

</View>












{!pdf ? (
<View style={{ marginTop: 20 }}>
  <Text style={{ fontSize: 16, marginLeft: 3 }}>Project Pdf <Text style={{
                      color:'red'
                    }}>*</Text></Text>
  <View style={globalStyles.input}>
    <FontAwesome style={globalStyles.InputIcon} name='file' />
    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProject}
      onPress={pickPdf}
    >
      <Text style={{ color: 'gray' }}>Choose Pdf</Text>
    </TouchableOpacity>
  </View>
</View>
): (

<View style={{ marginTop: 20 }}>
  <Text style={{ fontSize: 16, marginLeft: 3 }}>Project Pdf</Text>
  
    
    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProjectSelectedPdf}
      onPress={pickPdf}
    >
      <Text style={{ 
        color: 'black',
        fontFamily:'Light',
         }}>{pdf}</Text>
    </TouchableOpacity>
 
</View>

)}








 {/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{ fontSize:16, marginLeft:3 }}> Project Description <Text style={{
                      color:'red'
                    }}>*</Text></Text>
                    < View style={globalStyles.ProjectBodyinput}>
                        {/*<FontAwesome style={globalStyles.InputIcon} name='pencil'/>*/}
                        <TextInput 
                        style={globalStyles.ProjectBodyInputIcon}  
                        placeholder='Project Description' 
                        onChangeText={(text) =>
          setQueryset({ ...queryset, ProjectBody: text })
        }
        value={queryset.ProjectBody}
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






  
export default AddNewProject;


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