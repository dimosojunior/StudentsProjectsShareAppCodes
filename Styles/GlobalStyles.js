import React from 'react';
import { StyleSheet, Text,Dimensions, View, Button,Platform } from 'react-native';




const {height, width} = Dimensions.get('window');

const marginBottomItem = 10;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;


 
const GlobalStyles =() => {



  return(

    <View>
      <Text>Gloal Styles</Text>
    </View>
    );


}
export default GlobalStyles;


export const globalStyles = StyleSheet.create({

//    ---------------------- ALL HOMESCREEN STYLES------------------------------------------
    
container:{
  flex:1,

},

homeContainer: {
    // flex: 1,
    width:width,
    height:height,
   
    
  },

homeComponentContainer:{
	width:width,
    height:height,
 	

  },







  //-----------------------HEADER.JS------------------


    headerHeaderFile: {
    //width:Dimensions.get('window').width,     
    width: '100%',
    // height: 60,
    paddingVertical: 10,
    flexDirection: 'row',
   //backgroundColor: '#233329',
    borderBottomWidth: .5,
    borderBottomColor: 'white',
   // paddingTop: Dimensions.get("window").height * 0.04,

    // alignItems: 'flex-start',
    marginLeft: 0,
    paddingLeft: 0,
    //backgroundColor: 'white',  //"#2B3856",
    marginBottom: 8,

    justifyContent: 'space-between',
    elevation: 0,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? 'white' : "white",
    shadowOpacity: 1,
    shadowRadius: 2,
    marginHorizontal: 0,
    marginVertical: 0,
    paddingHorizontal: 0,

    //paddingVertical:15,




  },
    headerTextHeaderFile: {
      //fontWeight: 'bold',
      fontSize: 18,
      color: 'white',
      letterSpacing: 1,

      // flex:1,
      alignItems:"center",
      marginTop:10,
      // fontFamily:'SerifRegular',

      
    },
    iconHeaderFile: {
      position: 'relative',
      marginLeft:10,
      
      //flex:1,
      
      fontWeight:'bold',
      marginTop:5,

      fontSize:30,
      

    },

    headerImageHeaderFile:{
      width:40,
      height:40,
      // marginHorizontal:10,
      marginTop:0,
      borderRadius:20,
      marginRight:10,
      marginBottom:0
    },

 headerTextHeaderFile1:{
    fontFamily:'Light',
     fontFamily:'Light',
    // color: 'white',
    letterSpacing: 1,

    // flex:1,
    alignItems: "center",
    marginTop: 10,
    // fontFamily:'SerifRegular',

  },




 








  //---------------------MODAL STYLE-----------------

  ModalView: {
    padding: 2,
    paddingHorizontal:20,
    // width: 340,
    width:'90%',
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 3,
    shadowColor: Platform.OS === "android" ? 'white' : "Lightgrey",
    shadowOpacity: 1,
    paddingBottom:30,
    marginTop:10,

  },
  ButtonClose: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "red",
    borderRadius: 5,

  },
  ButtonAdd: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "green",
    borderRadius: 5,


  },
  ButtonScan: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 5,

  },
  ButtonBarcode: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    //  backgroundColor:"green",
    borderRadius: 5,
    borderWidth: 1,

  }, ButtonConatiner: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: "space-between"
  },
  input: {
    flexDirection: "row",
    width: 300,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },
  inputTax: {
    flexDirection: "row",
    width: 300,
    height: 50,
    backgroundColor: 'green',
    // borderColor:"black",
    // borderWidth:1,
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  picker: {
    width: 170,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  pickerInput: {
    top: -7
  },

  textInput: {
    // fontSize: 20
     
    marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'white',
    
    borderRadius: 10,
  },
  form: {
    marginTop: 10,
    alignItems: 'center'
  },
  Inputicon: {
    fontSize: 29,
    marginRight: 10

  },
  TaxType: {
     fontFamily:'Light',
    color: "white",
    fontWeight: '400'
  },
  open: {
    width: 200,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,

  },


  ButtonAddText: {
    color: 'white',
     fontFamily:'Light',
  },




























// ----------------------------HOME COMPONENT 1-----------------



itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.1,
    borderColor: "#ddd",

  },
  itemImageStyle: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius:5,
  },
  contentWrapperStyle: {
    justifyContent: "space-around",
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    // color: "#777",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },


  
  















// ---------------------EXPERT COMPONENT 2--------------------

homeComponentHeaderText:{
	textAlign:'center',
	fontSize:16,
	marginBottom:20,

},

// AllExpertsCategoryContainer:{
//   marginBottom:100,
//   paddingBottom:100,
//   flex:1,
  

// },

  listContainer: {
    //width: Dimensions.get('window').width / 2,
    width:'50%',
    //backgroundColor: 'black',
    margin: 1,
    borderRadius: 20,
    //flex:1,

    //elevation: 3,
    //backgroundColor:'white',
    //shadowOffset: { width: 1, height: 1 },
    //shadowColor: 'white',
    // shadowColor: Platform.OS === "android" ? 'white' : "white",
    // shadowOpacity: 0,
    // shadowRadius: 0,
    //height:height,



  },
  imageContainer: {
    margin: 5,
    borderRadius: 0,
    // overflow: 'hidden',
    width:'90%'
  },
  image: {
  	width: '100%',
  	 height: undefined, 
  	 aspectRatio: 1,
  	 borderRadius:20,
  	},
  nameText: {
    color: 'white',
    // fontWeight: 'bold',
    marginLeft: 15,
    
    fontFamily: 'Light',
  },
  priceText: {
    color: 'green',
    
    marginLeft: 15,
    marginTop: 10,
    fontFamily: 'Light',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,

  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Light',
  },







  //---------------------ACTIVITY INDICATOR-------------

  ActivityIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    flex: 1,

    height: height,
    backgroundColor: '#233329',

  },
  ActivityIndicatorText: {
    color: 'green',
    marginBottom: 15,
    marginTop: 20,
     fontFamily:'Light',
    fontFamily:'Light',


  },






