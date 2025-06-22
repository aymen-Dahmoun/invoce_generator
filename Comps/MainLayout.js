import { View } from "react-native";
import NavBar from "./NavBar";
import { SafeAreaView } from "react-native-safe-area-context";


export default function MainLayout({children}){

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            {children}
            <NavBar />
        </SafeAreaView>
    )
}