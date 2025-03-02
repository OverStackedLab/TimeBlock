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
import RNDateTimePicker, {
  IOSNativeProps,
} from '@react-native-community/datetimepicker';
import ColorPicker from './ColorPicker';

type EventBottomSheetProps = {
  bottomSheetRef: React.RefObject<BottomSheet>;
  event: EventItem | undefined;
  setSelectedEvent: (event: EventItem | undefined) => void;
};

export default function EventBottomSheet({
  bottomSheetRef,
  event,
  setSelectedEvent,
}: EventBottomSheetProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [eventTitle, setEventTitle] = useState(event?.title || '');
  const [eventDate, setEventDate] = useState(
    event?.start.dateTime ? new Date(event.start.dateTime) : undefined,
  );
  const [eventStartTime, setEventStartTime] = useState(event?.start?.dateTime);
  const [eventEndTime, setEventEndTime] = useState(event?.end.dateTime);
  const [eventColor, setEventColor] = useState(event?.color || '#f57c00');
  const [eventDescription, setEventDescription] = useState(
    event?.description || '',
  );
  const [timePickerType, setTimePickerType] = useState<'start' | 'end'>(
    'start',
  );
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<IOSNativeProps['mode']>('date');
  const [show, setShow] = useState(false);
  const [displayMode, setDisplayMode] =
    useState<IOSNativeProps['display']>('inline');

  const snapPoints = useMemo(() => ['65%', '75%', '85%'], []);

  useEffect(() => {
    if (event) {
      setEventTitle(event.title || '');
      setEventDate(
        event.start.dateTime ? new Date(event.start.dateTime) : undefined,
      );
      setEventStartTime(event.start.dateTime);
      setEventEndTime(event.end.dateTime);
      setEventColor(event.color || '#f57c00');
      setEventDescription(event.description || '');
    }
  }, [event]);

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
    if (event) {
      const updatedEvent: EventItem = {
        ...event,
        title: eventTitle.trim(),
        description: eventDescription.trim(),
        color: eventColor,
      };

      setSelectedEvent(undefined);
      dispatch(updateEvent(updatedEvent));
      bottomSheetRef.current?.close();
    }
  }, [event, eventTitle, eventDescription, eventColor, setSelectedEvent]);

  const handleDeleteEvent = useCallback(() => {
    if (event) {
      dispatch(deleteEvent(event.id));
      bottomSheetRef.current?.close();
    }
  }, [event, dispatch]);

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
                  setTimePickerType('start');
                  setMode('time');
                  setDisplayMode('spinner');
                  setShow(true);
                }}>
                {dayjs(eventStartTime).format('h:mm A')} -
              </Text>
              <Text
                onPress={() => {
                  setTimePickerType('end');
                  setMode('time');
                  setDisplayMode('spinner');
                  setShow(true);
                }}>
                {dayjs(eventEndTime).format('h:mm A')}
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
              value={eventDescription}
              onChangeText={setEventDescription}
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
            <ColorPicker
              selectedColor={eventColor}
              onSelectColor={setEventColor}
            />
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
            mode={mode}
            display={displayMode}
            onChange={(_, selectedDate) => {
              if (mode === 'date') {
                if (selectedDate) {
                  setEventDate(selectedDate);
                }
              }
              if (mode === 'time' && timePickerType === 'start') {
                if (selectedDate) {
                  setEventStartTime(selectedDate);
                }
              }
              if (mode === 'time' && timePickerType === 'end') {
                if (selectedDate) {
                  setEventEndTime(selectedDate);
                }
              }
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 8,
              marginTop: 16,
            }}>
            <Button
              mode="text"
              onPress={() => {
                setShow(false);
                if (date) {
                  setEventDate(date);
                }
              }}
              textColor={theme.colors.brandPrimary}>
              OK
            </Button>
            <Button
              mode="text"
              onPress={() => setShow(false)}
              textColor={theme.colors.brandPrimary}>
              CLOSE
            </Button>
          </View>
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
