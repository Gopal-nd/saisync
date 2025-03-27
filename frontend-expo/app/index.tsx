import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [data, setData] = useState('')
  async function fetchUsers() {
    const res = await axios.get('https://randomuser.me/api/')
    return res.data
  }

  useEffect(()=>{
    const result =  fetchUsers()
    result.then(res=>setData(res))
  },[])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}
