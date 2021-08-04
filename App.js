import React, { useState,useEffect } from "react";
import { View,Text, StyleSheet,SafeAreaView,TouchableOpacity } from "react-native";
import * as Clipboard from 'expo-clipboard';
import {lightgray,blue,gray} from './shared/theme';
import List from './components/list';
import ListItemSwitch from './components/listItemSwitch';
import ListItemSlider from './components/listItemSlider';
import Password from './components/password';


const App = () => {
  const [settings,setSettings] = useState({
    uppercaseLetters: true,
    lowercaseLetters: true,
    numbers: true,
    symbols: true,
    passwordLength: 12,
    minSymbolLength: 3
  });

  const [password,setPassword] = useState("");

  useEffect(() => {
      GeneratePassword();
  },[]);


  const GeneratePassword = () => {
    let charset = "";
    let symbols = "!@#$%^&*()_+~|}´`{[]\:;?><,./-='";
    let new_password = "";

    if(settings.uppercaseLetters){
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if(settings.lowercaseLetters){
      charset += "abcdefghijklmnopqrstuvwxyz";
    }
    if(settings.numbers){
      charset += "0123456789";
    }
    if(settings.symbols){
      for (var i = 0;i < settings.minSymbolLength; ++i) {
        new_password += symbols.charAt(Math.floor(Math.random() * symbols.length));
      }
    }

    for (var i = new_password.length; i < settings.passwordLength; i++) {
      new_password += charset.charAt(Math.floor(Math.random() * charset.length));
    }


    //Shuffle
    new_password = new_password.split(/\s\b(?!\s)/).sort(function(){return 0.5-Math.random()}).join(' ');

    setPassword(new_password);
    Clipboard.setString(new_password);

  }


  return (
    <SafeAreaView style={styles.container}>

    <Password data={password}/>
    <List title="PASSWORD FORMAT">
      <ListItemSwitch onChange={(e) => setSettings({...settings,uppercaseLetters:e})} data={settings.uppercaseLetters} title="A-Z" icon="🔠"/>
      <ListItemSwitch onChange={(e) => setSettings({...settings,lowercaseLetters:e})} data={settings.lowercaseLetters} title="a-z" icon="🔡"/>
      <ListItemSwitch onChange={(e) => setSettings({...settings,numbers:e})} data={settings.numbers} title="0-9" icon="🔢"/>
      <ListItemSwitch onChange={(e) => setSettings({...settings,symbols:e})} data={settings.symbols} title="Symbols" icon="🔣"/>
    </List>

    <List title="PASSWORD LENGTH">
    <ListItemSlider min={4} onChange={(e) => setSettings({...settings,passwordLength:e,minSymbolLength: e < settings.minSymbolLength ? e : settings.minSymbolLength})} data={settings.passwordLength}/>
    </List>
    <List title="MINIMUM SYMBOLS LENGTH">
      <ListItemSlider onChange={(e) => setSettings({...settings,minSymbolLength:e,passwordLength: e > settings.passwordLength ? e : settings.password,passwordLength: e > settings.passwordLength ? e : settings.passwordLength})} data={settings.minSymbolLength}/>
    </List>

    <TouchableOpacity onPress={GeneratePassword} style={{width:'100%',height: 'auto',flex:1,display:'flex',alignItems:'center',justifyContent:'center',marginTop: 15}}>
    <Text style={{textAlign:'center',color:blue,fontSize: 18}}>Generate new password</Text>
    <Text style={{textAlign:'center',color:gray,fontSize: 12,marginTop: 15}}>The password will copy to your clipboard automatically</Text>
    </TouchableOpacity>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightgray,
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

export default App;
