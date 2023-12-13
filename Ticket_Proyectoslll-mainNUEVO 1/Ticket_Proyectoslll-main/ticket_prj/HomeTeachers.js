import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabTeachers from "./BottomTabTeachers";
 
export default function Home(){
  return(
    <NavigationContainer independent={true}>
      <BottomTabTeachers/>
    </NavigationContainer>
  );
}