// ARTICLES STYLE

Articlesheadertext:{
    textAlign:'center',
    // fontSize:16,
    //fontWeight:'bold',
    color:'white',
    marginBottom:10,
    marginTop:0,
     fontFamily:'Bold',
    // fontFamily:'SerifRegular',
    
  
  },


ArticleHeaderName:{
  // backgroundColor:'blue',
  elevation:3,
  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'green' : "green",
  shadowOpacity: 1,
  shadowRadius: 2,

},














  //--------------------------SEARCH PAGE-----------------

  SearchContainer: {
    marginTop: 1,
    paddingHorizontal: 20,

  },

  InputContainer: {
    marginTop: 10,
    padding: 2,
    paddingLeft: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    elevation: 3,
    borderColor: 'white',
    borderWidth: 1,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 1,
    shadowRadius: 2,
  },

  TextInput: {
     fontFamily:'Light',
    marginLeft: 10,

    
    fontFamily:'Bold',
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
  },

















//-------------------------------ALL ARTICLES----------


 fontSize: {
    // fontSize: 18,
    
    fontFamily:'Light',
    //textAlign:'center'
  },
  place: {
    
    fontFamily:'Light',
    color:'red',
    // fontFamily:'SerifRegular',
    //textAlign:'center'
  },
  ShortDescription:{
    fontFamily:'Light',
    // fontFamily:'SerifRegular',

  },
  wrapImageContainer:{
    
    width:'40%',
    // flex:1,

  },
  Expertimage: {
    width: '90%',
    height: 80,
    borderRadius:5,
    marginRight:10,
  },
  wrapText: {
    flex:1,
    width:'70%',
    // flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },




item: {
  width:'100%',
  flex:1,
    flexDirection: 'row',
    //justifyContent:'space-around',
    //alignItems:'center',
    marginBottom: marginBottomItem,
    borderRadius: 10,
    //padding:15,
    
    // borderColor:'#E3E4FA',
    // borderWidth:0.5,
    elevation:5,
    //shadowColor: Platform.OS === "android" ? 'yellow' : "yellow",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    paddingLeft: 10,
    marginHorizontal:0,
    paddingVertical:15
  },






  // ---------------------READ EXPERT.js-------------------



  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  
  caption: {
    fontSize: 14,
    lineHeight: 14,
    //fontWeight: '500',
    // fontFamily:'SerifRegular',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    //borderBottomColor: '#dddddd',
    //borderBottomWidth: 1,
   // borderTopColor: '#dddddd',
    //borderTopWidth: 1,
    paddingHorizontal:15,
    paddingVertical:20,
    backgroundColor:'white',
    borderRadius:5
    //flexDirection: 'row',
    //height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },


universityheadertext:{
    textAlign:'center',
    // fontSize:18,
    //fontWeight:'bold',
    color:'red',
    marginBottom:10,
    marginTop:20,
    fontFamily:'Light',
  },


noitemTextContainer:{
  justifyContent:'center',
  alignItems:'center',


},

noitemText:{
  textAlign:'center',
  color:'red',
  fontFamily:'Light'


},


ErrorImageContainer:{
  justifyContent:'center',
  alignItems:'center',
  width:'90%',
  marginTop:20,

},
ErrorImage:{
  width:'60%',
  height:height/3,
  borderRadius:10,

},









// READ ARTICLE
title: {  
    //fontWeight: 'bold',
    marginTop:15,
    marginBottom: 5,
    fontFamily:'Light',
  },
TitleArticleContainer:{
  width:'70%',
  flex:1,

},

ImageAndTitleContainer:{
  flexDirection: 'row',
   marginTop: 15,
   width:'100%',
   flex:1,

},

ImageArticleContainer:{
  width:'30%',

},

ArticleMainImage:{
  width:'90%',
  height:80,
  borderRadius:38

},
ArticleMainTitleText:{
  marginLeft:15,
  fontFamily:'Light',

},


AboutArticleText:{

  textAlign:'center',
  marginBottom:15,
  
  fontFamily:'Bold',

},




downloadButtonArticle:{
  backgroundColor:'green',
  padding:10,
  borderRadius:10,
  marginTop:15,

},







ErrorImageContainerHomePage:{
  justifyContent:'center',
  alignItems:'center',
  width:'90%',
  marginTop:10,

},
ErrorImageHomePage:{
  width:'50%',
  height:height/4 -10,
  borderRadius:30,

},










//-----------------------------ABOUT.JS-------------

 // containerAbout:{
 //    flex:1,
 //    marginBottom:50,

 //  },
  aboutContainer: {
    display: "flex",
    alignItems: "center",
    flex:1,
    marginBottom:50,
  },

  imgStyle: {
    width: width,
    height: height/2,
    borderRadius: 10,
    resizeMode: "cover",
  },
  mainHeaderAboutUs: {
    
    
    textTransform: "uppercase",
   
    // marginTop: 50,
    marginTop: 20,
    marginBottom: 15,
    fontFamily:'Bold',
    
  },
  paraStyle: {
    
    color: "black",
    paddingBottom: 30,
    fontFamily:'Light',
    
  },
  aboutLayout: {
    
    paddingHorizontal: 0,
    // marginVertical: 30,
    marginTop: 20,
  },
  aboutSubHeader: {
    
    textTransform: "uppercase",
    //fontWeight: "500",
    marginVertical: 15,
    fontFamily:'Light',
      alignSelf: "center",
  },
  aboutPara: {
    
    
    fontFamily: "Light",
    lineHeight: 26,
    elevation:3,
    // fontFamily:'SerifRegular',
  //backgroundColor:'white',
  shadowOffset:{width:1, height:1},
  shadowColor: Platform.OS === "android" ? 'red' : "red",
  shadowOpacity:1,
  shadowRadius:2,
  borderRadius:6,
  paddingVertical:10,
  paddingHorizontal:30
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  iconStyle: {
    width: "100%",
    height: 50,
    aspectRatio: 1,
    borderRadius:60,
  },







//----------------PEOPLE WORKS-----------------------------------


  listContainerPeopleWork: {
    //width: Dimensions.get('window').width,
    width:'100%',

    
    //backgroundColor: 'black',
    //margin: 1,
    borderRadius: 20,
    //flex:1,
    //marginHorizontal:30,
    // justifyContent:'center',
    // alignItems:'center'

    //elevation: 3,
    //backgroundColor:'white',
    //shadowOffset: { width: 1, height: 1 },
    //shadowColor: 'white',
    // shadowColor: Platform.OS === "android" ? 'white' : "white",
    // shadowOpacity: 0,
    // shadowRadius: 0,
    //height:height,



  },
  imageContainerPeopleWork: {
    margin: 5,
    borderRadius: 0,
    // overflow: 'hidden',
    width:'100%',
   // justifyContent:'center',
    alignItems:'center',
    flex:1,
    
  },
  imagePeopleWork: {
    width: '100%',
     height:height/3,
     //height: undefined, 
     //aspectRatio: 1,
     borderRadius:20,
    },
  nameTextPeopleWork: {
    color: 'white',
    // fontWeight: 'bold',
    marginLeft: 15,
    
    fontFamily: 'Light',
  },
  priceTextPeopleWork: {
    color: 'green',
    
    marginLeft: 15,
    marginTop: 10,
    fontFamily: 'Light',
  },
  buttonPeopleWork: {
    backgroundColor: 'green',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 100,
    borderRadius: 10,
    //width:width/2,
    alignItems:'center',
    justifyContent:'center',
    marginTop:20,

  },
  buttonTextPeopleWork: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Light',
  },


















//------------PEOPLE WORKS MODAL STYLE----------------


ViewOrderModalTitle:{
  textAlign:'center',
  fontFamily:'SemiBold'
},
ConfirmCancelButtonText:{
  color:'white',
  fontFamily:'Light'
},

EnterQuntityText:{
  color:'red',
   fontFamily:'Light',
},
 inputPeopleWork2: {
    flexDirection: "row",
    width: 300,
    
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },


  
  ModalViewPeopleWork: {
    padding: 2,
    paddingHorizontal:20,
    // width: 340,
    width:'100%',
    backgroundColor: "black",
    borderRadius: 20,
    elevation: 3,
    shadowColor: Platform.OS === "android" ? '#233329' : "#233329",
    shadowOpacity: 1,
    paddingBottom:30,
    marginTop:10,

  },
  ButtonClosePeopleWork: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "red",
    borderRadius: 5,

  },
  ButtonAddPeopleWork: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "green",
    borderRadius: 5,


  },
  ButtonScanPeopleWork: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 5,

  },
  ButtonBarcodePeopleWork: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    //  backgroundColor:"green",
    borderRadius: 5,
    borderWidth: 1,

  }, 
  ButtonConatinerPeopleWork: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems:'space-around',
    flex:1,
    //justifyContent: "space-between"
  },
  inputPeopleWork: {
    flexDirection: "row",
    width: 300,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },
  inputTaxPeopleWork: {
    flexDirection: "row",
    width: 300,
    height: 50,
    backgroundColor: 'green',
    // borderColor:"black",
    // borderWidth:1,
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  pickerPeopleWork: {
    width: 170,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  pickerInputPeopleWork: {
    top: -7
  },

  textInputPeopleWork: {
    // fontSize: 20
     
    marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'white',
    
    borderRadius: 10,
  },
  formPeopleWork: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection:'row',
    alignItems:'space-around',
    width:width,
    
  },
  KeyboardAvoidingViewModal:{
  flex: 1,
  backgroundColor:'#233329',
  justifyContent:'center',
  alignItems:'center'

},

  InputiconPeopleWork: {
    fontSize: 29,
    marginRight: 10

  },
  TaxTypePeopleWork: {
     fontFamily:'Light',
    color: "white",
    fontWeight: '400'
  },
  openPeopleWork: {
    width: 200,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,

  },


  ButtonAddTextPeopleWork: {
    color: 'white',
     fontFamily:'Light',
  },












AddFormContainerMain:{
   flex: 1,
   justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: 'white' 

},


  textInputAddNewProject: {
    // fontSize: 20
     
    marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'white',
    
    borderRadius: 10,
  },

   textInputAddNewProjectSelectedPdf: {
    // fontSize: 20
     
    marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'white',
    elevation:3,
    padding:15,
    marginTop:15,
    
    borderRadius: 10,
  },
  formAddNewProject: {
    marginTop: 10,
    alignItems: 'center'
  },
  InputiconAddNewProject: {
    fontSize: 29,
    marginRight: 10

  },
  TaxTypeAddNewProject: {
     fontFamily:'Light',
    color: "white",
    fontWeight: '400'
  },
  openAddNewProject: {
    width: 200,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,

  },


  ButtonAddTextAddNewProject: {
    color: 'white',
     fontFamily:'Light',
  },
   pickerInputAddNewProject: {
    top: -7
  },

ButtonConatinerAddNewProject: {
  marginTop:20,
    // flexDirection: 'row',
    // marginTop: 20,
    // justifyContent: "space-between"

  },

  ButtonAddAddNewProject: {


    alignItems: 'center',
    justifyContent: "center",
    width: '100%',
    //padding:10,
    //height: 50,
    //backgroundColor: "green",
    //borderRadius: 5,
    marginBottom:30,


  },

ConfirmCancelButtonTextAddNewProject:{
  color:'black',
  fontFamily:'Medium',
  padding:13,
   // height: 50,
    backgroundColor: "lightblue",
    borderRadius: 5,
    width:'50%',
    textAlign:'center',
},


PickImageButtonContainerAddAddNewProject:{
 marginBottom:15,
 // justifyContent:'space-around',
 // alignItems:'space-around',
 width:'100%',

},
// PickImageButtonTextAddAddNewProject:{
//   //backgroundColor:'green',
//   padding:10,
//   borderRadius:8,
  
//   borderColor:'green',
//   borderWidth:2,
//   width:'100%',


// },

  PickImageButtonTextAddAddNewProject: {
    // fontSize: 20
     
    marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: Dimensions.get('window').width -100,
    backgroundColor: 'white',
      borderColor:'green',
  borderWidth:2,
  padding:10,
  
    
    borderRadius: 10,
  },



  ViewOrderModalTitleAddProject:{
  textAlign:'center',
  fontFamily:'Light',
  marginTop:20,
},


AddFormContainerMainAddProject:{

  flex: 1,
   justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: 'wheat' 
},
textInputAddNewProjectAddProject:{
   marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: Dimensions.get('window').width - 100,
    //backgroundColor: 'white',
    height:45,
    //paddingVertical:20,
    // justifyContent:'center',
    // alignItems:'center',
    
    borderRadius: 10,
    justifyContent:'center',
},


ProjectBodytextInputAddNewProjectAddProject:{
  marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: Dimensions.get('window').width - 50,
    //backgroundColor: 'white',
    height:200,
    //paddingVertical:20,
    // justifyContent:'center',
    // alignItems:'center',
    
    borderRadius: 10,
    // justifyContent:'flex-start',

},

ProjectBodyinput:{
  width: Dimensions.get('window').width-50,
  //flexDirection: "row",
    //width: '100%',
    height: 200,
    borderColor: "black",
    borderWidth: 1,
    //alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    //justifyContent:'flex-start',



},

ProjectBodyInputIcon:{
  marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: Dimensions.get('window').width - 80,
    //backgroundColor: 'white',
    height:180,
    //paddingVertical:20,
    justifyContent:'center',
    alignItems:'center',
    
    borderRadius: 10,
    // justifyContent:'flex-start',


},









//-----------UPLOAD OPTIONS -----------------

 
  itemView: {
    //flex: 1,
    flexDirection: 'row',
    width: width,
    alignSelf: 'center',
    //backgroundColor: '#233329',
    //elevation: 0.5,
    
    shadowOffset: { width: 0, height: 0 },
    //shadowColor: Platform.OS === "android" ? 'black' : "black",
    shadowOpacity: 0,
    shadowRadius: 0,

    marginTop: 10,
    borderRadius: 10,
    height: 150,
    marginBottom: 0,
    borderWidth:1,
    //borderColor:Platform.OS === "android" ? 'white' : "white",
    //marginHorizontal: 20,
  },
  ClickableIconContainerOptions:{
    marginTop: 20,
    borderColor:Platform.OS === "android" ? 'green' : "green",
    borderWidth:1,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    width:'40%',
    elevation:3,

  },
  ImageListContainer: {
    justifyContent: 'center',
    width: '50%',


  },
  itemImage: {
    width: '80%',
    height: '70%',
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    justifyContent: 'center',
    width: '40%'
    //width: '43%',
    // margin: 10,


  },
CustomernameText:{
  fontFamily:'Medium',
},

  



  });

