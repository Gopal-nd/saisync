import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import dayjs from 'dayjs';

const timetable = [
  { time: '9:00 - 10:00', subject: 'Maths' },
  { time: '10:00 - 11:00', subject: 'Science' },
  { time: '11:00 - 11:15', subject: 'Break' },
  { time: '11:15 - 12:15', subject: 'Social' },
  { time: '12:15 - 1:15', subject: 'Kannada' },
  { time: '1:15 - 2:00', subject: 'Lunch' },
  { time: '2:00 - 3:00', subject: 'English' },
  { time: '3:00 - 4:00', subject: 'Yoga' },
];

type ClassItem = {
  subject: string;
  time: string;
};

const isCurrentTime = (timeRange:any) => {
  const [start, end] = timeRange.split(' - ');
  const now = dayjs();
  const startTime = dayjs().hour(parseInt(start.split(':')[0])).minute(parseInt(start.split(':')[1]));
  const endTime = dayjs().hour(parseInt(end.split(':')[0])).minute(parseInt(end.split(':')[1]));

  return now.isAfter(startTime) && now.isBefore(endTime);
};

const CollegeTimetable = () => {
  const [selectedClass, setSelectedClass] = useState<ClassItem|null>(null);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24,textAlign:'center', marginBottom: 20 }}>Today {new Date().toLocaleDateString()}</Text>
      {timetable.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => setSelectedClass(item)}>
          <View
            style={[
              styles.card,
              isCurrentTime(item.time) ? styles.highlighted : null,
            ]}
          >
            <Text style={styles.text}>{item.time} - {item.subject}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Modal
        visible={!!selectedClass}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedClass(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Subject: {selectedClass?.subject}</Text>
            <Text style={styles.modalText}>Time: {selectedClass?.time}</Text>
            <TouchableOpacity onPress={() => setSelectedClass(null)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
  },
  highlighted: {
    backgroundColor: '#a7f3d0',
  },
  text: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    height: '80%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 18,
    color: 'blue',
    marginTop: 20,
  },
});

export default CollegeTimetable;
