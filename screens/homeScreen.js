import React, {useContext, useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import Navigator from '../routes/authUser/drawer';
import { UserContext } from '../store/userContext';

export default function Main() {

  return (
    <Navigator/>
  );
}