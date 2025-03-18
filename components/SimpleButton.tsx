import react from 'react';
import { TouchableOpacity,Text,StyleSheet } from 'react-native';

type Buttonprops ={
    title:string;
    color?:string;
    borderRadius:number|string;
    backgroundColor:string;
}

const SimpleButton =({
    title,
    backgroundColor ='#191970',
    borderRadius = 5
}:Buttonprops)=>{
    return (
        <TouchableOpacity style={[styles.button,{backgroundColor:backgroundColor},{borderRadius:borderRadius}]}>
            <Text style={[styles.text]}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
      padding: 10,
      margin:30,
    },
    text: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign:'center',
    },
  });
  export default SimpleButton;
