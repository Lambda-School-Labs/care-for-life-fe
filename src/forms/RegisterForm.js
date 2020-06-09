import React, { useState, useEffect } from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import axios from 'axios'

const Register = ({ route, navigation }) => {

    const { userInfo } = route.params;

    const [roles, setRoles] = useState([])
    const [comms, setComms] = useState([])
    const [user, setUser] = useState({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        role_name: '',
        zone_id: 0,
        community_id: 0
    })

    const getRegisterInfo = () => {
        axios.get('https://care-for-life.herokuapp.com/api/roles')
            .then(res => {
                console.log('roles', res.data)
                setRoles(res.data)
                axios.get('https://care-for-life.herokuapp.com/api/communities')
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(err => console.log(err.message))
            })
            .catch(err => console.log(err.message))
    }

    useEffect(() => {
        console.log('user', userInfo)
        getRegisterInfo()
    }, [])

    return (
        <View>
            <Text>Register</Text>
        </View>
    )
}

export default Register;

// get user info in props
// collect role_name, community, then zone 
// store all in a state object to post to backend e