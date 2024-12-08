import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import { Colors } from '../../utils/appConstants';

const Loader = ({state}: boolean) => {
  const status = useSelector((state: RootState) => state?.appData?.loading);
  
  return (
    <Modal visible={state ? state : status} transparent>
      <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color={Colors.base.White} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.transparent.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
