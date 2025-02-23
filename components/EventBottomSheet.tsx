import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Keyboard,
  TextInput as RNTextInput,
  Platform,
} from 'react-native';
import {
  Text,
  Button,
  MD3Colors,
  Icon,
  TextInput,
  Modal,
  Portal,
} from 'react-native-paper';
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
import RNDateTimePicker from '@react-native-community/datetimepicker';
import ColorPicker from './ColorPicker';

type IOS_DISPLAY =
  | 'calendar'
  | 'spinner'
  | 'inline'
  | 'default'
  | 'compact'
  | 'clock';

type IOS_MODE = 'date' | 'time' | 'datetime' | 'countdown';

type ANDROID_DISPLAY = 'calendar' | 'spinner' | 'clock' | 'default';

type ANDROID_MODE = 'date' | 'time';

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

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<IOS_MODE | ANDROID_MODE>(
    Platform.OS === 'ios' ? 'date' : 'date',
  );
  const [show, setShow] = useState(false);
  const [displayMode, setDisplayMode] = useState<IOS_DISPLAY | ANDROID_DISPLAY>(
    Platform.OS === 'ios' ? 'inline' : 'calendar',
  );

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

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
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
    ),
    [],
  );

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
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
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
              <Text
                onPress={() => {
                  setMode('date');
                  setDisplayMode('inline');
                  setShow(true);
                }}>
                {dayjs(eventDate).format('MM/DD/YYYY')}
              </Text>
              <Text
                onPress={() => {
                  setMode('time');
                  setDisplayMode('spinner');
                  setShow(true);
                }}>
                {dayjs(selectedEvent?.start.dateTime).format('h:mm A')} -
              </Text>
              <Text
                onPress={() => {
                  setMode('time');
                  setDisplayMode('spinner');
                  setShow(true);
                }}>
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
      <Portal>
        <Modal
          visible={show}
          onDismiss={() => setShow(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 18,
            marginHorizontal: 16,
            borderRadius: 8,
          }}>
          <RNDateTimePicker
            value={date}
            mode={
              Platform.OS === 'ios'
                ? (mode as IOS_MODE)
                : ('date' as ANDROID_MODE)
            }
            display={
              Platform.OS === 'ios' ? (displayMode as IOS_DISPLAY) : 'default'
            }
            onChange={(event, selectedDate) => {
              setShow(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 36,
  },
  input: {
    backgroundColor: '#fafafa',
  },
  buttonContainer: {
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
