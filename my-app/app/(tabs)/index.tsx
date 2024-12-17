import React from 'react';
import { SafeAreaView } from 'react-native';
import ProgressTimeline from "@/components/ProgressTimeline";

export enum STATUS {
  DONE = 'done',
  IN_PROGRESS = 'inProgress',
  PENDING = 'pending',
}

export interface Step {
  id: number;
  title: string;
  status: STATUS;
}

const steps:Step[] = [
  { id: 1, title: 'Preface', status: STATUS.DONE },
  { id: 2, title: 'Introduction', status: STATUS.IN_PROGRESS },
  { id: 3, title: 'Chapter 1', status: STATUS.PENDING },
  { id: 4, title: 'Chapter 2', status: STATUS.PENDING },
  { id: 5, title: 'Chapter 3', status: STATUS.PENDING },
  { id: 6, title: 'About', status: STATUS.PENDING },
] as const ;

const App = () => {

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <ProgressTimeline steps={steps} />
    </SafeAreaView>
  );
};

export default App;
