import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Keyboard,
  TextInput as RNTextInput,
} from 'react-native';
import { Text, Button, MD3Colors, Icon, TextInput } from 'react-native-paper';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { EventItem } from '@howljs/calendar-kit';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateEvent, deleteEvent } from '@/services/calendarSlice';
import dayjs from 'dayjs';
import { useTheme } from '@react-navigation/native';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPicker from './ColorPicker';
// import Icon from '@react-native-vector-icons/fontawesome';

type EventBottomSheetProps = {
  bottomSheetRef: React.RefObject<BottomSheet>;
  selectedEvent: EventItem | null;
};

export default function EventBottomSheet({
  bottomSheetRef,
  selectedEvent,
}: EventBottomSheetProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [eventTitle, setEventTitle] = useState(selectedEvent?.title || '');
  const [eventDate, setEventDate] = useState(
    selectedEvent?.start.dateTime
      ? new Date(selectedEvent.start.dateTime)
      : undefined,
  );
  const [visible, setVisible] = useState(false);
  const snapPoints = useMemo(() => ['60%', '75%', '85%'], []);

  useEffect(() => {
    if (selectedEvent) {
      setEventTitle(selectedEvent.title || '');
      setEventDate(
        selectedEvent.start.dateTime
          ? new Date(selectedEvent.start.dateTime)
          : undefined,
      );
    }
  }, [selectedEvent]);

  // const renderBackdrop = useCallback(
  //   (props: BottomSheetBackdropProps) => (
  //     <BottomSheetBackdrop
  //       {...props}
  //       disappearsOnIndex={0}
  //       appearsOnIndex={1}
  //       pressBehavior="close"
  //       onPress={() => {
  //         bottomSheetRef.current?.close();
  //         Keyboard.dismiss();
  //       }}
  //     />
  //   ),
  //   [],
  // );

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="close"
      onPress={() => {
        bottomSheetRef.current?.close();
        Keyboard.dismiss();
      }}
    />
  );

  const handleSheetChange = useCallback((index: number) => {
    // if (index === -1) {
    //   setShowDeleteDialog(false);
    // }
  }, []);

  const handleUpdateEvent = useCallback(() => {
    if (selectedEvent && eventTitle.trim()) {
      dispatch(updateEvent({ ...selectedEvent, title: eventTitle.trim() }));
      bottomSheetRef.current?.close();
    }
  }, [selectedEvent, eventTitle, dispatch]);

  const handleDeleteEvent = useCallback(() => {
    if (selectedEvent) {
      dispatch(deleteEvent(selectedEvent.id));
      // setShowDeleteDialog(false);
      bottomSheetRef.current?.close();
    }
  }, [selectedEvent, dispatch]);

  const _onFocus = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      bottomSheetRef.current?.snapToIndex(2);
    },
    [],
  );

  const _onBlur = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      console.log('onBlur', args);
    },
    [],
  );

  const _onSubmitEditing = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      // keyboardBehavior="interactive"
      // keyboardBlurBehavior="restore"
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: '#fafafa' }}>
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.section}>
          <TextInput
            label="Block Title"
            value={eventTitle}
            onChangeText={setEventTitle}
            style={styles.input}
            underlineColor={theme.colors.secondary}
            activeUnderlineColor={theme.colors.brandPrimary}
            onFocus={_onFocus}
            onBlur={_onBlur}
            onSubmitEditing={_onSubmitEditing}
          />
        </View>
        <View style={styles.section}>
          <View style={styles.dateContainer}>
            <Icon
              source="calendar"
              size={24}
              color={theme.colors.brandPrimary}
            />
            <Text>{dayjs(eventDate).format('MM/DD/YYYY')}</Text>
            <Text>
              {dayjs(selectedEvent?.start.dateTime).format('h:mm A')} -{' '}
              {dayjs(selectedEvent?.end.dateTime).format('h:mm A')}
            </Text>
          </View>
        </View>
        <View
          style={{
            ...styles.section,
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: '#000',
            padding: 8,
          }}>
          <RNTextInput
            multiline={true}
            editable
            inputMode="text"
            style={{
              padding: 8,
              height: 3 * 25,
            }}
            onFocus={_onFocus}
            onBlur={_onBlur}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Enter') {
                bottomSheetRef.current?.snapToPosition('55%');
                Keyboard.dismiss();
              }
            }}
          />
        </View>
        <View style={styles.section}>
          <ColorPicker selectedColor={'#FF4B4B'} onSelectColor={() => {}} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="text"
            icon="check"
            onPress={handleUpdateEvent}
            labelStyle={{ fontSize: 20 }}
            textColor={theme.colors.brandPrimary}>
            Save
          </Button>
          <Button
            mode="text"
            icon="delete"
            labelStyle={{ fontSize: 20 }}
            onPress={handleDeleteEvent}
            textColor={theme.colors.brandPrimary}>
            Delete
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 36,
  },
  input: {
    // backgroundColor: MD3Colors.neutral99,
    backgroundColor: '#fafafa',
  },
  buttonContainer: {
    // position: 'absolute',
    // bottom: 64,
    // left: 32,
    // right: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  section: {
    marginBottom: 24,
  },
  timeText: {
    marginTop: 8,
    color: 'rgba(28, 27, 31, 1)',
    paddingLeft: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
