import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput, MD3Colors } from 'react-native-paper';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { EventItem } from '@howljs/calendar-kit';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateEvent, deleteEvent } from '@/services/calendarSlice';
import dayjs from 'dayjs';
import { useTheme } from '@react-navigation/native';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';

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
  const snapPoints = useMemo(() => ['50%', '90%', '100%'], []);

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

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
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
          />
        </View>
        <View style={styles.section}>
          <DatePickerInput
            locale="en"
            label="Block Date"
            value={eventDate}
            onChange={setEventDate}
            inputMode="start"
            mode="flat"
            style={styles.input}
          />
        </View>
        <View style={styles.section}>
          <Text
            variant="bodyLarge"
            style={styles.timeText}
            onPress={() => setVisible(true)}>
            {dayjs(selectedEvent?.start.dateTime).format('h:mm A')} -{' '}
            {dayjs(selectedEvent?.end.dateTime).format('h:mm A')}
          </Text>
        </View>
        <TimePickerModal
          visible={visible}
          onDismiss={() => setVisible(false)}
          onConfirm={() => setVisible(false)}
          hours={12}
          minutes={14}
        />
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
    paddingHorizontal: 36,
  },
  input: {
    backgroundColor: MD3Colors.neutral99,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  section: {
    marginBottom: 48,
  },
  timeText: {
    marginTop: 8,
    color: 'rgba(28, 27, 31, 1)',
    paddingLeft: 16,
  },
});
